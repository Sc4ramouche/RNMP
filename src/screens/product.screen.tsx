import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

import { Button } from '../components/button';

type State = {};
type Props = {};
export default class Product extends Component<Props, State> {
    render() {
        return (
            <View>
                <View style={styles.headingContainer}>
                    <Image source={require('../images/Git.png')} style={styles.icon} />
                    <Text style={styles.headingText}>Product 1</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>{'\t'}Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                    <Button 
                        title="All Products"
                        onPress={() => {}}
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