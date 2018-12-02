import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

import { Button } from '../components/button';

type State = {};
type Props = {
    product: object,
    toProducts: () => void
};
export default class Product extends Component<Props, State> {
    render() {
        const { product } = this.props;
        return (
            <View>
                <View style={styles.headingContainer}>
                    <Image source={product.icon} style={styles.icon} />
                    <Text style={styles.headingText}>{product.title}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>{'\t' + product.description}</Text>
                    <Button 
                        title="All Products"
                        onPress={this.props.toProducts}
                        style={styles.descriptionButton} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 32,
        paddingLeft: 32
    },
    icon: {
        width: 72,
        height: 72,
        resizeMode: 'contain'
    },
    headingText: {
        fontFamily: 'oswald-regular',
        fontSize: 40,
        paddingLeft: 32
    },
    descriptionContainer: {
        paddingTop: 40,
        paddingLeft: 64,
        paddingRight: 80
    },
    descriptionText: {
        fontFamily: 'oswald-regular',
        fontSize: 16,
        marginBottom: 32
    },
    descriptionButton: {
        alignSelf: 'flex-start'
    }
});