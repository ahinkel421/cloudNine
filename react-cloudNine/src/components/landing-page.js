import React from 'react';
import './landing-page.css';
import Navbar from './navbar';
import Footer from './footer';
import LoungeBox from './lounge-box';
import PageHeader from './page-header';

export default class LandingPage extends React.Component {

    render() {
        return (
            <div>
                <Navbar />
                <section className="page-one">

                    {/*Greeting section*/}
                    <PageHeader pic="landing-page-header" text="Postitive mind. Positive life." />

                    {/*About section*/}
                    <section className="about">
                        <h2 className="about-header">The CloudNine Experience</h2>
                        <p className="about-description">CloudNine is a safe space where people can come together and share positive experiences, inspirational quotes, or anything that will boost the morale of others. If you’re visiting CloudNine and don’t feel like sharing, that’s ok too. Step into one of our lounges below and see what others have to say. Thanks for stopping by, enjoy your stay.</p>
                    </section>

                    {/*Lounges section*/}
                    <section className="lounges">
                        <h2 className="lounges-header">Lounges</h2>
                        <LoungeBox 
                            boxPic='rak-pic' 
                            loungeName="Random Acts of Kindness" 
                            loungeDescription="Share a R.A.K. that you performed or that someone performed for you" 
                        />
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

