import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';

import { commonStyles, NUMBER_OF_PRODUCTS } from '../shared';
import { fetchProducts, fetchAdditionalProducts } from '../actions';
const arrowIcon = require('../images/arrow.png');

type State = {
	items: Array<ProductItem>;
	offset: number;
	refreshing: boolean;
};

type Props = {
	onProductPress: (product: ProductItem) => void;
	navigation: NavigationScreenProp<any, any>;
	fetchProducts(): void;
	fetchAdditionalProducts(offset: number): void;
	products: Array<ProductItem>;
	totalItems: number;
};

class ProductList extends Component<Props, State> {
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
		items: [],
		refreshing: false,
	};

	componentDidMount = (): void => {
		this.props.fetchProducts();
	};

	private refresh = async (): Promise<any> => {
		this.setState({ refreshing: true });
		await this.props.fetchProducts();
		this.setState({ refreshing: false });
	};

	private endReached = (): void => {
		if (this.props.products.length < this.props.totalItems) {
			this.setState({ refreshing: true });
			this.props.fetchAdditionalProducts(this.state.offset + 1);
			this.setState({ refreshing: false, offset: this.state.offset + 1 });
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					data={this.props.products}
					renderItem={this.renderProduct}
					keyExtractor={item => item.id.toString()}
					refreshing={this.state.refreshing}
					onRefresh={this.refresh}
					onEndReachedThreshold={0.5}
					onEndReached={this.endReached}
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

function mapStateToProps(state: any) {
	return {
		products: state.products.products,
		totalItems: state.products.totalItems,
	};
}

function mapDispatchToProps(dispatch: any) {
	return {
		fetchProducts: () => dispatch(fetchProducts()),
		fetchAdditionalProducts: (offset: number) => dispatch(fetchAdditionalProducts(offset)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductList);
