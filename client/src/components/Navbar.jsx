import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <Link to="/">Go Home</Link>
            <br />
            <Link to="/profile">Go to profile</Link>
            <br />
            <Link to="/library">Library</Link>
            <br />
            <Link to="/groups">Groups</Link>
        </>
    )
};

export default Navbar;