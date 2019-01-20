import React, { Component } from 'react';
import { Modal, Text, View, StyleSheet } from 'react-native';

import { commonStyles } from '../../shared';

type Props = {
	visible: boolean;
	message: string;
	close(): void;
};

export const ErrorModal = (props: Props) => (
	<Modal visible={props.visible} animationType="fade" transparent={true} onRequestClose={() => 's'}>
		<View style={styles.container}>
			<View style={styles.content}>
				<Text style={[styles.message, commonStyles.oswaldRegular]}>{props.message}</Text>
				<View style={styles.buttons}>
					<Text style={[styles.btn, commonStyles.oswaldBold]} onPress={props.close}>
						Close
					</Text>
				</View>
			</View>
		</View>
	</Modal>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00000040',
	},
	content: {
		width: '70%',
		height: '20%',
		backgroundColor: 'white',
		padding: 16,
		borderRadius: 5,
	},
	message: {
		marginBottom: 48,
		textAlign: 'center',
		fontSize: 18,
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	btn: {
		marginRight: 16,
		fontSize: 16,
	},
});
