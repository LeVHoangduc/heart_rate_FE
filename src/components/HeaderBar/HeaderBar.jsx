import React from 'react'
import style from './HeaderBar.module.css'
import { Link } from 'react-router-dom'
import useUserContext from '../../hooks/useUserContext'
const HeaderBar = () => {
    const user = useUserContext();
    const username = user ? user.username : null;
    function logout() {
        localStorage.removeItem('user');
    }
    return (
        <div className={style.header}>
            <Link to='/'>
                {username ? <ion-icon name="person-circle-outline"></ion-icon> : <ion-icon name="arrow-back-outline"></ion-icon>}
            </Link>
            <h3>{username ? 'Hello, ' + username : 'Blood Pressure'}</h3>
            {username ?
                <Link onClick={logout} to='/' className={style.logout}>
                    <ion-icon name="log-out-outline"></ion-icon>
                </Link> : null}
        </div>
    )
}
export default HeaderBar
