import React, {Component} from 'react';

import {
  Navigator,
} from 'react-native';

import {ROUTES} from './constants';
import NavigationBar from './navigator/NavigationBar';
import Pokedex from './pokedex/Pokedex';
import PokemonDetail from './pokedex/PokemonDetail';
import { makeSearch } from '../utils/FetchData';


class Root extends Component {
  constructor(props) {
    super(props);
  }

  renderScene(route, navigator) {
    switch (route.name) {
      case ROUTES.base.name:
        return <Pokedex navigator={navigator} />
      case ROUTES.detail.name:
        return <PokemonDetail pokemon={route.pokemon} navigator={navigator} />
      default:
        return <Pokedex navigator={navigator} />
    }
  }

  render() {
    return (
      <Navigator
        style={{ flex: 1 }}
        initialRoute={ROUTES.base}
        renderScene={this.renderScene}
        navigationBar={NavigationBar} />
    );
  }
}

export default Root;
