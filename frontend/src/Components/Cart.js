import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import { AuthContext } from '../Context/AuthContext' // Import Context để kiểm tra đăng nhập

import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';

function Header() {

    const [menutoggle, setMenutoggle] = useState(false)
    
    // Lấy thông tin user từ Context
    const { user } = useContext(AuthContext)

    const Toggle = () => {
        setMenutoggle(!menutoggle)
    }

    const closeMenu = () => {
        setMenutoggle(false)
    }

    return (
        <div className="header">
            <div className="logo-nav">
                <Link to='/'>
                    <a href="#home">LIBRARY</a>
                </Link>
            </div>
            <div className='nav-right'>
                <input className='search-input' type='text' placeholder='Search a Book'/>
                <ul className={menutoggle ? "nav-options active" : "nav-options"}>
                    <li className="option" onClick={() => { closeMenu() }}>
                        <Link to='/'>
                            <a href="#home">Home</a>
                        </Link>
                    </li>
                    <li className="option" onClick={() => { closeMenu() }}>
                        <Link to='/books'>
                            <a href="#books">Books</a>
                        </Link>
                    </li>

                    {/* Logic kiểm tra: Đã đăng nhập thì hiện Dashboard, chưa thì hiện SignIn */}
                    {user ? (
                        <li className="option" onClick={() => { closeMenu() }}>
                            <Link to={user.roles?.includes('admin') ? '/dashboard@admin' : '/dashboard@member'}>
                                <a href="#dashboard">Dashboard</a>
                            </Link>
                        </li>
                    ) : (
                        <li className="option" onClick={() => { closeMenu() }}>
                            <Link to='/signin'>
                                <a href='signin'>SignIn</a>
                            </Link>
                        </li>
                    )}
                    
                </ul>
            </div>

            <div className="mobile-menu" onClick={() => { Toggle() }}>
                {menutoggle ? (
                    <ClearIcon className="menu-icon" style={{ fontSize: 40 }} />
                ) : (
                    <MenuIcon className="menu-icon" style={{ fontSize: 40 }} />
                )}
            </div>
        </div>
    )
}

export default Header