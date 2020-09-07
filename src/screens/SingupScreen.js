import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import HeaderNav from '../components/HeaderNav';
import LinearGradient from 'react-native-linear-gradient';
import {signup} from '../service/Api';

export default function SingupScreen({navigation}) {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    repassword: '',
    firstName: '',
    lastName: '',
  });

  const onChangeInput = (value, name) => {
    setInputValue({...inputValue, [name]: value});
  };

  const onSignup = async () => {
    try {
      if (inputValue.password !== inputValue.repassword) return;
      const result = {
        email: inputValue.email,
        password: inputValue.password,
        userName: inputValue.firstName + ' ' + inputValue.lastName,
      };
      const result_create = await signup(result);
      console.log('rs', result_create);
    } catch (error) {
      console.log(error);
    }
  };

  var screenHeight = Dimensions.get('window').height;
  return (
    <ScrollView style={{minHeight: screenHeight}}>
      <View style={{backgroundColor: 'white'}}>
        <View>
          <Image
            style={{
              alignSelf: 'center',
              height: 100,
              marginTop: 33,
              resizeMode: 'contain',
            }}
            source={require('../images/logo.png')}
          />
        </View>
        <View style={signUp.form}>
          <TextInput
            style={signUp.input}
            placeholderTextColor="gray"
            placeholder="Your email"
            onChangeText={(text) => onChangeInput(text, 'email')}
          />
          <TextInput
            secureTextEntry={true}
            style={signUp.input}
            placeholderTextColor="gray"
            placeholder="Your password"
            onChangeText={(text) => onChangeInput(text, 'password')}
          />
          <TextInput
            secureTextEntry={true}
            style={signUp.input}
            placeholderTextColor="gray"
            placeholder="Confirm password"
            onChangeText={(text) => onChangeInput(text, 'repassword')}
          />
          <TextInput
            style={signUp.input}
            placeholderTextColor="gray"
            placeholder="First name"
            onChangeText={(text) => onChangeInput(text, 'firstName')}
          />
          <TextInput
            style={signUp.input}
            placeholderTextColor="gray"
            placeholder="Last name"
            onChangeText={(text) => onChangeInput(text, 'lastName')}
          />
          <LinearGradient
            style={{
              width: '75%',
              height: 45,
              borderRadius: 10,
              alignSelf: 'center',
            }}
            colors={['#fa5d57', '#facca7']}
            start={{x: 0.0, y: 0.4}}
            end={{x: 1.0, y: 1.0}}
            locations={[0.0, 1.0]}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                flex: 1,
              }}
              onPress={() => onSignup()}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 15,
                  fontWeight: 'normal',
                }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View
          style={{
            paddingBottom: 300,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'gray'}}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={{color: 'red', paddingLeft: 6}}>Login Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const signUp = StyleSheet.create({
  form: {
    paddingTop: 20,
    paddingBottom: 5,
  },
  input: {
    width: '75%',
    borderWidth: 0.5,
    alignSelf: 'center',
    borderRadius: 8,
    height: 45,
    padding: 5,
    marginBottom: 10,
  },
});
