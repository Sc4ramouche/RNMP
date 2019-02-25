import PushNotification from 'react-native-push-notification';

import {
	fetchProductsAT,
	fetchAdditionalProductsAT,
	addProductToCartAT,
	deleteProductFromCartAT,
} from './productsActionTypes';
import { NUMBER_OF_PRODUCTS } from '../../shared';
import { store } from '../../store';

const { FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS } = fetchProductsAT;
const {
	FETCH_ADDITIONAL_PRODUCTS_REQUEST,
	FETCH_ADDITIONAL_PRODUCTS_SUCCESS,
	FETCH_ADDITIONAL_PRODUCTS_FAILURE,
} = fetchAdditionalProductsAT;
const { ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAILURE } = addProductToCartAT;
const {
	DELETE_PRODUCT_REQUEST,
	DELETE_PRODUCT_SUCCESS,
	DELETE_PRODUCT_FAILURE,
} = deleteProductFromCartAT;

function requestProducts(): Action {
	return {
		type: FETCH_PRODUCTS_REQUEST,
		isLoading: true,
		isError: false,
	};
}

function successProducts(products: Array<ProductItem>, totalItems: number): Action {
	return {
		type: FETCH_PRODUCTS_SUCCESS,
		products,
		totalItems,
		isLoading: false,
	};
}

function successAdditionalProducts(products: Array<ProductItem>, totalItems: number): Action {
	return {
		type: FETCH_ADDITIONAL_PRODUCTS_SUCCESS,
		products,
		totalItems,
		isLoading: false,
	};
}

function failureProducts(err: Error): Action {
	return {
		type: FETCH_PRODUCTS_FAILURE,
		isLoading: false,
		error: err,
	};
}

function failureAdditionalProducts(err: Error): Action {
	return {
		type: FETCH_ADDITIONAL_PRODUCTS_FAILURE,
		isLoading: false,
		error: err,
	};
}

export const fetchProducts = () => (dispatch: any) => {
	dispatch(requestProducts());
	fetch(
		`http://ecsc00a02fb3.epam.com/rest/V1/products?searchCriteria[pageSize]=${NUMBER_OF_PRODUCTS}&searchCriteria[currentPage]=0`
	)
		.then(res => res.json())
		.then(data => {
			dispatch(successProducts(data.items, data.total_count));
		})
		.catch(err => dispatch(failureProducts(err)));
};

export const fetchAdditionalProducts = (offset: number) => (dispatch: any) => {
	dispatch(requestProducts);
	fetch(
		`http://ecsc00a02fb3.epam.com/rest/V1/products?searchCriteria[pageSize]=${NUMBER_OF_PRODUCTS}&searchCriteria[currentPage]=${offset}`
	)
		.then(res => res.json())
		.then(data => {
			dispatch(successAdditionalProducts(data.items, data.total_count));
		})
		.catch(err => dispatch(failureAdditionalProducts(err)));
};

function requestAddProduct(): Action {
	return {
		type: ADD_PRODUCT_REQUEST,
		isLoading: false,
	};
}

function successAddProduct(): Action {
	return {
		type: ADD_PRODUCT_SUCCESS,
		isLoading: false,
	};
}

function failureAddProduct(err: Error): Action {
	return {
		type: ADD_PRODUCT_FAILURE,
		isLoading: false,
		error: err,
	};
}

function requestDeleteProduct(): Action {
	return {
		type: DELETE_PRODUCT_REQUEST,
		isLoading: false,
	};
}

function successDeleteProduct(id: number): Action {
	return {
		id,
		type: DELETE_PRODUCT_SUCCESS,
		isLoading: false,
	};
}

function failureDeleteProduct(err: Error): Action {
	return {
		type: DELETE_PRODUCT_FAILURE,
		isLoading: false,
		error: err,
	};
}

export const addProductToCart = (sku: string) => (dispatch: any) => {
	dispatch(requestAddProduct());
	const { token, cartId } = store.getState().login;

	fetch('http://ecsc00a02fb3.epam.com/rest/V1/carts/mine/items', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-type': 'application/json',
		},
		body: JSON.stringify({
			cartItem: {
				sku,
				qty: 1,
				quote_id: cartId + '',
			},
		}),
	})
		.then(res => res.json())
		.then(data => {
			PushNotification.localNotification({
				title: "You've added new product to cart",
				message: data.name,
				subText: `There are ${store.getState().cart.length} products in the the cart`,
				color: '#CEDB56',
				smallIcon: 'cart',
			});

			dispatch(successAddProduct());
		})
		.catch(err => dispatch(failureAddProduct(err)));
};

export const deleteProductFromCart = (id: number) => (dispatch: any) => {
	dispatch(requestDeleteProduct());
	const { token } = store.getState().login;

	fetch(`http://ecsc00a02fb3.epam.com/rest/default/V1/carts/mine/items/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-type': 'application/json',
		},
	})
		.then(res => res.json())
		.then(data => {
			dispatch(successDeleteProduct(id));
		})
		.catch(err => dispatch(failureDeleteProduct(err)));
};
