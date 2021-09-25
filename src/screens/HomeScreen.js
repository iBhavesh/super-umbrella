import React, {useState, useLayoutEffect, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View, Button} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import AppHeaderButton from '../components/AppHeaderButton';
import PlaceListItem from '../components/PlaceListItem';
import {LocalNotification} from '../services/localPushController';

const MOCK_DATA = [
  {
    id: 1,
    title: 'Indian Museum',
    loc: {latitude: 22.55777862037989, longitude: 88.35104629397392},
  },
  {
    id: 2,
    title: 'Lake Mall',
    loc: {latitude: 22.51665426684313, longitude: 88.34888979792596},
  },
  {
    id: 3,
    title: 'Quest Mall',
    loc: {latitude: 22.538898860539007, longitude: 88.36563885211945},
  },
  {
    id: 4,
    title: 'South City',
    loc: {latitude: 22.50173963826541, longitude: 88.36188443005085},
  },
];

const HomeScreen = ({navigation}) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    setPlaces(MOCK_DATA);
  }, [setPlaces]);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
  //         <Item iconName="ios-add" iconSize={30} style={{marginRight: -15}} />
  //       </HeaderButtons>
  //     ),
  //   });
  // }, [navigation]);

  const renderItem = ({item}) => {
    return <PlaceListItem data={item} />;
  };

  const handleClick = () => {
    LocalNotification();
  };

  return (
    <View>
      <FlatList
        contentContainerStyle={styles.list}
        data={places}
        renderItem={renderItem}
      />
      <Button title="Local Notification" onPress={handleClick} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  list: {
    padding: 5,
    justifyContent: 'space-between',
  },
});
