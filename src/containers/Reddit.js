import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  selectSubreddit, 
  fetchPosts
} from '../actions/reddit_actions'

function mapStateToProps(state) {
  return {

  };
}

export class Reddit extends React.Component {
  static propTypes = {
    
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { dispatch } = this.props
    dispatch(selectSubreddit('reactjs'))
    dispatch(fetchPosts('reactjs')).then(() =>
      console.log('ok')
    )
    return (

      <div>Reddit</div>
    );
  }
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(Reddit)
