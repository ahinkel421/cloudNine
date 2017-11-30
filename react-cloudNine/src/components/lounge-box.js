import React from 'react';
import './lounge-box.css';


export default function LoungeBox(props) {
		return(
			<div className="lounge-box">
    			<div className={`lounge-pic ${props.boxPic}`}>
    				<h3 className="lounge-pic-header">{props.loungeName}</h3>
    			</div>
    			<p className="lounge-description">
    				{props.loungeDescription}
    			</p>
			</div>
		);
}
