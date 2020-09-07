import React from 'react';
import {View, Text, Image, TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Metrics, Fonts, Colors} from '../themes';
import LinearGradient from 'react-native-linear-gradient';
export default function CreatePost() {
  return (
    <View
      style={{
        marginTop: Metrics.baseMargin + 15,
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            padding: Metrics.baseMargin,
          }}>
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 50 / 2,
              borderWidth: 1,
              backgroundColor: 'green',
            }}
            source={require('../images/thangnc.jpg')}
          />
          <Text style={{paddingLeft: Metrics.baseMargin, alignSelf: 'center'}}>
            User admin
          </Text>
        </View>
        <View style={{padding: Metrics.baseMargin}}>
          <TextInput
            placeholder="Bạn đang nghĩ gì"
            placeholderTextColor="gray"
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: Metrics.baseMargin + 5,
          padding: Metrics.baseMargin,
          borderTopWidth: 0.2,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AntDesign name="instagram" size={30} color={Colors.facebook} />
        <Text style={{paddingLeft: Metrics.baseMargin}}>Photo</Text>
      </View>
    </View>
  );
}
