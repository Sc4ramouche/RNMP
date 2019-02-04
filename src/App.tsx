import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';

import Router from './router';
import { store } from './store';
import { resetError } from './actions';
import { ErrorModal } from './shared/components/error-modal.component';

type Props = {
	error: Error;
};

class App extends Component<Props> {
	private closeModal = (): void => {
		store.dispatch(resetError() as any);
	};

	render() {
		const { error } = this.props;
		return (
			<Provider store={store}>
				<Router />
				{!!error && <ErrorModal visible={!!error} close={this.closeModal} message={error && error.message} />}
			</Provider>
		);
	}
}

function mapStateToProps(state: any) {
	return {
		error: state.error,
	};
}

const Application = connect(mapStateToProps)(App);

export default class Root extends Component<{}> {
	render() {
		return (
			<Provider store={store}>
				<Application />
			</Provider>
		);
	}
}
