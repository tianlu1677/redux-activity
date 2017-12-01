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

export function invalidateSubreddit(subreddit) {
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

// 应该更新
export function shouldFetchPosts(state, subreddit) {
	const posts = state.postsBySubreddit[subreddit]
	if(!posts){
		return true;		
	} else if(posts.isFetching){
		return false;
	}else{
		return posts.didInvalidate
	}
}

// 调用该方法时，先是判断是不是需要更新数据，如果不需要的话，则结束这个Promise
// 如果需要的话，则dispatch到另外一个action 创建函数 fetchPosts, 而fetchPosts也
// 没有type 说明他不是一个走到reducers中，这里做了两个dispatch, dispatch(requestPosts(subreddit))
// 请求得到数据，然后再将得到的数据dispatch(recivePosts(subreddit,json)) 中，这个时候才会真正的返回state
// 数据。
export function fetchPostsIfNeed(subreddit) {
	return(dispatch, getState) => {
		if(shouldFetchPosts(getState(), subreddit)){
			// 在 thunk 里 dispatch 另一个 thunk！
			return dispatch(fetchPosts(subreddit))
		} else{
			return Promise.resolve()
		}
	}
}


