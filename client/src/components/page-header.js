import React from 'react';
import './page-header.css';

export default class PageHeader extends React.Component {
	render() {
		let bgImage=this.props.image
		let style = {};
		if (bgImage){
			style.backgroundImage = `url('${bgImage}')`
		}
		
		return (
			<section className={`greeting-section page-header-img`} style={style}>
                <h2 className="page-header">{this.props.text}</h2>
        	</section>
		);
	}
}
