import { loginAT } from '../actions/login/loginActionTypes';
import { cartAT } from '../actions/cart/cartActionTypes';

const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } = loginAT;
const { CART_ID_REQUEST, CART_ID_SUCCESS, CART_ID_FAILURE } = cartAT;

const initialState = { token: '', cartId: '' };

export function loginReducer(state: any = initialState, action: Action) {
	switch (action.type) {
		case LOGIN_REQUEST:
			return {
				...state,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				token: action.token,
			};
		case LOGIN_FAILURE:
			return {
				...state,
			};
		case CART_ID_REQUEST:
			return {
				...state,
			};
		case CART_ID_SUCCESS:
			return {
				...state,
				cartId: action.cartId,
			};
		case CART_ID_FAILURE: {
			return {
				...state,
			};
		}

		default:
			return { ...state };
	}
}
