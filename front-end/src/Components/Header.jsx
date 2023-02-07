import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ user, setUser }) => {
    return (
        <nav className="navbar static-top navbar-expand-sm navbar-custom align-items-center">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item active mx-3"><span><Link className="btn btn-large btn-header btn-block" to="/">Home</Link></span></li>
            </ul>
            <ul className="navbar-nav mx-auto">
                <h1 className='nav-item active'>Chitter</h1>
            </ul>
            <ul className="navbar-nav me-auto">

                {Object.keys(user).length !== 0
                    ?
                    <>
                        <li className="nav-item active mx-3"><button id="loggedIn" className='btn btn-large btn-block btn-header'>Logged in as {user.username}</button></li>
                        <li className="nav-item active mx-3"><button onClick={() => setUser({})} className="btn btn-large btn-header btn-block" ><span>Log out</span></button></li>
                    </>
                    :
                    <>
                        <li className="nav-item active mx-3"><span><Link className="btn btn-large btn-block btn-header" to="/register">Register</Link></span></li>
                        <li className="nav-item active mx-3"><span><Link className="btn btn-large btn-header btn-block" to="/login">Login</Link></span></li>
                    </>
                }
            </ul>
        </nav>
    )
}

export default Header