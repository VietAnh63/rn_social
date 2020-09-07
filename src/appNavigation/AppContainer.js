import React, {useEffect} from 'react';
import {View, Text, Button, BackHandler, Alert} from 'react-native';
import NavigationService from './NavigationService';
import TopLevelNavigator from './Router';

export default function AppContainer() {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.addEventListener('handwareBackPress', handleBackButton);
    };
  }, []);
  const handleBackButton = () => {
    return true;
  };

  return (
    <TopLevelNavigator
      ref={(navigatorRef) => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
  );
}
