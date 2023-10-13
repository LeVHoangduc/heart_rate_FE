import React from 'react'
import style from './SignUp.module.css'
import { Link, useNavigate } from 'react-router-dom'
import API from '../../constants/api/API'
import { ValidationRegister } from '../../constants/validation/validationForm'

const SignUp = () => {
  const [data, setData] = React.useState({ name: '', password: '', confirm_password: '', email: '' })
  const [error, setError] = React.useState({ name: '', password: '', confirm_password: '', email: '', signup: '' })

  let navigate = useNavigate()
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const isValidation = (fields) => {
    let isValid = true
    let error = {}
    fields.forEach((field) => {
      if (!field.isValid) {
        isValid = false
        error[field.field] = field.message
      }
    })
    if (!confirmPassword()) {
      isValid = false
      error.confirm_password = 'Password does not match'
    }
    if (data.confirm_password === '') {
      isValid = false
      error.confirm_password = 'Confirm Password is required'
    }
    setError(error)
    return isValid
  }

  const confirmPassword = () => {
    const password = data.password
    const confirm_password = data.confirm_password
    if (password !== confirm_password) {
      setError({ ...error, confirm_password: 'Password does not match' })
      return false
    }
    return true
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const fieldCheck = ValidationRegister(data)
    if (isValidation(fieldCheck)) {
      setError('')
      const data_json = {
        name: data.name,
        password: data.password,
        email: data.email
      }
      API.post('/user/register', data_json)
        .then((res) => {
          res.status === 200 && navigate('/login')
          console.log(res)
        })
        .catch((err) => {
          setError({ ...error, signup: err.response.data.message })
          console.log(err)
        })
    }
  }

  return (
    <div className={style.page}>
      <div className={style.container}>
        <form className={style.form} method='post' onSubmit={handleSubmit} noValidate>
          <h2 className={style.form__header}>Sign Up</h2>
          <input
            type='text'
            name='name'
            className={style.form__username}
            placeholder='Name'
            onChange={handleChange}
            required
          />
          <p className={style.form__error}>{error.name}</p>
          <input
            type='password'
            name='password'
            className={style.form__password}
            placeholder='Password'
            onChange={handleChange}
            required
          />
          <p className={style.form__error}>{error.password}</p>
          <input
            type='password'
            name='confirm_password'
            className={style.form__password}
            placeholder='Confirm Password'
            onChange={handleChange}
            required
          />
          <p className={style.form__error}>{error.confirm_password}</p>
          <input
            type='email'
            name='email'
            className={style.form__email}
            placeholder='Email'
            onChange={handleChange}
            required
          />
          <p className={style.form__error}>{error.email}</p>
          <p className={style.form__link}>
            Already have an account ? <Link to='/login'>Login</Link>
          </p>
          <button type='submit' name='submit' className={style.form__button}>
            Sign Up
          </button>
          <p className={style.form__error}>{error.signup}</p>
        </form>
      </div>
      <div className={style.custom_shape_divider_bottom_1696784648}>
        <svg data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'>
          <path
            className={style.shape_fill}
            d='M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z'
          ></path>
        </svg>
      </div>
    </div>
  )
}

export default SignUp
