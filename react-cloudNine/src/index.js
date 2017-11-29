import './reset.css';
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import LandingPage from './components/landing-page';
import Lounge from './components/lounge';

ReactDOM.render(
    <Lounge />,
    document.getElementById('root')
);

//Components:

//Navbar +
//Footer +
//UserInput (with nickname as a prop) +
//LoungeBox