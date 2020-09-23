import React from 'react';
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
import {MenuProvider} from 'react-native-popup-menu';
import allReducers from './src/reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
};
const persistedReducer = persistReducer(persistConfig, allReducers);

export let store = createStore(persistedReducer);
let persistor = persistStore(store);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MenuProvider>
            <AppContainer />
          </MenuProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
