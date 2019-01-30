import { errorAT } from '../actions/error/errorActionTypes';

const { RESET_ERROR } = errorAT;

export function errorReducer(state: any = null, action: Action) {
	const { type, error } = action;

	if (type === RESET_ERROR) {
		return null;
	} else if (error) {
		return error;
	}

	return state;
}
