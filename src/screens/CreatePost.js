import React, {useState} from 'react';
import {View, Text, Image, TextInput, Platform} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Metrics, Fonts, Colors} from '../themes';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import {createPost} from '../service/Api';
const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default function CreatePost() {
  const [valueInput, setValueInput] = useState({});
  const [imageData, setImageData] = useState({});
  const onChangeText = (text) => {
    setValueInput((prev) => ({...valueInput, content: text}));
  };

  const onUpload = () => {
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
          uri:
            Platform.OS === 'ios'
              ? response.uri.replace('file://', '')
              : response.uri,
          name: response.fileName,
          type: response.type,
        };
        setImageData(source);
      }
    });
  };

  const onPost = async () => {
    let form = new FormData();
    form.append('title', 'test post');
    form.append('content', valueInput.content);
    form.append('location', 'Hà Nội');
    form.append('imageUrl', imageData);

    const result = await createPost(form);
    console.log('result', result);
  };

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
              borderWidth: 0.3,
              backgroundColor: 'green',
            }}
            source={require('../images/anhpv.jpg')}
          />
          <Text style={{paddingLeft: Metrics.baseMargin, alignSelf: 'center'}}>
            User admin
          </Text>
        </View>
        <View style={{padding: Metrics.baseMargin}}>
          <TextInput
            placeholder="Bạn đang nghĩ gì"
            placeholderTextColor="gray"
            multiline={true}
            onChangeText={(text) => onChangeText(text)}
            value={valueInput.content}
          />
          {imageData && imageData.uri ? (
            <Image
              source={{uri: imageData.uri}}
              resizeMode="cover"
              style={{height: 100, width: '100%'}}
            />
          ) : null}
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: 'orange',
            height: 30,
            alignItems: 'center',
            borderWidth: 0.2,
            borderRadius: 10,
            width: '20%',
            alignSelf: 'center',
            justifyContent: 'center',
          }}
          onPress={() => onPost()}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              alignItems: 'center',
              fontWeight: 'bold',
            }}>
            POST
          </Text>
        </TouchableOpacity>
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
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => onUpload()}>
          <AntDesign name="instagram" size={30} color={Colors.facebook} />
          <Text style={{paddingTop: Metrics.baseMargin}}>Photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
