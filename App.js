import React, {useEffect, useState} from 'react';
<<<<<<< Updated upstream
import {Platform} from 'react-native';
=======
import {Alert, Platform} from 'react-native';
>>>>>>> Stashed changes
import {PersistGate} from 'redux-persist/integration/react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {StripeProvider} from '@stripe/stripe-react-native';
import messaging, { firebase } from '@react-native-firebase/messaging';
import PushNotification, {Notifications} from 'react-native-push-notification'
import {PermissionsAndroid} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {store, persistor} from './SRC/Store/index';
import {stripeKey} from './SRC/Config';
import {
  requestCameraPermission,
  requestLocationPermission,
  requestManagePermission,
  requestNotificationPermission,
  requestReadPermission,
  requestWritePermission,
} from './SRC/Utillity/utils';
import SplashScreen from './SRC/Screens/SplashScreen';
import AppNavigator from './SRC/appNavigation';
// import AddCard from './SRC/Screens/AddCard';

<<<<<<< Updated upstream
  

=======
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  PushNotification.localNotification({
    title: remoteMessage.data.title || 'New Message',
    message: remoteMessage.data.body || 'You have received a new message',
  });
});
>>>>>>> Stashed changes

const App = () => {
  // const [publishableKey, setPublishableKey] = useState('');

  // const fetchPublishableKey = async () => {
  //   const key = await fetchKey(); // fetch key from your server here
  //   setPublishableKey(key);
  // };

  // useEffect(() => {
  //   fetchPublishableKey();
  // }, []);


  // console.reportErrorsAsExceptions = false;




 const requestUserPermission = async () =>{
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  

useEffect(()=>{


  requestUserPermission()
},[])

<<<<<<< Updated upstream
=======
  useEffect(() => {
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived:', remoteMessage);
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log('🚀 ~ useEffect ~ remoteMessage:', remoteMessage);
        if (remoteMessage && remoteMessage.data?.screen) {
          navigation.navigate(remoteMessage.data.screen, {
            messageData: remoteMessage.data,
          });
        }
      });
>>>>>>> Stashed changes


  return (
    <StripeProvider
    publishableKey={"pk_test_qblFNYngBkEdjEZ16jxxoWSM"}
    // merchantIdentifier="merchant.identifier" // required for Apple Pay
    // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
  >
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <MainContainer />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
    </StripeProvider>
  );
};

const MainContainer = () => {
  const dispatch = useDispatch();
  // firebase.initializeApp(servicesConfig);


  // fcm
  //  useEffect(() => {
  //      Notifications. ;
  //      // app opened
  //      const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //          Notifications.postLocalNotification({
  //              title: remoteMessage.notification.title,
  //              body: remoteMessage.notification.body,
  //            });
        
  //            Notifications.events().registerNotificationOpened(
  //                (notification: Notification, completion) => {
  //                    if (remoteMessage?.data?.flag == "Chat") {
  //                        navigationService.navigate("ChatScreen", {
  //                            roomId: remoteMessage?.data?.roomId,
  //                          });
  //                        }
  //                        completion();
  //                      }
  //                    );
  //                  });
                
  //                  // app opened from background
  //                  messaging().onNotificationOpenedApp((remoteMessage) => {
  //                      if (remoteMessage?.data?.flag == "Chat") {
  //                          navigationService.navigate("ChatScreen", {
  //                              roomId: remoteMessage?.data?.roomId,
  //                            });
  //                          }
  //                        });
                      
  //                        // when app is in quite state
  //                        messaging()
  //                          .getInitialNotification()
  //                          .then((remoteMessage) => {
  //                              if (remoteMessage) {
  //                                  if (remoteMessage?.data?.flag == "Chat") {
  //                                      navigationService.navigate("ChatScreen", {
  //                                          roomId: remoteMessage?.data?.roomId,
  //                                        });
  //                                      }
  //                                    }
  //                                  });
                              
  //                                // Register background handler
  //                                messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //                                    console.log("Message handled in the background!", remoteMessage);
  //                                  });
                                
  //                                  return unsubscribe;
  //                                }, []);
                                // fcm ends


                                

useEffect(() => {
    async function GetPermission() {
      await requestCameraPermission();
      await requestWritePermission();
      await requestLocationPermission();
      await requestReadPermission();
    await  requestUserPermission
  //  await   requestNotificationPermission()
      // await requestManagePermission();
      
      
    }
    console.log('>hererererer');
<<<<<<< Updated upstream
     messaging().getToken()
       .then((_token) => {
         console.log("🚀 ~mg here ================  .then ~ _token:", _token)
=======
    messaging()
      .getToken()
      .then(_token => {
        console.log('🚀 ~mg here ================  .then ~ _token:', _token);
>>>>>>> Stashed changes
        //  dispatch(SetFCMToken(_token));
       })
       .catch(() => console.log("token error"));
    GetPermission();
  }, []);

  const [isloading] = useloader(true);
  if (isloading == true) {
    return <SplashScreen />;
  }
  return <AppNavigator />;
};

const useloader = value => {
  const [isloading, setIsloading] = useState(value);
  const [loadingTime] = useState(2000);
  useEffect(() => {
    setTimeout(() => setIsloading(false), loadingTime);
  }, []);
  return [isloading];
};
export default App;
