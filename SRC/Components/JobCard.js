import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import navigationService from '../navigationService';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import numeral from 'numeral';
import {Post} from '../Axios/AxiosInterceptorFunction';
import ImageView from 'react-native-image-viewing';

const JobCard = ({fromSeeAll, style, onPress, item}) => {
  const token = useSelector(state => state.authReducer.token);

  const [loading, setLoading] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const userRole = useSelector(state => state.commonReducer.selectedRole);

  const changeStatus = async value => {
    const url = `auth/negotiator/bid_help/${item?.id}`;
    setLoading(true);
    const response = await Post(url, {status: value}, apiHeader(token));
    setLoading(false);
    if (response != undefined) {
  
      setModalVisible(false);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          onPress ? onPress() : setModalVisible(!modalVisible);
        }}
        activeOpacity={0.9}
        style={[
          styles.joccard,
          fromSeeAll && {
            width: windowWidth * 0.46,
            paddingVertical: moderateScale(10, 0.6),
            // height: windowHeight * 0.22,
          },
          style,
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            // onPress={() => {
            //   navigationService.navigate('MyAccounts');
            // }}
            style={{
              width: fromSeeAll
                ? moderateScale(50, 0.3)
                : moderateScale(36, 0.3),
              height: fromSeeAll
                ? moderateScale(50, 0.3)
                : moderateScale(36, 0.3),
              borderRadius: fromSeeAll
                ? moderateScale(25, 0.3)
                : moderateScale(18, 0.3),

              overflow: 'hidden',
            }}
            >
            <CustomImage
              // onPress={() => {
              //   navigationService.navigate('MyAccounts');
              // }}
              source={
                item?.quote_info?.images.length > 0 
                  ? {uri: item?.quote_info?.images[0]?.image} 
                  : require('../Assets/Images/man1.jpg')
              }
              resizeMode={'cover'}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </TouchableOpacity>
          <CustomText
            isBold
            style={{
              fontSize: fromSeeAll
                ? moderateScale(11, 0.6)
                : moderateScale(9, 0.6),
              marginLeft: moderateScale(5, 0.3),
            }}>
            {item?.title
              ? item?.title
              : item?.quote_info?.title
              ? item?.quote_info?.title
              : item?.bid_name}
          </CustomText>
        </View>
        <CustomText
          numberOfLines={3}
          style={{
            fontSize: fromSeeAll
              ? moderateScale(9, 0.6)
              : moderateScale(8, 0.6),
            color: '#575757',
            marginTop: moderateScale(5, 0.3),
          }}>
          {item?.notes ? item?.notes : item?.quote_info?.notes}
        </CustomText>
        <View
          style={styles.row}>
          <View>
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(9, 0.6),
              }}>
              {numeral(
                item?.quoted_price
                  ? item?.quoted_price
                  : item?.quote_info?.quoted_price,
              ).format('$0,0a')}
            </CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(8, 0.6),
                //  backgroundColor : 'red'
              }}>
              Vendor Qoute
            </CustomText>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginRight: moderateScale(2, 0.3),
            }}>
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(9, 0.6),
              }}>
              {`${
                item?.offering_percentage
                  ? item?.offering_percentage
                  : item?.quote_info?.offering_percentage
              }%`}
            </CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(8, 0.6),
                //  backgroundColor : 'red'
              }}>
              Offering
            </CustomText>
          </View>
        </View>

        <CustomButton
          text={'View Details'}
          textColor={Color.white}
          width={fromSeeAll && windowWidth * 0.19}
          height={fromSeeAll && windowHeight * 0.03}
          marginTop={moderateScale(10, 0.3)}
          onPress={() => {
            onPress ? onPress() : setModalVisible(!modalVisible);
          }}
          bgColor={
            userRole == 'Qbid Member'
              ? Color.blue
              : userRole == 'Qbid Negotiator'
              ? Color.themeColor
              : Color.black
          }
          // borderColor={Color.white}
          // borderWidth={2}
          borderRadius={moderateScale(30, 0.3)}
          alignSelf={'flex-start'}
          fontSize={fromSeeAll ? moderateScale(7, 0.6) : moderateScale(7, 0.6)}
        />
      </TouchableOpacity>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
        }}>
        <View style={styles.mainViewModal}>
          <View style={styles.container}>
            <CustomImage
              source={require('../Assets/Images/Avatar2.jpg')}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
          <CustomText style={[styles.text, {}]} isBold>
            {item?.quote_info?.title}
          </CustomText>
          <CustomText style={styles.text}>{item?.coverletter}</CustomText>
          <CustomText
            onPress={() => {
              if (item?.quote_info?.images.length > 0) {
                setImageModal(true);
              } else {
                Platform.OS == 'android'
                  ? ToastAndroid.show('No attachments', ToastAndroid.SHORT)
                  : Alert.alert('No attachments');
              }
            }}
            style={[styles.text, {color: Color.blue}]}>
            attachments...
          </CustomText>

          <CustomText style={styles.text}>
            Are you Sure You want to Help.?
          </CustomText>

          <View
            style={{
              width: windowWidth * 0.6,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: moderateScale(10, 0.3),
              marginBottom: moderateScale(10, 0.3),
            }}>
            <CustomButton
              isBold
              text={'Accept'}
              textColor={Color.white}
              width={windowWidth * 0.25}
              height={windowHeight * 0.04}
              marginTop={moderateScale(10, 0.3)}
              bgColor={Color.themeColor}
              borderRadius={moderateScale(30, 0.3)}
              fontSize={moderateScale(11, 0.6)}
              onPress={() => {
                changeStatus('accept');
                // setModalVisible(false);
              }}
            />
            <CustomButton
              isBold
              text={'Decline'}
              textColor={Color.white}
              width={windowWidth * 0.25}
              height={windowHeight * 0.04}
              marginTop={moderateScale(10, 0.3)}
              bgColor={Color.red}
              borderRadius={moderateScale(30, 0.3)}
              fontSize={moderateScale(11, 0.6)}
              onPress={() => {
                changeStatus('reject');
                // setModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
      <ImageView
        images={item?.quote_info?.images}
        imageIndex={0}
        visible={imageModal}
        onRequestClose={() => setImageModal(false)}
      />
    </>
  );
};

export default JobCard;

const styles = ScaledSheet.create({
  joccard: {
    marginHorizontal: moderateScale(5, 0.6),
    width: windowWidth * 0.37,
    paddingVertical: moderateScale(10, 0.6),
    // height: windowHeight * 0.2,
    borderRadius: moderateScale(10, 0.6),
    backgroundColor: Color.white,
    marginTop: moderateScale(10, 0.3),
    overflow: 'hidden',
    paddingLeft: moderateScale(5, 0.6),
    paddingTop: moderateScale(5, 0.6),
  },
  row:{
    flexDirection: 'row',
    marginTop: moderateScale(10, 0.3),
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(2, 0.6),
  },
  mainViewModal: {
    width: windowWidth * 0.75,
    paddingVertical: moderateScale(20, 0.6),
    alignSelf: 'center',
    // height: windowHeight * 0.35,
    borderRadius: moderateScale(15, 0.3),
    backgroundColor: Color.white,
    borderWidth: 2,
    borderColor: Color.blue,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  container: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderRadius: (windowWidth * 0.2) / 2,
    borderWidth: 2,
    borderColor: Color.blue,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  text: {
    // width: windowWidth * 0.9,
    textAlign: 'center',
    marginTop: moderateScale(10, 0.3),
    color: Color.black,
    fontSize: moderateScale(14, 0.3),
  },
});
