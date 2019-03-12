import { cartAT } from '../actions/cart/cartActionTypes';
import { deleteProductFromCartAT } from '../actions/products/productsActionTypes';

const { CART_ITEMS_REQUEST, CART_ITEMS_SUCCESS, CART_ITEMS_FAILURE } = cartAT;
const {
	DELETE_PRODUCT_REQUEST,
	DELETE_PRODUCT_SUCCESS,
	DELETE_PRODUCT_FAILURE,
} = deleteProductFromCartAT;

const initialState: any = [];

export function cartReducer(state: any = initialState, action: Action) {
	switch (action.type) {
		case CART_ITEMS_REQUEST:
			return [...state];
		case CART_ITEMS_SUCCESS:
			return [...action.items];
		case CART_ITEMS_FAILURE:
			return [...state];
		case DELETE_PRODUCT_REQUEST: {
			return state;
		}
		case DELETE_PRODUCT_SUCCESS: {
			return state.filter((product: ProductItem) => product.item_id !== action.id);
		}
		case DELETE_PRODUCT_FAILURE: {
			return state;
		}

		default:
			return [...state];
	}
}
