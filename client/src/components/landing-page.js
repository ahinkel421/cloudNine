import React from 'react';
import './landing-page.css';


import LoungeBox from './lounge-box';
import PageHeader from './page-header';

export default class LandingPage extends React.Component {

  constructor(props){
    super(props)
    this.state = {lounges:[]}
  }

  componentDidUpdate() {
    window.scrollTo(0,0);
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

    let loungesArray = this.state.lounges.map((lounge, i) => {

      let boxPic;
      if (lounge.name === "Random Acts of Kindness") {
        boxPic = "/images/flower.jpg";
      }
      else if (lounge.name === "Inspirational Quotes") {
        boxPic = "/images/stars.jpg";
      }
      else if (lounge.name === "Personal Achievements") {
        boxPic = "/images/jumping.jpg";
      }
  
      return(
        <LoungeBox
          boxPic= {boxPic}
          key={i}
          loungeName={lounge.name}
          loungeDescription={lounge.description}
          loungeId={lounge.id}
        />
      );
      
    });

    return (
      <div>

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
