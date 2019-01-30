const initialState = false;

export function loadingReducer(state: any = initialState, action: Action) {
	const { isLoading } = action;

	if (isLoading !== undefined) {
		return isLoading;
	} else {
		return state;
	}
}
