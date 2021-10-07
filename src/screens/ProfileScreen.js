import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {Input, Text} from 'react-native-elements';
import {
  GraphRequest,
  GraphRequestManager,
  Profile,
} from 'react-native-fbsdk-next';

const ProfileScreen = () => {
  const [userData, setUserData] = useState({
    email: '',
    name: '',
    picture: {
      data: {
        url: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
      },
    },
  });
  const [facebookLogin, setFacebookLogin] = useState(false);

  useEffect(() => {
    Profile.getCurrentProfile().then(res => setFacebookLogin(!!res));

    if (!facebookLogin) {
      return;
    }
    const infoRequest = new GraphRequest(
      '/me?fields=id,name,email,picture.height(200)',
      null,
      (error, result) => {
        if (error) {
          console.log('Error fetching data: ' + error);
        } else {
          setUserData(result);
        }
      },
    );

    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();
  }, [facebookLogin]);

  if (!facebookLogin) {
    return (
      <View>
        <Text h4>Only available for Facebook login</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: userData.picture.data.url,
          }}
        />
      </View>
      <Input
        label="Full name"
        labelStyle={styles.labelStyle}
        value={userData.name}
        disabled
        disabledInputStyle={styles.inputStyle}
      />
      <Input
        label="Email"
        labelStyle={styles.labelStyle}
        value={userData.email}
        disabled
        disabledInputStyle={styles.inputStyle}
      />
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    paddingTop: 5,
    marginVertical: 25,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  inputStyle: {
    // fontSize: 20,
    // fontWeight: '500',
    color: '#000',
    opacity: 1,
  },
  labelStyle: {
    fontSize: 16,
    opacity: 0.7,
    color: 'black',
  },
  title: {
    fontSize: 30,
  },
  subTitle: {
    fontSize: 24,
    color: 'gray',
  },
});
