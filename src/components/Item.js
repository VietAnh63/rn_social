import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Metrics, Fonts, Colors} from '../themes';

export default function Item(props) {
  //console.log(dataAPI);
  const {title} = props;
  const processImage = (url) => {
    const str = url;
    const linkImage = str.split('/');
    return String(linkImage[1]);
  };
  //console.log(title.user_id.avatar_url);
  return (
    <View style={{marginTop: Metrics.baseMargin}}>
      <View style={{flexDirection: 'row', paddingTop: Metrics.baseMargin}}>
        {title.user_id.avatar_url ? (
          <Image
            source={{
              uri:
                'http://social.hungvu.net/' +
                processImage(title.user_id.avatar_url),
            }}
            style={{
              height: 50,
              width: 50,
              borderRadius: 50 / 2,
              marginRight: Metrics.baseMargin,
              borderWidth: 1,
              backgroundColor: 'green',
            }}
          />
        ) : (
          false
        )}

        <View style={{alignSelf: 'center'}}>
          <Text
            style={{
              fontSize: Fonts.size.input,
              fontWeight: 'bold',
              color: '#1fd092',
            }}>
            {title.user_id.user_name}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.style.h6.fontFamily,
              backgroundColor: '#1fd092',
            }}>
            {title.created_date}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          padding: Metrics.baseMargin,
          fontFamily: Fonts.style.description.fontFamily,
          fontSize: Fonts.style.description.fontSize,
          color: '#F7F7F7',
        }}>
        <Text>{title.content}</Text>
      </View>
      <View>
        {title.image_url ? (
          <Image
            source={{
              uri: 'http://social.hungvu.net/' + processImage(title.image_url),
            }}
            style={{
              maxHeight: 400,
              height: 300,
              width: '100%',
              marginRight: Metrics.baseMargin,
            }}
          />
        ) : (
          <Image
            source={{
              uri: 'https://loremflickr.com/320/240',
            }}
            style={{
              maxHeight: 400,
              height: 300,
              width: '100%',
              marginRight: Metrics.baseMargin,
            }}
          />
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: Metrics.baseMargin,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AntDesign name="like1" size={30} color={Colors.facebook} />
          <Text style={{paddingLeft: Metrics.baseMargin, paddingTop: 6}}>
            {title.likes.length}
          </Text>
        </View>
        <View>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'normal',
              fontFamily: Fonts.style.description.fontFamily,
              paddingTop: 6,
              backgroundColor: '#1fd092',
            }}>
            {title.updated_date}
          </Text>
        </View>
      </View>
    </View>
  );
}
