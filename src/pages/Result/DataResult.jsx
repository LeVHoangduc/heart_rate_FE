import React from 'react'
import style from './ListResult.module.css'
import Icon from '@mdi/react'
import { mdiHeartPulse, mdiStar, mdiClipboardPulse } from '@mdi/js'
import ProgressBar from '@ramonak/react-progress-bar'
import Chart from './Chart'

const DataResult = ({ data }) => {

  // const date = new Date(data.date);

  return (
    <div className={style.data_container}>
      <h2>20 / 11 / 2023</h2>
      <div className={style.chart}>
        <Chart />
      </div>
      <div className={style.data_section}>
        <div className={style.data_item}>
          <Icon path={mdiHeartPulse} size={1} />
          <p>Pulse</p>
          <div className={`${style.data_circle_overlay} ${style.red_overlay}`}>
            <div className={`${style.data_circle} ${style.red}`}>
              <strong>90</strong>BPM
            </div>
          </div>
        </div>
        <div className={style.data_item}>
          <Icon path={mdiStar} size={1} />
          <p>Heart Score</p>
          <div
            className={`${style.data_circle_overlay} ${style.center_overlay} ${style.yellow_overlay}`}
          >
            <div className={`${style.data_circle} ${style.yellow} ${style.center}`}>
              <strong>90</strong>/100
            </div>
          </div>
        </div>
        <div className={style.data_item}>
          <Icon path={mdiClipboardPulse} size={1} />
          <p>HRV</p>
          <div className={`${style.data_circle_overlay} ${style.green_overlay}`}>
            <div className={`${style.data_circle} ${style.green}`}>
              <strong>90</strong>ms
            </div>
          </div>
        </div>
      </div>
      <p className={style.data_description}>
        Comment about heart comment about heart comment about heart
      </p>
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
    </div>
  )
}
export default DataResult
