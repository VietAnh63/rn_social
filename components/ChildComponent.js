import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

class ChildComponent extends Component {
  render() {
    return (
      <View>
        <Text style={dong.o_dong}>
          {this.props.text}
          ------{this.props.email}
        </Text>
        <TouchableOpacity style={dong.nut}>
          <Text onPress={this.props.in}>Kich vao day</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const dong = StyleSheet.create({
  o_dong: {
    backgroundColor: 'red',
    color: 'black',
  },
  nut: {
    backgroundColor: 'blue',
  },
});
export default ChildComponent;
