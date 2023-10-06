import React from 'react'
import style from './Welcome.module.css'

const Welcome = () => {
  return (
    <div>
      <div className={style.container}>
        <h1 className={style.header}>Welcome to Heart Rate!</h1>
        <img
          alt='welcome image'
          src='https://res.cloudinary.com/de59jbjlb/image/upload/v1696596252/welcome_djx2bx.png'
          className={style.image}
        />
        <button className={style.button}>Continue</button>
      </div>
    </div>
  )
}

export default Welcome
