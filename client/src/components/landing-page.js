import React from 'react';
import './landing-page.css';
import Navbar from './navbar';
import Footer from './footer';
import LoungeBox from './lounge-box';
import PageHeader from './page-header';

export default class LandingPage extends React.Component {

  constructor(props){
    super(props)
    this.state = {lounges:[]}
  }

  componentDidMount(){
    var self = this

    fetch('http://localhost:8080/lounges').then(function(response) {
      return response.json();
    })
    .then(function(data) {
      self.setState({
        lounges:data.lounges
      })
    });
  }

  render() {

    let loungesArray = this.state.lounges.map((lounge, i) => (
      <LoungeBox
        boxPic='iq-pic'
        key={i}
        picURL={lounge.picture}
        loungeName={lounge.name}
        loungeDescription={lounge.description}
      />))

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


      {loungesArray}



      </section>
      </section>
      <Footer />
      </div>
    );
  }
}




/*
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
  */