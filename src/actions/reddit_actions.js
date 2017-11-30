import axios from 'axios';
// 选择某个帖子
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

// 帖子是否过期
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export function invalidatesubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

// 发起请求
export const REQUEST_POSTS = 'REQUEST_POSTS'

export function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

// 请求返回结构
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

// thunk funtion
export function fetchPosts(subreddit) {
	return function (dispatch) {
		dispatch(requestPosts(subreddit))

		console.log('fetch post ')
    return axios.get(`http://www.subreddit.com/r/${subreddit}.json`)
    	.then(response => response.data)
    	.then(json => dispatch(receivePosts(subreddit, json)))

	}
}
