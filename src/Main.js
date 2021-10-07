import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import auth from '@react-native-firebase/auth';

import colors from './constants/colors';
import TabNavigator from './navigator/TabNavigator';
import AuthScreen from './screens/AuthScreen';

const Main = () => {
  const [authenticated, setAuthenticated] = useState(undefined);
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setAuthenticated(!!user);
    });
    return subscriber; // unsubscribe on unmount
  }, [authenticated]);

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={colors.primaryDark}
        barStyle="light-content"
      />
      {authenticated ? <TabNavigator /> : <AuthScreen />}
    </NavigationContainer>
  );
};

export default Main;
