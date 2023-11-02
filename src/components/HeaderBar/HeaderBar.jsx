import React from 'react'
import style from './HeaderBar.module.css'
import { Link } from 'react-router-dom'
const HeaderBar = () => {
    return (
        <div className={style.header}>
            <Link to='/'><ion-icon name="home-outline"></ion-icon></Link>
            <h3>Blood Pressure</h3>
        </div>
    )
}
export default HeaderBar
