import './reset.css';
import React from 'react';
import ReactDOM from 'react-dom';

import './reset.css';
import './index.css';

import LandingPage from './components/landing-page';
import Lounge from './components/lounge';

ReactDOM.render(
    <Lounge />,
    document.getElementById('root')
);

//Components:

//Navbar
//Footer
//GreetingSection (Top part with header and background image)
//UserInput (with nickname as a prop)
//LoungeBox