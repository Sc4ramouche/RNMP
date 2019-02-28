import React from 'react';
import { Modal, Text, View, StyleSheet, Vibration } from 'react-native';

import { commonStyles } from '../../shared';

type Props = {
	visible: boolean;
	message: string;
	close(): void;
};

export const ErrorModal = (props: Props) => {
	props.visible && Vibration.vibrate(200, false);
	return (
		<Modal
			visible={props.visible}
			animationType="fade"
			transparent={true}
			onRequestClose={() => 's'}
		>
			<View style={commonStyles.modalContainer}>
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
};

const styles = StyleSheet.create({
	content: {
		width: '70%',
		height: '18%',
		backgroundColor: 'white',
		justifyContent: 'space-between',
		padding: 16,
		borderRadius: 5,
	},
	message: {
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
