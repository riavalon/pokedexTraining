import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicatorIOS,
} from 'react-native';

import { makeSearch } from '../../utils/FetchData';


class PokemonListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  buildMetaData = () => {
    const {sprites} = this.props;
    if (sprites) {
      return (
        <Image
          style={styles.sprite}
          source={{uri: sprites.front_default}}/>
      );
    } else {
      return null;
    }
  }

  reloadPokemon = () => {
    const {name, navigator, navState} = this.props;
    const pokemon =
      makeSearch(name)
      .then(data => {
        AsyncStorage.setItem(name, JSON.stringify(data));
        let preppedNavState = Object.assign({}, navState, {pokemon: data});
        console.log('Pushing state', data);
        this.setState({
          loading: false,
        });
        navigator.push(preppedNavState);
      })
      .catch(error => {
        console.warn(error);
        this.setState({
          loading: false,
        });
        navigator.push(navState);
      });
  }

  prepareForDetailSegue = () => {
    this.setState({
      loading: true,
    });
    const { navState, navigator } = this.props;
    AsyncStorage.getItem(this.props.name)
      .then(data => {
        if (data) {
          let preppedNavState = Object.assign({}, navState, {pokemon: JSON.parse(data)})
          this.setState({
            loading: false,
          });
          return navigator.push(preppedNavState);
        } else {
          return this.reloadPokemon();
        }
      })
      .catch(error => {
        console.warn(error);
        this.setState({
          loading: false,
        });
      });
  }

  showActivityIndicator = () => {
    if (this.state.loading) {
      return (
        <ActivityIndicatorIOS
          style={styles.activityIndicator}
          animating={true}
          color='black' />
      );
    }
  }

  render() {
    const {pokeId, name, sprites, navigator} = this.props;
    return (
      <TouchableOpacity onPress={this.prepareForDetailSegue}>
        <View style={styles.pokemonUnit}>
          {this.buildMetaData()}
          <Text style={styles.pokemonName}>{name.toUpperCase()}</Text>
          {this.showActivityIndicator()}
        </View>
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  pokemonUnit: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 15,
    backgroundColor: '#eee',
    borderWidth: 2,
    borderTopColor: 'white',
    borderBottomColor: 'white',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent'
  },
  pokemonName: {
    fontSize: 18,
    flex: 5,
  },
  sprite: {
    width: 35,
    height: 35,
  },
  activityIndicator: {
    width: 20,
    height: 20,
    flex: 1,
  }
});

export default PokemonListItem;
