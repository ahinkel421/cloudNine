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
      currentPost: 0
    }

  }

  componentDidMount(){
    var self = this;
    fetch(`http://localhost:8080/lounges/${this.props.match.params.loungeId}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(lounge) {
      let max = lounge.posts.length - 1;
      let random = Math.floor(Math.random() * max);
      if(random>0){
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
      //When posting from postman, anonymous works.
      //When posting from browser, name is in request body is technically blank.
      //If post.name === "" it equals "anonymous?" Or change on server?...
      body: JSON.stringify(post)
    })
    this.content.value=""
    this.name.value=""
  }

  randomPost() {
    let max = this.state.lounge.posts.length - 1;
    let random = Math.floor(Math.random() * max);
    this.setState({
      currentPost: random
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


    let post = this.state.lounge.posts[this.state.currentPost];

    return (
      <div>

        <section className="page-two">

          {/*Greeting section*/}
          <PageHeader pic="rak-page-header" text="Random Acts of Kindness" />

          {/*Main posts section*/}
          <section className="main-posts-section">
            <h2 className="lounge-page-description">Feel free to share a random act of kindness that you performed for someone, or that someone performed for you. Otherwise, browse other peoples&#39; stories below and enjoy your stay!</h2>
            <div className="user-post-section">
              <img className="arrow left-arrow" src="../images/arrow.png" />
              <img className="arrow right-arrow" src="../images/arrow-two.png" />
              <UserPost post={post.content} username={post.name}/>
              <button className="report-button">Report as innappropriate</button>
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
