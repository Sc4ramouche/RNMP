import React, { Component } from 'react';
import { Platform, PushNotificationIOS, NetInfo } from 'react-native';
import { Provider, connect } from 'react-redux';
import PushNotification from 'react-native-push-notification';

import Router from './router';
import { store } from './store';
import { resetError } from './actions';
import { ErrorModal, navigationService } from './shared';
import { NavigationContainerComponent } from 'react-navigation';

PushNotification.configure({
	onNotification: function(notification) {
		navigationService.navigate('Cart');

		if (Platform.OS === 'ios') {
			notification.finish(PushNotificationIOS.FetchResult.NoData);
		}
	},
});

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
				<Router
					ref={(navigatorRef: NavigationContainerComponent) => {
						navigationService.setTopLevelNavigator(navigatorRef);
					}}
				/>
				<ErrorModal visible={!!error} close={this.closeModal} message={error && error.message} />
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
