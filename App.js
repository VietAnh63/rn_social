import React from 'react';
import Login from './src/screens/LoginScreen';
import Signup from './src/screens/SingupScreen';
import CreatePort from './src/screens/CreatePost';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import 'react-native-gesture-handler';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HeaderNav from './src/components/HeaderNav';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import AppContainer from './src/appNavigation/AppContainer';
import {
  REHYDRATE,
  PURGE,
  persistCombineReducers,
  persistStore,
  persistReducer,
} from 'redux-persist';
// import storage from 'redux-persist/lib/storage' // or whatever storage you are using
import {PersistGate} from 'redux-persist/es/integration/react';
import AsyncStorage from '@react-native-community/async-storage';

import allReducers from './src/reducers';
import Test from './src/screens/Test';
const Stack = createStackNavigator();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['isoke'],
};
const persistedReducer = persistReducer(persistConfig, allReducers);

let store = createStore(persistedReducer);
let persistor = persistStore(store);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
