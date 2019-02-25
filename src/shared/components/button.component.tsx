import React from 'react';
import { Animated, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { commonStyles } from '../../shared';

type Props = {
	title: string;
	onPress: () => void;
	success?: number;
};

type State = {
	color: Animated.Value;
};

export class Button extends React.Component<Props, State> {
	state: State = {
		color: new Animated.Value(0),
	};

	public componentDidUpdate(prevProps: Props, prevState: State) {
		if (prevProps.success !== this.props.success) {
			Animated.timing(this.state.color, {
				toValue: this.props.success ? this.props.success : 0,
				duration: 300,
			}).start();
		}
	}

	render() {
		const color = this.state.color.interpolate({
			inputRange: [-1, 0, 1],
			outputRange: ['rgb(178, 39, 70)', 'rgb(206, 219, 86)', 'rgb(206, 219, 86)'],
		});
		return (
			<TouchableWithoutFeedback onPress={this.props.onPress} style={styles.container}>
				<Animated.View
					style={
						this.props.success
							? [commonStyles.button, { backgroundColor: color }]
							: commonStyles.button
					}
				>
					<Text style={[commonStyles.oswaldBold, commonStyles.buttonText]}>{this.props.title}</Text>
				</Animated.View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
});
