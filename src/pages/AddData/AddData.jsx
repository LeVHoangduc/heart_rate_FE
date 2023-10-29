import React from 'react'
import style from './AddData.module.css'
const AddData = () => {
  return (
    <div className={style.page}>
      <div className={style.container}>
        <div className={style.header}>
          <ion-icon name="home-outline"></ion-icon>
          <h3>Blood Pressure</h3>
        </div>
        <div className={style.content}>
          <img src='../../assets/images/addData.png' alt='' />
          <h3>Add your first measurement</h3>
          <p>Comment about heart comment about heart comment about heart Comment about heart comment about heart </p>
        </div>
        <button className={style.button}>Add Data</button>
      </div>
    </div>
  )
}
export default AddData
