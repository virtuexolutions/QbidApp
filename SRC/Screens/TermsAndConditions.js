import React, {useEffect, useState} from 'react';
import {View, Image, ScrollView} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';

import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';

import {windowHeight, windowWidth} from '../Utillity/utils';
import ScreenBoiler from '../Components/ScreenBoiler';

// import {Get} from '../Axios/AxiosInterceptorFunction';
import Loader from '../Components/Loader';
// import DOMParser from 'react-native-html-parser';
import moment from 'moment/moment';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import Animated from 'react-native-reanimated';

const TermsAndConditions = () => {
  const userRole = useSelector(state => state.commonReducer.selectedRole);

  const [isLoading, setIsLoading] = useState(false);
  const [termsData, setTermsData] = useState('');

  // const parser = new DOMParser.DOMParser();

  // const GetSupportData = async () => {
  //   const url = 'term/conditions';
  //   setIsLoading(true);
  //   const response = await Get(url);
  //   setIsLoading(false);
  //   if (response != undefined) {
  //     console.log('dasdsadsa =>', response?.data?.data);
  //     setTermsData(response?.data?.data);
  //   }
  // };

  // useEffect(() => {
  //   GetSupportData();
  // }, []);

  // useEffect(() => {
  //   console.log(termsData);
  //   // let a = parser?.parseFromString(
  //   //   "<p>Hello world <b>world</b> <i>foo</i> abc</p>",
  //   //   "text/html"
  //   // );

  //   const parsed = parser.parseFromString(termsData?.description, 'text/html');
  //   console.log('here is the data =>',  parsed);
  // }, [termsData]);

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{minHeight: windowHeight * 0.7}}
        contentContainerStyle={
          {
            // backgroundColor: 'transparent',
          }
        }>
        <LinearGradient
          style={{
            // alignItems: 'center',
            paddingVertical: moderateScale(30, 0.6),
            paddingHorizontal: moderateScale(10, 0.6),
            minHeight: windowHeight * 0.97,
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
          {isLoading ? (
            <View style={styles.loaderView}>
              <Loader
                bgColor={'transparent'}
                // textColor={Color.Gray}
                height={windowHeight * 0.8}
                width={windowWidth * 0.9}
                size={'large'}
                text={true}
              />
            </View>
          ) : (
            <>
              <CustomText
                style={[
                  {color: Color.themeBlack, marginTop: moderateScale(20, 0.3)},
                ]}>
                Terms & Conditions
              </CustomText>
              <CustomText
                style={[
                  {marginTop: moderateScale(8, 0.3)},
                ]}>{`Effective Date : ${moment(termsData?.updated_at).format(
                'll',
              )}`}</CustomText>
              <CustomText
                style={[
                  {
                    // backgroundColor: 'red',
                    color: Color.white,
                    textAlign: 'left',
                    marginTop: moderateScale(20, 0.3),
                    lineHeight: moderateScale(25, 0.3),
                    fontSize: moderateScale(13, 0.3),
                  },
                ]}>
                Lorem Ipsum dolor Lorem Ipsum dolorLorem Ipsum dolorLorem Ipsum
                dolorLorem Ipsum dolorvLorem Ipsum dolorLorem Ipsum dolorLorem
                Ipsum dolor Lorem Ipsum dolorLorem Ipsum dolorLorem Ipsum
                dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum dolorLorem
                Ipsum dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum dolor
                Lorem Ipsum dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum
                dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum dolorLorem
                Ipsum dolorLorem Ipsum dolorLorem Ipsum dolor Lorem Ipsum
                dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum dolorLorem
                Ipsum dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum
                dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum dolorLorem
                Ipsum dolorLorem Ipsum dolorLorem Ipsum dolor Lorem Ipsum
                dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum dolorLorem
                Ipsum dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum
                dolorLorem Ipsum dolorLorem Ipsum dolor Lorem Ipsum dolorLorem
                Ipsum dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum
                dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum dolor Lorem
                Ipsum dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum
                dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum dolorLorem
                Ipsum dolorLorem Ipsum dolor Lorem Ipsum dolorLorem Ipsum
                dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum dolor Lorem
                Ipsum dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum
                dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum dolor Lorem
                Ipsum dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum
                dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum dolor Lorem
                Ipsum dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum
                dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum dolor Lorem
                Ipsum dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum
                dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum dolor Lorem
                Ipsum dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum
                dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum dolor Lorem
                Ipsum dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum
                dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum dolorLorem
                Ipsum dolor Lorem Ipsum dolorLorem Ipsum dolorLorem Ipsum
                dolorLorem Ipsum dolorLorem Ipsum dolor Lorem Ipsum dolorLorem
                Ipsum dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum
                dolorLorem Ipsum dolorLorem Ipsum dolor Lorem Ipsum dolorLorem
                Ipsum dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum
                dolorLorem Ipsum dolor Lorem Ipsum dolorLorem Ipsum dolorLorem
                Ipsum dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum
                dolorLorem Ipsum dolorLorem Ipsum dolor Lorem Ipsum dolorLorem
                Ipsum dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum
                dolorLorem Ipsum dolorLorem Ipsum dolor Lorem Ipsum dolorLorem
                Ipsum dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum
                dolorLorem Ipsum dolor Lorem Ipsum dolorLorem Ipsum dolorLorem
                Ipsum dolorLorem Ipsum dolorLorem Ipsum dolorLorem Ipsum
                dolorLorem Ipsum dolor helloo
              </CustomText>
            </>
          )}
        </LinearGradient>
      </ScrollView>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  container: {
    height: windowHeight * 0.9,
    width: windowWidth,
    backgroundColor: Color.white,
    alignItems: 'center',
  },
  button: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.25,
    borderRadius: moderateScale(5, 0.3),
    backgroundColor: Color.themeColor,
    position: 'absolute',
    bottom: 50,
    right: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    width: windowWidth * 0.85,
    // backgroundColor: "red",
    // marginHorizontal: moderateScale(20, 0.3),
    borderBottomWidth: 0.5,
    borderColor: Color.lightGrey,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: moderateScale(15, 0.3),
  },
  image: {
    width: moderateScale(25, 0.3),
    height: moderateScale(25, 0.3),
    // marginRight: moderateScale(5, 0.3),
  },
});

export default TermsAndConditions;
