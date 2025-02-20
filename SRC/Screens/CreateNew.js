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

const CreateNew = props => {
  const hire = props?.route?.params?.hire;
  const quoteData = props?.route?.params?.data;
  // const fromupdatequote = true;
  const fromupdatequote = props?.route?.params?.fromupdatequote;

  const negotiater_id = props?.route?.params?.id;
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const servicesArray = useSelector(state => state.commonReducer.servicesArray);
  const token = useSelector(state => state.authReducer.token);
  console.log('🚀 ~ CreateNew ~ token:', token);
  const location = useSelector(state => state.commonReducer.location);
  const [qouteImages, setQuoteImages] = useState(quoteData?.images);
  console.log('🚀 ~ CreateNew ~ qouteImages:', qouteImages);
  const [qouteTitle, setQouteTitle] = useState(
    fromupdatequote ? quoteData?.title : '',
  );
  const [city, setCity] = useState(fromupdatequote ? quoteData?.city : '');
  const [state, setState] = useState(fromupdatequote ? quoteData?.state : '');
  const [vendorQoutedPrice, setVendorQoutedPrice] = useState(
    fromupdatequote ? quoteData?.quoted_price : 0,
  );
  const [askingPrice, setAskingPrice] = useState(
    fromupdatequote ? quoteData?.asking_price : 0,
  );
  const [offeringPercent, setOfferingPercent] = useState(
    fromupdatequote ? quoteData?.offering_percentage : 0,
  );
  const [selectedService, setSelectedService] = useState(
    fromupdatequote ? quoteData?.service_preference : '',
  );
  const [description, setDescription] = useState(
    fromupdatequote ? quoteData?.notes : '',
  );
  const [multiImages, setMultiImages] = useState([]);
  const [showMultiImageModal, setShowMultiImageModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const publishQuote = async () => {
    const url = 'auth/member/quote';
    const body = {
      lat: location?.latitude,
      lng: location?.longitude,
      title: qouteTitle,
      city: city,
      type: 'general',
      state: state,
      quoted_price: vendorQoutedPrice,
      asking_price: askingPrice,
      offering_percentage: offeringPercent,
      service_preference: selectedService,
    };
    const body2 = {
      quoted_price: vendorQoutedPrice,
      asking_price: askingPrice,
      offering_percentage: offeringPercent,
    };

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

    for (let key in body2) {
      if (isNaN(body2[key])) {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key}is not a number`, ToastAndroid.SHORT)
          : Alert.alert(`${key} is not a number `);
      }
    }

    if (!['', undefined, null].includes(description)) {
      formData.append('notes', description);
    }

    if (multiImages.length == 0) {
      return Platform.OS == 'android'
        ? ToastAndroid.show(`add atleast one image `, ToastAndroid.SHORT)
        : Alert.alert(`add atleast one image `);
    }

    multiImages?.map((item, index) =>
      formData.append(`images[${index}]`, item),
    );

    setIsLoading(true);
    const response = await Post(url, formData, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      setCity('');
      setAskingPrice(0);
      setDescription('');
      setMultiImages([]);
      setOfferingPercent(0);
      setQouteTitle('');
      setState('');
      setSelectedService('');
      setVendorQoutedPrice(0);
      navigation.goBack();
    }
  };

  const updateQuote = async () => {
    const url = `auth/member/quote_update/${quoteData?.id}`;
    const body = {
      lat: location?.latitude,
      lng: location?.longitude,
      title: qouteTitle,
      city: city,
      type: 'general',
      state: state,
      quoted_price: vendorQoutedPrice,
      asking_price: askingPrice,
      offering_percentage: offeringPercent,
      service_preference: selectedService,
      notes: 'sahiddiasdyasdiy',
    };
    const body2 = {
      quoted_price: vendorQoutedPrice,
      asking_price: askingPrice,
      offering_percentage: offeringPercent,
    };

    const formData = new FormData();

    // if (multiImages.length == 0) {
    //   return Platform.OS == 'android'
    //     ? ToastAndroid.show(`add atleast one image `, ToastAndroid.SHORT)
    //     : Alert.alert(`add atleast one image `);
    // }
    if (multiImages?.length > 0) {
      multiImages?.map((item, index) =>
        formData.append(`images[${index}]`, item),
      );
    } else {
      formData.append('images[]', null);
    }
    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
          : Alert.alert(`${key} is required`);
      } else {
        formData.append(key, body[key]);
      }
    }
    // return console.log("🚀 ~ updateQuote ~ formData:", JSON.stringify(formData,null,2))
    setIsLoading(true);
    const response = await Post(url, formData, apiHeader(token, true));
    setIsLoading(false);
    console.log('🚀 ~ updateQuote ~ response:', response?.data);
    if (response != undefined) {
      setCity('');
      setAskingPrice(0);
      setDescription('');
      setMultiImages([]);
      setOfferingPercent(0);
      setQouteTitle('');
      setState('');
      setSelectedService('');
      setVendorQoutedPrice(0);
      navigation.goBack();
      Platform.OS == 'android'
        ? ToastAndroid.show('quote updates succesfully ', ToastAndroid.SHORT)
        : alert.alert('quote updates succesfully');
    }
  };

  const sendRequest = async () => {
    const url = 'auth/member/hiring/create';
    const body = {
      negotiator_id: negotiater_id,
      type: 'specific',
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
    };

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
    for (let key in body2) {
      if (isNaN(body2[key])) {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key}is not a number`, ToastAndroid.SHORT)
          : Alert.alert(`${key} is not a number `);
      }
    }
    if (description.length < 100) {
      return Platform.OS == 'android'
        ? ToastAndroid.show(`Description is too short`, ToastAndroid.SHORT)
        : Alert.alert(`Description is too short`);
    }
    multiImages?.map((item, index) =>
      formData.append(`images[${index}]`, item),
    );

    setIsLoading(true);
    const response = await Post(url, formData, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      setCity('');
      setAskingPrice(0);
      setDescription('');
      setMultiImages([]);
      setOfferingPercent(0);
      setQouteTitle('');
      setState('');
      setSelectedService('');
      setVendorQoutedPrice(0);

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
      showBack={fromupdatequote}>
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
            keyboardType={'numeric'}
          />

          <TextInputWithTitle
            titleText={'My Budget'}
            secureText={false}
            placeholder={'My Budget'}
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
            keyboardType={'numeric'}
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
            keyboardType={'numeric'}
          />

          {!hire && (
            <DropDownSingleSelect
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
            />
          )}
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
          <View
            style={{
              flexDirection: 'row',
              width: windowWidth * 0.9,
              paddingHorizontal: moderateScale(10, 0.6),
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              paddingVertical: moderateScale(15, 0.6),
            }}>
            {fromupdatequote && (
              <View style={[styles.imagesContainer]}>
                <FlatList
                  horizontal
                  data={qouteImages}
                  showsHorizontalScrollIndicator={false}
                  style={{
                    flexGrow: 0,
                  }}
                  renderItem={({item, index}) => {
                    console.log('🚀 ~ CreateNew ~ item:', item);
                    return (
                      <View
                        style={[
                          styles.addImageContainer,
                          {
                            borderWidth: 0,
                            borderRadius: moderateScale(10, 0.3),
                          },
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
                            // setAttachmentImage({})
                            setQuoteImages(prevQouteImages =>
                              prevQouteImages?.filter(
                                item1 => item1?.id !== item?.id,
                              ),
                            );
                            // let newArray = [...multiImages];
                            //  quoteData?.images?.splice(index,1)
                          }}
                        />
                        <CustomImage
                          source={{
                            uri: quoteData ? item?.image : item?.uri,
                          }}
                          // source={{uri :attachmentImage?.uri}}
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
              </View>
            )}
            {/* {fromupdatequote && (
              <View style={[styles.imagesContainer]}>
                <FlatList
                  scrollEnabled={false}
                  horizontal
                  data={bidDataImages}
                  showsHorizontalScrollIndicator={false}
                  style={{
                    flexGrow: 0,
                  }}
                  renderItem={({item, index}) => {
                    return (
                      <View
                        style={[
                          styles.addImageContainer,
                          {
                            borderWidth: 0,
                            borderRadius: moderateScale(10, 0.3),
                          },
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
                            // let newArray =multiImages.filter(item1 => item1?.id !== item?.id );
                            // newArray.splice(index, 1);
                            setBidDataImages(prevImages =>
                              prevImages?.filter(
                                item1 => item1?.id !== item?.id,
                              ),
                            );
                            // setMultiImages(newArray);
                            imageDelete(item?.id);
                            // setAttachmentImage({})
                          }}
                        />
                        <CustomImage
                          source={{
                            // uri: item?.image,
                            uri: bidDone ? item?.image : item?.uri,
                          }}
                          // source={{uri :attachmentImage?.uri}}
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
              </View>
            )} */}
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
                        {
                          borderWidth: 0,
                          borderRadius: moderateScale(10, 0.3),
                        },
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
                          multiImages.splice(index, 1);
                          setMultiImages(prevImages =>
                            prevImages?.splice(index, 1),
                          );
                        }}
                      />
                      <CustomImage
                        // source={require('../Assets/Images/dummyman1.png')}
                        source={{
                          uri: item?.uri,
                        }}
                        // source={{uri :attachmentImage?.uri}}
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
          </View>
          {/* <View style={styles.imagesContainer}>
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
                      source={{uri: fromupdatequote ? item?.image : item?.uri}}
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
          )}
            */}
          <TextInputWithTitle
            titleText={'Special Notes for negotiators'}
            secureText={false}
            placeholder={'Special Notes for negotiators'}
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
              ) : fromupdatequote ? (
                'Quote update'
              ) : (
                'Publish'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.9}
            height={windowHeight * 0.07}
            marginTop={moderateScale(20, 0.3)}
            onPress={() => {
              hire
                ? sendRequest()
                : fromupdatequote
                ? updateQuote()
                : publishQuote();
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
    height: windowHeight * 0.07,
    backgroundColor: Color.white,
    borderRadius: moderateScale(5, 0.3),
    borderWidth: 2,
    borderColor: Color.blue,
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
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  header: {
    color: Color.black,
    fontSize: moderateScale(18, 0.3),
    width: windowWidth * 0.9,
  },
});
