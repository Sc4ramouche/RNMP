import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

import { Button } from '../components/button';

type State = {};

type Props = {
    product: ProductItem;
    toProducts: () => void;
};

export default class Product extends Component<Props, State> {
    render() {
        const { product } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.headingContainer}>
                    <Image source={product.icon} style={styles.icon} />
                    <Text style={styles.headingText}>{product.title}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>
                        {'\t' + product.description}
                    </Text>
                    <Button
                        title="All Products"
                        onPress={this.props.toProducts}
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
        fontFamily: 'Oswald-Regular',
        fontSize: 40,
        paddingLeft: 32,
    },
    descriptionContainer: {
        paddingTop: 40,
        paddingLeft: 64,
        paddingRight: 80,
    },
    descriptionText: {
        fontFamily: 'Oswald-Regular',
        color: '#696969',
        fontSize: 16,
        marginBottom: 32,
    },
    descriptionButton: {
        alignSelf: 'flex-start',
    },
});
