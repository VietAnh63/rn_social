import * as React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Login from '../screens/LoginScreen';
import Singup from '../screens/SingupScreen';
import CreatePost from '../screens/CreatePost';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
import {Text} from 'react-native';
import {Metrics, Fonts, Colors} from '../themes';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const CreatePostStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const TabContainer = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      inactiveColor={Colors.facebook}
      barStyle={{backgroundColor: '#009387'}}
      shifting={true}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#009387',
          tabBarIcon: ({color}) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({color}) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <HomeStack.Screen name="Home" component={Home} />
  </HomeStack.Navigator>
);

const ProfileStackScreen = ({navigation}) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#1f65ff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const CreatePostStackScreen = ({navigation}) => (
  <CreatePostStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: 'orange',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <CreatePostStack.Screen
      name="CreatePost"
      component={CreatePost}
      options={{
        headerLeft: () => (
          <AntDesign.Button
            name="left"
            size={25}
            backgroundColor="orange"
            onPress={() => navigation.navigate('Home')}>
            <Text style={{fontSize: 20, color: 'white', fontWeight: 'normal'}}>
              Back
            </Text>
          </AntDesign.Button>
        ),
      }}
    />
  </CreatePostStack.Navigator>
);

const StackContainer = () => {
  const store = useSelector((store) => store);
  const isAuth = store.auth.token;
  console.log(isAuth);
  return (
    <Drawer.Navigator initialRouteName="Home">
      {!isAuth ? (
        <>
          <Drawer.Screen name="SignIn" component={Login} />
        </>
      ) : (
        <>
          <Drawer.Screen name="Home" component={TabContainer} />
          <Stack.Screen name="CreatePost" component={CreatePostStackScreen} />
        </>
      )}

      <Drawer.Screen name="SingUp" component={Singup} />
    </Drawer.Navigator>
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
