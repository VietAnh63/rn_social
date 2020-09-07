import React, {useState, Fragment, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {loginHome} from '../actions/actionLogin';
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {Metrics, Fonts, Colors} from '../themes';
import {login} from '../service/Api';

export default function LoginScreen({navigation}) {
  const [inputValue, setInputValue] = useState({
    email: 'vietanhdeptrai@gmail.com',
    password: '123456',
  });
  const disPatch = useDispatch();
  var isoke = useSelector((state) => state.activeHome.isoke);

  const onChangeInput = (value, name) => {
    setInputValue({...inputValue, [name]: value});
  };

  const onLogin = async () => {
    try {
      console.log('isoke', isoke);
      const result = await login(inputValue);
      console.log('result', result);
      if (result.status === 200) {
        const action = await loginHome(isoke);
        await disPatch(action);
      }
      console.log('isoke', isoke);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={style_login.login_view}>
      <Image style={style_login.logo} source={require('../images/logo.png')} />
      <View style={style_login.form}>
        <TextInput
          style={style_login.input}
          placeholderTextColor="gray"
          placeholder="Your email"
          onChangeText={(text) => onChangeInput(text, 'email')}
          value={inputValue}
        />
        <TextInput
          style={style_login.input}
          placeholderTextColor="gray"
          placeholder="Your password"
          onChangeText={(text) => onChangeInput(text, 'password')}
          value={inputValue}
          secureTextEntry={true}
        />
        <LinearGradient
          style={{
            width: '70%',
            height: 45,
            borderRadius: 10,
            alignSelf: 'center',
          }}
          colors={['#fa5d57', '#facca7']}
          start={{x: 0.0, y: 0.4}}
          end={{x: 1.0, y: 1.0}}
          locations={[0.0, 1.0]}>
          <Fragment>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                flex: 1,
              }}
              onPress={() => onLogin()}>
              <Text style={style_login.text}>Login</Text>
            </TouchableOpacity>
          </Fragment>
        </LinearGradient>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            paddingTop: 10,
          }}>
          <Text>No Account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.push('SingUp');
              //checkLogin();
            }}>
            <Text style={{color: 'red', paddingLeft: 5, fontWeight: 'bold'}}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={style_login.footer}>
        <Text>App by VietAnh</Text>
      </View>
    </View>
  );
}
const style_login = StyleSheet.create({
  login_view: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  logo: {
    marginTop: '10%',
    resizeMode: 'contain',
    width: '30%',
    flex: 1,
    alignSelf: 'center',
  },
  form: {
    marginBottom: '7%',
    flex: 2.5,
  },
  input: {
    width: '70%',
    borderWidth: 0.5,
    height: 45,
    borderRadius: 9,
    borderColor: 'gray',
    marginBottom: 7,
    paddingHorizontal: 15,
    alignSelf: 'center',
  },
  text: {
    fontFamily: 'Gill Sans',
    fontSize: 18,
    alignSelf: 'center',
  },
  footer: {
    flex: 0.5,
    alignSelf: 'center',
    marginBottom: '1%',
  },
});
