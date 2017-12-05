import React from 'react';
import './lounge-page.css';

import UserPost from './user-post';
import PageHeader from './page-header';
import Lounges from './lounges';

export default class LoungePage extends React.Component {
  //Need to keep track of which lounge user is in.
  //If user is in Personal Achievements, render personal achievements
  //Also, lounges at the bottom need to be the two OTHER lounges
  constructor(props){
    super(props);
    this.state = {
      currentPost:0,
      error:"",
      lounge: {
        posts:[
          {
            "name": 'Adam',
            "content": "this is my post"
          }
        ]
      }
    }
  }

  componentWillReceiveProps(newProps){
    let oldLoungeId = this.props.match.params.loungeId;
    let newLoungeId = newProps.match.params.loungeId;

    if (newLoungeId !==oldLoungeId){
      this.fetchLoungeInfo(newLoungeId)
    }
  }
  componentDidMount(){
    let loungeId = this.props.match.params.loungeId;
    this.fetchLoungeInfo(loungeId)
  }

  fetchLoungeInfo(loungeId){
    let self = this;
    fetch(`http://localhost:8080/lounges/${loungeId}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(lounge) {
      let max = lounge.posts.length - 1;
      let random = Math.floor(Math.random() * max);
      self.setState({
        lounge: lounge,
        currentPost: random>0? random: 0
      });
    });
  }
  createNewPost(e) {
    e.preventDefault();
    let content = this.content.value;

    if(!content){
      return this.setState({
        error:"Content is required"
      })
    }else{
      this.setState({
        error:""
      })
    }

    var post = {
      name: this.name.value || "Anonymous",
      content: content
    }
    let loungeId = this.props.match.params.loungeId;

    //POST request to API
    fetch(`http://localhost:8080/lounges/${loungeId}`, {
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
    let max = this.state.lounge.posts.length - 1;
    let random = Math.floor(Math.random() * max);
    this.setState({
      currentPost: random
    });
  }

  render() {
    let lounge = this.state.lounge;
    let post = lounge.posts[this.state.currentPost];

    return (
      <div>

      <section className="page-two">

      {/*Greeting section*/}
      <PageHeader image={lounge.picture} text={lounge.name} />

      {/*Main posts section*/}
      <section className="main-posts-section">
      <h2 className="lounge-page-description">{lounge.description}</h2>
      <div className="user-post-section">
      <img alt="left" className="arrow left-arrow" src="../images/arrow.png" onClick={e => this.randomPost()} />
      <img alt="right" className="arrow right-arrow" src="../images/arrow-two.png" onClick={e => this.randomPost()} />
      <UserPost post={post.content} username={post.name}/>
      <button className="report-button"><a href="mailto:cloudnine.reports@gmail.com" className='report-anchor'>Report as innappropriate</a></button>
      </div>
      <form className="user-input-form">
        <label className="form-label">Share your thoughts!</label>
        <textarea  ref={content => this.content = content} className="user-input-box" type="text" name="user-thoughts" placeholder="Write your thoughts here..."></textarea>
        <label className="form-label">Nickname:</label>
        <input className='name-input' ref={name => this.name = name} type="text" placeholder="Write your name here (optional)"></input>
        <p>{this.state.error}</p>
      <input type="submit" className="submit-button" onClick={e => this.createNewPost(e)}></input>
      </form>
      </section>

      <Lounges header="Lounges" history={this.props.history}  />

      </section>

      </div>
    );
  }
}
