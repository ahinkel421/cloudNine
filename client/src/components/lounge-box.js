import React from 'react';
import './lounge-box.css';
import {Link} from 'react-router-dom';

// TODO: do stuff with picURL

export default function LoungeBox(props) {

	let loungeBoxStyle = {
		backgroundImage: `url(${props.boxPic})`
	}
	function visitLounge(){
		props.history.push(`/lounge/${props.loungeId}`);
		 window.scrollTo(0,0);
	}
	return(
		<div className="lounge-box" onClick={e=>{visitLounge()}}   >

    			<div className="lounge-pic" style={loungeBoxStyle}>
    				<h3 className="lounge-pic-header">{props.loungeName}</h3>
    			</div>
    			<p className="lounge-description">
    				{props.loungeDescription}
    			</p>
		</div>
	);
}
