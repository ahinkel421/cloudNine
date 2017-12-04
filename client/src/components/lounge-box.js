import React from 'react';
import './lounge-box.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// TODO: do stuff with picURL

export default function LoungeBox(props) {
	
	let loungeBoxStyle = {
		backgroundImage: `url(${props.boxPic})`
	}	

	return(
		<div className="lounge-box">
			<Link style={{ textDecoration: 'none' }} to={`/lounge/${props.loungeId}`}>
    			<div className="lounge-pic" style={loungeBoxStyle}>
    				<h3 className="lounge-pic-header">{props.loungeName}</h3>
    			</div>
    			<p className="lounge-description">
    				{props.loungeDescription}
    			</p>
			</Link>
		</div>
	);
}