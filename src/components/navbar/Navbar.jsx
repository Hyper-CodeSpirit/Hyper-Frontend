import React, { useEffect, useState } from 'react'

import './navbar.scss'
import { FaHistory, FaMoon, FaStar } from 'react-icons/fa'
import { RiSideBarFill } from 'react-icons/ri'
import { CiSearch } from 'react-icons/ci'
import { IoSunnySharp } from 'react-icons/io5'
import { HiMiniBell } from 'react-icons/hi2'
import Profile from "../../assets/images/profile.png"

const Navbar = () => {

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);

  }

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    localTheme && toggleTheme(localTheme);
  },[]);

  return (
    <div className='navbar-container'>
      <div className="navbar-leading">
        <RiSideBarFill />
        <FaStar />
      </div>
      <div className="navbar-trailing">
        <div className="search-box">
          <CiSearch />
          <input type="text" placeholder='Search' />
          <button>⌘/</button>
        </div>

        <div className="option-panel">

          {theme === 'light' ? <FaMoon onClick={() => toggleTheme('dark')} className='option-icon'></FaMoon > : <IoSunnySharp onClick={() => toggleTheme('light')} className='option-icon'/>}
        <FaHistory className='option-icon' />
        <HiMiniBell className='option-icon' />
        <RiSideBarFill className='option-icon' />
        </div>

        <div className="profile">
          <img src={Profile} alt="profile" />
        </div>
      </div>
    </div>
  )
}

export default Navbar