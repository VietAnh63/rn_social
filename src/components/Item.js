import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {Metrics, Fonts, Colors} from '../themes';
import {processImageUrl, processDate} from '../utils';
import FitImage from 'react-native-fit-image';
import ImageModal from 'react-native-image-modal';
export default function Item(props) {
  const {title} = props;

  return (
    <View style={{marginTop: Metrics.baseMargin}}>
      <View style={{flexDirection: 'row', paddingTop: Metrics.baseMargin}}>
        {title.user_id.avatar_url ? (
          <Image
            source={{
              uri: processImageUrl(title.user_id.avatar_url),
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
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Entypo name="location" size={20} color={Colors.facebook}></Entypo>
            <Text
              style={{
                fontFamily: Fonts.style.h6.fontFamily,
                paddingLeft: Metrics.baseMargin,
                color: Colors.facebook,
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              {title.location}
            </Text>
          </View>
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
      <View style={{justifyContent: 'center'}}>
        {title.image_url ? (
          <ImageModal
            source={{
              uri: processImageUrl(title.image_url),
            }}
            style={{
              borderRadius: 10,
              maxHeight: 400,
              height: 300,
              width: 350,
            }}
            overlayBackgroundColor={Colors.frost}
            swipeToDismiss={true}
            imageBackgroundColor="white"
            isTranslucent={true}
            resizeMode="contain"
          />
        ) : (
          <ImageModal
            source={{
              uri: 'https://loremflickr.com/320/240',
            }}
            style={{
              maxHeight: 400,
              height: 300,
              width: 355,
              borderRadius: 10,
            }}
            overlayBackgroundColor={Colors.frost}
            swipeToDismiss={true}
            resizeMode="contain"
            imageBackgroundColor="white"
            isTranslucent={true}
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
              color: 'white',
            }}>
            {processDate(title.updated_date)}
          </Text>
        </View>
      </View>
    </View>
  );
}
