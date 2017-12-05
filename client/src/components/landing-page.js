import React from 'react';
import './landing-page.css';


import Lounges from './lounges';
import PageHeader from './page-header';

export default class LandingPage extends React.Component {

  componentDidUpdate() {
    window.scrollTo(0,0);
  }


  render() {

    return (
      <div>
        <PageHeader pic="landing-page-header" text="Postitive mind. Positive life." />

        {/*About section*/}
        <section className="about">
        <h2 className="about-header">The CloudNine Experience</h2>
        <p className="about-description">CloudNine is a safe space where people can come together and share positive experiences, inspirational quotes, or anything that will boost the morale of others. If you’re visiting CloudNine and don’t feel like sharing, that’s ok too. Step into one of our lounges below and see what others have to say. Thanks for stopping by, enjoy your stay.</p>
        </section>
        {/*End About section*/}

        <Lounges header="Lounges" />
      </div>
    );
  }
}
