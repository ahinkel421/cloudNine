import React from 'react';
import './lounge.css';
import Navbar from './navbar'
import Footer from './footer';
import UserPost from './user-post';


export default class Lounge extends React.Component {

    render() {
        return (
            <div>
                <Navbar />
                <section className="page-two">
                    {/*Greeting section*/}
                    <section className="greeting-section lounge-page-header">
                        <h2 className="page-header">Random Acts of Kindness</h2>
                    </section>
                    {/*Main posts section*/}
                    <section className="main-posts-section">
                        <h2 className="lounge-page-description">Feel free to share a random act of kindness that you performed for someone, or that someone performed for you. Otherwise, browse other peoples' stories below and enjoy your stay!</h2>
                        <div className="user-post-section">
                            <img className="arrow left-arrow" src="../images/arrow.png" />
                            <img className="arrow right-arrow" src="../images/arrow-two.png" />
                            <UserPost post="I helped a senior citizen across the street. It felt great to help out!" username="Mike"/>
                            <button className="report-button">Report as innappropriate</button>
                        </div>
                        <form className="user-input-form">
                            <label className="form-label">Share your thoughts!</label>
                            <textarea className="user-input-box" type="text" name="user-thoughts" placeholder="Write your thoughts here..."></textarea>
                            <button className="submit-button">Submit</button>
                        </form>
                    </section>
                    {/*Other-lounges-section*/}
                    <section className="lounges">
                        <h2 className="lounges-header">Other Lounges</h2>
                        <div className="lounge-box pa-box">
                            <div className="lounge-pic pa-pic">
                                <h3 className="lounge-pic-header">Personal Achievements</h3>
                            </div>
                            <p className="lounge-description">Share a personal goal that you recently achieved </p>
                        </div>
                        <div className="lounge-box iq-box">
                            <div className="lounge-pic iq-pic">
                                <h3 className="lounge-pic-header">Inspirational Quotes</h3>
                            </div>
                            <p className="lounge-description">Share your favorite inspirational quote(s)</p>
                        </div>
                    </section>
                </section>
                <Footer />
            </div>
        );
    }
}

