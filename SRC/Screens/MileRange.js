import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, Platform, ToastAndroid, View} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {Slider} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import MapView from 'react-native-maps';
import CustomButton from '../Components/CustomButton';
import {setMilageRing} from '../Store/slices/auth';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import GetLocation from 'react-native-get-location';
import {setLocation} from '../Store/slices/common';
import { useNavigation } from '@react-navigation/native';

const MileRange = props => {
  const fromSetting = props?.route?.params?.fromSetting;
  console.log("🚀 ~ file: MileRange.js:20 ~ MileRange ~ fromSetting:", fromSetting)

  const token = useSelector(state => state.authReducer.token);
  const location = useSelector(state => state.commonReducer.location);
  
  const dispatch = useDispatch();

const navigation = useNavigation()
  
  const [isLoading, setIsLoading] = useState();
  const [miles, setMiles] = useState('');
  const [dollar, setDollar] = useState(10);
  const userRole = useSelector(state => state.commonReducer.selectedRole);

  const getLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        console.log("🚀 ~ file: MileRange.js:37 ~ getLocation ~ location:", location)
        dispatch(setLocation(location));
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  useEffect(() => {
    getLocation();
  }, []);

  const setMileage = async () => {
    const url = `auth/negotiator/filter_radius?lat=${location?.latitude}&lng=${location?.longitude}&radius=${miles}`;
    // const body = {radius: miles};
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
       console.log(
        '🚀 ~ file: MileRange.js:29 ~ setMileage ~ response:',
        response?.data,url
      );
      dispatch(setMilageRing(true));
      fromSetting && navigation.goBack()
    }
  };

  const DollarData = [
    {mile: '10 Miles', price: 10},
    {mile: '20 Miles', price: 20},
    {mile: '30 Miles', price: 30},
    {mile: '40 Miles', price: 40},
    {mile: '50 Miles', price: 50},
    {mile: '60 Miles', price: 60},
  ];

  return (
    <ScreenBoiler
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
      showHeader={true}
      showBack={!fromSetting ? false : true}
      hideUser>
      <LinearGradient
        style={{
          width: windowWidth,
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
        <View
          style={{
            alignItems: 'center',
            width: windowWidth,
            marginTop: moderateScale(40, 0.3),
          }}>
          <CustomText isBold style={{fontSize: moderateScale(22, 0.3)}}>
            Mileage Rings
          </CustomText>
        </View>
        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            width: windowWidth * 0.95,
            marginTop: moderateScale(30, 0.3),
          }}>
          <Slider
            onChange={data => {
              // console.log(data);
              setMiles(data);
              setDollar(data);
            }}
            onPointerUpCapture={() => {
              // console.log('up');
            }}
            w="85%"
            size="lg"
            defaultValue={10}
            minValue={10}
            maxValue={60}
            step={10}>
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: windowWidth,
            alignSelf: 'center',
          }}>
          {DollarData.map((item, index) => {
            return <CustomText style={styles.text}>{item.mile}</CustomText>;
          })}
        </View>
        <View
          style={{
            alignItems: 'center',
            width: windowWidth,
            marginTop: moderateScale(40, 0.3),
          }}>
          <CustomText isBold style={{fontSize: moderateScale(60, 0.3)}}>
            ${dollar}
          </CustomText>
        </View>
        <View
          style={{
            width: windowWidth * 0.95,
            height: windowHeight * 0.3,
            // backgroundColor : 'red',
            alignSelf: 'center',
          }}>
          <MapView
            style={{
              width: '100%',
              height: '100%',
            }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>

        <View
          style={{
            alignItems: 'center',
            width: windowWidth,

            position: 'absolute',
            bottom: 50,
          }}>
          <CustomButton
            text={
              isLoading ? (
                <ActivityIndicator color={'#FFFFFF'} size={'small'} />
              ) : (
                'Done'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.9}
            height={windowHeight * 0.07}
            marginTop={moderateScale(20, 0.3)}
            onPress={() => {
              if (miles == '') {
                return Platform.OS == 'android'
                  ? ToastAndroid.show(
                      'Please set the milage',
                      ToastAndroid.SHORT,
                    )
                  : Alert.alert('Please set the milage');
              } else {
                setMileage();
              }
            }}
            bgColor={Color.black}
            borderRadius={moderateScale(30, 0.3)}
          />
          {/* <CustomText
            numberOfLines={2}
            style={{textAlign: 'center', marginTop: moderateScale(40, 0.3)}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum Lorem Ipsum
          </CustomText> */}
        </View>
      </LinearGradient>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  text: {
    fontSize: moderateScale(10, 0.6),
  },
});
export default MileRange;
