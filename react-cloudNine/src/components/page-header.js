import React from 'react';
import './page-header.css';

export default class PageHeader extends React.Component {
	render() {
		return(
			/*<section className="greeting-section iq-page-header">*/
			<section className={`greeting-section ${this.props.pic}`}>
                <h2 className="page-header">{this.props.text}</h2>
            </section>
		);
	}
}