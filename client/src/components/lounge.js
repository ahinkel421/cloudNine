import React from 'react';
import './lounge.css';
import Navbar from './navbar'
import Footer from './footer';
import UserPost from './user-post';
import LoungeBox from './lounge-box';
import PageHeader from './page-header';

// TODO: broken.

export default class Lounge extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {lounge:{}}
    }

    componentDidMount(){
        let self = this;
        fetch('http://localhost:8080/lounges/5a204645aa7ac461feffba81')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            self.setState({
                lounge: data.lounge
            })
        });
    }


    render() {

        return (
            <div>
                <Navbar />
                <section className="page-two">

                    {/*Greeting section*/}
                    <PageHeader pic="rak-page-header" text="Random Acts of Kindness" />

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
                        <LoungeBox
                            boxPic='pa-pic'
                            loungeName="Personal Achievements"
                            loungeDescription="Share a personal goal that you recently achieved"
                        />
                        <LoungeBox
                            boxPic='iq-pic'
                            loungeName="Inspirational Quotes"
                            loungeDescription="Share your favorite inspirational quote(s)"
                        />
                    </section>
                </section>
                <Footer />
            </div>
        );
    }
}
