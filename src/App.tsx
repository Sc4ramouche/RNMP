import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';

import Router from './router';
import { store } from './store';
import { resetError } from './actions';
import { ErrorModal, NetworkModal } from './shared';
import { NetInfo, Alert } from 'react-native';

type Props = {
	error: Error;
};

type State = {
	connected: boolean;
};

class App extends Component<Props, State> {
	public state: State = {
		connected: true,
	};

	constructor(props: any) {
		super(props);
	}

	public componentDidMount(): void {
		NetInfo.addEventListener('connectionChange', this.setConnection);
	}

	public componentWillUnmount(): void {
		NetInfo.removeEventListener('connectionChange', this.setConnection);
	}

	private setConnection = (isConnected: any): void => {
		if (isConnected.type !== 'wifi' && isConnected.type !== 'cellular') {
			this.setState({ connected: false });
		} else {
			this.setState({ connected: true });
		}
	};

	private closeModal = (): void => {
		store.dispatch(resetError() as any);
	};

	render() {
		const { error } = this.props;
		return (
			<Provider store={store}>
				<Router />
				{!!error && (
					<ErrorModal visible={!!error} close={this.closeModal} message={error && error.message} />
				)}
				{!this.state.connected && <NetworkModal visible={!this.state.connected} />}
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
