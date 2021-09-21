import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

const PlaceListItem = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.containerPressable}
        android_ripple={{color: 'gray'}}
        onPress={() => {
          navigation.navigate('Detail', props.data.loc);
        }}>
        <Text style={styles.title}>{props.data.title}</Text>
        <Text style={styles.subTitle}>
          {props.data.loc.latitude}, {props.data.loc.longitude}
        </Text>
      </Pressable>
    </View>
  );
};

export default PlaceListItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginVertical: 5,
    elevation: 3,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  containerPressable: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
  },
  subTitle: {
    fontSize: 18,
    color: 'gray',
  },
});
