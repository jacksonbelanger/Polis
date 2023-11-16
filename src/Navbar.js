import React from 'react';
import './Navbar.css';
import logo from './polis_logo.png';
import logo_name from './polis_logo_name.png';


function Navbar() {
  return (
    <div className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Polis Logo" className="navbar-logo" />
        <img src={logo_name} alt="Polis Logo Name" className="navbar-logo-name" />
    </div>
      <ul className="navbar-menu">
        <li><a href="/about">About Us</a></li>
        <li><a href="/officials">Political Officials</a></li>
        <li><a href="/news">Latest News</a></li>
        <li><a href="/elections">Upcoming Elections</a></li>
        <li><a href="mailto:contact@polis.com?subject=Hello&body=Message%20Body" class="contact-button">Contact</a></li>
        {/* Add more menu items as needed */}
      </ul>
    </div>
  );
}

export default Navbar;