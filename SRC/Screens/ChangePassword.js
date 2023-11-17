import React, {useState} from 'react';
import {
  Image,
  Dimensions,
  ImageBackground,
  Platform,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import navigationService from '../navigationService';

import TextInputWithTitle from '../Components/TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';

import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from '../Components/CustomButton';
import {ActivityIndicator} from 'react-native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import CardContainer from '../Components/CardContainer';
import CustomHeader from '../Components/CustomHeader';
import {Icon} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {setUserToken} from '../Store/slices/auth';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import { setUserData } from '../Store/slices/common';
import { Alert } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ChangePassword = props => {
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const token = useSelector(state=> state.authReducer.token)
  const navigation = useNavigation()

  const dispatch = useDispatch()

  const [phone, setPhone] = useState('');
  const [current_password, setCurrent_password] = useState('')
  const [new_password, setNew_password] = useState('')
  const [confirm_password, setConfirm_password] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const ChangePassword = async ()=>{
    const url = 'auth/change_password';
    const body = {current_password:current_password, new_password:new_password, confirm_password: confirm_password  }
    setIsLoading(true)
    const response = await Post(url, body, apiHeader(token))
    setIsLoading(false)
    // console.log("🚀 ~ file: ChangePassword.js:54 ~ ChangePassword ~ response:", response?.data)
    if(response != undefined){
      dispatch(setUserData(response?.data?.user_info))
      Platform.OS == 'android' ? ToastAndroid.show('Password changed Successfully', ToastAndroid.SHORT) : Alert.alert('Password changed Successfully')
      navigation.goBack()
    }
  }

  

  

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
      }
      hideUser={false}
      showBack={true}>
        {/* <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
          
          }}> */}
      <LinearGradient
        style={
          {
            // paddingBottom: moderateScale(20, 0.3),
            alignItems: 'center',
            paddingTop : windowHeight * 0.15,
            // justifyContent: 'center',
            width: '100%',
            height: windowHeight,
          }
        }
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={ userRole == 'Qbid Member'
        ? Color.themeBgColor
        : userRole == 'Qbid Negotiator'
        ? Color.themeBgColorNegotiator
        : Color.themebgBusinessQbidder}>
          <CardContainer
            style={{
              paddingVertical: moderateScale(30, 0.3),
              alignItems: 'center',
            }}>
            <CustomText isBold style={styles.txt2}>
              Change Password
            </CustomText>
            <CustomText style={styles.txt3}>
              want to change your password ? don't worry, jsut take a simple
              step and create your new password!
            </CustomText>
            <TextInputWithTitle
              titleText={'Current Password'}
              secureText={true}
              placeholder={'Current Password'}
              setText={setCurrent_password}
              value={current_password}
              viewHeight={0.07}
              viewWidth={0.75}
              inputWidth={0.7}
              // border={1}
              borderColor={'#ffffff'}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(35, 0.3)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
              elevation
            />

            <TextInputWithTitle
              titleText={'Enter New Password'}
              secureText={true}
              placeholder={'Enter New Password'}
              setText={setNew_password}
              value={new_password}
              viewHeight={0.07}
              viewWidth={0.75}
              inputWidth={0.7}
              // border={1}
              borderColor={'#ffffff'}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(10, 0.3)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
              elevation
            />
            <TextInputWithTitle
              titleText={'Confirm your new password'}
              secureText={true}
              placeholder={'Confirm your new password'}
              setText={setConfirm_password}
              value={confirm_password}
              viewHeight={0.07}
              viewWidth={0.75}
              inputWidth={0.7}
              // border={1}
              borderColor={'#ffffff'}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(10, 0.3)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
              elevation
            />
            <CustomButton
              text={
                isLoading ? (
                  <ActivityIndicator color={'#FFFFFF'} size={'small'} />
                ) : (
                  'Reset'
                )
              }
              textColor={Color.white}
              width={windowWidth * 0.75}
              height={windowHeight * 0.06}
              marginTop={moderateScale(10, 0.3)}
              onPress={() => {
                ChangePassword()
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
            />
          </CardContainer>
      </LinearGradient>
        {/* </KeyboardAwareScrollView> */}
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  txt2: {
    color: Color.black,
    fontSize: moderateScale(25, 0.6),
  },
  txt3: {
    color: Color.themeLightGray,
    fontSize: moderateScale(10, 0.6),
    textAlign: 'center',
    width: '80%',
    marginTop: moderateScale(5, 0.3),
    lineHeight: moderateScale(17, 0.3),
  },

  phoneView: {
    width: '80%',
    paddingVertical: moderateScale(5, 0.3),
    flexDirection: 'row',
    marginTop: moderateScale(20, 0.3),
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.9,
    // marginTop: moderateScale(10,0.3),
  },
  txt4: {
    color: Color.purple,
    fontSize: moderateScale(14, 0.6),
    marginTop: moderateScale(8, 0.3),
    fontWeight: 'bold',
  },
  txt5: {
    color: Color.themeLightGray,
    marginTop: moderateScale(10, 0.3),
    fontSize: moderateScale(12, 0.6),
  },
});

export default ChangePassword;
