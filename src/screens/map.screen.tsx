import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0422;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

type NavigationParams = {
	product: ProductItem;
};

type Props = {
	navigation: NavigationScreenProp<{}, NavigationParams>;
};

type State = {
	coordinate: {
		latitude: Animated.Value;
		longitude: Animated.Value;
	};
};

export default class Map extends Component<Props, State> {
	state: State = {
		coordinate: new AnimatedRegion({
			latitude: 37.899,
			longitude: 41.1308,
			latitudeDelta: LATITUDE_DELTA,
			longitudeDelta: LONGITUDE_DELTA,
		}),
	};

	move = (): void => {
		const transition = {
			latitude: 37.888,
			longitude: 41.1285,
			latitudeDelta: LATITUDE_DELTA,
			longitudeDelta: LONGITUDE_DELTA,
		};
		const { coordinate } = this.state;
		coordinate.timing(transition).start();
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
					<Marker.Animated onPress={this.move} coordinate={this.state.coordinate} />
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
