/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate()

    const [isLoggedIn,setIsLoggedIn] = useState()

    const handleLogout = () => {
        localStorage.removeItem('userDetail')
        setIsLoggedIn(true)
        navigate('/')
    }

    useEffect(()=>{
        const userExist = localStorage.getItem('userDetail')
        if (userExist == null || isLoggedIn) {
            navigate('/')
        }
    },[isLoggedIn])

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">TimeLine</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/event">Event</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={handleLogout}>Logout</Link>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Navbar