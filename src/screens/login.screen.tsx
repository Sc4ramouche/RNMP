import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Image,
	LayoutAnimation,
	Platform,
	UIManager,
	Animated,
} from 'react-native';

import { Button, commonStyles } from '../shared';
import { connect } from 'react-redux';
import { login } from '../actions';

if (Platform.OS === 'android') {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

type State = {
	email: string;
	password: string;
	success: number;
};

type Props = {
	navigation: any;
	login(
		email: string,
		password: string,
		successCallback: () => void,
		animationCallback: (success: number) => void
	): void;
	error: Error;
};

class Login extends Component<Props, State> {
	state: State = {
		email: '',
		password: '',
		success: 0,
	};

	public componentDidUpdate(prevProps: Props, prevState: State) {
		if (prevProps.error && this.props.error === null) {
			this.animate(0);
		}
	}

	private handleLoginChange = (email: string): void => {
		this.setState({ email });
	};

	private handlePasswordChange = (password: string): void => {
		this.setState({ password });
	};

	private animate = (success: number): void => {
		success === -1
			? LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
			: LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		this.setState({ success });
	};

	handleLoginClick = (): void => {
		this.props.login(
			this.state.email,
			this.state.password,
			() => {
				this.props.navigation.navigate('ProductList');
			},
			this.animate
		);
	};

	calcMargin = (): { marginLeft?: number; marginRight?: number } => {
		switch (this.state.success) {
			case 1:
				return { marginLeft: 64 };
			case -1:
				return { marginRight: 64 };
			default:
				return {};
		}
	};

	render() {
		
		return (
			<Animated.View style={styles.container}>
				<Image source={require('../images/logo.png')} style={styles.logo} />
				<Text style={[commonStyles.oswaldRegular, styles.heading]}>Product Store</Text>
				<TextInput
					value={this.state.email}
					onChangeText={this.handleLoginChange}
					placeholder="email"
					style={[commonStyles.oswaldRegular, styles.input]}
				/>
				<TextInput
					value={this.state.password}
					onChangeText={this.handlePasswordChange}
					secureTextEntry={true}
					placeholder="password"
					style={[styles.input, { marginBottom: 32 }]}
				/>
				<View style={styles.loginContainer}>
					<Image source={require('../images/check.png')} style={styles.check} />
					<Image source={require('../images/cross.png')} style={styles.cross} />
					<View style={this.calcMargin()}>
						<Button
							title="LOGIN"
							onPress={this.handleLoginClick}
							success={this.state.success}
						/>
					</View>
				</View>
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
	},
	heading: {
		fontSize: 24,
		marginBottom: 80,
	},
	input: {
		textAlign: 'center',
		width: '80%',
		color: '#696969',
		paddingVertical: 5,
		marginBottom: 24,
		borderWidth: 1,
		borderColor: '#696969',
	},
	loginContainer: {
		width: '50%',
	},
	check: {
		width: 48,
		height: 48,
		position: 'absolute',
	},
	cross: {
		width: 48,
		height: 48,
		position: 'absolute',
		right: 0,
	},
	logo: {
		aspectRatio: 1.2,
		resizeMode: 'contain',
		marginBottom: 16,
	},
});

function mapStateToProps(state: any) {
	return {
		error: state.error,
	};
}

function mapDispatchToProps(dispatch: any) {
	return {
		login: (
			email: string,
			password: string,
			successCallback: () => void,
			animationCallback: () => void
		) => dispatch(login(email, password, successCallback, animationCallback)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
