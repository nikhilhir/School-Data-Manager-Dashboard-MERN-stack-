import React from 'react'
import { Link } from 'react-router-dom';
import "./navbar.css"

const Navbar = () => {
  return (
    <nav>
      <input type="checkbox" id="check" />

      <label>
        <i className="fas fa-bars" id="btn"></i>
        <i className="fas fa-times" id="cancle"></i>
      </label>
      <img src="https://www.masaischool.com/img/navbar/logo.svg" alt="" />
    <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/">Signup</Link></li>
    </ul>

    </nav>
  );
}

export default Navbar