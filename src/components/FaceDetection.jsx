import React, { useRef, useEffect } from 'react'
import * as faceapi from 'face-api.js'
function FaceDetectionComponent(props) {
  let style = props.style
  const videoRef = useRef(null)
  const MODEL_URL = '/models'
  async function getCameraStream() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } })
        videoRef.current.srcObject = stream
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play()
        }
      } catch (err) {
        console.error(`The following error occurred: ${err.name}`)
      }
    } else {
      console.log('getUserMedia not supported')
    }
  }
  Promise.all([
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
  ]).then(getCameraStream)
  const handlePlaying = () => {
    const canvas = faceapi.createCanvasFromMedia(videoRef.current)
    document.getElementById('video_camera').append(canvas)
    const displaySize = { width: videoRef.current.width, height: videoRef.current.height }
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
      const resizedDetections = faceapi.resizeResults(detections, displaySize)
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
      faceapi.draw.drawDetections(canvas, resizedDetections)
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    }, 100)
  }
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('play', handlePlaying)
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('play', handlePlaying)
      }
    }
  }, [])

  return (
    <div id='video_camera' className={style.video_camera}>
      <video id='videoElement' ref={videoRef} autoPlay={true} muted={true} width={980} height={600}>
        <track kind='captions' />
      </video>
    </div>
  )
}

export default FaceDetectionComponent
