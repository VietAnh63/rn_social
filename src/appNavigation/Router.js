import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Login from '../screens/LoginScreen';
import Singup from '../screens/SingupScreen';
import CreatePost from '../screens/CreatePost';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#3b5998',
  },
  headerTintColor: 'white',
  headerBackTitle: 'Back',
};
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabContainer = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <AntDesign name="profile" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const StackContainer = () => {
  var isoke = useSelector((state) => state.activeHome.isoke);

  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      {!isoke ? (
        <>
          <Stack.Screen name="SignIn" component={Login} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={TabContainer} />
          <Stack.Screen name="CreatePost" component={CreatePost} />
        </>
      )}

      <Stack.Screen name="SingUp" component={Singup} />
    </Stack.Navigator>
  );
};

const AppRoute = () => {
  return (
    <NavigationContainer>
      <StackContainer />
    </NavigationContainer>
  );
};

export default AppRoute;
