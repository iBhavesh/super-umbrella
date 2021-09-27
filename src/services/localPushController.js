import PushNotification, {Importance} from 'react-native-push-notification';

PushNotification.createChannel(
  {
    channelId: 'channel-id;', // (required)
    channelName: 'My channel', // (required)
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
  //   created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    console.log('LOCAL NOTIFICATION ==>', notification);
  },

  popInitialNotification: true,
  requestPermissions: true,
});

export const LocalNotification = channelId => {
  PushNotification.localNotification({
    channelId: 'channel-id',
    autoCancel: true,
    bigText:
      'Welcome to Snapshots! Here you can find all the great places in India!',
    subText: 'Local Notification Demo',
    title: 'Local Notification from Snapshots',
    message: 'All greate places in one place!',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
  });
};
