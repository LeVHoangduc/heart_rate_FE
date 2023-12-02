import axios from 'axios'
import * as faceapi from 'face-api.js'
import ProgressBar from '@ramonak/react-progress-bar'

import React, { useRef, useEffect, useState } from 'react'

import useUserContext from '../hooks/useUserContext'

import VideoCamera from './VideoCamera/VideoCamera'
import { Navigate } from 'react-router-dom'

const FaceDetectionComponent = props => {
  const user = useUserContext()

  const [errorState, setErrorState] = useState(false)
  const [recordedChunks, setRecordedChunks] = useState([])

  const intervalRef = useRef(null)
  const videoRef = useRef(null)
  const detectionRef = useRef(null)

  const MODEL_URL = '/models'

  function getCameraStream() {
    console.log('getCameraStream')

    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1280, height: 720 },
      })
      .then(stream => {
        detectionRef.current.srcObject = stream
        console.log('videoRef.current before', videoRef.current)

        videoRef.current = new MediaRecorder(stream)
        console.log('videoRef.current after', videoRef.current)

        videoRef.current.ondataavailable = event => {
          console.log('recordedChunks', recordedChunks, typeof recordedChunks)
          setRecordedChunks(recordedChunks.push(event.data))
        }

        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play()
        }

        videoRef.current.onstop = () => {
          const blob = new Blob(recordedChunks, { type: 'video/webm' })
          const formData = new FormData()

          console.log('blob', blob)

          formData.append('user_id', user.id)
          formData.append('video_file', blob)

          axios
            .post('http://192.168.20.164:8000/api/model/', formData)
            .then(response => {
              console.log(response.data)
            })
            .catch(error => {
              console.error(error)
            })

          setRecordedChunks([])
        }

        videoRef.current.start()
        console.log('start')

        if (!errorState) {
          setTimeout(() => {
            videoRef.current.stop()

            // after record video

            Navigate('/result')
          }, 30000)
        }
      })
      .catch(err => {
        console.log(`The following error occurred: ${err.name}`)
      })
  }

  async function getApiCamera() {
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL)

    getCameraStream()
  }

  const handlePlaying = () => {
    intervalRef.current = setInterval(async () => {
      const detections = await faceapi.detectAllFaces(
        detectionRef.current,
        new faceapi.TinyFaceDetectorOptions()
      )

      if (detections.length === 1) setErrorState(false)
      else setErrorState(true)
    }, 1000)
  }

  // Cancel button
  let { cancelState } = props
  if (cancelState) {
    if (videoRef.current && videoRef.current.state === 'recording') {
      videoRef.current.stop()

      const stream = detectionRef.current.srcObject

      if (stream) {
        const tracks = stream.getTracks()
        tracks.forEach(track => track.stop())
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }

  useEffect(() => {
    if (detectionRef.current) {
      detectionRef.current.addEventListener('play', handlePlaying)
    }

    return () => {
      if (detectionRef.current) {
        detectionRef.current.removeEventListener('play', handlePlaying)
        const stream = detectionRef.current.srcObject

        if (stream) {
          const tracks = stream.getTracks()

          tracks.forEach(track => track.stop())
          detectionRef.current.srcObject = null
        }
      }
    }
  }, [])

  useEffect(() => {
    getApiCamera()
  }, [])

  return (
    <>
      <VideoCamera errorState={errorState} videoRef={detectionRef} />
      {errorState ? (
        <p style={{ textAlign: 'center' }}>Please keep your face still in the camera </p>
      ) : (
        <ProgressBar
          completed={100}
          maxCompleted={100}
          height='25px'
          bgColor='#e71e50'
          isLabelVisible={false}
          animateOnRender={true}
          initCompletedOnAnimation={10}
          transitionDuration='30s'
        />
      )}
    </>
  )
}

export default FaceDetectionComponent
