import React from 'react'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import doctorIcon from '../../assets/images/doctor-icon-avatar-white_136162-58.png';
import style from './Home.module.css'
import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <HeaderBar />
      </div>
      <div className={style.start_measure}>
        <div className={style.text_overlay}>
          Start <br /> Measuring
        </div>
      </div>
      <h1>Measure</h1>
      <div className={style.card_options}>
        <Link className={style.card} to="/add-data">
          <img src={doctorIcon} alt="heart icon" />
          <p>Make a appointment with your doctor</p>
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </Link>
        <Link className={style.card} to="/result">
          <img src={doctorIcon} alt="heart icon" />
          <p>Make a appointment with your doctor</p>
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </Link>
      </div>
    </div>
  )
}
