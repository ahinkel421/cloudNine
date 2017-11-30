import React from 'react';

import LandingPage from './landing-page';
import Lounge from './lounge';

export default function App(props) {
	//Create state that keeps track of what page user is on.
	//Initial state = landingPage: true
	//If landing page is true, display landing page, else display lounge
	return (
		<div>
			<Lounge />
		</div>
	);
}