import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ProfileScreen from '../screens/ProfileScreen';
import RootNavigator from './RootNavigator';
import {Icon} from 'react-native-elements';
import colors from '../constants/colors';
import {isIOS} from 'react-native-elements/dist/helpers';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Profile">
      <Tab.Screen
        name="HomeNavigator"
        component={RootNavigator}
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: () => <Icon type="ionicon" name="ios-grid" />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => <Icon type="ionicon" name="ios-person" />,
          headerTintColor: !isIOS ? colors.primaryText : colors.primary,
          headerStyle: !isIOS ? {backgroundColor: colors.primary} : {},
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
