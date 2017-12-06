import React from 'react';
import './lounge-page.css';

import UserPost from './user-post';
import PageHeader from './page-header';
import Lounges from './lounges';

export default class LoungePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentPost:0,
      success:"",
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

    if (newLoungeId !== oldLoungeId){
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

    if (!content) {
      return this.setState({
        error:"*Share your thoughts before clicking submit!",
        success: ""
      })
    }

    else {
      this.setState({
        error:"",
        success: "Your thoughts have been shared! Refresh the page and browse a bit to find your post."
      })
    }

    let post = {
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
    let max = this.state.lounge.posts.length;
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
        {/*Lounge page*/}
        <section>

          {/*Greeting section*/}
          <PageHeader image={lounge.picture} text={lounge.name} />
          {/* End greeting section*/}

          {/*Main posts section*/}
          <section className="main-posts-section">
            <h2 className="lounge-page-description">{lounge.description}</h2>
            <div className="user-post-section">
              <img alt="left" className="arrow left-arrow" src="../images/arrow.png" onClick={e => this.randomPost()} />
              <img alt="right" className="arrow right-arrow" src="../images/arrow-two.png" onClick={e => this.randomPost()} />
              <UserPost post={post.content}  username={post.name}/>
              <button className="report-button"><a href="mailto:cloudnine.reports@gmail.com" className='report-anchor'>Report as innappropriate</a></button>
            </div>
            <form className="user-input-form">
              <label className="form-label">Share your thoughts!</label>
              <textarea  ref={content => this.content = content} className="user-input-box" type="text" name="user-thoughts" placeholder="Write your thoughts here..."></textarea>
              <label className="form-label">Name:</label>
              <input className='name-input' ref={name => this.name = name} type="text" placeholder="Write your name here (optional)"></input>
              <input type="submit" className="submit-button" onClick={e => this.createNewPost(e)}></input>
              <p className="error-message">{this.state.error}</p>
              <p className="success-message">{this.state.success}</p>
            </form>
          </section>
          {/*End main posts section*/}

          {/*Lounges section*/}
          <Lounges header="Lounges" history={this.props.history}  />
          {/*End lounges section*/}

        </section>
      {/*End lounge page*/}
      </div>
    );
  }
}
