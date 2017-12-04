import React from 'react';
import './navbar.css';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

export default function Navbar(props) {
    return (
        <div>
            <nav className="navbar">
            <Link style={{ textDecoration: 'none' }} to={`/`}>
                <h1 className="navbar-header" onClick={props.onClick}>CloudNine</h1>
            </Link>
            </nav>
        </div>
    );
}