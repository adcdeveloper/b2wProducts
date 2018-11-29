/**
 * @author Alex Daniel Castanha
 */

import React, { Component } from 'react';
import { createAppContainer, createStackNavigator } from "react-navigation";
import ProductsScreen from './screens/ProductsScreen';

const RootStack = createStackNavigator(
  {
    Products: {screen: ProductsScreen}
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}
