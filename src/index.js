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
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { Provider } from 'react-redux'
import App from './containers/App'
import todoApp from './reducers/todo_reducers'
import Reddit from './containers/Reddit';
import configureStore from './stores/reddit_store';
import registerServiceWorker from './registerServiceWorker';


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
const reddit_store = configureStore()
console.log('reddit_store', reddit_store)
ReactDOM.render(
	<Provider store={reddit_store}>
		<Reddit />
	</Provider>, document.getElementById('reddit')
	)
registerServiceWorker();
