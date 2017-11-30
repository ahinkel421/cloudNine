import React from 'react';
import './page-header.css';

export default function PageHeader(props) {
		return(
			/*<section className="greeting-section iq-page-header">*/
			<section className={`greeting-section ${props.pic}`}>
                <h2 className="page-header">{props.text}</h2>
            </section>
		);
}