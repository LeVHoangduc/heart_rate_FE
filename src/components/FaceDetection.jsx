import React, { useRef, useEffect, useState } from 'react'

import * as faceapi from 'face-api.js'
import ProgressBar from '@ramonak/react-progress-bar'
import VideoCamera from './VideoCamera/VideoCamera'

function FaceDetectionComponent() {
  const [errorState, setErrorState] = useState(false)

  const videoRef = useRef(null)
  const MODEL_URL = '/models'

  async function getCameraStream() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
        })
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
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL)

    await getCameraStream()
  }

  const handlePlaying = () => {
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      )
      console.log(detections)
      if (detections.length !== 0) setErrorState(false)
      else setErrorState(true)
    }, 1000)
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('play', handlePlaying)
    }

    return () => {
      if (videoRef.current) {
        console.log("run")
        videoRef.current.removeEventListener('play', handlePlaying)      
        const stream = videoRef.current.srcObject;
        console.log("stream",stream)
       if(stream){
        const tracks = stream.getTracks();
        console.log("tracks",tracks)
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
       }
      }
    }
  }, [])

  useEffect(() => {
    getApiCamera()
    console.log('call again api')
  })

  return (
    <>
      <VideoCamera errorState={errorState} videoRef={videoRef} />
      {errorState ? (
        <p>Please keep your face still in the camera </p>
      ) : (
        <ProgressBar
          completed={100}
          maxCompleted={100}
          height='25px'
          bgColor='#e71e50'
          isLabelVisible={false}
          animateOnRender={true}
          initCompletedOnAnimation={10}
          transitionDuration='20s'
        />
      )}
    </>
  )
}

export default FaceDetectionComponent
