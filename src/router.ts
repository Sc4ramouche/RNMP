import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import Login from './screens/login.screen';
import ProductList from './screens/product-list.screen';
import Product from './screens/product.screen';
import Map from './screens/map.screen';

const ProductsNavigator = createStackNavigator(
	{
		ProductList,
		Product,
		Map,
	},
	{
		initialRouteName: 'ProductList',
	}
);

const AppNavigator = createSwitchNavigator(
	{
		Login,
		ProductsNavigator,
	},
	{
		initialRouteName: 'Login',
	}
);

export default createAppContainer(AppNavigator);
