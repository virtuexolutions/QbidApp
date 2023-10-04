import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import moment from 'moment';
import {FlatList} from 'native-base';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import NotificationCard from '../Components/NotificationCard';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../Components/CustomText';
import {useSelector} from 'react-redux';

const NotificationScreen = () => {
  const userRole = useSelector(state => state.commonReducer.selectedRole);

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
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={
          userRole == 'Qbid Member'
      ? Color.themeBgColor
      : userRole == 'Qbid Negotiator'
      ? Color.themeBgColorNegotiator
      : Color.themebgBusinessQbidder
        }>
        <FlatList
          data={dummyData}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: moderateScale(40, 0.3),
            paddingTop: moderateScale(20, 0.3),
            alignItems: 'center',
          }}
          style={{
            minHeight: windowHeight * 0.9,
            // backgroundColor : Color.themeColor
          }}
          renderItem={({item, index}) => {
            return (
              <NotificationCard
                image={item.image}
                name={item.name}
                text={item.text}
                unread={item.unread}
                time={item.time}
                onPress={item.onPress}
              />
            );
          }}
          ListHeaderComponent={() => {
            return (
              <CustomText
                isBold
                style={[
                  styles.header,
                  userRole == 'Qbid Negotiator' && {color: Color.white},
                ]}>
                Notifications
              </CustomText>
            );
          }}
        />
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
