import React from 'react';
import './lounge.css';

import UserPost from './user-post';
import LoungeBox from './lounge-box';
import PageHeader from './page-header';


export default class Lounge extends React.Component {
  //Need to keep track of which lounge user is in.
  //If user is in Personal Achievements, render personal achievements
  //Also, lounges at the bottom need to be the two OTHER lounges
  constructor(props){
    super(props);
    this.state = {
      lounges:[],
      currentPost:0,
      lounge: {
        posts:[
          {
            "name": 'Adam',
            "content": "this is my post"
          }
        ]
      },
    }
  }

  componentDidUpdate() {
    window.scrollTo(0,0);
  }

  componentDidMount(){
    let self = this;
    fetch(`http://localhost:8080/lounges/${this.props.match.params.loungeId}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(lounge) {
      let max = lounge.posts.length - 1;
      let random = Math.floor(Math.random() * max);
      if (random>0) {
        self.setState({
          lounge: lounge,
          currentPost: random
        })
      }
    });

    fetch('http://localhost:8080/lounges').then(function(response) {
      return response.json();
    })
    .then(function(data) {
      self.setState({
        lounges:data.lounges
      })
    });

  }

  //TODO: Make arrows call random post (onClick call function)

  createNewPost(e) {
    e.preventDefault();

    var post = {
      name: this.name.value || "Anonymous",
      content: this.content.value
    }

    //POST request to API
    fetch(`http://localhost:8080/lounges/${this.props.match.params.loungeId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post)
    })

    this.content.value=""
    this.name.value=""
  }

  randomPost() {
    console.log(this.state.lounge.posts.length);
    let max = this.state.lounge.posts.length - 1;
    let random = Math.floor(Math.random() * max);
    this.setState({
      currentPost: random
    });
  }

  render() {

    //Handling lounge-box pics

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

    //Handling lounge-header pics

    let currentLoungeId = this.props.match.params.loungeId;
    let currentHeaderPic, currentHeaderText, currentPageDescription;

    if (currentLoungeId === "5a256aa083c9461868806486") {
      currentHeaderPic = "rak-page-header";
      currentHeaderText = "Random Acts of Kindness";
      currentPageDescription = 'Share a random act of kindness that you performed for someone, or that someone performed for you. Otherwise, browse other peoples\' stories below! If you see any inappropriate content posted, please click the "Report as innappropriate" button and we will be sure to review and remove it if necessary. Thanks, enjoy your stay!';
    }
    else if (currentLoungeId === "5a256aca83c9461868806487") {
      currentHeaderPic = "iq-page-header ";
      currentHeaderText = "Inspirational Quotes";
      currentPageDescription = 'Share your favorite inspirational quote(s), or browse through some quotes that other people have shared! If you see any inappropriate content posted, please click the "Report as innappropriate" button and we will be sure to review and remove it if necessary. Thanks, enjoy your stay!'
    }
    else if (currentLoungeId === "5a204645aa7ac461feffba81") {
      currentHeaderPic = "pa-page-header ";
      currentHeaderText = "Personal Achievements"
      currentPageDescription = 'Share a personal achievement that you\'ve recently accomplished! Otherwise, browse for a bit and check out others have achieved recently. If you see any inappropriate content posted, please click the "Report as innappropriate" button and we will be sure to review and remove it if necessary. Thanks, enjoy your stay!';
    }

    let post = this.state.lounge.posts[this.state.currentPost];

    return (
      <div>

        <section className="page-two">

          {/*Greeting section*/}
          <PageHeader pic={currentHeaderPic} text={currentHeaderText} />

          {/*Main posts section*/}
          <section className="main-posts-section">
            <h2 className="lounge-page-description">{currentPageDescription}</h2>
            <div className="user-post-section">
              <img className="arrow left-arrow" src="../images/arrow.png" onClick={e => this.randomPost()} />
              <img className="arrow right-arrow" src="../images/arrow-two.png" onClick={e => this.randomPost()} />
              <UserPost post={post.content} username={post.name}/>
              <button className="report-button"><a href="mailto:cloudnine.reports@gmail.com" className='report-anchor'>Report as innappropriate</a></button>
            </div>
            <form className="user-input-form">
              <label className="form-label">Share your thoughts!</label>
              <textarea ref={content => this.content = content} className="user-input-box" type="text" name="user-thoughts" placeholder="Write your thoughts here..."></textarea>
              <label className="form-label">Nickname:</label>
              <input className='name-input' ref={name => this.name = name} type="text" placeholder="Write your name here (optional)"></input>
            <button className="submit-button" onClick={e => this.createNewPost(e)}>Submit</button>
            </form>
          </section>
          {/*Other-lounges-section*/}
          <section className="lounges">
            <h2 className="lounges-header">Other Lounges</h2>
        {loungesArray}
          </section>
        </section>

      </div>
    );
  }
}
