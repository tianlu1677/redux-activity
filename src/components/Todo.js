import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class Todo extends Component {
  render() {
    return (
    	<div>
	    	<li
	        onClick={this.props.onClick}
	        style={{
	          textDecoration: this.props.completed ? 'line-through' : 'none',
	          cursor: this.props.completed ? 'default' : 'pointer'
	        }}>
	        <b>{this.props.id}</b>

	        {this.props.text} | {this.props.createdAt}	        
	      </li>
    		<button onClick={this.props.onRemoveClick}>X</button>
    	</div>
      
    )
  }
}

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired,
  onRemoveClick: PropTypes.func.isRequired
}