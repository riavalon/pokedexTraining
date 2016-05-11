import React, {Component} from 'react';

import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

import {debounce} from 'lodash';


class SearchBar extends Component {
  constructor(props) {
    super(props);
  }

  doSearch = debounce(text => {
    this.props.doSearch(text);
  }, 800)

  clearTextInput = () => {
    this.refs.nameInput.clear();
    this.props.doSearch();
  }

  render() {
    return (
      <View style={styles.searchContainer}>
        <TextInput
          ref="nameInput"
          style={styles.searchInput}
          onChangeText={this.doSearch}
          autoCorrect={false}
          placeholder="Enter a pokemon name" />
        <TouchableOpacity
          onPress={this.clearTextInput}>
          <Text style={styles.clearButton}>X</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#e5e5e5',
    borderTopColor: 'rgba(0,0,0,0.1)',
    borderTopWidth: 2
  },
  searchInput: {
    alignSelf: 'stretch',
    flex: 8,
    borderRadius: 5,
    padding: 3,
    margin: 3,
  },
  clearButton: {
    fontSize: 28,
    fontWeight: 'bold',
    padding: 15,
    flex: 2,
  },
});

export default SearchBar;
