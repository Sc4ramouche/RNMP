import { store } from '../../store';
import { cartAT } from './cartActionTypes';

const {
	CART_ID_REQUEST,
	CART_ID_SUCCESS,
	CART_ID_FAILURE,
	CART_ITEMS_REQUEST,
	CART_ITEMS_SUCCESS,
	CART_ITEMS_FAILURE,
} = cartAT;

function cartIdRequest(): Action {
	return {
		type: CART_ID_REQUEST,
		isLoading: true,
	};
}

function cartIdSuccess(cartId: string): Action {
	return {
		type: CART_ID_SUCCESS,
		isLoading: false,
		cartId,
	};
}

function cartIdFailure(err: Error): Action {
	return {
		type: CART_ID_FAILURE,
		isLoading: false,
		error: err,
	};
}

function cartItemsRequest(): Action {
	return {
		type: CART_ITEMS_REQUEST,
		isLoading: true,
	};
}

function cartItemsSuccess(items: any): Action {
	return {
		type: CART_ITEMS_SUCCESS,
		isLoading: false,
		items,
	};
}

function cartItemsFailure(err: Error): Action {
	return {
		type: CART_ITEMS_FAILURE,
		isLoading: false,
		error: err,
	};
}

export const getCartId = () => (dispatch: any) => {
	dispatch(cartIdRequest());
	fetch('http://ecsc00a02fb3.epam.com/rest/default/V1/carts/mine', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${store.getState().login.token}`,
		},
	})
		.then(res => res.json())
		.then(data => dispatch(cartIdSuccess(data)))
		.catch(err => dispatch(cartIdFailure(err)));
};

export const getCartItems = () => (dispatch: any) => {
	dispatch(cartItemsRequest());
	fetch('http://ecsc00a02fb3.epam.com/rest/default/V1/carts/mine/items', {
		headers: {
			Authorization: `Bearer ${store.getState().login.token}`,
			'Content-Type': 'application/json',
		},
	})
		.then(res => res.json())
		.then(data => dispatch(cartItemsSuccess(data)))
		.catch(err => dispatch(cartItemsFailure(err)));
};
