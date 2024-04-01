import {StyleSheet, Text, View, Platform, ToastAndroid, ActivityIndicator} from 'react-native';
import React from 'react';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import CustomButton from './CustomButton';
import CustomText from './CustomText';
import Modal from 'react-native-modal';
import CustomImage from './CustomImage';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {Post} from '../Axios/AxiosInterceptorFunction';
import Color from '../Assets/Utilities/Color';

const HelpRequestModal = ({modalVisible, setModalVisible, selected}) => {
  console.log("🚀 ~ selected:=============>", selected)
  const userData = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);
  const [loading, setLoading] = useState(false);
  

  const changeStatus = async value => {
    const url = `auth/negotiator/bid_help_quote`;
    const body = {
      quote_id: selected?.quote_id,
      status: value,
    };
    setLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setLoading(false);
    if (response != undefined) {
console.log("🚀 ~ changeStatus ~ response:", response?.data)
      // console.log(
      //   '🚀 ~ changeStatus ~ response===============>:',
      //   response?.data,
      // );
           setModalVisible(false);
    }
  };

  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={() => {
        setModalVisible(false);
      }}>
      <View style={styles.mainContainer}>
        <View style={styles.image}>
          <CustomImage
            source={require('../Assets/Images/Avatar2.jpg')}
            resizeMode="cover"
            style={{
              height: '100%',
              width: '100%',
            }}
          />
        </View>

        {/* <CustomText style={styles.text}>
          <CustomText isBold>{`title : `}</CustomText>
          {item?.bid_name}
        </CustomText> */}
        {/* <CustomText style={styles.text}>
          <CustomText isBold>{`name : `}</CustomText>
          {item?.user_info?.first_name}
        </CustomText> */}
        {/* <CustomText
          style={[
            styles.text,
            {
              paddingBottom: moderateScale(14, 0.3),
            },
          ]}>
          <CustomText isBold>{`Email : `}</CustomText>
          {/* {item?.user_info?.email} 
        </CustomText> */}

        <CustomText
          numberOfLines={3}
          style={[
            styles.text,
            {
              paddingHorizontal: moderateScale(70, 0.3),
              color: Color.grey,
            },
          ]}>
          {selected?.body}
        </CustomText>

        <CustomText
          style={[
            styles.text,
            {
              textAlign: 'center',
              marginTop: moderateScale(10, 0.3),
            },
          ]}>
          Are you Sure You want to Help.?
        </CustomText>

        <View style={styles.row}>
          <CustomButton
            isBold
            text={loading ? <ActivityIndicator size={'small'} color={Color.white} /> : 
              'Accept'}
            textColor={Color.white}
            width={windowWidth * 0.25}
            height={windowHeight * 0.04}
            marginTop={moderateScale(10, 0.3)}
            bgColor={Color.themeColor}
            borderRadius={moderateScale(30, 0.3)}
            fontSize={moderateScale(11, 0.6)}
            onPress={() => {
              changeStatus('accept');
            }}
          />
          <CustomButton
            isBold
            text={loading ? <ActivityIndicator size={'small'} color={Color.white} /> : 
            'Decline'}
            textColor={Color.white}
            width={windowWidth * 0.25}
            height={windowHeight * 0.04}
            marginTop={moderateScale(10, 0.3)}
            bgColor={Color.red}
            borderRadius={moderateScale(30, 0.3)}
            fontSize={moderateScale(11, 0.6)}
            onPress={() => {
              
              changeStatus('reject');
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default HelpRequestModal;

const styles = StyleSheet.create({
  mainContainer: {
    width: windowWidth * 0.75,
    paddingVertical: moderateScale(20, 0.6),
    alignSelf: 'center',
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
  image: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderRadius: (windowWidth * 0.2) / 2,
    borderWidth: 2,
    borderColor: Color.blue,
    overflow: 'hidden',
  },
  text: {
    width: windowWidth * 0.9,
    textAlign: 'center',
    marginTop: moderateScale(10, 0.3),
    color: Color.black,
    fontSize: moderateScale(14, 0.3),
    marginHorizontal: moderateScale(10, 0.3),
  },
  row: {
    width: windowWidth * 0.6,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: moderateScale(10, 0.3),
    marginBottom: moderateScale(10, 0.3),
  },
});
