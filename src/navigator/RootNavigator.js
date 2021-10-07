import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Platform} from 'react-native';

import colors from '../constants/colors';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const isIOS = Platform.OS === 'ios';
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: !isIOS ? colors.primaryText : colors.primary,
        headerStyle: !isIOS ? {backgroundColor: colors.primary} : {},
      }}>
      <Stack.Screen
        name="Home"
        options={{title: 'Snapshots'}}
        component={HomeScreen}
      />
      <Stack.Screen
        name="Detail"
        options={{title: 'Detail'}}
        component={MapScreen}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
