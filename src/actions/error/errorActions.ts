import { errorAT } from './errorActionTypes';

const { RESET_ERROR } = errorAT;

function reset(): Action {
	return {
		type: RESET_ERROR,
		isLoading: false,
	}
}

export const resetError = () => (dispatch: any) => {
	dispatch(reset());
};
