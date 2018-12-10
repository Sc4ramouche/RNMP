import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { products } from '../shared/products';
const arrowIcon = require('../images/arrow.png');

type State = {
    data: Array<object>
};
type Props = {
    onProductPress: (product: any) => void
};
export default class ProductList extends Component<Props, State> {
    state: State = {
        data: []
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.heading}>
                    <Text style={styles.headingText}>Approwed Freeware</Text>
                </View>
                <View style={styles.list}>
                    <FlatList
                        data={products}
                        renderItem={this.renderProduct}
                        keyExtractor={(item) => item.title} />
                </View>
            </View>

        );
    }

    // TODO: find a way to explicitly specify type of product
    renderProduct = ({ item }) => {
        this.state.data.push(item);
        return (
            <TouchableOpacity
                style={styles.listItemContainer}
                onPress={() => this.props.onProductPress(item)}>
                <View style={styles.productContainer}>
                    <Image source={item.icon}
                        style={styles.listItemIcon} />
                    <Text style={styles.listItemText}>{item.title}</Text>
                </View>
                <View style={styles.arrowContainer}>
                    <Image source={arrowIcon} style={styles.listItemArrow} />
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    heading: {
        flex: 0.15,
        justifyContent: 'center'
    },
    headingText: {
        fontFamily: 'Oswald-Regular',
        fontSize: 24
    },
    list: {
        flex: 0.85,
        width: '100%',
        borderTopWidth: 1
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
        width: '40%'
    },
    listItemIcon: {
        width: 56,
        height: 56,
        resizeMode: 'contain'
    },
    listItemText: {
        fontFamily: 'Oswald-Regular',
        fontSize: 16,
        width: 128,
        paddingLeft: 16,
    },
    arrowContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '60%',
        paddingRight: 16
    },
    listItemArrow: {
        width: 36,
        height: 36,
        resizeMode: 'contain'
    }
});