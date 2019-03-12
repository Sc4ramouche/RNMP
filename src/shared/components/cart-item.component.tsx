import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';

import { deleteProductFromCart } from '../../actions';
import { commonStyles } from '../const/styles';

type Props = {
	product: ProductItem;
	deleteProductFromCart(id: number): void;
};

class CartProductComponent extends Component<Props> {
	render() {
		const { product } = this.props;
		return (
			<View style={styles.container}>
				<Text style={[styles.productPrice, commonStyles.oswaldRegular]}>{`${product.price}¥`}</Text>
				<Text style={[styles.productName, commonStyles.oswaldRegular]}>{product.name}</Text>
				<View style={styles.deleteContainer}>
					<Text style={[styles.productQty, commonStyles.oswaldRegular]}>{product.qty}</Text>
					<TouchableOpacity onPress={() => this.props.deleteProductFromCart(product.item_id)}>
						<Image source={require('../../images/cross.png')} style={styles.deleteIcon} />
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 16,
	},
	productPrice: {
		fontSize: 18,
	},
	productName: {
		textAlign: 'center',
		fontSize: 18,
	},
	deleteContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	productQty: {
		marginRight: 8,
	},
	deleteIcon: {
		width: 18,
		height: 18,
		resizeMode: 'contain',
	},
});

function mapDispatchToProps(dispatch: any) {
	return {
		deleteProductFromCart: (id: number) => dispatch(deleteProductFromCart(id)),
	};
}

export const CartProduct = connect(
	null,
	mapDispatchToProps
)(CartProductComponent);
