import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Metrics, Fonts, Colors} from '../themes';
import ImagePicker from 'react-native-image-picker';
import {createPost} from '../service/Api';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default function CreatePost({navigation}) {
  const [valueInput, setValueInput] = useState({content: ''});
  const [imageData, setImageData] = useState({});
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{flexDirection: 'row', padding: Metrics.baseMargin}}
          name="right"
          size={25}
          backgroundColor="orange"
          onPress={() => onPost()}>
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              fontWeight: 'normal',
              paddingRight: Metrics.baseMargin,
            }}>
            Send
          </Text>
          <FontAwesome name="send" color="white" size={20} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, imageData, valueInput]);
  const onChangeText = (text) => {
    setValueInput({...valueInput, content: text});
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
          uri: String(response.uri),
          name: String(response.fileName),
          type: String(response.type),
        };
        setImageData(source);
      }
    });
  };
  console.log('imageData', imageData);

  const onPost = async () => {
    let form = new FormData();
    if (!valueInput.content && !imageData.uri) {
      Alert.alert('Chưa có nội dung chưa thể Post bài');
      return;
    }
    if (valueInput.content && !imageData.uri) {
      form.append('title', 'test post');
      form.append('content', valueInput.content);
      form.append('location', 'Hà Nội');
    }

    if (imageData.uri && !valueInput.content) {
      form.append('title', 'test post');
      form.append('imageUrl', imageData);
      form.append('content', ' ');
      form.append('location', 'Hà Nội');
    }
    if (imageData.uri && imageData.uri && valueInput.content) {
      form.append('title', 'test post');
      form.append('imageUrl', imageData);
      form.append('content', valueInput.content);
      form.append('location', 'Hà Nội');
    }

    try {
      const result = await createPost(form);
      console.log('result', result);
      if (result.status === 200) {
        navigation.goBack();
      }
      setValueInput({content: ''});
      setImageData({});
    } catch (error) {
      console.log('error', error);
    }
  };

  const removeImage = async () => {
    setImageData({});
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
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
            <Text
              style={{paddingLeft: Metrics.baseMargin, alignSelf: 'center'}}>
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
              sytle={{marginBottom: Metrics.baseMargin}}
            />
            {imageData && imageData.uri ? (
              <View style={{}}>
                <Image
                  source={{uri: imageData.uri}}
                  resizeMode="cover"
                  style={{
                    height: 350,
                    width: '100%',
                    marginTop: Metrics.baseMargin,
                    position: 'absolute',
                  }}
                />
                <TouchableOpacity
                  style={{top: 0, left: -Metrics.baseMargin}}
                  onPress={() => removeImage()}>
                  <MaterialIcons name="cancel" size={30} color={Colors.frost} />
                </TouchableOpacity>
              </View>
            ) : null}
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
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => onUpload()}>
            <AntDesign name="instagram" size={30} color={Colors.facebook} />
            <Text style={{paddingTop: Metrics.baseMargin}}>Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
