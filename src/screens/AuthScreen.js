import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';

const AuthScreen = () => {
  GoogleSignin.configure({
    webClientId:
      '876202822344-7v1n3ena1hl63qfq4qe5t4n83fmlcvg0.apps.googleusercontent.com',
  });

  const handleGoogleSignin = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      console.log(idToken);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to snapshots</Text>
      <Text style={styles.subtitle}>Login to continue</Text>
      <View>
        <Button
          icon={{type: 'ionicon', name: 'ios-logo-google', color: 'white'}}
          title="Sign in with Google"
          onPress={handleGoogleSignin}
        />
      </View>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 18,
  },
});
