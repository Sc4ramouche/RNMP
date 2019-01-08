import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import { Button, commonStyles } from '../shared';

type NavigationParams = {
	product: ProductItem;
};

type Props = {
	product: ProductItem;
	toProducts: () => void;
	navigation: NavigationScreenProp<{}, NavigationParams>;
};

export default class Product extends Component<Props> {
	public static navigationOptions = {
		title: 'Product',
		headerTitleStyle: {
			fontFamily: 'Oswald-Regular',
			fontWeight: '200',
			fontSize: 24,
		},
	};

	render() {
		const { navigation } = this.props;
		const product = navigation.getParam('product');
		return (
			<View style={styles.container}>
				<View style={styles.headingContainer}>
					<Text style={[commonStyles.oswaldRegular, styles.headingText]}>{product.name}</Text>
				</View>
				<View style={styles.descriptionContainer}>
					<Text style={[commonStyles.oswaldRegular, styles.descriptionText]}>
						{'\t' +
							'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
					</Text>
					<Button
						title="All Products"
						onPress={() => navigation.navigate('ProductList')}
						style={styles.descriptionButton}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFFF',
		flex: 1,
	},
	headingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 32,
		paddingLeft: 32,
	},
	icon: {
		width: 72,
		height: 72,
		resizeMode: 'contain',
	},
	headingText: {
		fontSize: 40,
		paddingLeft: 32,
	},
	descriptionContainer: {
		paddingTop: 40,
		paddingLeft: 64,
		paddingRight: 80,
	},
	descriptionText: {
		color: '#696969',
		fontSize: 16,
		marginBottom: 32,
	},
	descriptionButton: {
		alignSelf: 'flex-start',
	},
});
