import React from 'react'
import style from './ListResult.module.css'
import { useNavigate } from 'react-router-dom'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import DataResult from './DataReult';
import ProgressBar from '@ramonak/react-progress-bar';
const ListResult = () => {
  let navigater = useNavigate()
  return (
    <div className={style.page}>
      <div className={style.container}>
        <HeaderBar />
        <h1>Your Heart Data</h1>
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className={style.content}
        >
          <SwiperSlide><DataResult /></SwiperSlide>
          <SwiperSlide><DataResult /></SwiperSlide>
          <SwiperSlide><DataResult /></SwiperSlide>
          <SwiperSlide><DataResult /></SwiperSlide>
          <SwiperSlide><DataResult /></SwiperSlide>
          <SwiperSlide><DataResult /></SwiperSlide>
        </Swiper>
        <button className={style.button} onClick={() => navigater('/add-data')}>Continue Measurement</button>
      </div>
    </div>
  )
}
export default ListResult
