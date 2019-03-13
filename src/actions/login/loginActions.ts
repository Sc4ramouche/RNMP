import { loginAT } from './loginActionTypes';
import * as Keychain from 'react-native-keychain';

const { LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILURE } = loginAT;

function loginRequest(): Action {
	return {
		type: LOGIN_REQUEST,
		isLoading: true,
	};
}

function loginSuccess(token: string): Action {
	return {
		token,
		type: LOGIN_SUCCESS,
		isLoading: false,
	};
}

function loginFailure(error: Error): Action {
	return {
		type: LOGIN_FAILURE,
		isLoading: false,
		error,
	};
}

export const login = (
	email: string,
	password: string,
	successCallback: () => void,
	animationCallback: (success: number) => void
) => (dispatch: any) => {
	const delay = 700;
	dispatch(loginRequest());
	fetch('http://ecsc00a02fb3.epam.com/index.php/rest/V1/integration/customer/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			username: email,
			password,
		}),
	})
		.then(res => res.json())
		.then(data => {
			if (!data.message) {
				dispatch(loginSuccess(data));
				animationCallback(1);
				setTimeout(() => successCallback(), delay);
				storeCredentials(email, password);
			} else {
				animationCallback(-1);
				setTimeout(() => dispatch(loginFailure(new Error(data.message))), delay);
			}
		})
		.catch(err => {
			dispatch(loginFailure(err));
		});
};

export async function storeCredentials(email: string, password: string): Promise<void> {
	await Keychain.setGenericPassword(email, password);
}

export async function retrieveCredentials(): Promise<Credentials | boolean> {
	try {
		return Keychain.getGenericPassword();
	} catch (error) {
		loginFailure(error);
		return false;
	}
}
