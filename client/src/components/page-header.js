import React from 'react';
import './page-header.css';

export default class PageHeader extends React.Component {
	render() {

		let style = {
			backgroundImage: `url('${this.props.image}')`
		}
		return(
			<section className={`greeting-section page-header-img`} style={style}>
                <h2 className="page-header">{this.props.text}</h2>
        </section>
		);
	}
}

//
// "/images/flower.jpg"
// "/images/stars.jpg"
// "/images/jumping.jpg"
