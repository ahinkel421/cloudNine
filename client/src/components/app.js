import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import LandingPage from './landing-page';
import Lounge from './lounge';
import Navbar from './navbar'
import Footer from './footer';



export default class App extends React.Component {
	//Create state that keeps track of what page user is on.
	//Initial state = landingPage: true
	//If landing page is true, display landing page, else display lounge

	constructor(props){
		super(props);
	}



	render() {
		return(
		<Router>
			<div className="app">
				<Navbar onClick={this.props.onClick} />
				<main>
					<Route exact path="/" component={LandingPage} />
					<Route exact path="/lounge/:loungeId" component={Lounge} />
				</main>
				<Footer />
			</div>
		</Router>
	)
	}
}
