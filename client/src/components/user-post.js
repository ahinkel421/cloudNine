import React from 'react';
import './user-post.css';

export default class UserPost extends React.Component {

	render() {
		return(
			<h3 className="post">
				"{this.props.post}" 
				<p className="username">-{this.props.username}</p>
			</h3>
		);
	}
}