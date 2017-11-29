import React from 'react';
import './page-header.css';

export default class PageHeader extends React.Component {
	render() {
		return(
			<section className="greeting-section rak-page-header">
                <h2 className="page-header">Random Acts of Kindness</h2>
            </section>
		);
	}
}