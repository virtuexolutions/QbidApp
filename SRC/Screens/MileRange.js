import React, {useState} from 'react';
import {View} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import {Slider} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../Components/CustomButton';
import {setUserToken} from '../Store/slices/auth';
// import MapView from 'react-native-maps';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const MileRange = props => {
  const fromLogin = props?.route?.params?.fromLogin;
  console.log(fromLogin);
  const dispatch = useDispatch();
  const DollarData = [
    {mile: '10 Miles', price: 10},
    {mile: '20 Miles', price: 20},
    {mile: '30 Miles', price: 30},
    {mile: '40 Miles', price: 40},
    {mile: '50 Miles', price: 50},
    {mile: '60 Miles', price: 60},
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [dollar, setDollar] = useState(10);
  const userRole = useSelector(state => state.commonReducer.selectedRole);

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
      showBack={fromLogin ? false : true}
      hideUser>
      <LinearGradient
        style={{
          width: windowWidth,
          height: windowHeight,
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
              console.log(data);
              setDollar(data);
            }}
            onPointerUpCapture={() => {
              console.log('up');
            }}
            w="92%"
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
            width: windowWidth * 0.99,
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
          {/* <MapView
        style={{
          width : '100%',
          height : '100%'
        }}
          // provider={PROVIDER_GOOGLE}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {/* {this.state.markers.map((marker, index) => ( */}
          {/* <Marker
            coordinate= {{latitude : 37.78825,longitude : -122.4324}}
            title={'MY location'}
            description={'here i am standing'}
            
          /> */}
          {/* ))} 
        </MapView> */}
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

        {/* <View
          style={{
            alignItems: 'center',
            width: windowWidth,
            position: 'absolute',
            bottom: 90,
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
              dispatch(setUserToken({token: 'dasdawradawdawrtfeasfzs'}));
            }}
            bgColor={userRole == 'Qbid Member' ? Color.blue : Color.themeColor}
            borderRadius={moderateScale(30, 0.3)}
          />
          <CustomText
            numberOfLines={2}
            style={{textAlign: 'center', marginTop: moderateScale(40, 0.3)}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum Lorem Ipsum
          </CustomText>
        </View> */}
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
