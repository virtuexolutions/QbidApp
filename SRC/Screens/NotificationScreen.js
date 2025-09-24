import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import moment from 'moment';
import { FlatList } from 'native-base';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import NotificationCard from '../Components/NotificationCard';
import { windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../Components/CustomText';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import HelpRequestModal from '../Components/HelpRequestModal';
import { Get } from '../Axios/AxiosInterceptorFunction';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

const NotificationScreen = () => {
  const isFocused = useIsFocused();
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  console.log(userRole, 'userRoleeeeeeeeeeee')
  const token = useSelector(state => state.authReducer.token);
  const [selected, setSelected] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [helpNotification, setHelpNotification] = useState([]);
  const [memberNotifications, setMemberNotifications] = useState([]);

  const dummyData = [
    {
      image: require('../Assets/Images/man1.jpg'),
      text: '2 days left for your installment',
      name: 'Admin',
      time: moment().format('ll'),
      unread: true,
      onPress: () => {
        console.log('no action yet');
      },
    },
    {
      image: require('../Assets/Images/man1.jpg'),
      text: 'You have earned a skilled bedge',
      name: 'Admin',
      time: moment().format('ll'),
      unread: false,
      onPress: () => {
        console.log('no action yet');
      },
    },
    {
      image: require('../Assets/Images/man1.jpg'),
      text: '2 days left for your installment',
      name: 'Admin',
      time: moment().format('ll'),
      unread: true,
      onPress: () => {
        console.log('no action yet');
      },
    },
    {
      image: require('../Assets/Images/man1.jpg'),
      text: '1 days left for your installment',
      name: 'Admin',
      time: moment().format('ll'),
      unread: false,
      onPress: () => {
        console.log('no action yet');
      },
    },
    {
      image: require('../Assets/Images/man1.jpg'),
      text: '2 days left for your installment',
      name: 'Admin',
      time: moment().format('ll'),
      unread: true,
      onPress: () => {
        console.log('no action yet');
      },
    },
    {
      image: require('../Assets/Images/man1.jpg'),
      text: '2 days left for your installment',
      name: 'Admin',
      time: moment().format('ll'),
      unread: true,
      onPress: () => {
        console.log('no action yet');
      },
    },
    {
      image: require('../Assets/Images/man1.jpg'),
      text: '2 days left for your installment',
      name: 'Admin',
      time: moment().format('ll'),
      unread: true,
      onPress: () => {
        console.log('no action yet');
      },
    },
    {
      image: require('../Assets/Images/man1.jpg'),
      text: '2 days left for your installment',
      name: 'Admin',
      time: moment().format('ll'),
      unread: true,
      onPress: () => {
        console.log('no action yet');
      },
    },
  ];

  const helpNotify = async () => {
    const url = 'auth/negotiator/notification';
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      setHelpNotification(response?.data?.notification_info);
    }
  };


  const getNotifications = async () => {
    const url = 'auth/negotiator/notification';
    setIsLoading(true);
    const response = await Get(url, token);
    console.log(
      '🚀 ~ getNotifications ~ response:',
      JSON.stringify(response?.data, null, 2),
    );
    setIsLoading(false);
    if (response != undefined) {
      setMemberNotifications(response?.data?.notification_info);
    }
  };

  useEffect(() => {
    if (userRole == 'Qbid Member') {
      getNotifications();
    } else {
      helpNotify();
    }
  }, [isFocused]);

  const getDeviceToken = async () => {
    const token = await messaging().getToken();
  };

  useEffect(() => {
    getDeviceToken();
  }, []);

  return (
    <ScreenBoiler
      showHeader={true}
      statusBarBackgroundColor={
        userRole == 'Qbid Member'
          ? Color.themeBgColor
          : userRole == 'Qbid Negotiator'
            ? Color.themeBgColorNegotiator
            : Color.themebgBusinessQbidder
      }
      statusBarContentStyle={'light-content'}
      headerColor={
        userRole == 'Qbid Member'
          ? Color.themeBgColor
          : userRole == 'Qbid Negotiator'
            ? Color.themeBgColorNegotiator
            : Color.themebgBusinessQbidder
      }>
      <LinearGradient
        style={{
          height: windowHeight * 0.9,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={
          userRole == 'Qbid Member'
            ? Color.themeBgColor
            : userRole == 'Qbid Negotiator'
              ? Color.themeBgColorNegotiator
              : Color.themebgBusinessQbidder
        }>
        {isLoading ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: windowHeight * 0.8,
            }}>
            <ActivityIndicator size={'large'} color={Color.white} />
          </View>
        ) : (
          <FlatList
            data={
              userRole == 'Qbid Member' ? memberNotifications : helpNotification
            }
            showsVerticalScrollIndicator={false}
            key={item => item?.id}
            contentContainerStyle={{
              paddingBottom: moderateScale(40, 0.3),
              paddingTop: moderateScale(20, 0.3),
              alignItems: 'center',
            }}
            style={{
              minHeight: windowHeight * 0.9,
              // backgroundColor : Color.themeColor
            }}
            renderItem={({ item, index }) => {
              console.log("🚀 ~ NotificationScreen ~ item=======>:", item)
              return (
                <NotificationCard
                  image={
                    // userRole != 'Qbid Member'
                    // ? item?.user_info?.photo
                    item?.user_info?.photo
                    // : item?.image
                  }
                  // name={
                  //   userRole != 'Qbid Member'
                  //     ? `${item?.user_info?.first_name}${item?.user_info?.last_name}`
                  //     : item?.name
                  // }
                  name={`${item?.user_info?.first_name}${item?.user_info?.last_name}`}
                  // text={userRole != 'Qbid Member' ? item?.body : item.text}
                  text={item?.body}
                  unread={item.unread}
                  time={
                    // userRole != 'Qbid Member'
                    //   ? moment(item.created_at).format('ll')
                    //   : moment(item.created_at).format('ll')
                    moment(item.created_at).format('ll')
                  }
                  onPress={() => {
                    setModalVisible(true);
                    setSelected(item);
                  }}
                  // onPress={item.onPress}
                  item={item}
                />
              );
            }}
            ListHeaderComponent={() => {
              return (
                <CustomText
                  isBold
                  style={[
                    styles.header,
                    userRole != 'Qbid Member' && { color: Color.white },
                  ]}>
                  Notifications
                </CustomText>
              );
            }}
          />
        )}

        {userRole != 'Qbid Member' && (
          <HelpRequestModal
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
            // item={helpNotification}
            selected={selected}
          />
        )}
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default NotificationScreen;

const styles = ScaledSheet.create({
  header: {
    color: Color.black,
    fontSize: moderateScale(18, 0.3),
    width: windowWidth * 0.9,
  },
});
