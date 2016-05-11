import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import CardImage from './detail/CardImage';
import CardDetails from './detail/CardDetails';


class PokemonDetail extends Component {
  render() {
    const { pokemon } = this.props;
    console.log(pokemon);
    return (
      <View style={{ flex: 1, paddingTop: 64 }}>

        <CardImage
          name={pokemon.name}
          types={pokemon.types}
          source={pokemon.sprites.front_default} />

        <CardDetails
          style={{ flex: 1 }}
          pokemon={pokemon} />

      </View>
    );
  }
}


const styles = StyleSheet.create({
  pokemonCard: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: '#e6e6e6'
  },
  pokemonCardImageContainer: {},
  pokemonCardDetailsContainer: {},

  pokemonCardImage: {
    width: 300,
    height: 300
  }
});

export default PokemonDetail
