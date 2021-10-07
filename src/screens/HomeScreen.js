import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Button,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Geolocation from 'react-native-geolocation-service';
import auth from '@react-native-firebase/auth';

import AppHeaderButton from '../components/AppHeaderButton';
import PlaceListItem from '../components/PlaceListItem';
import {LocalNotification} from '../services/localPushController';
import {LoginManager} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const MOCK_DATA = [
  {
    id: 1,
    title: 'Indian Museum',
    imageUrl: require('../assets/images/indianmuseum.jpeg'),
    loc: {latitude: 22.55777862037989, longitude: 88.35104629397392},
  },
  {
    id: 2,
    title: 'Lake Mall',
    imageUrl: require('../assets/images/lakemall.jpeg'),

    loc: {latitude: 22.51665426684313, longitude: 88.34888979792596},
  },
  {
    id: 3,
    title: 'Quest Mall',
    imageUrl: require('../assets/images/questmall.jpeg'),
    loc: {latitude: 22.538898860539007, longitude: 88.36563885211945},
  },
  {
    id: 4,
    title: 'South City',
    imageUrl: require('../assets/images/southcitymall.jpeg'),
    loc: {latitude: 22.50173963826541, longitude: 88.36188443005085},
  },
];

const HomeScreen = ({navigation}) => {
  const [places, setPlaces] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    setPlaces(MOCK_DATA);
  }, [setPlaces]);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
  //         <Item
  //           iconName="ios-add"
  //           iconSize={30}
  //           // eslint-disable-next-line react-native/no-inline-styles
  //           style={{marginRight: -15}}
  //           onPress={() => navigation.navigate('Detail')}
  //         />
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

  const handleCurrentLocationClick = async () => {
    const permission = await PermissionsAndroid.request(
      'android.permission.ACCESS_FINE_LOCATION',
    );
    if (permission !== 'granted') {
      return Alert.alert(
        'Error',
        'To access location you need to provide location permission',
      );
    }
    setLocationLoading(true);
    Geolocation.getCurrentPosition(
      response => {
        setLocationLoading(false);
        navigation.navigate('Detail', {
          latitude: response.coords.latitude,
          longitude: response.coords.longitude,
        });
      },
      error => {
        setLocationLoading(false);
        Alert.alert(
          'Oops',
          'Something went wrong while fetching location. Please check your location service is enabled',
        );
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 15000,
      },
    );
  };

  const handleSignOut = () => {
    GoogleSignin.signOut();
    LoginManager.logOut();
    if (auth().currentUser) {
      auth().signOut();
    }
  };

  const marginTop = 20;
  return (
    <View>
      <FlatList
        contentContainerStyle={styles.list}
        data={places}
        renderItem={renderItem}
      />
      <View style={styles.container}>
        <View style={{marginTop: marginTop}}>
          <Button title="Local Push Notification" onPress={handleClick} />
        </View>
        <View style={{marginTop: marginTop}}>
          <Button
            title="Current Location"
            onPress={handleCurrentLocationClick}
            disabled={locationLoading}
          />
        </View>
        <View style={{marginTop: marginTop}}>
          <Button title="Sign out" onPress={handleSignOut} />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  list: {
    padding: 5,
    justifyContent: 'space-between',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
