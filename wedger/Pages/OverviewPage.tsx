import {Text, View} from 'react-native';
import React, {Component} from 'react';

export class OverviewPage extends Component {
  render() {
    return (
      <View style={{ backgroundColor: '#f00', height: 100}}>
        <Text style={{color: 'black'}}>OverviewPage</Text>
      </View>
    );
  }
}

export default OverviewPage;
