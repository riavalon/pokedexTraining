import React, { Component } from 'react';

import {
  Image,
  Text,
  View,
  StyleSheet,
} from 'react-native';


class CardImage extends Component {
  displayTypes = () => {
    const { types } = this.props;

    return types.map((typeObj, index) => {
      return (
        <Text key={index} style={styles.pokemonName}>
          {typeObj.type.name.toUpperCase()}
        </Text>
      );
    });
  }

  render() {
    const {source, name} = this.props;
    return (
      <View style={styles.pokemonCardImageContainer}>
        <Text style={styles.pokemonName}>{name.toUpperCase()}</Text>
        <Image
          style={styles.pokemonCardImage}
          source={{uri: source}}/>
        <View style={styles.baseDetails}>
          {this.displayTypes()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pokemonCardImageContainer: {
    flex: 2,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#dfdfdf'
  },
  pokemonName: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
    color: '#293927',
  },
  pokemonCardImage: {
    alignSelf: 'stretch',
    height: 200,
    marginBottom: 2,
    borderWidth: 10,
    borderColor: 'white',
    borderRadius: 8,
    backgroundColor: '#f1f1f1'
  },

  baseDetails: {
    flexDirection: 'row',
  },
});

export default CardImage;
