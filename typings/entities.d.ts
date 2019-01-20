declare type ProductItem = {
	id: number;
	name: string;
};

declare type Action = {
	type: string;
	isLoading: boolean;
	[propName: string]: any;
};
