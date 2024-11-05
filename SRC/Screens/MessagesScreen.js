import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
import {
  Bubble,
  Composer,
  GiftedChat,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomImage from '../Components/CustomImage';
import {Pusher} from '@pusher/pusher-websocket-react-native';
import {useNavigation} from '@react-navigation/native';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {setPusherInstance} from '../Store/slices/socket';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const MessagesScreen = props => {
  const target_id = props?.route?.params?.data;
  console.log('🚀 ~ MessagesScreen ~ target_id:', target_id);
  const conversationId = props?.route?.params?.conversationId;
  console.log('🚀 ~ MessagesScreen ~ conversationId:', conversationId);
  const name = props?.route?.params?.name;
  const image = props?.route?.params?.image;
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const user = useSelector(state => state.commonReducer.userData);
  console.log('🚀 ~ MessagesScreen ~ user:', user);
  const token = useSelector(state => state.authReducer.token);

  const navigation = useNavigation();
  const pusher = Pusher.getInstance();
  let myChannel = null;
  const dispatch = useDispatch();

  const [searchData, setSearchData] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const ReadMessages = async () => {
    const url = `auth/message_read/${conversationId}`;
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      console.log(
        '🚀 ~ success ========================== >>>>>>>>>>  :',
        response?.data,
      );
    }
  };

  const onSend = useCallback(
    (messages = []) => {
      const newMessage = {
        text: messages[0].text,
        createdAt: new Date(),
        user: {
          _id: user?.id,
          name: `${user?.first_name}`,
          avatar: user?.photo,
        },
      };

      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, newMessage),
      );
      startChat({chat_id: conversationId, target_id: target_id, ...newMessage});
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
            // console.log(`And here are the channel members: ${myChannel}`);
            // console.log(
            //   '🚀 ~ file: SelectedChat.js:77 ~ connectPusher ~ myChannel==================> :',
            //   channelName,
            // );
            // console.log(
            //   `Subscribed to ${JSON.stringify(channelName, null, 2)}`,
            // );
          },
          onEvent: event => {
            console.log(
              '🚀 ~ file: SelectedChat.js:127 ~ connectPusher ~ event==========>:',
              event?.data,
            );
            // console.log('Got channel event:', event.data);
            const dataString = JSON.parse(event.data);

            if (dataString?.message.target_id == user?.id) {
              console.log('🚀 ~rrrrrrrrrrrrrr :', user?.id, user?.first_name);
              //  alert('here' , user?._id)
              setMessages(previousMessages =>
                GiftedChat.append(previousMessages, dataString?.message),
              );
              ReadMessages();
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

  const startChat = async body => {
    const url = 'auth/send_message';
    const response = await Post(url, body, apiHeader(token));
    if (response != undefined) {
    }
  };

  const getChatListingData = async () => {
    const url = `auth/message_list/${conversationId}`;

    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      const finalData = response?.data?.data.reverse();
      setMessages(finalData);

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
  };

  return (
    <ScreenBoiler
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
              source={{uri: image}}
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
            {/* <CustomText style={styles.text2}>from</CustomText> */}
          </View>
        </View>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
          <GiftedChat
            keyboardShouldPersistTaps={'always'}
            alignTop
            textInputStyle={{
              color: Color.black,
              marginTop: moderateScale(5, 0.3),
            }}
            renderBubble={props => (
              <Bubble
                {...props}
                containerStyle={{
                  left: {
                    marginTop: moderateScale(10, 0.6),
                  },
                  right: {
                    marginTop: moderateScale(10, 0.6),
                  },
                }}
                wrapperStyle={{
                  right: {
                    borderRadius: moderateScale(20, 0.6),
                    paddingVertical: moderateScale(8, 0.6),
                    paddingHorizontal: moderateScale(15, 0.6),
                    borderTopLeftRadius: moderateScale(15, 0.6),
                    borderTopRightRadius: 0,
                    borderBottomLeftRadius: moderateScale(15, 0.6),
                    borderBottomRightRadius: moderateScale(15, 0.6),
                    backgroundColor: Color.lightGreen,
                  },
                  left: {
                    backgroundColor: Color.lightGrey,
                    borderTopLeftRadius: moderateScale(15, 0.6),
                    borderTopRightRadius: moderateScale(15, 0.6),
                    borderBottomLeftRadius: moderateScale(15, 0.6),
                    borderBottomRightRadius: 0,
                    paddingVertical: moderateScale(8, 0.6),
                    paddingHorizontal: moderateScale(15, 0.6),
                  },
                }}
              />
            )}
            renderSend={props => (
              <Send
                {...props}
                containerStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: moderateScale(15, 0.6),
                  width: moderateScale(40, 0.6),
                  bottom: 3,
                }}>
                <Icon
                  name="send"
                  as={FontAwesome}
                  color={Color.blue}
                  size={moderateScale(22, 0.6)}
                />
              </Send>
            )}
            renderInputToolbar={props => (
              <InputToolbar
                {...props}
                containerStyle={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  backgroundColor: Color.white,
                  height: moderateScale(50, 0.6),
                  justifyContent: 'center',
                  marginHorizontal: moderateScale(6, 0.6),
                  borderRadius: moderateScale(12, 0.6),
                  bottom: 10,
                }}>
                <Composer
                  {...props}
                  textInputStyle={{
                    flex: 1,
                    color: 'black',
                    padding: 10,
                    alignSelf: 'flex-start',
                  }}
                />
              </InputToolbar>
            )}
            alwaysShowSend
            placeholderTextColor={Color.darkGray}
            messages={messages}
            isTyping={false}
            onSend={messages => onSend(messages)}
            key={item => item?.id}
            user={{
              _id: user?.id,
              name: user?.first_name,
              avatar: user?.photo,
            }}
          />
        </KeyboardAvoidingView>
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
    paddingTop: moderateScale(5, 0.6),
  },
  row: {
    width: windowWidth,
    height: windowHeight * 0.06,
    paddingHorizontal: moderateScale(10, 0.6),
    flexDirection: 'row',
    alignItems: 'center',
  },
  text2: {
    fontSize: moderateScale(10, 0.6),
    marginTop: moderateScale(-3, 0.6),
  },
});
