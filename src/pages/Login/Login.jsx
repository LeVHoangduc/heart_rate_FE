/* eslint-disable prettier/prettier */
import React from 'react'
import style from './Login.module.css'
import PasswordValidation from '../../constants/validation/PasswordValidation'
import EmailValidation from '../../constants/validation/EmailValidation'
import API from '../../constants/api/API'
import { Link, useNavigate } from 'react-router-dom'
import ValidationLogin from '../../constants/validation/validationForm'

const Login = () => {
  const [data, setData] = React.useState({ email: '', password: '' })
  const [error, setError] = React.useState({ email: '', password: '', login: '' })
  let navigate = useNavigate()
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  isValidation = (inputs) => {
    let isValid = true

    inputs.forEach(input => {

      if (input.isValid) setError("")
      else {
        setError("")

        isValid = false
      }
    })

    return isValid
  }

  const handleSumit = (e) => {
    e.preventDefault()
    const inputCheck = ValidationLogin(data)
    const isValidation = isValidation(inputCheck)

    if (isValidation) {
      setError('')
      const data_json = {
        email: data.email,
        password: data.password
      }
      API.post('/user/login', data_json)
        .then((res) => {
          res.status === 200
            ? navigate('/')
            : setError({ ...error, login: 'Email or Password is incorrect. Please try again.' })
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <div className={style.page}>
      <div className={style.container}>
        <div className={style.image}>
          <img
            src='https://res.cloudinary.com/de59jbjlb/image/upload/v1696598738/login_beug6j.png'
            alt=''
          />
        </div>

        <form className={style.form} onSubmit={handleSumit} noValidate>
          <h2 className={style.form__header}>Login Details</h2>
          <input
            type='email'
            name='email'
            className={style.form__username}
            placeholder='Username, email & phone number'
            onChange={handleChange}
            required
          />
          <p className={style.form__error}>{error.email}</p>
          <input
            type='password'
            name='password'
            className={style.form__password}
            placeholder='Password'
            onChange={handleChange}
            required
          />
          <p className={style.form__error}>{error.password}</p>
          <p className={style.form__link}>Forgot Password ? <span>or <Link to='/signup'>Sign Up</Link></span></p>
          <p className={style.form__error}>{error.login}</p>
          <button type='submit' name='submit' className={style.form__button}>
            Login
          </button>
        </form>
      </div>

      <div className={style.custom_shape_divider_bottom_1696784648}>
        <svg data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'>
          <path
            d='M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z'
            className={style.shape_fill}
          ></path>
        </svg>
      </div>
    </div>
  )
}

export default Login
