import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Metrics, Fonts, Colors} from '../themes';
export default function CardView(props) {
  return (
    <View style={[styleCard.container, props.style]}>{props.children}</View>
  );
}
const styleCard = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    padding: Metrics.baseMargin,
    backgroundColor: Colors.card,
    borderWidth: 0.5,
    borderColor: Colors.transparent,
  },
});
