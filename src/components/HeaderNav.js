import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Header} from 'react-navigation-stack';
//import {Metrics, Fonts, Colors} from '../themes';
export default function HeaderNav(props) {
  return (
    <View style={{backgroundColor: 'black'}}>
      <LinearGradient
        style={[{height: Header.height}]}
        colors={['#fa5d57', '#facca7']}
        start={{x: 0.0, y: 0.4}}
        end={{x: 1.0, y: 1.0}}
        locations={[0.0, 1.0]}>
        <Header {...props} />
      </LinearGradient>
    </View>
  );
}
