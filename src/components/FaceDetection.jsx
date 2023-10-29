import React, { useRef, useEffect, useState } from 'react'

import * as faceapi from 'face-api.js'
import VideoCamera from './VideoCamera/VideoCamera'

function FaceDetectionComponent() {
  const [errorState, setErrorState] = useState(false)

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

  async function getApiCamera() {
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);

    await getCameraStream();
  }

  const handlePlaying = () => {
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      console.log(detections)
      if (detections.length !== 0)
        setErrorState(false)
      else
        setErrorState(true)
    }, 1000)
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

  useEffect(() => {
    getApiCamera()
    console.log("call again api")
  })

  return (
    <>
      <VideoCamera errorState={errorState} videoRef={videoRef} />
    </>
  )
}

export default FaceDetectionComponent
