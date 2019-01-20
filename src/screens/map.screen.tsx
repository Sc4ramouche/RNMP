import React, { Component } from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { NavigationScreenProp } from 'react-navigation';

type NavigationParams = {
	product: ProductItem;
};

type Props = {
	navigation: NavigationScreenProp<{}, NavigationParams>;
};

export default class Map extends Component<Props> {
	call = (): void => {
		const url = 'hero';
		Linking.canOpenURL(url).then(canOpen => {
			if (!canOpen) {
				console.log('Could not open url');
			} else {
				Linking.openURL(url).catch(err => Promise.reject(err));
			}
		});
	};

	render() {
		return (
			<View style={styles.container}>
				<MapView
					style={{ flex: 1 }}
					region={{
						latitude: 37.88738,
						longitude: 41.13221,
						latitudeDelta: 0.0422,
						longitudeDelta: 0.0221,
					}}
					showsUserLocation={true}
				>
					<Marker
						coordinate={{ latitude: 37.89915, longitude: 41.13021 }}
						title={this.props.navigation.getParam('product').name}
						onPress={this.call}
					/>
				</MapView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
