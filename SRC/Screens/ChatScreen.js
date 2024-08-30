import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
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
import {GiftedChat} from 'react-native-gifted-chat';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {useIsFocused} from '@react-navigation/native';

const ChatScreen = () => {
  const isFocused = useIsFocused();
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const user = useSelector(state => state.commonReducer.userData);

  const token = useSelector(state => state.authReducer.token);

  const [searchData, setSearchData] = useState('');
  const [selectedChat, setSelectedChat] = useState({});
  const [chatData, setChatData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  
  const chatList = async () => {
    const url = `auth/chat_list`;
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
     
      setChatData(response?.data?.data);
    }
  };

  useEffect(() => {
    chatList();
  }, [isFocused]);

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
          // width: windowWidth,
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
        {isLoading ? (
          <ActivityIndicator  style={{
            // backgroundColor :'red',
            width :windowWidth,
            height :windowHeight*0.7
          }}size={'large'} color={Color.white} />
        ) : (
          <FlatList
            data={chatData}
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
            keyExtractor={item => item?.id}
            renderItem={({item, index}) => {
              return (
                <ChatCard
                  date={item?.created_at}
                  image={item?.user?.photo}
                  lastmessage={item?.message?.text}
                  name={`${item?.user?.first_name} ${item?.user?.last_name}`}
                  // unread={item?.unread}
                  unreadCount={item?.new_message_count}
                  target_id={item?.user?.id}
                  conversationId={item?.id}
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
        )}
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
