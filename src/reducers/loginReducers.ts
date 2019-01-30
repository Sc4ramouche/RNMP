import { loginAT } from '../actions/login/loginActionTypes';

const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } = loginAT;

const initialState = { token: '' };

export function loginReducer(state: any = initialState, action: Action) {
	switch (action.type) {
		case LOGIN_REQUEST:
			return {
				...state,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
			};
		case LOGIN_FAILURE:
			return {
				...state,
			};

		default:
			return { ...state };
	}
}
