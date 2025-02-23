import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../Components/CustomButton';
import {
  setMilageRing,
  setUserLogin,
  setUserLogoutAuth,
  setUserToken,
} from '../Store/slices/auth';
import ImageView from 'react-native-image-viewing';
// import RNInstalledApplication from 'react-native-installed-application';
import moment from 'moment/moment';
import navigationService from '../navigationService';
import {setUserLogOut} from '../Store/slices/common';
import HelpModal from '../Components/HelpModal';

const Settings = () => {
  const user = useSelector(state => state.commonReducer.userData);
  console.log("🚀 ~ Settings ~ user:", user)
  const userRole = useSelector(state => state.commonReducer.selectedRole);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);

  // const getApplication = ()=>{
  //   RNInstalledApplication.getApps()
  //   .then(apps => {
  //     console.log(apps[63] , moment(apps[63].firstInstallTime).format('ll') ,  moment(apps[63].lastUpdateTime).format('ll') );
  //     setData(apps)
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // }

  // useEffect(() => {
  //   getApplication()
  // }, [])

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
      }>
      <LinearGradient
        style={{
          minHeight: windowHeight * 0.89,
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
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          // style={styles.container}
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: windowHeight * 0.2,
            paddingTop: moderateScale(40, 0.3),
          }}>
          {/* {
             data && data.map((x,index)=>{
              return(
                <CustomText>{x?.appName}</CustomText>
              )
             })
            } */}
          <View style={[styles.image1]}>
            <CustomImage
              onPress={() => {
                setIsVisible(true);
              }}
              source={{uri: user?.photo}}
              style={[styles.image]}
            />
          </View>
          <CustomText
            isBold
            style={[
              styles.text,
              {fontSize: moderateScale(17, 0.3)},
              userRole != 'Qbid Member' && {color: Color.white},
            ]}>
            {`${user?.first_name} ${user?.last_name}`}
          </CustomText>
          <CustomButton
            isBold
            text={'Profile'}
            textColor={Color.themeDarkGray}
            width={windowWidth * 0.9}
            height={windowHeight * 0.07}
            marginTop={moderateScale(10, 0.3)}
            onPress={() => {
              navigationService.navigate(
                userRole == 'Qbid Member'
                  ? 'MyAccounts'
                  : 'NegotiatorPortfolio',
              );
            }}
            bgColor={Color.white}
            // isGradient
            borderRadius={moderateScale(30, 0.3)}
            elevation
          />
          <CustomButton
            isBold
            text={'Saved Cards'}
            textColor={Color.themeDarkGray}
            width={windowWidth * 0.9}
            height={windowHeight * 0.07}
            marginTop={moderateScale(10, 0.3)}
            onPress={() => {
              navigationService.navigate('PaymentMethod');
            }}
            bgColor={Color.white}
            // isGradient
            borderRadius={moderateScale(30, 0.3)}
          />
          {userRole == 'Business Qbidder' && (
            <CustomButton
              isBold
              text={'milage Rings'}
              textColor={Color.themeDarkGray}
              width={windowWidth * 0.9}
              height={windowHeight * 0.07}
              marginTop={moderateScale(10, 0.3)}
              onPress={() => {
                navigationService.navigate('MileRange', {fromSetting: true});
              }}
              bgColor={Color.white}
              // isGradient
              borderRadius={moderateScale(30, 0.3)}
            />
          )}
          <CustomButton
            isBold
            text={'Subscription'}
            textColor={Color.themeDarkGray}
            width={windowWidth * 0.9}
            height={windowHeight * 0.07}
            marginTop={moderateScale(10, 0.3)}
            onPress={() => {
              navigationService.navigate('Subscription');
            }}
            bgColor={Color.white}
            // isGradient
            borderRadius={moderateScale(30, 0.3)}
            elevation
          />
          {userRole != 'Qbid Member' && (
            <CustomButton
              isBold
              text={'your jobs'}
              textColor={Color.themeDarkGray}
              width={windowWidth * 0.9}
              height={windowHeight * 0.07}
              marginTop={moderateScale(10, 0.3)}
              onPress={() => {
                navigationService.navigate('YourJobs');
              }}
              bgColor={Color.white}
              borderRadius={moderateScale(30, 0.3)}
            />
          )}
          <CustomButton
            isBold
            text={'Change Password'}
            textColor={Color.themeDarkGray}
            width={windowWidth * 0.9}
            height={windowHeight * 0.07}
            marginTop={moderateScale(10, 0.3)}
            onPress={() => {
              navigationService.navigate('ChangePassword');
            }}
            bgColor={Color.white}
            borderRadius={moderateScale(30, 0.3)}
          />
          {userRole == 'Qbid Member' && (
            <CustomButton
              isBold
              text={'Help'}
              textColor={Color.themeDarkGray}
              width={windowWidth * 0.9}
              height={windowHeight * 0.07}
              marginTop={moderateScale(10, 0.3)}
              onPress={() => {
                console.log('help clicked');
                setModalVisible(true);
              }}
              bgColor={Color.white}
              // isGradient
              borderRadius={moderateScale(30, 0.3)}
            />
          )}
          <HelpModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
          <CustomButton
            isBold
            text={'Terms And Condition'}
            textColor={Color.themeDarkGray}
            width={windowWidth * 0.9}
            height={windowHeight * 0.07}
            marginTop={moderateScale(10, 0.3)}
            onPress={() => {
              navigationService.navigate('TermsAndConditions');
            }}
            bgColor={Color.white}
            // isGradient
            borderRadius={moderateScale(30, 0.3)}
          />

          <CustomButton
            isBold
            text={'Support'}
            textColor={Color.themeDarkGray}
            width={windowWidth * 0.9}
            height={windowHeight * 0.07}
            marginTop={moderateScale(10, 0.3)}
            onPress={() => {
              navigationService.navigate('Support');
            }}
            bgColor={Color.white}
            // isGradient
            borderRadius={moderateScale(30, 0.3)}
          />
          <CustomButton
            isBold
            text={'Logout'}
            textColor={Color.themeDarkGray}
            width={windowWidth * 0.9}
            height={windowHeight * 0.07}
            marginTop={moderateScale(10, 0.3)}
            onPress={() => {
              dispatch(setUserLogOut());
              dispatch(setUserLogoutAuth());
              dispatch(setMilageRing(false));
            }}
            bgColor={Color.white}
            // isGradient
            borderRadius={moderateScale(30, 0.3)}
          />
        </KeyboardAwareScrollView>
        <ImageView
          images={[{uri: user?.photo}]}
          imageIndex={0}
          visible={isVisible}
          onRequestClose={() => {
            setIsVisible(false);
          }}
        />
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default Settings;

const styles = ScaledSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  image: {
    height: windowWidth * 0.31,
    width: windowWidth * 0.31,
    borderRadius: moderateScale((windowWidth * 0.31) / 2, 0.3),
  },
  image1: {
    height: windowWidth * 0.32,
    width: windowWidth * 0.32,
    borderRadius: moderateScale((windowWidth * 0.32) / 2, 0.3),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: moderateScale(16, 0.3),
    marginTop: moderateScale(5, 0.3),
    marginBottom: moderateScale(15, 0.3),

    textAlign: 'center',
  },
});
