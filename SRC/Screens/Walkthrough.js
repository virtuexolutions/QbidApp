import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  PixelRatio,
} from 'react-native';
import {Icon} from 'native-base';
import AppIntroSlider from 'react-native-app-intro-slider';
import Color from '../Assets/Utilities/Color';
import {useSelector, useDispatch} from 'react-redux';
import ScreenBoiler from '../Components/ScreenBoiler';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {setWalkThrough} from '../Store/slices/auth';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Walkthrough = props => {
  const dispatch = useDispatch();

  const slides = [
    {
      key: '1',
      title: 'What Is Qbid',
      text: 'QBID is an innovative application developed to address rising costs impacting household budgets. It offers an efficient and reliable method for achieving optimal outcomes in any project it represents. Our team is dedicated to securing the most favorable deals for our users.',
      logo: require('../Assets/Images/walkthrough1.jpg'),
    },
    {
      key: '2',
      title: 'How QBID Delivers Exceptional Value',
      text: 'QBID invites you to submit your quotes. Simply capture a photo and upload your quote; QBID will then work diligently to secure the most competitive negotiated bid outcome for you.',
      logo: require('../Assets/Images/walkthrough2.jpg'),
    },
    {
      key: '3',
      title: 'Why To Become QBID Member',
      text: '1.  User-friendly and efficient application for easy access.\n2.	 Full control throughout the entire process is maintained by you. \n3.  Multiple companies and vendors compete for your business, ensuring the best options. \n4. 	Save valuable time and avoid the uncertainty of whether you are being taken advantage of. \nWith QBID at your service, such concerns are a thing of the past.',
      logo: require('../Assets/Images/walkthrough3.jpg'),
    },
    {
      key: '4',
      title: 'Reasons to consider using QBID for your company:',
      text: '1.	Remote work capability from any location. \n2.	Secure earning platform.\n3.	Instant bid notifications accessible via phone or internet-connected devices. \n4. Flexibility to select bids of interest.  \n5.	Membership options for bid notification alerts. \n6. 	Opportunity for a second attempt at securing bids. \n7. Option to withdraw bids if preferences change.',
      logo: require('../Assets/Images/walkthrough1.jpg'),
    },
  ];

  const RenderSlider = ({item}) => {
    return (
      // <View style={styles.SliderContainer}>
      <LinearGradient
      start={{x: 0.0, y: 0.25}}
      end={{x: 0.5, y: 1.0}}
      colors={Color.themeBgColor}
      style={[styles.SliderContainer]}>
        <Image
          source={item.logo}
          // resizeMode={'contain'}
          style={{
            height: windowHeight * 0.5,
            width: windowWidth,
            // zIndex: 1,
            borderBottomLeftRadius: moderateScale(30, 0.3),
            borderBottomRightRadius: moderateScale(30, 0.3),
           }}
        />
        {/* <LinearGradient
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.5, y: 1.0}}
          colors={Color.themeBgColor}
          style={[styles.subcontainer]}> */}
          {/* <View
            style={{
              alignItems: 'center',
            }}> */}
            <Text numberOfLines={2} style={styles.title}>
              {item.title}
            </Text>
            <Text style={styles.subText}>
              {item.text}
            </Text>
          {/* </View> */}
         
      {/* </View> */}
        </LinearGradient>
    );
  };

  const RenderNextBtn = () => {
    return (
      <View style={{
        width : moderateScale(60,0.6),
    height : moderateScale(60,0.6),
    borderRadius : moderateScale(30,0.6),
    backgroundColor : 'rgba(255,255,255,0.7)',
    justifyContent : 'center',
    alignItems : 'center',
    marginTop : moderateScale(-20,0.3),
      }}>

      <Icon
      name='arrowright'
      as={AntDesign}
        color ={Color.black}
      size={moderateScale(25,0.6)}
      />
      </View>
      // <CustomText style={[styles.generalBtn, styles.btnRight]}>Next</CustomText>
    );
  };
  const RenderDoneBtn = () => {
    return (
      <CustomText
        onPress={() => {
          dispatch(setWalkThrough(true));
        }}
        style={[styles.generalBtn, styles.btnRight]}>
        Done
      </CustomText>
    );
  };
  const RenderSkipBtn = () => {
    return (
      <CustomText
        onPress={() => {
          dispatch(setWalkThrough(true));
        }}
        style={[styles.generalBtn, styles.btnLeft]}>
        Skip
      </CustomText>
    );
  };
  const RenderBackBtn = () => {
    return (
      <CustomText isBold style={[styles.generalBtn, styles.btnLeft]}>Back</CustomText>
    );
  };
  return (
    <ScreenBoiler
      showHeader={false}
      statusBarBackgroundColor={[Color.black, Color.black]}
      statusBarContentStyle={'light-content'}>
      {/* <View style={styles.container}> */}
     
        <AppIntroSlider
          renderItem={RenderSlider}
          data={slides}
          showSkipButton={true}
          showPrevButton={true}
          activeDotStyle={{backgroundColor: Color.white , 
            marginBottom : moderateScale(20,0.3)
          
          }}
          dotStyle={{
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: Color.white,
            marginBottom : moderateScale(20,0.3)
          }}
          renderDoneButton={RenderDoneBtn}
          renderNextButton={RenderNextBtn}
          renderSkipButton={RenderSkipBtn}
          renderPrevButton={RenderBackBtn}
        />
      {/* </View> */}
    </ScreenBoiler>
  );
};

const styles = StyleSheet.create({
  container: {
   flex : 1

    //  backgroundColor: Color.themeColor,
  },

  SliderContainer: {
    // flex: 1,
    flex : 1,
    width: windowWidth,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.red,
    overflow : 'hidden',
  },
  title: {
    color: Color.black,
    fontWeight: '700',
    fontSize: moderateScale(20,0.6),
    textAlign: 'center',
    width: windowWidth * 0.9,
    marginTop: windowHeight * 0.065,
  },
  subcontainer: {
    width: windowWidth,
    // height: windowHeight * 0.5,
   overflow : 'scroll',
    marginTop: moderateScale(-20, 0.3),
    alignItems: 'center',
    // borderTopLeftRadius: moderateScale(35, 0.3),
    // borderTopRightRadius: moderateScale(35, 0.3),
  },
  subText: {
    color: Color.black,
    // textAlign: 'center',
    fontWeight: '400',
    fontSize: moderateScale(15, 0.6),
    width: windowWidth * 0.9,
    marginTop: moderateScale(10, 0.3),
    lineHeight : moderateScale(18,0.6)
  },
  generalBtn: {
    justifyContent : 'center',
    // alignItems : 'center',
    paddingVertical: moderateScale(18, 0.6),
    textAlign: 'center',
    fontWeight: '400',
    fontSize: moderateScale(16, 0.6),
  },
  btnLeft: {
    color: Color.black,
    // paddingLeft: moderateScale(20, 0.3),
    width : moderateScale(60,0.6),
    height : moderateScale(60,0.6),
    borderRadius : moderateScale(30,0.6),
    backgroundColor : 'rgba(255,255,255,0.7)',
    textAlign : 'center',
    marginTop : moderateScale(-20,0.3)
  },
  btnRight: {
    width : moderateScale(60,0.6),
    height : moderateScale(60,0.6),
    borderRadius : moderateScale(30,0.6),
    backgroundColor : 'rgba(255,255,255,0.7)',
    justifyContent : 'center',
    alignItems : 'center',
    marginTop : moderateScale(-20,0.3),
  },
});

export default Walkthrough;
