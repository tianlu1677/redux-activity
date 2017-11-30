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
import todoApp from './reducers/reducers'
import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
let store = createStore(todoApp, composeEnhancers(
  
))


let rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)

registerServiceWorker();
