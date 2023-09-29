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
import SearchContainer from '../Components/SearchContainer';
import {useState} from 'react';
import ChatCard from '../Components/ChatCard';
import {useSelector} from 'react-redux';

const ChatScreen = () => {
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const [searchData, setSearchData] = useState('');

  const chatListingData = [
    {
      name: 'Walter A. Jones',
      image: require('../Assets/Images/dummyman1.png'),
      lastMessage: 'hello bro how are you',
      unread: true,
      unreadCount: 4,
      time: moment('2023-02-10').format('YYYY-MM-DD'),
      // time : moment().format()
    },
    {
      name: 'Josephine A. Suarez',
      image: require('../Assets/Images/dummyman2.png'),
      lastMessage:
        'Will you please nupdate me about my last Qbid about vehicle parts',
      unread: false,
      // unreadCount : 4,
      time: moment('2023-02-15').format('YYYY-MM-DD'),
    },
    {
      name: 'Ronald N. Voegele',
      image: require('../Assets/Images/dummyman3.png'),
      lastMessage: '??',
      unread: true,
      unreadCount: 2,
      time: moment('2023-01-14').format('YYYY-MM-DD'),
    },
    {
      name: 'Josephine A. Suarez',
      image: require('../Assets/Images/dummyman4.png'),
      lastMessage: 'Loved to work with you thanks',
      unread: true,
      unreadCount: 6,
      time: moment('2023-02-20').format('YYYY-MM-DD'),
    },
    {
      name: 'Josephine A. Suarez',
      image: require('../Assets/Images/dummyman5.png'),
      lastMessage: 'there?',
      unread: false,
      // unreadCount : 1,
      time: moment('2023-02-16').format('YYYY-MM-DD'),
    },
    {
      name: 'Josephine A. Suarez',
      image: require('../Assets/Images/dummyman6.png'),
      lastMessage: 'please update me about my money',
      unread: true,
      unreadCount: 4,
      time: moment('2023-02-10').format('YYYY-MM-DD'),
    },
    {
      name: 'Walter A. Jones',
      image: require('../Assets/Images/dummyman1.png'),
      lastMessage: 'hello bro how are you',
      unread: true,
      unreadCount: 4,
      time: moment('2023-02-10').format('YYYY-MM-DD'),
      // time : moment().format()
    },
    {
      name: 'Josephine A. Suarez',
      image: require('../Assets/Images/dummyman2.png'),
      lastMessage:
        'Will you please nupdate me about my last Qbid about vehicle parts',
      unread: false,
      // unreadCount : 4,
      time: moment('2023-02-15').format('YYYY-MM-DD'),
    },
    {
      name: 'Ronald N. Voegele',
      image: require('../Assets/Images/dummyman3.png'),
      lastMessage: '??',
      unread: true,
      unreadCount: 2,
      time: moment('2023-01-14').format('YYYY-MM-DD'),
    },
    {
      name: 'Walter A. Jones',
      image: require('../Assets/Images/dummyman1.png'),
      lastMessage: 'hello bro how are you',
      unread: true,
      unreadCount: 4,
      time: moment('2023-02-10').format('YYYY-MM-DD'),
      // time : moment().format()
    },
    {
      name: 'Josephine A. Suarez',
      image: require('../Assets/Images/dummyman2.png'),
      lastMessage:
        'Will you please nupdate me about my last Qbid about vehicle parts',
      unread: false,
      // unreadCount : 4,
      time: moment('2023-02-15').format('YYYY-MM-DD'),
    },
  ];
  return (
    <ScreenBoiler
      showHeader={true}
      statusBarBackgroundColor={
        userRole == 'Qbid Member'
          ? Color.themeBgColor
          : Color.themeBgColorNegotiator
      }
      statusBarContentStyle={'light-content'}
      headerColor={
        userRole == 'Qbid Member'
          ? Color.themeBgColor
          : Color.themeBgColorNegotiator
      }>
      <LinearGradient
        style={{
          // width: windowWidth,
          height: windowHeight * 0.9,
        }}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={
          userRole == 'Qbid Member'
            ? Color.themeBgColor
            : Color.themeBgColorNegotiator
        }>
        <SearchContainer
          width={windowWidth * 0.9}
          input
          inputStyle={{
            height: windowHeight * 0.05,
          }}
          style={{
            height: windowHeight * 0.06,
            marginTop: moderateScale(20, 0.3),
            borderRadius: moderateScale(5, 0.3),
            alignSelf: 'center',
          }}
          data={searchData}
          setData={setSearchData}
        />

        <FlatList
          data={chatListingData}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: moderateScale(100, 0.3),
            paddingTop: moderateScale(20, 0.3),
            alignItems: 'center',
          }}
          style={{
            minHeight: windowHeight * 0.9,
            // backgroundColor : Color.themeColor
          }}
          renderItem={({item, index}) => {
            return (
              <ChatCard
                date={item?.time}
                image={item?.image}
                lastmessage={item?.lastMessage}
                name={item?.name}
                unread={item?.unread}
                unreadCount={item?.unreadCount}
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
                Chats
              </CustomText>
            );
          }}
        />
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default ChatScreen;

const styles = ScaledSheet.create({
  header: {
    color: Color.black,
    fontSize: moderateScale(18, 0.3),
    width: windowWidth * 0.9,
  },
});
