import React from 'react'
import style from './ListResult.module.css'
import Icon from '@mdi/react'
import { mdiHeartPulse, mdiWater, mdiLungs } from '@mdi/js'
import Chart from './Chart'
import { PieChart } from './PieChart'
import ProgressBar from '@ramonak/react-progress-bar'
const DataResult = (data) => {
  const { results } = data;
  return (
    <div className={style.data_container}>
      <h2>20 / 11 / 2023</h2>
      <div className={style.chart}>
        <Chart />
      </div>
      <div className={style.data_section}>
        <div className={style.data_item}>
          <Icon path={mdiLungs} size={1} />
          <p>Respiration</p>
          <div className={`${style.data_circle_overlay} ${style.yellow_overlay}`}>
            <div className={`${style.data_circle}  ${style.yellow}`}>
              <strong>Coming</strong>
            </div>
          </div>
        </div>
        <div className={style.data_item}>
          <Icon path={mdiHeartPulse} size={1} />
          <p>Heart Rate</p>
          <div
            className={`${style.data_circle_overlay} ${style.center_overlay} ${style.red_overlay}`}
          >
            <div className={`${style.data_circle} ${style.red} ${style.center}`}>
              <strong>{results && Math.round(results.heartrate)}</strong>BPM
            </div>
          </div>
        </div>
        <div className={style.data_item}>
          <Icon path={mdiWater} size={1} />
          <p>SpO2</p>
          <div className={`${style.data_circle_overlay} ${style.green_overlay}`}>
            <div className={`${style.data_circle} ${style.green}`}>
              <strong>Soon</strong>
            </div>
          </div>
        </div>
      </div>
      <div className={style.data_status_container}>
        <div className={style.data_status_item}>
          <p className={style.status_title}>Stress</p>
          <strong className={style.status_value}>Mild 20%</strong>
          <ProgressBar
            completed={20}
            bgColor='#4caf50'
            baseBgColor='#E0E0E0'
            height='20px'
            maxCompleted={100}
            isLabelVisible={false}
            className={style.progress_bar}
          />
        </div>
        <div className={style.data_status_item}>
          <p className={style.status_title}>Energy</p>
          <strong className={style.status_value}>Mild 80%</strong>
          <ProgressBar
            completed={80}
            bgColor='#BCDB00'
            baseBgColor='#E0E0E0'
            height='20px'
            maxCompleted={100}
            isLabelVisible={false}
            className={style.progress_bar}
          />
        </div>
        <div className={style.data_status_item}>
          <p className={style.status_title}>Happy</p>
          <strong className={style.status_value}>Mild 60%</strong>
          <ProgressBar
            completed={60}
            bgColor='#E8C409'
            baseBgColor='#E0E0E0'
            height='20px'
            maxCompleted={100}
            isLabelVisible={false}
            className={style.progress_bar}
          />
        </div>
      </div>
      <div className={style.data_status_container}>
        <PieChart />
      </div>
    </div>
  )
}
export default DataResult
