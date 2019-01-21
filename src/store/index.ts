import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import {
	productsReducer as products,
	loginReducer as login,
	loadingReducer as isLoading,
	errorReducer as error,
} from '../reducers';

const rootReducer = combineReducers({ products, login, isLoading, error });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
