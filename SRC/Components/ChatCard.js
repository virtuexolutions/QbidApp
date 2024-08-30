import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {apiHeader, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import Color from '../Assets/Utilities/Color';
import moment from 'moment';
import {useState} from 'react';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {Token} from '@stripe/stripe-react-native';

const ChatCard = ({
  name,
  image,
  lastmessage,
  date,
  unread,
  unreadCount,
  target_id,
  conversationId,
}) => {
  const token = useSelector(state => state.authReducer.token);

  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const ReadMessages = async () => {
    const url = `auth/message_read/${conversationId}`;
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
    
      navigation.navigate('MessagesScreen', {
        data: target_id,
        name: name,
        image: image,
        conversationId: conversationId,
      });
    }
  };


  return (
    <TouchableOpacity
      onPress={() => {
        ReadMessages();
      }}
      activeOpacity={0.8}
      style={{
        width: windowWidth * 0.95,
        alignSelf: 'center',
        flexDirection: 'row',
        paddingVertical: moderateScale(5, 0.4),
        // backgroundColor: 'yellow',
      }}>
      <View style={styles.image}>
        <CustomImage
          source={{uri: image}}
          style={{
            width: '100%',
            height: '100%',
          }}
          // style={styles.image}
          resizeMode={'cover'}
        />
      </View>
      <View style={styles.nameContainer}>
        <CustomText
          isBold
          style={{
            fontSize: moderateScale(12, 0.3),
            color:
              userRole == 'Qbid Member'
                ? Color.blue
                : userRole == 'Qbid Negotiator'
                ? Color.themeColor
                : Color.black,
          }}>
          {name}
        </CustomText>
        <CustomText
          numberOfLines={1}
          style={{
            fontSize: moderateScale(11, 0.3),
            color: Color.themeBlack,
          }}>
          {lastmessage}
        </CustomText>
      </View>
      <View
        style={{
          marginLeft: moderateScale(2, 0.3),
          //   backgroundColor : 'red',
          width: windowWidth * 0.2,
          marginTop: moderateScale(5, 0.3),
        }}>
        {/* <CustomText
          isBold
          style={{
            fontSize: moderateScale(9, 0.3),
            color: Color.themeBlack,
            textAlign: 'right',
          }}>
          {' '}
          {moment.duration(moment().diff(date)).asDays() >= 6
            ? moment(date).format('ll')
            : moment(date).fromNow()}
        </CustomText> */}
        {unreadCount > 0 && (
          <View
            style={{
              width: moderateScale(15, 0.3),
              height: moderateScale(15, 0.3),
              borderRadius: moderateScale(7.5, 0.3),
              backgroundColor:
                userRole == 'Qbid Member'
                  ? Color.blue
                  : userRole == 'Qbid Negotiator'
                  ? Color.themeColor
                  : Color.black,
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              alignSelf: 'flex-end',
              marginTop: moderateScale(5, 0.3),
            }}>
            <CustomText
              numberOfLines={1}
              style={{
                fontSize: moderateScale(11, 0.3),
                color: Color.white,
              }}>
              {/* 5 */}
              {unreadCount}
            </CustomText>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  image: {
    width: windowWidth * 0.14,
    height: windowWidth * 0.14,
    borderRadius: windowWidth * 0.7,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  nameContainer: {
    marginLeft: moderateScale(10, 0.3),
    width: windowWidth * 0.57,
    // backgroundColor: 'red',
    marginTop: moderateScale(5, 0.3),
  },
});
