import React from 'react';

import LandingPage from './landing-page';
import Lounge from './lounge';

export default class App extends React.Component {
	//Create state that keeps track of what page user is on.
	//Initial state = landingPage: true
	//If landing page is true, display landing page, else display lounge

	constructor(props){
    	super(props);
    	this.state = {
    		landingPage: false
    	}
    	this.handleNavClick = this.handleNavClick.bind(this);
  	}

  	handleNavClick(e) {
  		this.setState(
  			{landingPage: true}
  		);
  	}

    render() {
    	if (this.state.landingPage === true) {
    		return (
				<div>
					<LandingPage />
		  		</div>
			);
    	}
    	else {
    		return (
    			<div>
					<Lounge onClick={e => this.handleNavClick(e)}/>
		  		</div>
    		);
    	}
    }
}
