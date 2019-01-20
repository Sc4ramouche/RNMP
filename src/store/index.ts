import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import {
	productsReducer as products,
	loginReducer as login,
	loadingReducer as isLoading,
	errorReducer as error,
} from '../reducers';

const rootReducer = combineReducers({ products, login, isLoading, error });

export const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(thunkMiddleware),
		(window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
	)
);
