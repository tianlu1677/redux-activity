import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  selectSubreddit,  
  fetchPostsIfNeed,
  invalidateSubreddit
} from '../actions/reddit_actions';

import Picker from '../components/reddits/Picker';
import Posts from '../components/reddits/Posts';

function mapStateToProps(state) {
  console.log('state value', state)
  const { selectedSubreddit, postsBySubreddit } = state; // state 中的值从reducers中来的
  const {
    isFetching,
    lastUpdated,
    items: posts 
  } = postsBySubreddit[selectedSubreddit] || {isFetching: true, items: []}
  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  };
}

export class Reddit extends React.Component {
  static propTypes = {
    selectedSubreddit:  PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props
    dispatch(fetchPostsIfNeed(selectedSubreddit))
  }

  componentWillReceiveProps(nextProps) {
    // 这里还能得到下一次的props？
    if(nextProps.selectedSubreddit !== this.props.selectedSubreddit){
      const { dispatch, selectedSubreddit} = nextProps
      dispatch(fetchPostsIfNeed(selectedSubreddit))
    }
  }

  handleChange(nextSubreddit) {
    this.props.dispatch(selectSubreddit(nextSubreddit))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedSubreddit } = this.props
    dispatch(invalidateSubreddit(selectedSubreddit))
    dispatch(fetchPostsIfNeed(selectedSubreddit))
  }


  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props
    
    return (
      <div>
        <Picker value={selectedSubreddit} onChange={this.handleChange} options={['reactjs', 'frontend']}/>

        <p>
          {
            lastUpdated && 
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }      
          {
            !isFetching &&
            <a href="" onClick={this.handleRefreshClick}>Rrfresh</a>
          }          
        </p>
        { isFetching &&　posts.length ===  0 && <h2>Loading</h2> }
        { !isFetching &&　posts.length ===  0 && <h2>Empty</h2> }
        { posts.length > 0 && 
          <div style={{opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts}/>    
          </div>
        }
        

      </div>
    );
  }
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(Reddit)
