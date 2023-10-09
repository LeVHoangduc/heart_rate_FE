import React from 'react'
import style from './Login.module.css'
import PasswordValidation from '../../constants/validation/PasswordValidation'
import EmailValidation from '../../constants/validation/EmailValidation'
import API from '../../constants/api/API'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [data, setData] = React.useState({ email: '', password: '' })
  const [error, setError] = React.useState({ email: '', password: '', login: '' })
  let navigate = useNavigate()
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const validateForm = () => {
    const email = data.email
    const password = data.password
    if (!EmailValidation(email)) {
      setError({ ...error, email: 'Invalid Email' })
      return false
    }
    if (!PasswordValidation(password)) {
      setError({ ...error, password: 'Invalid Password' })
      return false
    }
    return true
  }
  const handleSumit = (e) => {
    e.preventDefault()
    if (validateForm()) {
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
        <img
          src='https://res.cloudinary.com/de59jbjlb/image/upload/v1696598738/login_beug6j.png'
          alt=''
          className={style.image}
        />

        <form className={style.form} onSubmit={handleSumit}>
          <h2 className={style.form__header}>Login Details</h2>
          <input
            type='email'
            name='email'
            className={style.form__username}
            placeholder='Username, email, phone number'
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
          <p className={style.form__link}>Forgot Password ?</p>
          <p className={style.form__error}>{error.login}</p>
          <button type='submit' name='submit' className={style.form__button}>
            Login
          </button>
        </form>
        <div className={style.signup__container}>
          <span className={style.signup__text__line}></span>
          <p className={style.signup__text}>Or signup with</p>
          <span className={style.signup__text__line}></span>
        </div>

        <div className={style.signup__container__link}>
          <a className={style.signup__link} href='https://www.google.com/'>
            <img
              src='https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK'
              alt=''
              className={style.signup__image}
            />
          </a>
          <a className={style.signup__link} href='https://www.facebook.com/'>
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png'
              alt=''
              className={style.signup__image}
            />
          </a>
          <a className={style.signup__link} href='https://www.apple.com/'>
            <img
              src='https://yt3.googleusercontent.com/WoDkWmAjQ5Dbw-ccjqFku8ThK2UYcqaOqq25PBE9eGb_S-vsqxiKU2kL2kZJVz_BcAMv3WUWsA=s900-c-k-c0x00ffffff-no-rj'
              alt=''
              className={style.signup__image}
            />
          </a>
        </div>
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
