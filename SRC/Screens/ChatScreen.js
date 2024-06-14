import {StyleSheet, Text, View} from 'react-native';
import React, { useCallback, useEffect } from 'react';
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
import { GiftedChat } from 'react-native-gifted-chat'
import { Get } from '../Axios/AxiosInterceptorFunction';

const ChatScreen = () => {
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const user = useSelector(state => state.commonReducer.userData);
  // console.log("🚀 ~ ChatScreen ~ user:", user?.id , user?.first_name)

  const token = useSelector(state => state.authReducer.token);

  const [searchData, setSearchData] = useState('');
  const [selectedChat,setSelectedChat]=useState({})
  const [chatData ,setChatData] =useState([])
  const [isLoading ,setIsLoading]=useState(false)
  // console.log("🚀 ~ ChatScreen ~ messages==========>:", messages)

  const chatListingData = [
    {
      id :1,
      name: 'Walter A. Jones',
      image: require('../Assets/Images/dummyman1.png'),
      lastMessage: 'hello bro how are you',
      unread: true,
      unreadCount: 4,
      time: moment('2023-02-10').format('YYYY-MM-DD'),
      // time : moment().format()
    },
    {
      id :2,
      name: 'Josephine A. Suarez',
      image: require('../Assets/Images/dummyman2.png'),
      lastMessage:
        'Will you please nupdate me about my last Qbid about vehicle parts',
      unread: false,
      // unreadCount : 4,
      time: moment('2023-02-15').format('YYYY-MM-DD'),
    },
    {
      id :3,
      name: 'Ronald N. Voegele',
      image: require('../Assets/Images/dummyman3.png'),
      lastMessage: '??',
      unread: true,
      unreadCount: 2,
      time: moment('2023-01-14').format('YYYY-MM-DD'),
    },
    {
      id :4,
      name: 'Josephine A. Suarez',
      image: require('../Assets/Images/dummyman4.png'),
      lastMessage: 'Loved to work with you thanks',
      unread: true,
      unreadCount: 6,
      time: moment('2023-02-20').format('YYYY-MM-DD'),
    },
    {
      id :5,
      name: 'Josephine A. Suarez',
      image: require('../Assets/Images/dummyman5.png'),
      lastMessage: 'there?',
      unread: false,
      // unreadCount : 1,
      time: moment('2023-02-16').format('YYYY-MM-DD'),
    },
    {
      id :6,
      name: 'Josephine A. Suarez',
      image: require('../Assets/Images/dummyman6.png'),
      lastMessage: 'please update me about my money',
      unread: true,
      unreadCount: 4,
      time: moment('2023-02-10').format('YYYY-MM-DD'),
    },
    {
      id :7,
      name: 'Walter A. Jones',
      image: require('../Assets/Images/dummyman1.png'),
      lastMessage: 'hello bro how are you',
      unread: true,
      unreadCount: 4,
      time: moment('2023-02-10').format('YYYY-MM-DD'),
      // time : moment().format()
    },
    {
      id :8,
      name: 'Josephine A. Suarez',
      image: require('../Assets/Images/dummyman2.png'),
      lastMessage:
        'Will you please nupdate me about my last Qbid about vehicle parts',
      unread: false,
      // unreadCount : 4,
      time: moment('2023-02-15').format('YYYY-MM-DD'),
    },
    {
      id :9,
      name: 'Ronald N. Voegele',
      image: require('../Assets/Images/dummyman3.png'),
      lastMessage: '??',
      unread: true,
      unreadCount: 2,
      time: moment('2023-01-14').format('YYYY-MM-DD'),
    },
    {
      id :10,
      name: 'Walter A. Jones',
      image: require('../Assets/Images/dummyman1.png'),
      lastMessage: 'hello bro how are you',
      unread: true,
      unreadCount: 4,
      time: moment('2023-02-10').format('YYYY-MM-DD'),
      // time : moment().format()
    },
    {  id :11,
      name: 'Josephine A. Suarez',
      image: require('../Assets/Images/dummyman2.png'),
      lastMessage:
        'Will you please nupdate me about my last Qbid about vehicle parts',
      unread: false,
      // unreadCount : 4,
      time: moment('2023-02-15').format('YYYY-MM-DD'),
    },
  ];


  const chatList = async () => {
    const url = `auth/chat_list`;
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
          console.log("🚀 ~kamal == = == == == =   >> > >> >> from updatedmember :", JSON.stringify(response?.data ,null ,2))
          setChatData(response?.data?.data)
    }
  }

  useEffect(() => {
    console.log('hello kamal hgai ')
    chatList() 
  },[])
  
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
          renderItem={({item, index}) => {
            return (
            
              <ChatCard
                date={item?.created_at}
                image={item?.user?.photo}
                lastmessage={item?.message?.text}
                name={`${item?.user?.first_name} ${item?.user?.last_name}`}
                unread={item?.unread}
                unreadCount={item?.unreadCount}
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
