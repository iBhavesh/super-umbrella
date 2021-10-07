import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';
import Snackbar from 'react-native-snackbar';

const AuthScreen = () => {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);

  GoogleSignin.configure({
    webClientId:
      '876202822344-7v1n3ena1hl63qfq4qe5t4n83fmlcvg0.apps.googleusercontent.com',
  });

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      // console.log(user);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleGoogleSignin = async () => {
    try {
      const response = await GoogleSignin.signIn();
      if (!response) {
        return;
      }
      const providers = await auth().fetchSignInMethodsForEmail(
        response.user.email,
      );
      if (providers.length === 0) {
        const googleCredential = auth.GoogleAuthProvider.credential(
          response.idToken,
        );
        await auth().signInWithCredential(googleCredential);
      }
      providers.forEach(async value => {
        if (value === 'google.com') {
          const googleCredential = auth.GoogleAuthProvider.credential(
            response.idToken,
          );
          await auth().signInWithCredential(googleCredential);
        } else {
          console.log('else');
          Snackbar.show({
            text: 'This account is already linked with Facebook. Please sign in with Facebook',
          });
          return;
        }
      });
    } catch (e) {
      console.log(e);
    }
    setGoogleLoading(false);
  };

  const handleFacebookSignin = async () => {
    setFacebookLoading(true);
    try {
      const response = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      // setFacebookLoading(true);

      if (response.isCancelled) {
        console.log('Login cancelled');
        setFacebookLoading(false);
        return;
      }

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        return;
      }

      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      const infoRequest = new GraphRequest(
        '/me?fields=id,name,email,picture{width:300,height:300  }',
        null,
        async (error, result) => {
          if (error) {
            console.log('Error fetching data: ' + error);
          } else {
            console.log(result);
            const providers = await auth().fetchSignInMethodsForEmail(
              result.email,
            );
            if (providers.length === 0) {
              await auth().signInWithCredential(facebookCredential);
              return;
            }
            if (providers.includes('facebook.com')) {
              setFacebookLoading(true);
              await auth().signInWithCredential(facebookCredential);
              setFacebookLoading(true);
            } else {
              Snackbar.show({
                text: 'This account is already linked with google. Please sign in with google',
              });
            }
          }
        },
      );

      // Start the graph request.
      new GraphRequestManager().addRequest(infoRequest).start();
    } catch (e) {
      console.log(e);
      setFacebookLoading(false);
    }
    setFacebookLoading(false);
  };

  const handleSignOut = () => {
    const user = auth().currentUser;

    if (user) {
      auth().signOut();
    }
    GoogleSignin.signOut();
    LoginManager.logOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Snapshots</Text>
      <Text style={styles.subtitle}>Login to continue</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/images/ic_launcher.png')}
        />
      </View>
      <View style={styles.buttonContainer}>
        {!googleLoading ? (
          <Button
            icon={{type: 'ionicon', name: 'ios-logo-google', color: 'white'}}
            title="Sign in with Google"
            containerStyle={styles.buttonStyle}
            onPress={handleGoogleSignin}
          />
        ) : (
          <ActivityIndicator size="large" />
        )}
        {!facebookLoading ? (
          <Button
            icon={{type: 'ionicon', name: 'ios-logo-facebook', color: 'white'}}
            title="Sign in with Facebook"
            containerStyle={styles.buttonStyle}
            onPress={handleFacebookSignin}
          />
        ) : (
          <ActivityIndicator size="large" />
        )}
        {/* <Button
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
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
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
