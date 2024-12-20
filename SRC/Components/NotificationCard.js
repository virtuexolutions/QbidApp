import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
import {Icon} from 'native-base';
import {useSelector} from 'react-redux';

const NotificationCard = ({image, text, name, time, unread, onPress, item}) => {
 
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const userData = useSelector(state => state.commonReducer.userData);
 
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View
        style={[
          styles.NotificationCard,

          unread && {
            backgroundColor: 'rgba(223, 254, 250,0.7)',
            // borderWidth: 0,
            // borderColor: userRole == 'Qbid Member' ? Color.blue : Color.themeColor,
          },
        ]}>
        <View style={styles.image}>
          <CustomImage
            source={{uri: image}}

            style={styles.imageBg}
          />
        </View>
        <View style={{marginLeft: moderateScale(10, 0.3)}}>
          <View
            style={styles.row}>
            <CustomText style={styles.subHeading}>
              {name ? name  : 'Dimebag Darrel'}
            </CustomText>
            <CustomText style={styles.time}>
              {time ? time : '- Just Now'}
            </CustomText>
          </View>
          <CustomText
            numberOfLines={1}
            style={{
              marginLeft: moderateScale(15, 0.3),
              width: windowWidth * 0.7,
              color: Color.themeBlack,
              //   backgroundColor: "red",
            }}>
            {userRole == 'Qbid Member' ?  text :`Mr ${name} is looking for an ${item?.service_preference} expert to help him .`}
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  time: {
    position: 'absolute',
    color: Color.themeLightGray,
    right: moderateScale(0, 0.3),
    top: moderateScale(5, 0.3),
    marginLeft: moderateScale(5, 0.3),
  },
  imageBg: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: moderateScale(50, 0.3),
    borderColor: Color.blue,
    borderWidth: 2,
  },
  image: {
    height: moderateScale(40, 0.3),
    width: moderateScale(40, 0.3),
    borderRadius: moderateScale(20, 0.3),
  },
  unRead: {
    position: 'absolute',
    bottom: moderateScale(30, 0.3),
    right: moderateScale(25, 0.3),
    // top: moderateScale(59, 0.3),
    marginLeft: moderateScale(5, 0.3),
    width: moderateScale(20, 0.3),
    height: moderateScale(20, 0.3),
    borderRadius: moderateScale(10, 0.3),
    backgroundColor: Color.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subHeading: {
    fontSize: moderateScale(16, 0.3),
    color: Color.themeBlack,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    width: windowWidth * 0.575,
  },
  NotificationCard: {
    width: windowWidth,
    flexDirection: 'row',
    paddingVertical: moderateScale(10, 0.3),
    paddingLeft: moderateScale(10, 0.3),
    borderColor: Color.themeLightGray,
    alignItems: 'center',
  },
  row: {
    width: windowWidth * 0.7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(10, 0.3),
    marginHorizontal: moderateScale(15, 0.3),
  }
});

export default NotificationCard;
