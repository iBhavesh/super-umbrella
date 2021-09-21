import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './navigator/RootNavigator';
import {StatusBar} from 'react-native';
import colors from './constants/colors';

const Main = () => {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={colors.primaryDark}
        barStyle="light-content"
      />
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Main;
