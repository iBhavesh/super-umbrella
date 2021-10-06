import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import {AccessToken, LoginManager, Profile} from 'react-native-fbsdk-next';

const AuthScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  GoogleSignin.configure({
    webClientId:
      '876202822344-7v1n3ena1hl63qfq4qe5t4n83fmlcvg0.apps.googleusercontent.com',
  });

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      console.log(user);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleGoogleSignin = async () => {
    try {
      setLoading(true);
      const {idToken} = await GoogleSignin.signIn();
      console.log(idToken);
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log(googleCredential);
      await auth().signInWithCredential(googleCredential);
      setLoading(false);
      navigation.replace('Home');
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const handleFacebookSignin = async () => {
    try {
      const response = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (response.isCancelled) {
        console.log('Login cancelled');
        return;
      }
      console.log(Profile());

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        console.log('AccessToken not found');
        return;
      }

      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      console.log(facebookCredential);
      // await auth().signInWithCredential(facebookCredential);
    } catch (e) {
      if (e.code === 'auth/account-exists-with-different-credential') {
        // console.log(auth.FacebookAuthProvider.);
      }
    }
  };

  const handleSignOut = () => {
    const user = auth().currentUser;

    if (user) {
      GoogleSignin.signOut();
      LoginManager.logOut();
      auth().signOut();
    }
  };

  return (
    <View style={styles.container}>
      <Modal visible={loading} transparent={true} animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.1)',
          }}>
          <ActivityIndicator size={40} />
        </View>
      </Modal>
      <Text style={styles.text}>Welcome to Snapshots</Text>
      <Text style={styles.subtitle}>Login to continue</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/images/ic_launcher.png')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          icon={{type: 'ionicon', name: 'ios-logo-google', color: 'white'}}
          title="Sign in with Google"
          containerStyle={styles.buttonStyle}
          onPress={handleGoogleSignin}
        />
        {/* <Button
          icon={{type: 'ionicon', name: 'ios-logo-facebook', color: 'white'}}
          title="Sign in with Facebook"
          containerStyle={styles.buttonStyle}
          onPress={handleFacebookSignin}
        />
        <Button
          title="Sign out"
          containerStyle={styles.buttonStyle}
          onPress={handleSignOut}
        /> */}
      </View>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonStyle: {
    marginBottom: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 50,
  },
  image: {
    height: 100,
    width: 100,
  },
  imageContainer: {
    marginTop: 70,
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 18,
  },
});
