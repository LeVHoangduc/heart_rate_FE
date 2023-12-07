import axios from 'axios'
import * as faceapi from 'face-api.js'
import ProgressBar from '@ramonak/react-progress-bar'
import React, { useRef, useEffect, useState } from 'react'
import useUserContext from '../hooks/useUserContext'
import VideoCamera from './VideoCamera/VideoCamera'
import { useNavigate } from 'react-router-dom'
import { PATH_URL } from "../constants/values"
import useResultsContext from '../hooks/useResultsContext'

const FaceDetectionComponent = props => {
  const user = useUserContext()
  let cancelStateProp = props.cancelState;
  const [cancelState, setCancelState] = useState(cancelStateProp);
  const [errorState, setErrorState] = useState(false)
  const [recordedChunks, setRecordedChunks] = useState([])
  const { setResult } = useResultsContext();
  const intervalRef = useRef(null)
  const videoRef = useRef(null)
  const detectionRef = useRef(null)
  const timeoutRef = useRef();

  const MODEL_URL = '/models'

  const navigater = useNavigate();

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

          formData.append('user_id', user ? user.id : 1)
          formData.append('video_file', blob)

          console.log("form", formData)

          setCancelState(true);

          axios
            .post(PATH_URL + 'model/', formData)
            .then(response => {
              if (response.data) {
                console.log('response', response.data)
                localStorage.setItem('result', JSON.stringify(response.data))
                setResult(response.data)
                navigater('/result')
              }
            })
            .catch(error => {
              console.error(error)
            })

          setRecordedChunks([])
        }

        videoRef.current.start()
        console.log('start')

        

        console.log('errorState', errorState)
      }).catch(err => {
        console.log(`The following error occurred: ${err.name}`)
      })

  }

  useEffect(() => {
    if (!errorState) {
      console.log('bi stop');
      // Set the timeout and store the ID in the ref
      timeoutRef.current = setTimeout(() => {
        videoRef.current && videoRef.current.stop();
      }, 32000);
    } else {
      // Clear the timeout if errorState is true
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }

    // Clear the timeout when the component unmounts or errorState changes
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [errorState]);

  async function getApiCamera() {
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL)
    console.log('getApiCamera')
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

  if (cancelStateProp || cancelState) {
    console.log('cancelStateProp', cancelStateProp, 'cancelState', cancelState)
    videoRef.current.stop()
    console.log('cancelState', cancelState)
    const stream = detectionRef.current.srcObject
    if (stream) {
      const tracks = stream.getTracks()
      tracks.forEach(track => track.stop())
      console.log('stop')
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      console.log('clearInterval')
    }
  };

  useEffect(() => {
    if (detectionRef.current) {
      console.log('add event listener')
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
    if (user) {
      getApiCamera()
      console.log("user useEffect", user)
    }
  }, [user])

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
          transitionDuration='32s'
        />
      )}
    </>
  )
}

export default FaceDetectionComponent
