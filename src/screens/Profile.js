import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {Metrics, Fonts, Colors} from '../themes';
import AntDMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-picker';
import {removeAuth} from '../actions/authAction';
import {upLoadAvatar, getall, getMe} from '../service/Api';
import {processImageUrl} from '../utils';
import {setMe} from '../actions/authAction';

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default function Profile({navigation}) {
  console.log(navigation);
  const [imagePicker, setImagePicker] = useState({});
  const [data, setData] = useState();

  const user = useSelector((store) => store.auth.me);
  console.log(user);

  console.log('imagePicker', imagePicker);
  console.log('data', data);
  const onUpload = async () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {
          uri: String(response.uri),
          name: String(response.fileName),
          type: String(response.type),
        };
        setImagePicker(source);
        onUpImage(source);
      }
    });
  };

  const onUpImage = async (sourceImg) => {
    let form = new FormData();
    sourceImg && sourceImg.uri && form.append('avatarUrl', sourceImg);
    try {
      const result = await upLoadAvatar(form);
      console.log('result_success', result);
    } catch (error) {
      console.log('error', error);
    }
  };

  const disPatch = useDispatch();

  const confirm = () => {
    Alert.alert(
      'Bạn muốn đăng xuất?',
      '',
      [
        {
          text: 'Bỏ qua',
          style: 'cancel',
        },

        {
          text: 'Đồng ý',
          onPress: () => onLogout(),
        },
      ],
      {cancelable: false},
    );
  };

  const onLogout = async () => {
    try {
      const action = await removeAuth();
      await disPatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  var screenHeight = Dimensions.get('window').height;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView style={{minHeight: screenHeight}}>
        <View
          style={{
            paddingTop: Metrics.baseMargin + 30,
            flexDirection: 'column',
            padding: Metrics.baseMargin,
            backgroundColor: Colors.frost,
            color: 'transparent',
          }}>
          <View>
            <View
              style={{
                alignItems: 'center',
                paddingTop: Metrics.baseMargin,
              }}>
              <Image
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 120 / 2,
                  borderWidth: 0.3,
                  position: 'absolute',
                }}
                source={{uri: imagePicker.uri || user.avatar_url}}
              />

              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 40 / 2,
                  borderWidth: 0.5,
                  backgroundColor: 'blue',
                  justifyContent: 'center',
                  alignItems: 'center',
                  top: 80,
                  left: 40,
                }}>
                <TouchableOpacity onPress={() => onUpload()}>
                  <AntDMaterialCommunityIcons
                    name="camera-plus"
                    size={25}
                    color={'white'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              top: 140,
              alignItems: 'center',
              marginBottom: '110%',
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                padding: Metrics.baseMargin,
                backgroundColor: 'white',
                borderWidth: 0.2,
                width: '95%',
                borderRadius: 10,
              }}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomWidth: 0.2,
                  }}>
                  <FontAwesome
                    name="envelope-o"
                    size={25}
                    color={Colors.facebook}
                  />
                  <Text style={{padding: Metrics.baseMargin + 7}}>
                    Become a member
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomWidth: 0.2,
                  }}>
                  <MaterialIcons
                    name="help-outline"
                    size={25}
                    color={Colors.facebook}
                  />
                  <Text style={{padding: Metrics.baseMargin + 7}}>Help</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomWidth: 0.2,
                  }}>
                  <AntDesign
                    name="customerservice"
                    size={25}
                    color={Colors.facebook}
                  />
                  <Text
                    style={{
                      padding: Metrics.baseMargin + 7,
                    }}>
                    Terms of service
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Foundation name="shield" size={25} color={Colors.facebook} />
                  <Text style={{padding: Metrics.baseMargin + 7}}>
                    Private policy
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                padding: Metrics.baseMargin,
                backgroundColor: 'white',
                borderWidth: 0.2,
                width: '95%',
                borderRadius: 10,
                alignSelf: 'center',
                top: 40,
              }}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomWidth: 0.2,
                  }}>
                  <FontAwesome name="gears" size={25} color={Colors.facebook} />
                  <Text style={{padding: Metrics.baseMargin + 7}}>
                    Settings
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Entypo name="log-out" size={25} color="red" />
                  <TouchableOpacity onPress={() => confirm()}>
                    <Text
                      style={{padding: Metrics.baseMargin + 7, color: 'red'}}>
                      Logout
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
