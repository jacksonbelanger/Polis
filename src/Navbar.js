import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <h1 className="navbar-title">Polis</h1>
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