import React from 'react';
import './navbar.css';

export default class Navbar extends React.Component {
	render() {
        return (
            <div>
                <nav className="navbar">
                    <h1 className="navbar-header">CloudNine</h1>
                </nav>
            </div>
        );
    }
}