import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {StripeProvider} from '@stripe/stripe-react-native';
// import messaging, { firebase } from '@react-native-firebase/messaging';
import {NativeBaseProvider} from 'native-base';
import {store, persistor} from './SRC/Store/index';
import {stripeKey} from './SRC/Config';
import {
  requestCameraPermission,
  requestLocationPermission,
  requestManagePermission,
  requestReadPermission,
  requestWritePermission,
} from './SRC/Utillity/utils';
import SplashScreen from './SRC/Screens/SplashScreen';
import AppNavigator from './SRC/appNavigation';
import AddCard from './SRC/Screens/AddCard';



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
    //    Notifications.registerRemoteNotifications();
    //    // app opened
    //    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      //      Notifications.postLocalNotification({
        //        title: remoteMessage.notification.title,
        //        body: remoteMessage.notification.body,
        //      });
        
        //      Notifications.events().registerNotificationOpened(
          //        (notification: Notification, completion) => {
            //          if (remoteMessage?.data?.flag == "Chat") {
              //            navigationService.navigate("ChatScreen", {
                //              roomId: remoteMessage?.data?.roomId,
                //            });
                //          }
                //          completion();
                //        }
                //      );
                //    });
                
                //    // app opened from background
                //    messaging().onNotificationOpenedApp((remoteMessage) => {
                  //      if (remoteMessage?.data?.flag == "Chat") {
                    //        navigationService.navigate("ChatScreen", {
                      //          roomId: remoteMessage?.data?.roomId,
                      //        });
                      //      }
                      //    });
                      
                      //    // when app is in quite state
                      //    messaging()
                      //      .getInitialNotification()
                      //      .then((remoteMessage) => {
                        //        if (remoteMessage) {
                          //          if (remoteMessage?.data?.flag == "Chat") {
                            //            navigationService.navigate("ChatScreen", {
                              //              roomId: remoteMessage?.data?.roomId,
                              //            });
                              //          }
                              //        }
                              //      });
                              
                              //    // Register background handler
                              //    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
                                //      console.log("Message handled in the background!", remoteMessage);
                                //    });
                                
                                //    return unsubscribe;
                                //  }, []);
                                // fcm ends

                                useEffect(() => {
    async function GetPermission() {
      await requestCameraPermission();
      await requestWritePermission();
      await requestLocationPermission();
      await requestReadPermission();
      // await requestManagePermission();
      
      
    }


    // console.log('hererererer');
    //  messaging()
    //    .getToken()
    //    .then((_token) => {
    //      console.log("🚀 ~ .then ~ _token:", _token)
    //     //  dispatch(SetFCMToken(_token));
    //    })
    //    .catch(() => console.log("token error"));
    // GetPermission();
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
