import React from 'react';
import './footer.css';

export default class Footer extends React.Component {
	render() {
        return (
            <div>
                <footer className="footer">
                    <span className="credit">Created by Adam Hinkel</span>
                </footer>
            </div>
        );
    }
}