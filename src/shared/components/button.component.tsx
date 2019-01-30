import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { commonStyles } from '../../shared';

type Props = {
	title: string;
	onPress: () => void;
	style?: object;
};

export const Button = (props: Props) => (
	<TouchableOpacity
		onPress={props.onPress}
		style={props.style ? [styles.container, props.style] : styles.container}
	>
		<View style={styles.button}>
			<Text style={[commonStyles.oswaldBold, styles.buttonText]}>{props.title}</Text>
		</View>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	button: {
		alignItems: 'center',
		backgroundColor: '#CEDB56',
		marginBottom: 20,
	},
	buttonText: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		fontSize: 18,
		color: 'white',
	},
});
