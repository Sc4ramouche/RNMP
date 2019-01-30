import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';

import { Button, commonStyles } from '../shared';
import { connect } from 'react-redux';
import { login } from '../actions';

type State = {
	email: string;
	password: string;
	error: string;
};

type Props = {
	navigation: any;
	onLogin(): void;
	login(email: string, password: string): void;
	error: Error;
};

class Login extends Component<Props, State> {
	state: State = {
		email: '',
		password: '',
		error: '',
	};

	handleLoginChange = (email: string): void => {
		this.setState({ email });
	};

	handlePasswordChange = (password: string): void => {
		this.setState({ password });
	};

	handleLoginClick = (): void => {
		this.props.login(this.state.email, this.state.password);
		console.log(this.props.error);
		this.setState({ error: '' });
		const body = {
			username: this.state.email,
			password: this.state.password,
		};

		fetch('http://ecsc00a02fb3.epam.com/index.php/rest/V1/integration/customer/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})
			.then(res => res.json())
			.then(data => {
				if (!data.message) {
					this.props.navigation.navigate('ProductList');
				} else {
					this.setState({ error: 'Invalid username or password' });
				}
			})
			.catch(err => {
				this.setState({ error: err.message });
			});
	};

	closeModal = (): void => {
		this.setState({ error: '' });
	};

	render() {
		return (
			<View style={styles.container}>
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
				<Button title="LOGIN" onPress={this.handleLoginClick} />
			</View>
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
		login: (email: string, password: string) => dispatch(login(email, password)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
