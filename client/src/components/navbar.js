import React from 'react';
import './navbar.css';

export default function Navbar(props) {
    return (
        <div>
            <nav className="navbar">
                <h1 className="navbar-header" onClick={props.onClick}>CloudNine</h1>
            </nav>
        </div>
    );
}