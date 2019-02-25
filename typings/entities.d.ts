declare type ProductItem = {
	id: number;
	item_id: number;
	name: string;
	sku: string;
	qty: number;
	price: number;
};

declare type Action = {
	type: string;
	isLoading: boolean;
	[propName: string]: any;
};

declare type StackNavigatorOptions = {
	title: string;
	headerRight?: JSX.Element;
	headerTitleStyle: any;
};
