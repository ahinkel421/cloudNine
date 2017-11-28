import React from 'react';
import './landing-page.css';
import Navbar from './navbar';

export default class LandingPage extends React.Component {

    render() {
        return (
            <div>
                <Navbar />
                <section className="page-one">
                    {/*Greeting section*/}
                    <section className="greeting-section landing-page-greeting-section">
                        <h2 className="page-header">Positive mind.</h2><h2 className="page-header">Positive life.</h2>
                    </section>
                    {/*About section*/}
                    <section className="about">
                        <h2 className="about-header">The CloudNine Experience</h2>
                        <p className="about-description">CloudNine is a safe space where people can come together and share positive experiences, inspirational quotes, or anything that will boost the morale of others. If you’re visiting CloudNine and don’t feel like sharing, that’s ok too. Step into one of our lounges below and see what others have to say. Thanks for stopping by, enjoy your stay.</p>
                    </section>
                    {/*Lounges section*/}
                    <section className="lounges">
                        <h2 className="lounges-header">Lounges</h2>
                        <div className="lounge-box rak-box">
                            <div className="rak-pic lounge-pic">
                                <h3 className="lounge-pic-header">Random Acts of Kindness</h3>
                            </div>
                            <p className="lounge-description">Share a R.A.K. that you performed or that someone performed for you</p>
                        </div>

                        <div className="lounge-box pa-box">
                            <div className="pa-pic lounge-pic">
                                <h3 className="lounge-pic-header">Personal Achievements</h3>
                            </div>
                            <p className="lounge-description">Share a personal goal that you recently achieved </p>
                        </div>

                        <div className="lounge-box iq-box">
                            <div className="iq-pic lounge-pic">
                                <h3 className="lounge-pic-header">Inspirational Quotes</h3>
                            </div>
                            <p className="lounge-description">Share your favorite inspirational quote(s)</p>
                        </div>
                    </section>
                </section>
                
                <footer className="footer">
                    <span className="credit">Created by Adam Hinkel</span>
                </footer>
            </div>
        );
    }
}

