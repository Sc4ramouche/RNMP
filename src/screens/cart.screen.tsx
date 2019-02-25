import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { getCartItems  } from '../actions';
import { CartProduct } from '../shared';

type Props = {
	getCartItems(): void;
	products: Array<ProductItem>;
};

class Cart extends Component<Props> {
	static navigationOptions = {
		title: 'Cart',
		headerTitleStyle: {
			fontFamily: 'Oswald-Regular',
			fontWeight: '200',
			fontSize: 24,
		},
	};

	public componentDidMount() {
		this.props.getCartItems();
	}

	render() {
		return (
			<View>
				<FlatList
					data={this.props.products}
					renderItem={this.renderProduct}
					keyExtractor={item => item.item_id.toString()}
				/>
			</View>
		);
	}

	private renderProduct({ item }: { item: any }): JSX.Element {
		return <CartProduct product={item} />;
	}
}

function mapStateToProps(state: any) {
	return {
		products: state.cart,
	};
}

function mapDispatchToProps(dispatch: any) {
	return {
		getCartItems: () => dispatch(getCartItems()),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Cart);
