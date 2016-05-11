import React, { Component } from 'react';

import {
  Text,
  TextInput,
  View,
  ListView,
  StyleSheet,
  ActivityIndicatorIOS,
  AsyncStorage,
} from 'react-native'

import PokemonListItem from './PokemonListItem';
import SearchBar from './SearchBar.js';
import { getTopPokemon, makeSearch } from '../../utils/FetchData';


class Pokedex extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      pokemon: ds,
      loading: false
    };
  }

  componentWillMount() {
    this.getTopData();
  }

  reloadPokemon = () => {
    this.setState({ loading: true });
    getTopPokemon()
    .then(response => {
      AsyncStorage.setItem('pokemon', JSON.stringify(response));
      this.setState({
        pokemon: this.state.pokemon.cloneWithRows(response),
        loading: false
      })
    })
    .catch(error => {
      console.warn(error);
      this.setState({ loading: false });
    })
  }

  getTopData = () => {
    AsyncStorage.getItem('pokemon')
    .then(data => {
      if (data) {
        this.setState({
          pokemon: this.state.pokemon.cloneWithRows(JSON.parse(data))
        });
      } else {
        this.reloadPokemon();
      }
    })
    .catch(error => console.warn);

  }

  renderRow = (pokemon, sectionId, rowId) => {
    const {navigator} = this.props;
    const DETAIL_STATE = {
      name: 'POKEMON_DETAIL',
      pokemon: pokemon
    };

    return (
      <PokemonListItem
        index={rowId}
        name={pokemon.name}
        pokeId={pokemon.id}
        sprites={pokemon.sprites}
        navState={DETAIL_STATE}
        navigator={navigator} />
    );
  }

  reloadSearch = (query) => {
    this.setState({ loading: true })
    makeSearch(query)
    .then(data => {
      console.log('THE POKEMON NAME LOL', data.name)
      AsyncStorage.setItem(data.name, JSON.stringify(data));
      this.setState({
        pokemon: this.state.pokemon.cloneWithRows([data]),
        loading: false,
      })
    })
    .catch(error => {
      console.warn(error);
      this.setState({ loading: false });
    })
  }

  handleSearch = (query) => {
    if (!query) { return this.getTopData(); }

    const searchQuery = query.toLowerCase();

    AsyncStorage.getItem(searchQuery)
      .then(data => {
        console.log(searchQuery);
        if (data) {
          console.log('testing');
          this.setState({
            pokemon: this.state.pokemon.cloneWithRows([JSON.parse(data)])
          })
        } else {
          this.reloadSearch(searchQuery);
        }
      })
      .catch(error => console.warn);
  }

  renderMainContent = () => {
    const {loading} = this.state;
    if (loading) {
      return (
        <ActivityIndicatorIOS
          style={{flex: 1, paddingTop: 64}}
          animating={true}
          color='black' />
      );
    } else {
      return (
        <ListView
          dataSource={this.state.pokemon}
          style={styles.listView}
          renderRow={this.renderRow}/>
      );
    }
  }

  render() {
    const { pokemon } = this.state;
    return (
      <View style={styles.pokedexContainer}>

        {this.renderMainContent()}

        <SearchBar
          doSearch={this.handleSearch} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  pokedexContainer: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  listView: {
    flex: 1,
    paddingTop: 64,
    alignSelf: 'stretch'
  },
});

export default Pokedex;
