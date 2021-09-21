import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';

import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import {Platform} from 'react-native';

const AppHeaderButton = props => {
  const isIOS = Platform.OS === 'ios';
  return (
    <HeaderButton
      IconComponent={Icon}
      iconSize={20}
      color={isIOS ? colors.primary : 'white'}
      {...props}
    />
  );
};
export default AppHeaderButton;
