import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';

import { Button } from '../components/button';
import { commonStyles } from '../shared/const/styles';

type State = {
	email: string;
	password: string;
	error: boolean;
};

type Props = {
	navigation: any;
	onLogin: () => void;
};

export default class Login extends Component<Props, State> {
	state: State = {
		email: '',
		password: '',
		error: false,
	};

	handleLoginChange = (email: string): void => {
		this.setState({ email });
	};

	handlePasswordChange = (password: string): void => {
		this.setState({ password });
	};

	handleLoginClick = (): void => {
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
					this.setState({ error: true });
				}
			})
			.catch(err => {
				this.setState({ error: true });
				this.props.navigation.navigate('ProductList');
			});
	};

	render() {
		return (
			<View style={styles.container}>
				<Image source={require('../images/logo.png')} style={styles.logo} />
				<Text style={[commonStyles.oswaldRegular, styles.heading]}>Product Store</Text>
				<Text style={[commonStyles.oswaldRegular, styles.error]}>
					{this.state.error ? 'Invalid username or password' : ''}
				</Text>
				<TextInput
					onChangeText={this.handleLoginChange}
					placeholder="email"
					style={[commonStyles.oswaldRegular, styles.input]}
				/>
				<TextInput
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
	error: {
		color: '#CB2323',
		marginBottom: 16,
		fontSize: 16,
	},
});
