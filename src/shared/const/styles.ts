import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
	oswaldRegular: {
		fontFamily: 'Oswald-Regular',
	},
	oswaldBold: {
		fontFamily: 'Oswald-DemiBold',
		letterSpacing: 1,
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00000040',
	},
	modalContent: {
		width: '70%',
		height: '20%',
		backgroundColor: 'white',
		justifyContent: 'space-between',
		padding: 16,
		borderRadius: 5,
	},
});
