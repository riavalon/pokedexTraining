import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ListView,
} from 'react-native';


class CardDetails extends Component {
  constructor(props) {
    super(props);

    const { moves } = this.props.pokemon;

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      moves: ds.cloneWithRows(moves)
    }
  }

  displayStats = () => {
    const { stats } = this.props.pokemon;

    return stats.map((item, index) => {
      return (
        <Text key={index} style={styles.detail}>
          {item.stat.name}: <Text style={styles.strong}>{item.base_stat}</Text>
        </Text>
      );
    });
  }

  renderRow = (item, sId, rId) => {
    return (
      <Text key={rId} style={styles.move}>
        {item.move.name.toUpperCase()}
      </Text>
    );
  }

  render() {
    const {
      height,
      weight,
    } = this.props.pokemon
    return (
      <View style={styles.container}>

        <View style={styles.details}>
          <Text style={styles.detail}>
            Height: <Text style={styles.strong}>{height}</Text>
          </Text>
          <Text style={styles.detail}>
            Weight: <Text style={styles.strong}>{weight} lbs</Text>
          </Text>
          {this.displayStats()}
        </View>

        <ListView
          contentContainerStyle={styles.scrollViewContainer}
          style={styles.moves}
          dataSource={this.state.moves}
          renderRow={this.renderRow}>
        </ListView>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 3
  },
  details: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#f7f7f7',
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    borderTopWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  detail: {
    width: 150,
    marginBottom: 3,
    color: '#393939',
  },

  scrollViewContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  moves: {
    flex: 3,
    backgroundColor: '#f1f1f1',
    paddingTop: 10,
  },
  move: {
    padding: 10,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 85, 255, 0.1)',
    alignSelf: 'center',
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 40,
    margin: 5,
    textAlign: 'center',
  },
  strong: {
    fontWeight: 'bold',
  }
});

export default CardDetails;
