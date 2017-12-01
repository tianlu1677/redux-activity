import React, { Component } from 'react';

export class Posts extends Component {
	render() {
		return (
			<ul>
				{this.props.posts.map((post, i) => 
					<li key={i}>
						{post.title}
					</li>
					)}
			</ul>
		);
	}
}
export default Posts;