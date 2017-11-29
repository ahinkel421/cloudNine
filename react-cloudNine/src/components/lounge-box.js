import React from 'react';
import './lounge-box.css';


export default class LoungeBox extends React.Component {
	render() {
		return(
			<div className="lounge-box">
    			<div className={`lounge-pic ${this.props.boxPic}`}>
    				<h3 className="lounge-pic-header">{this.props.loungeName}</h3>
    			</div>
    			<p className="lounge-description">
    				{this.props.loungeDescription}
    			</p>
			</div>
		);
	}
}
