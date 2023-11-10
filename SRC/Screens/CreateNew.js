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
import {useDispatch, useSelector} from 'react-redux';
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
import navigationService from '../navigationService';
import {useNavigation} from '@react-navigation/native';

const CreateNew = (props) => {
  const hire = props?.route?.params?.hire
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const servicesArray = useSelector(state => state.commonReducer.servicesArray);
  const token = useSelector(state => state.authReducer.token);
  const [qouteTitle, setQouteTitle] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [vendorQoutedPrice, setVendorQoutedPrice] = useState('');
  const [askingPrice, setAskingPrice] = useState('');
  const [offeringPercent, setOfferingPercent] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [description, setDescription] = useState('');
  const [multiImages, setMultiImages] = useState([]);
  // console.log("🚀 ~ file: CreateNew.js:40 ~ CreateNew ~ multiImages:", multiImages)
  const [showMultiImageModal, setShowMultiImageModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const publishQuote = async () => {
    const url = 'auth/member/quote';
    const body = {
      title: qouteTitle,
      city: city,
      state: state,
      quoted_price: vendorQoutedPrice,
      asking_price: askingPrice,
      offering_percentage: offeringPercent,
      service_preference: selectedService,
      // vendorList: multiImages,
      notes: description,
    };
    const body2 = {
      quoted_price: vendorQoutedPrice,
      asking_price: askingPrice,
      offering_percentage: offeringPercent,
    }

    const formData = new FormData();

  
    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
          : Alert.alert(`${key} is required`);
      } else {
        formData.append(key, body[key]);
      }
    }
    for(let key in body2){
      if(isNaN(body2[key])){
        return Platform.OS == 'android'
        ?ToastAndroid.show(`${key}is not a number` ,ToastAndroid.SHORT )
        :Alert.alert(`${key} is not a number `)
      }
    }
    if(description.length < 100){
      return Platform.OS == 'android'
          ? ToastAndroid.show(`Description should be greater than 100 letters`, ToastAndroid.SHORT)
          : Alert.alert(`Description should be greater than 100 letters`);
    }
    multiImages?.map((item, index) => formData.append(`images[${index}]`, item));
    // console.log("🚀 ~ file: CreateNew.js:67 ~ publishQuote ~ formData:", formData)

    setIsLoading(true);
    const response = await Post(url, formData, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {

      setCity('')
      setAskingPrice('')
      setDescription('')
      setMultiImages([])
      setOfferingPercent('')
      setQouteTitle('')
      setState('')
      setSelectedService('')
      setVendorQoutedPrice('')
      
      // console.log(
      //   '🚀 ~ file: CreateNew.js:81 ~ publishQuote ~ response:',
      //   response?.data,
      // );
      navigation.goBack();
    }
    
  };

  const sendRequest =async ()=>{
    const url = '';
    const body = {
      title: qouteTitle,
      city: city,
      state: state,
      quoted_price: vendorQoutedPrice,
      asking_price: askingPrice,
      offering_percentage: offeringPercent,
      notes: description,
    };
    const body2 = {
      quoted_price: vendorQoutedPrice,
      asking_price: askingPrice,
      offering_percentage: offeringPercent,
    }

    const formData = new FormData();

    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
          : Alert.alert(`${key} is required`);
      } else {
        formData.append(key, body[key]);
      }
    }
    for(let key in body2){
      if(isNaN(body2[key])){
        return Platform.OS == 'android'
        ?ToastAndroid.show(`${key}is not a number` ,ToastAndroid.SHORT )
        :Alert.alert(`${key} is not a number `)
      }
    }
    if(description.length < 100){
      return Platform.OS == 'android'
          ? ToastAndroid.show(`Description is too short`, ToastAndroid.SHORT)
          : Alert.alert(`Description is too short`);
    }
    multiImages?.map((item, index) => formData.append(`images[${index}]`, item));

    setIsLoading(true);
    const response = await Post(url, formData, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
    console.log("🚀 ~ file: CreateNew.js:164 ~ sendRequest ~ response:", response?.data)

      setCity('')
      setAskingPrice('')
      setDescription('')
      setMultiImages([])
      setOfferingPercent('')
      setQouteTitle('')
      setState('')
      setSelectedService('')
      setVendorQoutedPrice('')
      
     
      navigation.goBack();
    }

  }

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
      //  showBack={true}
    >
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
          // style={styles.container}
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: windowHeight * 0.2,
            paddingTop: moderateScale(40, 0.3),
          }}>
          <CustomText isBold style={styles.header}>
            Vendor Qoutes price
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
            titleText={'Vendor Qouted Price'}
            secureText={false}
            placeholder={'Vendor Qouted Price'}
            setText={setVendorQoutedPrice}
            value={vendorQoutedPrice}
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
            titleText={'Asking Price '}
            secureText={false}
            placeholder={'Asking Price'}
            setText={setAskingPrice}
            value={askingPrice}
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
            titleText={'Offering percent to negotiator from saving'}
            secureText={false}
            placeholder={'Offering percent to negotiator from saving'}
            setText={setOfferingPercent}
            value={offeringPercent}
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
         {!hire && <DropDownSingleSelect
            array={servicesArray.filter(x => x?.name)}
            item={selectedService}
            setItem={setSelectedService}
            placeholder={'Service preference'}
            width={windowWidth * 0.9}
            dropDownHeight={windowHeight * 0.06}
            dropdownStyle={{
              width: windowWidth * 0.9,
              borderBottomWidth: 0,
              marginTop: moderateScale(15, 0.3),
            }}
          />}
          <CustomText
            isBold
            style={[
              styles.header,
              {
                fontSize: moderateScale(12, 0.3),
                marginTop: moderateScale(10, 0.3),
                marginLeft: moderateScale(10, 0.3),
              },
            ]}>
            Upload vendor Qouted list
          </CustomText>
          <View style={styles.imagesContainer}>
            <FlatList
              horizontal
              data={multiImages}
              showsHorizontalScrollIndicator={false}
              style={{
                flexGrow: 0,
              }}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={[
                      styles.addImageContainer,
                      {borderWidth: 0, borderRadius: moderateScale(10, 0.3)},
                    ]}>
                    <Icon
                      name={'close'}
                      as={FontAwesome}
                      color={Color.themeColor}
                      size={moderateScale(12, 0.3)}
                      style={{
                        position: 'absolute',
                        right: 1,
                        top: 1,
                        zIndex: 1,
                      }}
                      onPress={() => {
                        let newArray = [...multiImages];
                        newArray.splice(index, 1);
                        setMultiImages(newArray);
                      }}
                    />
                    <CustomImage
                      source={{uri: item?.uri}}
                      resizeMode={'stretch'}
                      style={{
                        width: moderateScale(50, 0.3),
                        height: moderateScale(60, 0.3),
                      }}
                    />
                  </View>
                );
              }}
            />

            <View style={styles.addImageContainer}>
              <Icon
                name={'plus'}
                as={AntDesign}
                color={Color.themeColor}
                size={moderateScale(30, 0.3)}
                onPress={() => {
                  setShowMultiImageModal(true);
                }}
              />
            </View>
          </View>
          <TextInputWithTitle
            titleText={'Special Notes for negotiators'}
            secureText={false}
            placeholder={'Special Notes for negotiators'}
            setText={setDescription}
            value={description}
            viewHeight={0.2}
            viewWidth={0.9}
            inputWidth={0.8}
            // border={1}
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
                'Publish'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.9}
            height={windowHeight * 0.07}
            marginTop={moderateScale(20, 0.3)}
            onPress={() => {
              // console.log('here');
              hire ? sendRequest() : publishQuote();
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

export default CreateNew;

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
