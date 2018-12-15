import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import { products } from '../shared/const/products';
import { commonStyles } from '../shared/const/styles';
const arrowIcon = require('../images/arrow.png');

type State = {};

type Props = {
	onProductPress: (product: any) => void;
	navigation: NavigationScreenProp<any, any>;
};

export default class ProductList extends Component<Props, State> {
	public static navigationOptions = {
		title: 'Approved Freeware',
		headerTitleStyle: {
			fontFamily: 'Oswald-Regular',
			fontWeight: '200',
			fontSize: 24,
		},
	};

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					data={products}
					renderItem={this.renderProduct}
					keyExtractor={item => item.title}
					style={styles.list}
				/>
			</View>
		);
	}

	renderProduct = ({ item }: { item: ProductItem }) => {
		return (
			<TouchableOpacity
				style={styles.listItemContainer}
				onPress={() => this.props.navigation.navigate('Product', { product: item })}
			>
				<View style={styles.productContainer}>
					<Image source={item.icon} style={styles.listItemIcon} />
					<Text style={[commonStyles.oswaldRegular, styles.listItemText]}>{item.title}</Text>
				</View>
				<View style={styles.arrowContainer}>
					<Image source={arrowIcon} style={styles.listItemArrow} />
				</View>
			</TouchableOpacity>
		);
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
	},
	list: {
		width: '100%',
		borderTopWidth: 1,
	},
	listItemContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 8,
		paddingLeft: 24,
		borderBottomWidth: 1,
	},
	productContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '40%',
	},
	listItemIcon: {
		width: 56,
		height: 56,
		resizeMode: 'contain',
	},
	listItemText: {
		fontSize: 16,
		width: 128,
		paddingLeft: 16,
	},
	arrowContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		width: '60%',
		paddingRight: 16,
	},
	listItemArrow: {
		width: 36,
		height: 36,
		resizeMode: 'contain',
	},
});
