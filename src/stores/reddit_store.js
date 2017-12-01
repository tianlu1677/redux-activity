import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

import rootReducer from '../reducers/reddit_reducers';

// 记录action的日志行为
const loggerMiddleware = createLogger()


const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

// 自定义 middleware
const customLoggerMiddleware = store => next => action => {
	console.group(action.type)
	console.info('dispatching', action)
	let result = next(action)
	console.log('next state', store.getState())
	console.groupEnd(action.type)

}

export default function configureStore(preloadedState) {
	console.log('preloadedState', preloadedState)
	return createStore(
		rootReducer,
		preloadedState,
		composeEnhancers(
			applyMiddleware(thunkMiddleware, loggerMiddleware, customLoggerMiddleware)	
		)
	)
}

