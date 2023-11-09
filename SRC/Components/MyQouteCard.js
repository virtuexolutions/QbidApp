import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import RatingComponent from './RatingComponent';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
import Color from '../Assets/Utilities/Color';
import numeral from 'numeral';
import CustomButton from './CustomButton';
import navigationService from '../navigationService';
import Modal from 'react-native-modal';
import {useState} from 'react';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import ReviewModal from './ReviewModal';

const MyQouteCard = ({item}) => {
  const token = useSelector(state => state.authReducer.token);
  // console.log('🚀 ~ file: MyQouteCard.js:14 ~ MyQouteCard ~ item:', item);
  const [modalVisible, setModalVisible] = useState(false);
  const [cmpLoading, setCmpLoading] = useState(false);
  const [rbRef, setRbRef] = useState(null);
  const [buttonName, setbuttonName] = useState(
    item?.status == 'onGoing'
      ? 'Complete'
      : item?.status == 'completed' && [0, undefined].includes(item?.rating)
      ? 'Review'
      : '',
  );

  const markCompleted = async () => {
    const url = `auth/member/update_status/${item?.id}`;
    setCmpLoading(true);
    const response = await Post(url, {status: 'completed'}, apiHeader(token));
    setCmpLoading(false);
    if (response != undefined) {
      console.log(
        '🚀 ~ file: MyQouteCard.js:30 ~ markCompleted ~ response:',
        response?.data,
      );
      Platform.OS == 'android'
        ? ToastAndroid.show('Order has been completed', ToastAndroid.SHORT)
        : Alert.alert('Order has been completed');
      setbuttonName('Review');
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() => {
        navigationService.navigate('JobDetails', {item: item});
      }}>
      <View
        style={{
          position: 'absolute',
          zIndex: 1000,
          width: '17%',
          height: '30%',
          top: moderateScale(10, 0.3),
          //   alignItems : 'center'
          //   borderRadius: moderateScale(10, 0.3),
        }}>
        <CustomText
          style={{
            color: Color.white,
            fontSize: moderateScale(9, 0.3),
            zIndex: 1000,
            position: 'absolute',
            textAlign: 'center',
            top: 6,
            left: 0,
            right: 0,
            bottom: 0,
          }}>
          {item?.status}
        </CustomText>
        <CustomImage
          source={require('../Assets/Images/bedge1.png')}
          resizeMode={'stretch'}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>
      <View
        style={{
          width: '40%',
          height: '100%',
          borderRadius: moderateScale(10, 0.3),
          overflow: 'hidden',
        }}>
        <CustomImage
          source={
            item?.images.length > 0
              ? {uri: item?.images[0]?.image}
              : require('../Assets/Images/dummyman2.png')
          
          }
          style={{
            width: '100%',
            height: '100%',
          }}
          onPress={() => {
            navigationService.navigate('JobDetails', {item: item});
          }}
        />
      </View>
      <View
        style={{
          // alignItems : 'center',
          height: '100%',
          width: '58%',
          // backgroundColor : '#DDDDDD',
          paddingTop: moderateScale(4, 0.3),
        }}>
        <CustomText
          numberOfLines={2}
          isBold
          style={{
            fontSize: moderateScale(14, 0.3),
            width: windowWidth * 0.3,
          }}>
          {item?.title}
        </CustomText>

        <CustomText numberOfLines={1} style={styles.entity} isBold>
          Assigned To :{' '}
          {
            <CustomText
              style={{
                fontSize: moderateScale(12, 0.3),
                color: Color.themeLightGray,
              }}>
              {item?.status == 'pending'
                ? 'not yet'
                : item?.bids?.find(item => item?.status == 'accept')?.fullname}
            </CustomText>
          }
        </CustomText>

        <CustomText numberOfLines={1} style={styles.entity} isBold>
          Vendor Price :{' '}
          {
            <CustomText
              style={{
                fontSize: moderateScale(12, 0.3),
                color: Color.blue,
              }}>
              {numeral(item?.asking_price).format('$0,0a')}
            </CustomText>
          }
        </CustomText>
        <CustomText numberOfLines={1} style={styles.entity} isBold>
          Negotiator Price :{' '}
          {
            <CustomText
              style={{
                fontSize: moderateScale(12, 0.3),
                color: Color.blue,
              }}>
              {item?.status == 'pending'
                ? 'not yet'
                : numeral(item?.quoted_price).format('$0,0a')}
            </CustomText>
          }
        </CustomText>

        {item?.status == 'completed' && item?.rating > 0 && (
          <RatingComponent
            disable={true}
            rating={item?.rating}
            starColor={'#ffa534'}
            starStyle={{
              marginRight: moderateScale(1, 0.3),
              marginTop: moderateScale(1, 0.3),
            }}
            starSize={moderateScale(10, 0.3)}
            // ratingGiven={star}
            // setRatingGiven={setStar}
            style={{
              position: 'absolute',
              top: 5,
              right: moderateScale(5, 0.3),
            }}
          />
        )}

        {item?.status != 'pending' && (
          <CustomButton
            text={
              cmpLoading ? (
                <ActivityIndicator size={'small'} color={'white'} />
              ) : (
                buttonName
              )
            }
            textColor={Color.white}
            marginTop={moderateScale(2, 0.3)}
            onPress={() => {
              item?.status == 'completed' && rbRef.open();
              item?.status == 'onGoing' && markCompleted();
            }}
            bgColor={Color.blue}
            borderRadius={moderateScale(30, 0.3)}
            alignSelf={'flex-end'}
            fontSize={moderateScale(9, 0.3)}
          />
        )}
      </View>
      <ReviewModal setRef={setRbRef} item={item} rbRef={rbRef} />
    </TouchableOpacity>
  );
};

export default MyQouteCard;

const styles = StyleSheet.create({
  card: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.15,
    borderRadius: moderateScale(10, 0.3),
    padding: moderateScale(5, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Color.white,
    marginBottom: moderateScale(10, 0.3),
    // overflow : 'hidden'
  },
  modalUpperView: {
    backgroundColor: Color.themeColor,
    width: windowWidth * 0.7,
    minHeight: windowHeight * 0.1,
    maxHeight: windowHeight * 0.1,
    // borderTopLeftRadius: moderateScale(20, 0.3),
    // borderTopRightRadius: moderateScale(20, 0.3),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  modalLowerView: {
    backgroundColor: Color.white,
    width: windowWidth * 0.7,
    minHeight: windowHeight * 0.225,
    maxHeight: windowHeight * 0.325,
    // borderBottomLeftRadius: moderateScale(20, 0.3),
    // borderBottomRightRadius: moderateScale(20, 0.3),
    flexDirection: 'column',
    paddingHorizontal: moderateScale(30, 0.3),
    // paddingVertical: moderateScale(15, 0.3),
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  entity: {
    fontSize: moderateScale(11, 0.3),
    color: Color.black,
    //  backgroundColor : 'blue',
    width: windowWidth * 0.45,
  },
});
