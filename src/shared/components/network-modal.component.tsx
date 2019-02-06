import React, { Component } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';

import { commonStyles } from '../../shared';

type Props = {
	visible: boolean;
};

export class NetworkModal extends Component<Props> {
	render() {
		return (
			<Modal
				visible={this.props.visible}
				animationType="fade"
				transparent={true}
				onRequestClose={() => ''}
			>
				<View style={commonStyles.modalContainer}>
					<View style={commonStyles.modalContent}>
						<Text style={[styles.message, commonStyles.oswaldRegular]}>
							Seems like you have no active active connections. Please, enable Wi-Fi or cellular data via settings.
						</Text>
					</View>
				</View>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	message: {
		textAlign: 'center',
		fontSize: 18,
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
});
