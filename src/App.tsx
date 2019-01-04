import React, { Component } from 'react';

import Login from './screens/login.screen';
import ProductList from './screens/product-list.screen';
import Product from './screens/product.screen';

const screens = {
    LOGIN: 'LOGIN',
    PRODUCT_LIST: 'PRODUCT_LIST',
    PRODUCT: 'PRODUCT',
};

type State = {
    screen: string;
    product: ProductItem | null;
};

type Props = {};

export default class App extends Component<Props, State> {
    state: State = {
        screen: screens.LOGIN,
        product: null,
    };

    toProducts = (): void => {
        this.setState({ screen: screens.PRODUCT_LIST });
    };

    onProductPress = (product: ProductItem): void => {
        this.setState({
            screen: screens.PRODUCT,
            product,
        });
    };

    render() {
        switch (this.state.screen) {
            case screens.LOGIN:
                return <Login onLogin={this.toProducts} />;

            case screens.PRODUCT_LIST:
                return <ProductList onProductPress={this.onProductPress} />;

            case screens.PRODUCT:
                return (
                    <Product
                        product={this.state.product}
                        toProducts={this.toProducts}
                    />
                );

            default:
                return <Login onLogin={this.toProducts} />;
        }
    }
}
