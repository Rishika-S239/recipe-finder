import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';
import log from '../assets/log.png';
const Navbar = () => {
  return (
    <>
    <nav>
        <div>
            <img src={log} alt='logo' className=''/>
            <span className=" text-lg">Recipe Finder</span>
        </div>
        <ul>
        <li><Link to="/">Home</Link></li>
        {/* <li >Favourites</li>
        <li>Login</li> */}
    </ul>
    </nav>
    </>
  )
}

export default Navbar