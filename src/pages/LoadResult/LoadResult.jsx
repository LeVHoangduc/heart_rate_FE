import style from './LoadResult.module.css'

import React from 'react'
import { Link } from 'react-router-dom'

import FaceDetectionComponent from '../../components/FaceDetection'

const LoadResult = () => {
  return (
    <div className={style.page}>
      <div className={style.container}>
        <div className={style.header}>
          <Link to='/add-data'>Cancel</Link>
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

          <FaceDetectionComponent />
          <h3>We are analyzing your measurement</h3>
        </div>
      </div>
    </div>
  )
}
export default LoadResult
