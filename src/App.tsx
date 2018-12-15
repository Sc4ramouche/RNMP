import React, { Component } from 'react';

import Router from './router';

type State = {
	screen: string;
	product: object;
};

type Props = {};

export default class App extends Component<Props, State> {
	render() {
		return <Router />;
	}
}
