import style from './LoadResult.module.css'

import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import FaceDetectionComponent from '../../components/FaceDetection'

const LoadResult = () => {
  const faceDetectionRef = useRef(null);
  const navigator = useNavigate();
  const handleCancel = () => {
    if (faceDetectionRef.current) {
      faceDetectionRef.current.stopVideoRecording();
    }
    navigator(-1);
    console.log('cancel');
  };
  return (
    <div className={style.page}>
      <div className={style.container}>
        <div className={style.header}>
          <a onClick={handleCancel}>
            Cancel
          </a>
          <h3>Measuring</h3>
        </div>
        <div className={style.content}>
          <div className={style.header_content}>
            <h3>Just a few seconds</h3>
            <div className={style.snippet} data-title='dot-pulse'>
              <div className='stage'>
                <div className='dot-pulse'></div>
              </div>
            </div>
          </div>
          <FaceDetectionComponent ref={faceDetectionRef} />
          <h3>We are analyzing your measurement</h3>
        </div>
      </div>
    </div>
  )
}
export default LoadResult
