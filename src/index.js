// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

import { Provider } from 'react-redux'
import App from './containers/App'
import todoApp from './reducers/todo_reducers'
import rootReducer from './reducers/reddit_reducers';
import Reddit from './containers/Reddit';
import registerServiceWorker from './registerServiceWorker';

// 记录action的日志行为
const loggerMiddleware = createLogger()


const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

// todo
let store = createStore(todoApp, composeEnhancers(
  
))

let rootElement = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)

// reddit

let reddit_store = createStore(rootReducer, 
	composeEnhancers(), 
	applyMiddleware(thunkMiddleware, loggerMiddleware) 
)

ReactDOM.render(
	<Provider store={reddit_store}>
		<Reddit />
	</Provider>, document.getElementById('reddit')
	)
registerServiceWorker();
