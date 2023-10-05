import React, {useState} from 'react';
import {
  View,
  Image,
  Dimensions,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';

import {useDispatch, useSelector} from 'react-redux';

import navigationService from '../navigationService';

import TextInputWithTitle from '../Components/TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';

import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import ScreenBoiler from '../Components/ScreenBoiler';
import CustomButton from '../Components/CustomButton';
import {
  setIsVerified,
  setPm_Type,
  setUserLogout,
  setUserToken,
} from '../Store/slices/auth';
import {validateEmail} from '../Config';
import {ActivityIndicator} from 'react-native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {setUserData} from '../Store/slices/common';
import {Icon, ScrollView} from 'native-base';
import CardContainer from '../Components/CardContainer';
import {
  CardField,
  createPaymentMethod,
  BillingDetails,
  createToken,
} from '@stripe/stripe-react-native';
import LinearGradient from 'react-native-linear-gradient';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const AddCard = () => {
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  console.log("🚀 ~ file: AddCard.js:48 ~ AddCard ~ userRole:", userRole)
  const token = useSelector(state => state.authReducer.token);
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.commonReducer);
  
  const [isLoading, setIsLoading] = useState(false);
  const [cardData, setCardData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
  });

  const addCard = async () => {
    const url = 'auth/addcard';

    // const billingDetails: BillingDetails = {
    //   email: cardData.email,
    //   name: cardData.name,
    //   phone: cardData.phone,
    //   // address : {
    //   city: cardData.city,
    //   // country : 'PK'
    //   // }
    // };
    // for (let key in billingDetails) {
    //   if (billingDetails[key] == '') {
    //     return Platform.OS == 'android'
    //       ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
    //       : alert(`${key} is required`);
    //   }
    // }
    // console.log("🚀 ~ file: AddCard.js:91 ~ addCard ~ billingDetails", billingDetails)
    setIsLoading(true);
    const responseData = await createToken({
      type: 'Card',
      // name: cardData.name,
      // address: {
      //   city: cardData?.city,
      // },

      // paymentMethodData : {
      //   billingDetails,
      // }
    });
    console.log(
      '🚀 ~ file: AddCard.js:90 ~ addCard ~ responseData',
      JSON.stringify(responseData, null, 2),
    );

    if (responseData.error) {
      setIsLoading(false);
      console.log(responseData.error);
    }
    if (responseData != undefined) {
      // userRole == 'Business Qbidder' ? navigationService.navigate('MileRange', {fromLogin : true}) :
      dispatch(setUserToken({token: 'dasdawradawdawrtfeasfzs'}));
      return console.log(responseData?.token?.id);
      const responseApi = await Post(url, responseData, apiHeader(token));
      setIsLoading(false);
      if (responseApi != undefined) {
        console.log(
          'response >>>>>>>',
          JSON.stringify(responseApi?.data, null, 2),
        );
        dispatch(setUserData(responseApi?.data?.data));
        dispatch(setPm_Type(responseApi?.data?.data?.pm_type));

        Platform.OS == 'android'
          ? ToastAndroid.show('Card Saved', ToastAndroid.SHORT)
          : alert('Card Saved');

        // navigationService.navigate('SetGoals');
      }
    }
  };
  return (
    <ScreenBoiler
    
      hideUser={true}
      showHeader={true}
      showBack={false}
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
      >
     <LinearGradient
        style={{
          height: windowHeight * 0.97,
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.sectionContainer}
          contentContainerStyle={{
            paddingBottom: moderateScale(20, 0.3),
            alignItems: 'center',
          }}>
          <Image
            source={userRole == 'Business Qbidder' ? require('../Assets/Images/visa.png'):require('../Assets/Images/jcb.png')}
            resizeMode={'contain'}
            style={{
              alignSelf: 'center',
              // backgroundColor : 'red',
              height: windowHeight * 0.3,
              width : windowWidth * 0.8 ,
              marginTop: moderateScale(10, 0.3),
            }}
          />
          <CardContainer
            style={{
              height: windowHeight * 0.5,
              paddingTop: moderateScale(30, 0.3),
              alignItems: 'center',
            }}>
            <CardField
              postalCodeEnabled={false}
              placeholders={{
                number: '4242 4242 4242 4242',
              }}
              // placeholders={{
              //   number: '4242 4242 4242 4242',
              // }}
              cardStyle={{
                backgroundColor: '#EAEAEA',
                textColor: '#000000',
                borderRadius: moderateScale(25, 0.3),
              }}
              style={{
                width: windowWidth * 0.75,
                height: windowHeight * 0.05,
                marginVertical: moderateScale(12, 0.3),

                borderColor: Color.lightGrey,
              }}
              onCardChange={cardDetails => {
                console.log('cardDetails', cardDetails);
              }}
              onFocus={focusedField => {
                console.log('focusField', focusedField);
              }}
            />

            <TextInputWithTitle
              titleText={'Cardholder Name'}
              placeholder={'Cardholder Name'}
              setText={data => {
                setCardData(prev => {
                  return {...prev, name: data};
                });
              }}
              value={cardData?.name}
              viewHeight={0.05}
              viewWidth={0.75}
              inputWidth={0.72}
              border={1}
              borderColor={Color.lightGrey}
              backgroundColor={'#EAEAEA'}
              // marginTop={moderateScale(8, 0.3)}
              color={'#11A44C'}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(20, 0.3)}
            />
            <View
              style={[styles.phoneView, {marginTop: moderateScale(8, 0.3)}]}>
              <TextInputWithTitle
                titleText={'Email'}
                placeholder={'Email'}
                setText={data => {
                  setCardData(prev => {
                    return {...prev, email: data};
                  });
                }}
                value={cardData?.email}
                viewHeight={0.05}
                viewWidth={0.75}
                inputWidth={0.72}
                border={1}
                borderColor={Color.lightGrey}
                backgroundColor={'#EAEAEA'}
                //   marginTop={moderateScale(10, 0.3)}
                color={'#11A44C'}
                placeholderColor={Color.themeLightGray}
                borderRadius={moderateScale(20, 0.3)}
              />

              {/* <View style={styles.cont}>
              <CustomText style={styles.txt4}>Scan</CustomText>
            </View> */}
            </View>
            <View
              style={[styles.phoneView, {marginTop: moderateScale(5, 0.3)}]}>
              <TextInputWithTitle
                titleText={'contact'}
                placeholder={'Phone'}
                setText={data => {
                  setCardData(prev => {
                    return {...prev, phone: data};
                  });
                }}
                value={cardData?.phone}
                viewHeight={0.05}
                viewWidth={0.35}
                inputWidth={0.32}
                border={1}
                borderColor={Color.lightGrey}
                backgroundColor={'#EAEAEA'}
                //   marginTop={moderateScale(10, 0.3)}
                color={'#11A44C'}
                placeholderColor={Color.themeLightGray}
                borderRadius={moderateScale(20, 0.3)}
                keyboardType={'numeric'}
              />

              <TextInputWithTitle
                titleText={'City'}
                placeholder={'City'}
                setText={data => {
                  setCardData(prev => {
                    return {...prev, city: data};
                  });
                }}
                value={cardData?.city}
                viewHeight={0.05}
                viewWidth={0.35}
                inputWidth={0.32}
                border={1}
                borderColor={Color.lightGrey}
                backgroundColor={'#EAEAEA'}
                //   marginTop={moderateScale(10, 0.3)}
                color={'#11A44C'}
                placeholderColor={Color.themeLightGray}
                borderRadius={moderateScale(20, 0.3)}
              />
            </View>

            <CustomButton
              // textTransform={"capitalize"}
              text={
                isLoading ? (
                  <ActivityIndicator color={'#ffffff'} size={'small'} />
                ) : (
                  'Submit'
                )
              }
              isBold
              textColor={Color.white}
              width={windowWidth * 0.75}
              height={windowHeight * 0.06}
              marginTop={moderateScale(20, 0.3)}
              onPress={addCard}
              bgColor ={userRole == 'Qbid Member'
              ? Color.blue
              : userRole == 'Qbid Negotiator'
              ? Color.themeColor
              : Color.black}
              // borderColor={Color.white}
              // borderWidth={2}
              borderRadius={moderateScale(30, 0.3)}
            />
            <CustomText
              onPress={() => {
               navigationService.navigate('LoginScreen')
              }}
              style={{
                marginTop: moderateScale(10, 0.3),
                color: Color.themeBlack,
                fontSize: moderateScale(12, 0.3),
                textDecorationLine: 'underline',
                // fontStyle : 'italic' ,
                fontWeight: 'bold',
              }}>
              Logout
            </CustomText>
          </CardContainer>
        </ScrollView>
      </LinearGradient>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  sectionContainer: {
    // flex: 1,
    height: windowHeight,
    paddingTop: moderateScale(5, 0.3),
  },
  Txt: {
    marginTop: moderateScale(10, 0.3),
    color: Color.themeBlack,
    fontSize: moderateScale(22, 0.6),
    textAlign: 'center',
  },
  tou: {
    marginTop: height * 0.03,
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: windowWidth * 0.75,
    paddingVertical: moderateScale(5, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15, 0.3),
    marginTop: moderateScale(10, 0.3),
    backgroundColor: 'orange',
  },
  cont: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.23,
    borderRadius: moderateScale(20, 0.3),
    // opacity: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'orange',
  },
  imageContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    backgroundColor: Color.white,
    borderRadius: moderateScale(30, 0.3),
    paddingHorizontal: moderateScale(25, 0.3),
    paddingVertical: moderateScale(15, 0.3),
    marginVertical: moderateScale(40, 0.3),
  },
  img: {height: windowHeight * 0.26},
  Tou: {
    width: width * 0.9,
    height: height * 0.055,
    marginTop: height * 0.03,
  },
  txt2: {
    color: Color.black,
    fontSize: moderateScale(20, 0.6),
    fontWeight: 'bold',
  },
  txt3: {
    color: Color.themeLightGray,
    fontSize: moderateScale(12, 0.6),
    textAlign: 'center',
    width: '60%',
    marginTop: moderateScale(5, 0.3),
    lineHeight: moderateScale(17, 0.3),
  },
  txt4: {
    color: Color.white,
    fontSize: moderateScale(14, 0.6),
    fontWeight: 'bold',
    // borderBottomWidth: 1,
    // borderColor: Color.white,
  },
  txt5: {
    color: Color.black,

    fontSize: moderateScale(12, 0.6),
  },

  phoneView: {
    width: windowWidth * 0.75,
    paddingVertical: moderateScale(5, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: moderateScale(20, 0.3),
    // backgroundColor: 'red',
  },
  countryCode: {
    borderRadius: moderateScale(17, 0.3),
    color: Color.themeLightGray,
    height: height * 0.047,
    paddingHorizontal: moderateScale(10, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(10, 0.3),
    backgroundColor: '#EAEAEA',
  },
});

export default AddCard;
