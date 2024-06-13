import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import moment from 'moment';
import {FlatList, Icon} from 'native-base';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import NotificationCard from '../Components/NotificationCard';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../Components/CustomText';
import SearchContainer from '../Components/SearchContainer';
import {useState} from 'react';
import ChatCard from '../Components/ChatCard';
import {useDispatch, useSelector} from 'react-redux';
import {GiftedChat} from 'react-native-gifted-chat';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomImage from '../Components/CustomImage';
import {Pusher} from '@pusher/pusher-websocket-react-native';
import {useNavigation} from '@react-navigation/native';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {setPusherInstance} from '../Store/slices/socket';
// import {
//   height,
//   width,
// } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
// import {Pusher} from '@pusher/pusher-websocket-react-native';
// import CustomTextInput from '../Components/CustomTextInput';

const MessagesScreen = props => {
  const target_id = props?.route?.params?.data;
  // console.log("🚀 ~ MessagesScreen ~ data:=============", data)
  const conversationId =props?.route?.params?.conversationId
  const name = props?.route?.params?.name;
  const image = props?.route?.params?.image;
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const user = useSelector(state => state.commonReducer.userData);
  console.log("🚀 ~ MessagesScreen ~ user:", user?.id)
  const token = useSelector(state => state.authReducer.token);

  const navigation = useNavigation();
  const pusher = Pusher.getInstance();
  let myChannel = null;
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState('');
  const [messages, setMessages] = useState([]);
  console.log("🚀 ~ MessagesScreen ~ messages:", messages)
  const [isLoading ,setIsLoading] =useState(false)
  
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
  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 1,
  //         name: 'React Native',
  //         avatar: require('../Assets/Images/dummyman1.png'),
  //       },
  //     },
  //     {
  //       _id: 3,
  //       text: 'Hello ',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: require('../Assets/Images/dummyman1.png'),
  //       },
  //     },
  //   ]);
  // }, []);
  const onSend = useCallback(
    (messages = []) => {
    console.log("🚀 ~ MessagesScreen ~ messages:", messages)
      const newMessage = {
      
        text: messages[0].text,
        createdAt: new Date(),
        user: {
          _id: user?.id,
          name: `${user?.first_name}`,
          avatar: user?.photo,
        },
      };

  //  console.log('kamalllllllllllllll======>',JSON.stringify(newMessage,null,2));
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, newMessage),
      );
      startChat({chat_id: conversationId, target_id: target_id , ...newMessage}); 
    },
    [messages],
  );

  useEffect(() => {
    console.log('useEffect runs');
    async function connectPusher() {
      try {
        await pusher.init({
          apiKey: '2cbabf5fca8e6316ecfe',
          cluster: 'ap2',
        });
    

        myChannel = await pusher.subscribe({
          channelName: `my-channel-${conversationId}`,
          onSubscriptionSucceeded: (channelName, conversationId) => {
            // dispatch(setPusherInstance(pusher));
            console.log(`And here are the channel members: ${myChannel}`)
            console.log("🚀 ~ file: SelectedChat.js:77 ~ connectPusher ~ myChannel==================> :",channelName)
            console.log(`Subscribed to ${JSON.stringify(channelName , null ,2)}`);
          },
          onEvent: event => {
            // console.log(
            //   '🚀 ~ file: SelectedChat.js:127 ~ connectPusher ~ event==========>:',
            //   event?.data,
            // );
             console.log('Got channel event:', event.data);
            const dataString = JSON.parse(event.data);
            console.log(
              '🚀 ~ file: SelectedChat.js:116 ~ connectPusher ~ dataString:',
              dataString?.message,
             
          
            );
            if (dataString?.message.target_id == user?.id) {
              //  alert('here' , user?._id)
              setMessages(previousMessages =>
                GiftedChat.append(previousMessages, dataString?.message),

                
              );
             
            }
          },
        });
      
        await pusher.connect();
      } catch (e) {
        console.log(`ERROR: ${e}`);
      }
    }
    connectPusher();

      getChatListingData();
    return async () => {
      await pusher.unsubscribe({channelName: `my-channel-${conversationId}`});
    };
  }, []);

    const startChat = async (body) => {
      // const body = {
      //   // _id: 1,
      //   target_id:data,
      //   chat_id:user?.id,
      //   text: messages[0]?.text,
      //   createdAt: messages[0]?.createdAt,
      //   user: {
      //     _id: user?.id,
      //     name: user?.first_name,
      //     avatar: user?.photo,
      //   },
      // }
  console.log("🚀 ~ file: SelectedChat.js:63 ~ startChat ~ body:", JSON.stringify(body ,null ,2))

      const url = 'auth/send_message';
      const response = await Post(url, body, apiHeader(token));
      if (response != undefined) {
          console.log('response=================', response?.data);
      }
    };

  const getChatListingData = async () => {
      const url = `auth/message_list/${conversationId}`;
      // console.log("🚀 ~ getChatListingData ~ url:", url)
      setIsLoading(true);
      const response = await Get(url, token);
      setIsLoading(false);
      if (response != undefined) {
          console.log("🚀 ~message_list == == = == =   >> > > >> > > >:", JSON.stringify(response?.data ,null ,2))
        const finalData = response?.data?.data.reverse()
        setMessages(finalData)



        // const parsedResult = [];
        // response?.data?.ChatRoom.map((item, index) => {
        //   return parsedResult.push(JSON.parse(item));
        //   });
        // return console.log("🚀 ~ getChatListingData ~ parsedResult ===== >>>>.:", parsedResult)
        // setMessages(parsedResult.reverse());

        // JSON.parse(response?.data?.ChatRoom)
        // console.log( 'here is the chat data  ===============   >> >> > > > > > >> > ', response?.data)
        // console.log(JSON.stringify(response?.data[0]?.chat_room, null, 2));
        // setMess(response?.data);
      }
    }

  return (
    <ScreenBoiler
      //   showHeader={true}
      statusBarBackgroundColor={
        userRole == 'Qbid Member'
          ? Color.themeBgColor
          : userRole == 'Qbid Negotiator'
          ? Color.themeBgColorNegotiator
          : Color.themebgBusinessQbidder
      }
      statusBarContentStyle={'light-content'}>
      <LinearGradient
        style={{
          // width: windowWidth,
          height: windowHeight * 0.97,
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
        <View style={styles.row}>
          <Icon
            onPress={() => {
              navigation.goBack();
            }}
            as={Ionicons}
            name="arrow-back"
            size={moderateScale(22, 0.6)}
            color={Color.white}
          />
          <View style={styles.image}>
            <CustomImage
              source={{uri :image}}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode={'cover'}
            />
          </View>
          <View
            style={{
              width: windowWidth * 0.7,
            }}>
            <CustomText isBold style={styles.text}>
              {name}
            </CustomText>
            <CustomText style={styles.text2}>from</CustomText>
          </View>
        </View>
        <GiftedChat
          textInputStyle={{       
            color: Color.black,
            marginTop: moderateScale(5, 0.3),
          }}
          placeholderTextColor={Color.lightGrey}
          // renderAvatar={props => <RenderAvatar {...props} />}
          //   renderMessageText={props => <MessageText {...props} />}
          // renderActions={renderActions}
          //   renderInputToolbar={props => (
          //     <CustomTextInput data={data} setMessages={setMessages} />
          //   )}
          messages={messages}
          isTyping={false}
          onSend={messages => onSend(messages)}
          user={{
            _id: user?.id,
            name: user?.first_name,
          avatar:user?.photo
           }}
        />
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default MessagesScreen;

const styles = ScaledSheet.create({
  header: {
    color: Color.black,
    fontSize: moderateScale(18, 0.3),
    width: windowWidth * 0.9,
  },
  image: {
    marginHorizontal: moderateScale(10, 0.3),
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    borderRadius: windowWidth * 0.7,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  text: {
    fontSize: moderateScale(12, 0.6),
    // justifyContent :'center'
    // backgroundColor :'red',
    paddingTop: moderateScale(5, 0.6),
  },
  row: {
    // backgroundColor :'red',
    width: windowWidth,
    height: windowHeight * 0.06,
    paddingHorizontal: moderateScale(10, 0.6),
    flexDirection: 'row',
    alignItems: 'center',
  },
  text2: {
    fontSize: moderateScale(10, 0.6),
    marginTop: moderateScale(-3, 0.6),
    // backgroundColor :'green'
  },
});
