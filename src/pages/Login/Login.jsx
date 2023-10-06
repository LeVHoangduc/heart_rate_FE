import React from 'react'
import style from './Login.module.css'
const Login = () => {
  return (
    <div className={style.page}>
      <div className={style.container}>
        <img
          src='https://res.cloudinary.com/de59jbjlb/image/upload/v1696598738/login_beug6j.png'
          alt='login image'
          className={style.image}
        />
        <div className={style.form}>
          <h2 className={style.form__header}>Login</h2>
          <input type='text' className={style.form__username}></input>
          <input type='password' className={style.form__password}></input>
          <p className={style.form__signup}>Or sign up</p>
          <button className={style.form__button}>Login</button>
        </div>
      </div>
    </div>
  )
}
