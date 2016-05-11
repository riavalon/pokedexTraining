import React, {Component} from 'react';

import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Navigator
} from 'react-native';

import { ROUTES } from '../constants';


const NavigationBarRouteMapper = {

  LeftButton: (route, navigator) => {
    if (route.name === ROUTES.base.name) {
      return null;
    }

    return (
      <TouchableOpacity
        onPress={ () => navigator.pop() }
        style={ styles.navbarLeftButton }>
        <Text style={styles.navbarText}>
          Back
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: () => {
    return null;
  },

  Title: (route) => {
    const { pokemon } = route;
    let pokemonName = 'Top Pokemon';
    if (pokemon) {
      pokemonName = pokemon.name.toUpperCase();
    }
    return (
      <Text style={[styles.navbarText, styles.navbarTitleText]}>
        { pokemonName }
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#008aff'
  },
  navbarLeftButton: {
    paddingLeft: 10,
  },
  navbarText: {
    fontSize: 16,
    marginVertical: 10,
    color: '#f7f7f7',
  },
  navbarTitleText: {
    fontWeight: '500',
    marginVertical: 9,
  },
});

export default (
  <Navigator.NavigationBar
    style={styles.navbar}
    routeMapper={NavigationBarRouteMapper} />
);
