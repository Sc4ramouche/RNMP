import {
	fetchProductsAT,
	fetchAdditionalProductsAT,
} from '../actions/products/productsActionTypes';

const { FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS } = fetchProductsAT;
const {
	FETCH_ADDITIONAL_PRODUCTS_REQUEST,
	FETCH_ADDITIONAL_PRODUCTS_SUCCESS,
	FETCH_ADDITIONAL_PRODUCTS_FAILURE,
} = fetchAdditionalProductsAT;

const initialState = {
	products: [],
	totalItems: 0,
};

export function productsReducer(state: any = initialState, action: Action) {
	switch (action.type) {
		case FETCH_PRODUCTS_REQUEST:
			return state;
		case FETCH_PRODUCTS_SUCCESS:
			return {
				products: action.products,
				totalItems: action.totalItems,
			};
		case FETCH_PRODUCTS_FAILURE: {
			return state;
		}
		case FETCH_ADDITIONAL_PRODUCTS_REQUEST: {
			return state;
		}
		case FETCH_ADDITIONAL_PRODUCTS_SUCCESS: {
			return {
				products: [...state.products, ...action.products],
				totalItems: action.totalItems,
			};
		}
		case FETCH_ADDITIONAL_PRODUCTS_FAILURE: {
			return state;
		}

		default:
			return state;
	}
}
