import React from 'react';
import { Link } from 'react-router-dom';
import LightDarkToggle from '../LightDark/LightDarkToggle';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className="header">
            <div className="header-nav">
                <h1 className="navbar-title">bookmode</h1>
            </div>
            <div className="header-nav">
                <Link to="/" className="link">Home</Link>
                <br />
                <Link to="/profile" className="link">Profile</Link>
                <br />
                <Link to="/library" className="link">Library</Link>
                <br />
                <Link to="/groups" className="link">Groups</Link>
                <Link to="/results" className="link">Results</Link>
                <LightDarkToggle />
            </div>
        </div>
    )
};

export default Navbar;