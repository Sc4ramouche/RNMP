import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import { products, commonStyles } from '../shared';
const arrowIcon = require('../images/arrow.png');

const NUMBER_OF_PRODUCTS: number = 20;

type State = {
	items: Array<ProductItem>;
	offset: number;
	totalItems: number;
	refreshing: boolean;
};

type Props = {
	onProductPress: (product: ProductItem) => void;
	navigation: NavigationScreenProp<any, any>;
};

export default class ProductList extends Component<Props, State> {
	public static navigationOptions = {
		title: 'Available Items',
		headerTitleStyle: {
			fontFamily: 'Oswald-Regular',
			fontWeight: '200',
			fontSize: 24,
		},
	};

	state: State = {
		offset: 1,
		totalItems: 1,
		items: [],
		refreshing: false,
	};

	// fetchProducts = (offset?: number): Promise<any> => {
	// 	this.setState({ refreshing: true });
	// 	return fetch(
	// 		`http://ecsc00a02fb3.epam.com/rest/V1/products?searchCriteria[currentPage]=${
	// 			offset ? offset : 1
	// 		}&searchCriteria[pageSize]=15`
	// 	)
	// 		.then(resp => resp.json())
	// 		.then(data => {
	// 			this.setState({ refreshing: false });
	// 			return data;
	// 		})
	// 		.catch(err => console.log(err));
	// };

	// update = (info: { distanceFromEnd: number }): void => {
	// 	if (!this.state.refreshing) {
	// 		this.fetchProducts(this.state.offset + 1).then(data =>
	// 			this.setState({
	// 				items: [...this.state.items, ...data.items],
	// 				offset: this.state.offset++,
	// 			})
	// 		);
	// 	}
	// };

	// getItems = (): void => {
	// 	if (this.state.items.length < this.state.totalItems) {
	// 		this.setState({ refreshing: true });
	// 		fetch(
	// 			`http://ecsc00a02fb3.epam.com/rest/V1/products?searchCriteria[pageSize]=${NUMBER_OF_PRODUCTS}&searchCriteria[currentPage]=${
	// 				this.state.offset
	// 			}`
	// 		)
	// 			.then(res => res.json())
	// 			.then(data => {
	// 				this.setState(prevState => ({
	// 					items: [...prevState.items, ...data.items],
	// 					totalItems: data.total_count,
	// 					offset: this.state.offset + 1,
	// 				}));
	// 			})
	// 			.then(() => this.setState({ refreshing: false }));
	// 	}
	// };

	getItems = async (): Promise<any> => {
		if (this.state.items.length < this.state.totalItems) {
			this.setState({ refreshing: true });
			const data = await fetch(
				`http://ecsc00a02fb3.epam.com/rest/V1/products?searchCriteria[pageSize]=${NUMBER_OF_PRODUCTS}&searchCriteria[currentPage]=${
					this.state.offset
				}`
			).then(res => res.json());
			this.setState({
				items: [...this.state.items, ...data.items],
				totalItems: data.total_count,
				offset: this.state.offset + 1,
			});
			this.setState({ refreshing: false });
		}
	};

	refresh = (): void => {
		this.setState({
			items: [],
			offset: 1,
			totalItems: 1,
		});
		this.getItems();
	};

	componentDidMount = (): void => {
		this.getItems();
	};

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					data={this.state.items}
					renderItem={this.renderProduct}
					keyExtractor={item => item.id + ''}
					onRefresh={this.refresh}
					refreshing={this.state.refreshing}
					onEndReached={this.getItems}
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
					<Text style={styles.bullet}>{'\u2022'}</Text>
					<Text style={[commonStyles.oswaldRegular, styles.listItemText]}>{item.name}</Text>
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
		justifyContent: 'space-between',
		width: '100%',
	},
	bullet: {
		fontSize: 40,
	},
	listItemIcon: {
		width: 56,
		height: 56,
		resizeMode: 'contain',
	},
	listItemText: {
		fontSize: 16,
		width: '80%',
		paddingLeft: 16,
	},
	listItemArrow: {
		width: 36,
		height: 36,
		marginRight: 16,
		resizeMode: 'contain',
	},
});
