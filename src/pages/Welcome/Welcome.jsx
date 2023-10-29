import React from 'react'
import style from './Welcome.module.css'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <div>
      <div className={style.container}>
        <h1 className={style.header}>Welcome to Heart Rate!</h1>
        <img
          src='https://res.cloudinary.com/de59jbjlb/image/upload/v1696596252/welcome_djx2bx.png'
          alt=''
          className={style.image}
        />
        <Link to='/login'>
          <button className={style.button}>Continue</button>
        </Link>
        <p className={style.terms}>
          By continuing to use the app? You accept our <b>Terms of use</b> and <b>Privacy Policy</b>
        </p>
      </div>
    </div>
  )
}

export default Welcome
