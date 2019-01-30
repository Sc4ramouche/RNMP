import { fetchProductsAT, fetchAdditionalProductsAT } from './productsActionTypes';
import { NUMBER_OF_PRODUCTS } from '../../shared';

const { FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS } = fetchProductsAT;
const {
	FETCH_ADDITIONAL_PRODUCTS_REQUEST,
	FETCH_ADDITIONAL_PRODUCTS_SUCCESS,
	FETCH_ADDITIONAL_PRODUCTS_FAILURE,
} = fetchAdditionalProductsAT;

function requestProducts(): Action {
	return {
		type: FETCH_PRODUCTS_REQUEST,
		isLoading: true,
		isError: false,
	};
}

function requestAdditionalProducts(): Action {
	return {
		type: FETCH_ADDITIONAL_PRODUCTS_REQUEST,
		isLoading: true,
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
