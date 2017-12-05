import React from 'react';
import './navbar.css';
import LoungeBox from './lounge-box';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

export default class Lounges extends React.Component {

  constructor(props){
    super(props)
    this.state = {lounges:[]}
  }

  componentDidMount(){
    var self = this;

    fetch('http://localhost:8080/lounges').then(function(response) {
      return response.json();
    })
    .then(function(data) {
      self.setState({
        lounges:data.lounges
      })
    });
  }

  render(){
    let loungesArray = this.state.lounges.map((lounge, i) => {

      let boxPic = "/images/flower.jpg";

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
      <section className="lounges">
        <h2 className="lounges-header">{this.props.header}</h2>
        {loungesArray}
      </section>
    );
  }
}
