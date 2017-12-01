import {  combineReducers} from "redux";
import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from '../actions/reddit_actions';

function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}

const initState = {
	isFetching: false,
	didInvalidate: false,
	items: []	
}
function posts(state = initState, action) {
	switch (action.type) {
		case INVALIDATE_SUBREDDIT:
			return { ...state, didInvalidate: true }
		case REQUEST_POSTS:
			return { ...state, isFetching: true, didInvalidate: false }
		case RECEIVE_POSTS:
			return { ...state, isFetching: false, didInvalidate: false, items: action.posts, lastUpdated: action.receicedAt}
		default:
			return state
	}
}

function postsBySubreddit(state = {}, action) {
	switch(action.type){
		case INVALIDATE_SUBREDDIT:
		case REQUEST_POSTS:
		case  RECEIVE_POSTS:
			return Object.assign({}, state, {[action.subreddit]: posts(state[action.subreddit], action)})
		default:
			return state	
	}
}

function test(state="hello", action) {
  return "hello"
}
const rootReducer = combineReducers({
	postsBySubreddit,
	selectedSubreddit,
  test
})

export default rootReducer;





// 下面是state 结构
export const state = {
  selectedsubreddit: 'frontend',
  postsBySubreddit: {
    frontend: {
      isFetching: true,
      didInvalidate: false,
      items: []
    },
    reactjs: {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: 1439478405547,
      items: [
        {
          id: 42,
          title: 'Confusion about Flux and Relay'
        },
        {
          id: 500,
          title: 'Creating a Simple Application Using React JS and Flux Architecture'
        }
      ]
    }
  }
}