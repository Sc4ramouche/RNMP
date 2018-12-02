import React, { Component } from 'react';

import Login from './screens/login.screen';
import ProductList from './screens/product-list.screen';

type State = {};
type Props = {};

export default class App extends Component<Props, State> {
  render() {
    return <ProductList />
  }
}