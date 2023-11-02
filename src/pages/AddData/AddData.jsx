import React from 'react'
import style from './AddData.module.css'
import { useNavigate } from 'react-router-dom'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
const AddData = () => {
  let navigater = useNavigate()
  return (
    <div className={style.page}>
      <div className={style.container}>
        <HeaderBar />
        <div className={style.content}>
          <img src='../../assets/images/addData.png' alt='' />
          <h3>Add your first measurement</h3>
          <p>Comment about heart comment about heart comment about heart Comment about heart comment about heart </p>
        </div>
        <button className={style.button} onClick={() => navigater('/load-result')}>Add Measurement</button>
      </div>
    </div>
  )
}
export default AddData
