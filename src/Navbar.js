import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <Link to="/">Map</Link>
            <Link to="/popdowns">Popdowns Page</Link>
        </nav>
    );
}

export default Navbar;
