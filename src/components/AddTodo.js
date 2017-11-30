import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class AddTodo extends Component {
  static defaultProps = {
    onClick: PropTypes.func.isRequired
  }
  render() {
    return (
      <div>
        <input type='text' ref='input' onKeyUp={(e) => this.handleKeyup(e) }/>
        <button onClick={(e) => this.handleClick(e)}>
          Add
        </button>
      </div>
    )
  }

  handleClick(e) {
    const node = this.refs.input
    const text = node.value.trim() 
    const createdAt = (new Date()).toString()
    this.props.onAddClick(text, createdAt) // 向父组件传递dispatch
    node.value = ''
  }

  handleKeyup(e) {
   if (e.keyCode === 13) {
      this.handleClick(e)
   }
 }
}

// AddTodo.propTypes = {
//   onAddClick: PropTypes.func.isRequired
// }