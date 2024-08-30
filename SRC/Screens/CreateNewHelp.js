import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Linking, View} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Icon, ScrollView} from 'native-base';
import {useSelector} from 'react-redux';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import ImagePickerModal from '../Components/ImagePickerModal';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import {FlatList} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../Components/CustomButton';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {Platform} from 'react-native';
import {ToastAndroid} from 'react-native';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CreateNewHelp = props => {
  const item = props?.route?.params?.item;

  const location = useSelector(state => state.commonReducer.location);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const token = useSelector(state => state.authReducer.token);
  const [qouteTitle, setQouteTitle] = useState(item?.title ? item?.title : '');
  const [city, setCity] = useState(item?.city ? item?.city : '');
  const [state, setState] = useState(item?.state ? item?.state : '');
  const [selectedService, setSelectedService] = useState(
    item?.service_preference,
  );
  const [description, setDescription] = useState(
    item?.description ? item?.description : '',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [negotiatorOfferedPrice, setNegotiatorOfferedPrice] = useState(item?.offered_price ? `${item?.offered_price}` : 0);
  const [negotiatorTip, setNegotiatorTip] = useState(item?.negotiator_tip ? `${item?.negotiator_tip}` : 0);
  const [multiImages, setMultiImages] = useState([]);
  const [askingPrice, setAskingPrice] = useState(0);
  const [vendorQoutedPrice, setVendorQoutedPrice] = useState(0);
  const [offeringPercent, setOfferingPercent] = useState(0);
  const [showMultiImageModal, setShowMultiImageModal] = useState(false);

  const navigation = useNavigation();

  const updateHelpQuote = async () => {
    const url = `auth/member/quote_help/${item?.id}?_method=put`;
    const body = {
      title: qouteTitle,
      city: city,
      state: state,
      offered_price: negotiatorOfferedPrice,
      negotiator_tip: negotiatorTip,
      service_preference: selectedService,
      description: description,
    };

    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
          : Alert.alert(`${key} is required`);
      }
    }

    if (description.length < 100) {
      return Platform.OS == 'android'
        ? ToastAndroid.show(
            `Description should be greater than 100 letters`,
            ToastAndroid.SHORT,
          )
        : Alert.alert(`Description should be greater than 100 letters`);
    }

    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
   
      setCity('');
      setNegotiatorOfferedPrice(0);
      setNegotiatorTip(0);
      setDescription('');
      setQouteTitle('');
      setState('');
      setSelectedService('');

      navigation.goBack();
    }
  };

  useEffect(() => {
    if (parseInt(askingPrice) > parseInt(vendorQoutedPrice)) {
      alert('asking price can not be higher than vendor quoted price ');
      setAskingPrice(0);
    }
    if (offeringPercent > 100) {
      alert('offering percentage can not be greater than 100');
    }
  }, [askingPrice, offeringPercent]);
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
      showBack={true}>
      <LinearGradient
        style={
          {
            // width: windowWidth,
            // minHeight: windowHeight * 0.89,
          }
        }
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
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: windowHeight * 0.2,
            paddingTop: moderateScale(40, 0.3),
          }}>
          <CustomText isBold style={styles.header}>
            Vendor Qoutes
          </CustomText>

          <TextInputWithTitle
            titleText={'Qoute Title'}
            secureText={false}
            placeholder={'Qoute Title'}
            setText={setQouteTitle}
            value={qouteTitle}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.86}
            // border={1}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
          />

          <TextInputWithTitle
            titleText={'City'}
            secureText={false}
            placeholder={'City'}
            setText={setCity}
            value={city}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.86}
            // border={1}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
          />

          <TextInputWithTitle
            titleText={'State'}
            secureText={false}
            placeholder={'State'}
            setText={setState}
            value={state}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.86}
            // border={1}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
          />

          <TextInputWithTitle
            titleText={'Negotiator offered Price'}
            secureText={false}
            placeholder={'Negotiator offered Price'}
            setText={setNegotiatorOfferedPrice}
            value={negotiatorOfferedPrice}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.86}
            // border={1}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
            keyboardType={'numeric'}
          />

          <TextInputWithTitle
            titleText={'Negotiator tip'}
            secureText={false}
            placeholder={'Negotiator tip'}
            setText={setNegotiatorTip}
            value={negotiatorTip}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.86}
            // border={1}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
            keyboardType={'numeric'}
          />

          <TextInputWithTitle
            titleText={'service perference'}
            secureText={false}
            placeholder={'service perference'}
            setText={setSelectedService}
            value={selectedService}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.86}
            // border={1}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            disable={true}
            borderRadius={moderateScale(25, 0.3)}
          />

          <TextInputWithTitle
            titleText={'description'}
            secureText={false}
            placeholder={'description'}
            setText={setDescription}
            value={description}
            viewHeight={0.2}
            viewWidth={0.9}
            inputWidth={0.8}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
            multiline
          />
          <CustomButton
            text={
              isLoading ? (
                <ActivityIndicator color={'#FFFFFF'} size={'small'} />
              ) : (
                'update'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.9}
            height={windowHeight * 0.07}
            marginTop={moderateScale(20, 0.3)}
            onPress={() => {
              updateHelpQuote();
            }}
            bgColor={
              userRole == 'Qbid Member'
                ? Color.blue
                : userRole == 'Qbid Negotiator'
                ? Color.themeColor
                : Color.black
            }
            borderRadius={moderateScale(30, 0.3)}
          />
        </KeyboardAwareScrollView>
      </LinearGradient>
      <ImagePickerModal
        show={showMultiImageModal}
        setShow={setShowMultiImageModal}
        setMultiImages={setMultiImages}
        // setFileObject={setImage}
      />
    </ScreenBoiler>
  );
};

export default CreateNewHelp;

const styles = ScaledSheet.create({
  container: {
    width: windowWidth,
  },
  image: {
    width: moderateScale(100, 0.3),
    height: moderateScale(100, 0.3),
    borderRadius: moderateScale(49, 0.3),
    marginLeft: moderateScale(2.5, 0.3),
    marginTop: moderateScale(2.5, 0.3),
  },
  addImageContainer: {
    width: windowWidth * 0.14,
    backgroundColor: Color.white,
    borderRadius: moderateScale(5, 0.3),
    borderWidth: 2,
    borderColor: Color.blue,
    height: windowHeight * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(10, 0.3),
    // marginTop: moderateScale(5, 0.3),
    shadowColor: Color.themeColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    overflow: 'hidden',
  },
  imagesContainer: {
    marginTop: moderateScale(10, 0.3),
    width: windowWidth * 0.9,
    marginLeft: moderateScale(10, 0.3),
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  header: {
    color: Color.black,
    fontSize: moderateScale(18, 0.3),
    width: windowWidth * 0.9,
  },
});
