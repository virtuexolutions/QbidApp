import {
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import ShowMoreAndShowLessText from '../Components/ShowMoreAndShowLessText';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Center, Icon} from 'native-base';
import MarkCheckWithText from '../Components/MarkCheckWithText';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomButton from '../Components/CustomButton';
import {ActivityIndicator} from 'react-native';
import ReviewCard from '../Components/ReviewCard';
import BidderDetail from '../Components/BidderDetail';
import Detailcards from '../Components/Detailcards';
import Modal from 'react-native-modal';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import {Delete, Get, Post} from '../Axios/AxiosInterceptorFunction';
import numeral from 'numeral';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import NoData from '../Components/NoData';
import {validateEmail} from '../Config';
import ImageView from 'react-native-image-viewing';
import ImagePickerModal from '../Components/ImagePickerModal';
import {mode} from 'native-base/lib/typescript/theme/tools';
import Feather from 'react-native-vector-icons/Feather';
import {setBidDetail} from '../Store/slices/common';
import {Rating} from 'react-native-ratings';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ReviewAskingModal from '../Components/ReviewAskingModal';

const JobDetails = props => {
  const data1 = props?.route?.params?.item;
  console.log('🚀 ~ data1:', data1);
  const type = props?.route?.params?.type;
  // const bidData = useSelector(state => state.commonReducer.bidDetail);
  const user = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  console.log('🚀 ~ userRole:', userRole);
  const UserCoverLetterArray = useSelector(
    state => state.commonReducer.servicesArray,
  );

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [data, setData] = useState();
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bidDone, setBidDone] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [Email, setEmail] = useState(user?.email);
  const [number, setNumber] = useState(user?.phone);
  const [userData, setUserData] = useState({});
  const [bidDataImages, setBidDataImages] = useState([]);
  const [desc, setDesc] = useState(userData?.coverletter);
  const [fullName, setFullName] = useState(user?.first_name);
  const [coverletterRole, setCoverLetterRole] = useState('Expertise In');
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [finalImagesArray, setFinalImagesArray] = useState([]);
  const [imagePickerVisible, setImagePickerVisible] = useState(false);
  const [isBidUpdate, setISbidUpdate] = useState(true);
  const [multiImages, setMultiImages] = useState([]);
  const [attachmentImage, setAttachmentImage] = useState({});
  const [askingforReview, setAskingforReview] = useState(false);
  console.log('🚀 ~ askingforReview:', askingforReview);
  console.log('🚀 ~ bidDetails ~ data?.status:', data?.status);

  const bidDetails = async () => {
    const url = `auth/negotiator/quote_detail/${
      data1?.quote_id ? data1?.quote_id : data1?.id
    }`;
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);

    if (response != undefined) {
      setData(response?.data?.quote_info);

      const mainuserData = response?.data?.quote_info?.bids?.find(
        item => item.user_info?.id == user?.id,
      );
      response?.data?.quote_info?.images?.map(item => {
        return setFinalImagesArray(prev => [...prev, {uri: item?.image}]);
      });

      if (mainuserData) {
        setBidDone(true);
        setUserData(mainuserData);
        setDesc(mainuserData?.coverletter);
        setCoverLetterRole(mainuserData?.expertise);
        // setMultiImages(userData?.images)
        setBidDataImages(mainuserData?.images);
      }
    }
  };

  const changeStatus = async (value, id) => {
    const url = `auth/member/bid/${id}`;
    setIsLoading(true);
    const response = await Post(url, {status: value}, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      bidDetails();
    }
  };

  const bidNow = async () => {
    const url = 'auth/negotiator/bid';
    const formData = new FormData();
    const body = {
      quote_id: data?.id,
      fullname: fullName,
      email: Email,
      phone: number,
      expertise: coverletterRole,
      coverletter: desc,
    };
    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
          : Alert.alert(`${key} is required`);
      }
    }
    if (isNaN(number)) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('phone is not a number', ToastAndroid.SHORT)
        : Alert.alert('phone is not a number');
    }
    if (!validateEmail(Email)) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('email is not validate', ToastAndroid.SHORT)
        : Alert.alert('email is not validate');
    }
    if (coverletterRole == 'Expertise In') {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Please select any role', ToastAndroid.SHORT)
        : Alert.alert('Please select any role');
    }
    if (desc == '') {
      return Platform.OS == 'android'
        ? ToastAndroid.show('coverLetter is empty ', ToastAndroid.SHORT)
        : Alert.alert('coverLetter is empty ');
    }
    // if (desc.length < 100) {
    //   return Platform.OS == 'android'
    //     ? ToastAndroid.show('Description is too short', ToastAndroid.SHORT)
    //     : Alert.alert('Description is too short');
    // }
    for (let key in body) {
      formData.append(key, body[key]);
    }
    multiImages?.map((item, index) =>
      formData.append(`images[${index}]`, item),
    );

    setIsLoading(true);
    const response = await Post(url, formData, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      // dispatch(setBidDetail(response?.data?.quote_info));

      setBidDone(true);
      setModalVisible(!isModalVisible);
    }
  };
  const UpdateBid = async () => {
    const url = 'auth/negotiator/bid';
    const formData = new FormData();
    const body = {
      quote_id: data?.id,
      bid_id: userData?.id,
      fullname: fullName,
      email: Email,
      phone: number,
      expertise: coverletterRole,
      coverletter: desc,
    };

    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
          : Alert.alert(`${key} is required`);
      }
    }

    if (isNaN(number)) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('phone is not a number', ToastAndroid.SHORT)
        : Alert.alert('phone is not a number');
    }
    if (!validateEmail(Email)) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('email is not validate', ToastAndroid.SHORT)
        : Alert.alert('email is not validate');
    }
    if (coverletterRole == 'Expertise In') {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Please select any role', ToastAndroid.SHORT)
        : Alert.alert('Please select any role');
    }
    if (desc == '') {
      return Platform.OS == 'android'
        ? ToastAndroid.show('coverLetter is empty ', ToastAndroid.SHORT)
        : Alert.alert('coverLetter is empty ');
    }
    // if (desc.length < 100) {
    //   return Platform.OS == 'android'
    //     ? ToastAndroid.show('Description is too short', ToastAndroid.SHORT)
    //     : Alert.alert('Description is too short');
    // }
    for (let key in body) {
      formData.append(key, body[key]);
    }
    multiImages?.map((item, index) =>
      formData.append(`images[${index}]`, item),
    );

    // formData.append('attachment', attachmentImage)
    setIsLoading(true);
    const response = await Post(url, formData, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show('bid update succesfully ', ToastAndroid.SHORT)
        : alert.alert('vid update succesfully ');
      // dispatch(setBidDetail(response?.data?.bid_info));
      setModalVisible(false);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  console.log(
    data?.status?.toLocaleLowerCase(),
    'data?.status?.toLocaleLowerCase()',
  );

  // useEffect(() => {
  //   if (userRole == 'Qbid Member') {
  //     setAskingforReview(true);
  //   }
  // }, [data?.status === 'completed' ]);
  useEffect(() => {
    if (data?.status === 'completed' && userRole === 'Qbid Member') {
      setAskingforReview(true);
    } else {
      setAskingforReview(false);
    }
  }, [data?.status, userRole]);

  useEffect(() => {
    bidDetails();
  }, [isFocused]);

  console.log('dESC===>, ', desc, coverletterRole);
  const imageDelete = async id => {
    const url = `auth/negotiator/bid_image_delete/${id}`;
    const response = await Delete(url, apiHeader(token));
    if (response != undefined) {
      // dispatch(setBidDetail(response?.data?.quote_info));
    }
  };
  return (
    <ScreenBoiler
      hideUser={false}
      showHeader={true}
      showBack={true}
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
      <ScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        style={styles.sectionContainer}
        contentContainerStyle={
          {
            // backgroundColor:'redx'
          }
        }>
        <LinearGradient
          style={{
            height: windowHeight * 0.97,
            paddingBottom: moderateScale(80, 0.6),
            paddingTop: moderateScale(40, 0.6),
            paddingLeft: moderateScale(15, 0.6),
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
            <View
              style={{
                width: windowWidth * 0.95,
                height: windowHeight * 0.8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size={'large'} color={'white'} />
            </View>
          ) : (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // backgroundColor :'red'
                }}>
                <View
                  style={{
                    width: moderateScale(60, 0.3),
                    height: moderateScale(50, 0.3),
                    borderRadius: moderateScale(10, 0.3),
                    overflow: 'hidden',
                  }}>
                  <CustomImage
                    source={
                      data?.images?.length > 0
                        ? {uri: data?.images[0]?.image}
                        : require('../Assets/Images/dummyman1.png')
                    }
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </View>
                <View
                  style={{
                    marginLeft: moderateScale(5, 0.3),
                    // backgroundColor :'green'
                  }}>
                  <CustomText
                    isBold
                    style={{
                      color: Color.white,
                      // backgroundColor :'red',
                      fontSize: moderateScale(17, 0.6),
                    }}>
                    {data?.title}
                  </CustomText>
                  <CustomText
                    style={{
                      color: Color.white,
                      fontSize: moderateScale(11, 0.6),
                    }}>
                    {data?.service_preference}
                  </CustomText>
                </View>
                {userRole != 'Business Qbidder' &&
                  'pending'.toLocaleLowerCase() ==
                    data?.status.toLocaleLowerCase() && (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('CreateNew', {
                          fromupdatequote: true,
                          data: data1,
                        });
                      }}
                      style={{
                        position: 'absolute',
                        right: 20,
                        top: 2,
                        flexDirection: 'row',
                      }}>
                      <Icon
                        name={'edit'}
                        as={Feather}
                        size={moderateScale(15, 0.6)}
                        color={Color.blue}
                      />
                      <CustomText
                        style={{
                          fontSize: moderateScale(8, 0.6),
                          color: Color.white,
                          paddingTop: moderateScale(2, 0.6),
                        }}>
                        quote update
                      </CustomText>
                    </TouchableOpacity>
                  )}
                <View
                  style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    bottom: moderateScale(10, 0.3),
                    right: moderateScale(30, 0.3),
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: moderateScale(6, 0.6),
                      height: moderateScale(6, 0.6),
                      borderRadius: moderateScale(3, 0.6),
                      backgroundColor:
                        userRole == 'Qbid Member'
                          ? Color.blue
                          : userRole == 'Qbid Negotiator'
                          ? Color.themeColor
                          : Color.black,
                    }}
                  />

                  <CustomText
                    style={{
                      fontSize: moderateScale(8, 0.6),
                      color: Color.white,
                      // backgroundColor : 'red',
                      marginLeft: moderateScale(3, 0.3),
                    }}>
                    {data?.status}
                  </CustomText>
                </View>
              </View>
              {type == 'quote' && (
                <ShowMoreAndShowLessText minTextLength={50} style={styles.desc}>
                  {data?.notes ? data?.notes : data?.coverletter}
                </ShowMoreAndShowLessText>
              )}

              <CustomText
                onPress={() => {
                  if (finalImagesArray.length > 0) {
                    setImageModalVisible(true);
                  } else {
                    return Platform.OS == 'android'
                      ? ToastAndroid.show('No attachments', ToastAndroid.SHORT)
                      : Alert.alert('No Attachments');
                  }
                }}
                isBold
                style={{
                  color: Color.blue,
                  fontSize: moderateScale(12, 0.6),
                  marginTop: moderateScale(10, 0.3),
                }}>
                Attachments...
              </CustomText>
              <CustomText
                isBold
                style={{
                  color: Color.white,
                  fontSize: moderateScale(17, 0.6),
                  marginTop: moderateScale(20, 0.3),
                  // backgroundColor : 'red'
                }}>
                job Details
              </CustomText>
              <View style={styles.row}>
                <Detailcards
                  data={data?.user_info?.first_name}
                  iconName={'vcard'}
                  title={'Member Name'}
                  iconType={FontAwesome}
                  marginTop={moderateScale(10, 0.3)}
                />
                {/* <Detailcards
                  data={numeral(data?.asking_price).format('$0,0a')}
                  iconName={'calculator'}
                  title={'Expected Qoute'}
                  iconType={Entypo}
                  marginTop={moderateScale(10, 0.3)}
                /> */}
                <Detailcards
                  data={data?.city}
                  iconName={'building'}
                  title={'City'}
                  iconType={FontAwesome}
                  marginTop={moderateScale(30, 0.3)}
                />
                <Detailcards
                  data={`${data?.offering_percentage}%`}
                  iconName={'percent'}
                  title={'Offering Percent'}
                  iconType={FontAwesome}
                  marginTop={moderateScale(30, 0.3)}
                />

                <Detailcards
                  data={data?.quoted_price}
                  iconName={'calculator'}
                  title={'Orginal Price '}
                  iconType={Entypo}
                  marginTop={moderateScale(30, 0.3)}
                />
                <Detailcards
                  data={data?.service_preference}
                  iconName={'briefcase'}
                  title={'Service Type'}
                  iconType={Entypo}
                  marginTop={moderateScale(30, 0.3)}
                />
                <Detailcards
                  data={data?.asking_price}
                  iconName={'hands'}
                  title={'asking price'}
                  iconType={FontAwesome5}
                  marginTop={moderateScale(30, 0.3)}
                />
              </View>
              {/* <CustomText
                isBold
                style={{
                  color: Color.white,
                  fontSize: moderateScale(17, 0.6),
                  marginVertical: moderateScale(10, 0.3),
                }}>
                {`You will earn`}
                {(data?.asking_price / data?.offering_percentage) *
                  data?.quoted_price}
              </CustomText> */}
              {/* {userRole != 'Qbid Member' && (
                <>
                  <View
                    style={{
                      width: windowWidth * 0.2,
                      height: windowHeight * 0.08,
                      paddingHorizontal: moderateScale(10, 0.6),
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: moderateScale(10, 0.6),
                    }}>
                    <View>
                      <CustomText
                        isBold
                        style={{
                          color: Color.black,
                          fontSize: moderateScale(17, 0.6),
                        }}>
                        {data1?.quote_info?.negotiator_amount
                          ? `${numeral(
                              data1?.quote_info?.negotiator_amount,
                            ).format('$0,0a')}`
                          : `${numeral(
                              ((data?.quoted_price - data?.asking_price) *
                                data?.offering_percentage) /
                                100,
                            ).format('$0,0a')}`}
                      </CustomText>
                    </View>
                  </View>
                </>
              )} */}
              {userRole != 'Qbid Member' && (
                <>
                  <CustomText isBold style={styles.detailText}>
                    User Details
                  </CustomText>
                  <View style={styles.view}>
                    <View style={styles.ImageView}>
                      <CustomImage
                        source={
                          data?.user_info?.photo
                            ? {uri: data?.user_info?.photo}
                            : require('../Assets/Images/dummyman1.png')
                        }
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    </View>
                    <View
                      style={{
                        marginLeft: moderateScale(5, 0.3),
                      }}>
                      <CustomText isBold style={styles.text}>
                        {`${data?.user_info?.first_name} ${data?.user_info?.last_name}`}
                      </CustomText>
                      <CustomText
                        style={{
                          color: Color.white,
                          fontSize: moderateScale(11, 0.6),
                        }}>
                        {data?.user_info?.email}
                      </CustomText>
                    </View>
                    {/* <View
                      style={{
                        flexDirection: 'row',
                        position: 'absolute',
                        bottom: moderateScale(10, 0.3),
                        right: moderateScale(30, 0.3),
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: moderateScale(6, 0.6),
                          height: moderateScale(6, 0.6),
                          borderRadius: moderateScale(3, 0.6),
                          backgroundColor:
                            userRole == 'Qbid Member'
                              ? Color.blue
                              : userRole == 'Qbid Negotiator'
                              ? Color.themeColor
                              : Color.black,
                        }}
                      />
                      <CustomText
                        style={{
                          fontSize: moderateScale(8, 0.6),
                          color: Color.white,
                          marginLeft: moderateScale(3, 0.3),
                        }}>
                        {data?.status}
                      </CustomText>
                    </View> */}
                  </View>
                </>
              )}

              {userRole == 'Qbid Member' && data1?.type != 'specific' ? (
                <>
                  <View style={styles.row2}>
                    <CustomText isBold style={styles.txt}>
                      {data?.status != 'review'
                        ? 'The Best Quote for your Project'
                        : 'review'}
                    </CustomText>
                    <View style={styles.bidrow}>
                      <CustomText isBold style={styles.bidtxt}>
                        {data?.status != 'review'
                          ? 'Total bids'
                          : 'total review '}
                      </CustomText>
                      <CustomText isBold style={styles.bidlength}>
                        {data?.status != 'review'
                          ? data?.bids?.length
                          : data?.review?.length}
                      </CustomText>
                    </View>
                  </View>
                  {/* {data?.status.toLocaleLowerCase() == 'completed' &&
                    setAskingforReview(true)} */}

                  {data?.status != 'review' ? (
                    <FlatList
                      key={item => item?.id}
                      scrollEnabled={false}
                      data={
                        data?.bids?.some(item => item?.status == 'accept')
                          ? [data?.bids?.find(item => item?.status == 'accept')]
                          : data?.bids
                      }
                      ListEmptyComponent={() => {
                        return (
                          <NoData
                            style={styles.noData}
                            text={'No requests yet'}
                          />
                        );
                      }}
                      contentContainerStyle={{
                        paddingBottom: moderateScale(30, 0.6),
                      }}
                      renderItem={({item, index}) => {
                        return (
                          <>
                            <BidderDetail
                              item={{
                                image: item?.user_info?.photo,
                                name: item?.user_info?.company_name,
                                rating: item?.rating,
                                review: data1?.review,
                                description: item?.coverletter,
                                status: item?.status,
                                id: item?.id,
                                attachment: item?.images,
                              }}
                            />
                            {data?.status == 'pending' &&
                              item?.status == 'pending' && (
                                <View key={index} style={styles.statusbtn}>
                                  <CustomButton
                                    isBold
                                    text={
                                      isLoading ? (
                                        <ActivityIndicator
                                          color={'white'}
                                          size={moderateScale(20, 0.6)}
                                        />
                                      ) : (
                                        'Accept'
                                      )
                                    }
                                    textColor={Color.white}
                                    width={windowWidth * 0.25}
                                    height={windowHeight * 0.04}
                                    bgColor={
                                      userRole == 'Qbid Member'
                                        ? Color.blue
                                        : userRole == 'Qbid Negotiator'
                                        ? Color.themeColor
                                        : Color.black
                                    }
                                    borderRadius={moderateScale(30, 0.3)}
                                    fontSize={moderateScale(11, 0.6)}
                                    onPress={() => {
                                      changeStatus('accept', item?.id);
                                    }}
                                  />
                                  <CustomButton
                                    isBold
                                    text={'Decline'}
                                    textColor={Color.white}
                                    width={windowWidth * 0.25}
                                    height={windowHeight * 0.04}
                                    bgColor={
                                      userRole == 'Qbid Member'
                                        ? Color.blue
                                        : userRole == 'Qbid Negotiator'
                                        ? Color.themeColor
                                        : Color.black
                                    }
                                    borderRadius={moderateScale(30, 0.3)}
                                    fontSize={moderateScale(11, 0.6)}
                                    onPress={() => {
                                      changeStatus('reject', item?.id);
                                    }}
                                  />
                                </View>
                              )}
                          </>
                        );
                      }}
                    />
                  ) : (
                    <FlatList
                      key={item => item?.id}
                      scrollEnabled={false}
                      data={data?.review}
                      ListEmptyComponent={() => {
                        return (
                          <NoData
                            style={styles.noData}
                            text={'No requests yet'}
                          />
                        );
                      }}
                      contentContainerStyle={{
                        paddingBottom: moderateScale(30, 0.6),
                      }}
                      renderItem={({item, index}) => {
                        return (
                          <View style={styles.reviewCard}>
                            <View></View>
                            <View style={styles.review_imageContainer}>
                              <CustomImage
                                style={{
                                  height: '100%',
                                  width: '100%',
                                }}
                                source={{uri: item?.user_info?.photo}}
                              />
                            </View>

                            <View>
                              <CustomText style={styles.review_text}>
                                {item?.user_info?.first_name}
                              </CustomText>
                              <CustomText
                                style={[
                                  styles.review_text,
                                  {
                                    color: Color.white,
                                    fontSize: moderateScale(13, 0.6),
                                  },
                                ]}>
                                {item?.text}
                              </CustomText>
                            </View>
                            <Rating
                              ratingBackgroundColor="red"
                              style={{
                                paddingTop: moderateScale(10, 0.6),
                                backgroundColor: 'transparent',
                              }}
                              imageSize={moderateScale(14, 0.6)}
                              startingValue={item?.rating}
                              ratingCount={5}
                            />
                          </View>
                        );
                      }}
                    />
                  )}
                </>
              ) : userRole != 'Qbid Member' &&
                bidDone &&
                data1?.type != 'specific' ? (
                <>
                  {/* {data1?.status.toLocaleLowerCase() == 'completed' &&
                    setAskingforReview(true)} */}

                  <View style={styles.h1View}>
                    <CustomText isBold style={styles.h1}>
                      Your Bid Details
                    </CustomText>

                    <>
                      <View style={styles.priceBox}>
                        <View>
                          <CustomText
                            isBold
                            style={{
                              color: Color.black,
                              fontSize: moderateScale(17, 0.6),
                            }}>
                            {`$${
                              (data?.offering_percentage / 100) *
                              data?.asking_price
                            }`}
                          </CustomText>
                        </View>
                      </View>
                    </>
                  </View>
                  <BidderDetail
                    item={{
                      image: user?.photo,
                      name: user?.first_name,
                      rating: user?.rating,
                      description: userData?.coverletter
                        ? userData?.coverletter
                        : desc,
                      // status: data?.status,
                      status: data?.bids[0]?.status,
                      id: data?.id,
                      bid_id: data?.bids[0]?.id,
                      // attachment :
                    }}
                  />
                  {data?.bids &&
                    data?.bids[0]?.status?.toLowerCase() !=
                      'accept'.toLowerCase() && (
                      <CustomButton
                        text={'Update Bid'}
                        textColor={Color.white}
                        width={windowWidth * 0.92}
                        height={windowHeight * 0.07}
                        marginTop={moderateScale(20, 0.3)}
                        onPress={() => {
                          toggleModal();
                          setISbidUpdate(true);
                        }}
                        bgColor={Color.black}
                        borderRadius={moderateScale(30, 0.3)}
                        alignSelf={'flex-start'}
                      />
                    )}
                </>
              ) : (
                data1?.type != 'specific' && (
                  <>
                    <MarkCheckWithText
                      checked={checked}
                      setChecked={setChecked}
                      textPrimary={'I want to boost '}
                      textSecondary={'my Bid'}
                      textStyleSecondary={{
                        color:
                          userRole == 'Qbid Member'
                            ? Color.blue
                            : userRole == 'Qbid Negotiator'
                            ? Color.themeColor
                            : Color.black,
                      }}
                    />

                    <CustomButton
                      text={'Bid on this Job Now'}
                      textColor={Color.white}
                      width={windowWidth * 0.92}
                      height={windowHeight * 0.07}
                      marginTop={moderateScale(20, 0.3)}
                      onPress={() => {
                        toggleModal();
                      }}
                      bgColor={
                        userRole == 'Qbid Member'
                          ? Color.blue
                          : userRole == 'Qbid Negotiator'
                          ? Color.themeColor
                          : Color.black
                      }
                      borderRadius={moderateScale(30, 0.3)}
                      alignSelf={'flex-start'}
                    />
                  </>
                )
              )}
            </>
          )}
        </LinearGradient>
      </ScrollView>
      <ReviewAskingModal
        data={userRole == 'Qbid Member' ? data : data1}
        setModalVisible={setAskingforReview}
        modalVisible={askingforReview}
      />
      <ImageView
        images={finalImagesArray}
        imageIndex={0}
        visible={imageModalVisible}
        onRequestClose={() => setImageModalVisible(false)}
      />

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          if (userData?.length < 1) {
            setFullName('');
            setEmail('');
            setNumber('');
            setCoverLetterRole('');
            setDesc('');
            setModalVisible(false);
          }
          setModalVisible(false);
        }}>
        <View style={styles.modalView}>
          <ScrollView
            scrollEnabled={false}
            contentContainerStyle={{
              paddingVertical: moderateScale(5, 0.6),
              alignItems: 'center',
            }}>
            <View style={{marginTop: moderateScale(20, 0.3)}}>
              <CustomText
                isBold
                style={{
                  fontSize: moderateScale(14, 0.6),
                }}>
                QBid Proposal
              </CustomText>
            </View>

            <View style={{marginTop: moderateScale(10, 0.3)}}>
              <TextInputWithTitle
                secureText={false}
                placeholder={'Full Name'}
                setText={setFullName}
                value={fullName}
                viewHeight={0.06}
                viewWidth={0.75}
                inputWidth={0.68}
                border={1}
                borderColor={
                  userRole == 'Qbid Negotiator' ? Color.blue : Color.black
                }
                backgroundColor={'#FFFFFF'}
                marginTop={moderateScale(15, 0.6)}
                color={Color.themeColor}
                placeholderColor={Color.themeLightGray}
                borderRadius={moderateScale(25, 0.3)}
                disable
              />
              <TextInputWithTitle
                secureText={false}
                placeholder={'Enter your Email'}
                setText={setEmail}
                value={Email}
                viewHeight={0.06}
                viewWidth={0.75}
                inputWidth={0.68}
                border={1}
                borderColor={
                  userRole == 'Qbid Negotiator' ? Color.blue : Color.black
                }
                backgroundColor={'#FFFFFF'}
                marginTop={moderateScale(15, 0.6)}
                color={Color.themeColor}
                placeholderColor={Color.themeLightGray}
                borderRadius={moderateScale(25, 0.3)}
                disable
              />
              <TextInputWithTitle
                secureText={false}
                placeholder={'Phone Number'}
                setText={setNumber}
                value={number}
                viewHeight={0.06}
                viewWidth={0.75}
                inputWidth={0.68}
                border={1}
                borderColor={
                  userRole == 'Qbid Negotiator' ? Color.blue : Color.black
                }
                backgroundColor={'#FFFFFF'}
                marginTop={moderateScale(15, 0.6)}
                color={Color.themeColor}
                placeholderColor={Color.themeLightGray}
                borderRadius={moderateScale(25, 0.3)}
                keyboardType={'numeric'}
                disable
              />
              <DropDownSingleSelect
                array={UserCoverLetterArray}
                backgroundColor={'white'}
                item={coverletterRole}
                borderColor={
                  userRole == 'Qbid Negotiator' ? Color.blue : Color.black
                }
                borderWidth={1}
                marginTop={moderateScale(20, 0.6)}
                setItem={setCoverLetterRole}
                placeholder={coverletterRole}
                placeholderColor={Color.themeLightGray}
                width={windowWidth * 0.75}
                dropDownHeight={windowHeight * 0.06}
                dropdownStyle={{
                  width: windowWidth * 0.75,
                }}
              />

              <TextInputWithTitle
                multiline={true}
                secureText={false}
                placeholder={
                  'Optional but PS the additional info to help you get a deal'
                }
                setText={setDesc}
                value={desc}
                viewHeight={0.15}
                viewWidth={0.75}
                inputWidth={0.66}
                border={1}
                borderColor={
                  userRole == 'Qbid Negotiator' ? Color.blue : Color.black
                }
                backgroundColor={'#FFFFFF'}
                marginTop={moderateScale(15, 0.6)}
                color={Color.themeColor}
                placeholderColor={Color.themeLightGray}
                borderRadius={moderateScale(25, 0.3)}
              />
              <CustomText
                style={[
                  styles.title,
                  {
                    marginTop: moderateScale(10, 0.3),
                    width: windowWidth * 0.25,
                  },
                ]}
                isBold={true}
                children={'attachments'}
              />
              <View style={{}}>
                <View style={styles.bidView}>
                  {isBidUpdate && (
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
                  )}

                  <View style={styles.imagesContainer}>
                    <FlatList
                      scrollEnabled={false}
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
                                // setAttachmentImage({})
                                let newArray = [...multiImages];
                                newArray.splice(index, 1);
                                setMultiImages(newArray);
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
                          setImagePickerVisible(true);
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <CustomButton
                text={
                  isLoading ? (
                    <ActivityIndicator color={'#FFFFFF'} size={'small'} />
                  ) : userRole != 'Qbid Member' &&
                    bidDone &&
                    data1?.type != 'specific' ? (
                    'Update'
                  ) : (
                    'Done'
                  )
                }
                textColor={Color.white}
                width={windowWidth * 0.45}
                height={windowHeight * 0.06}
                marginTop={moderateScale(5, 0.3)}
                onPress={() => {
                  userRole != 'Qbid Member' &&
                  bidDone &&
                  data1?.type != 'specific'
                    ? UpdateBid()
                    : bidNow();
                }}
                bgColor={
                  userRole == 'Qbid Member'
                    ? Color.blue
                    : userRole == 'Qbid Negotiator'
                    ? Color.themeColor
                    : Color.black
                }
                borderRadius={moderateScale(30, 0.3)}
                disabled={isLoading ? true : false}
              />

              <ImagePickerModal
                show={imagePickerVisible}
                setShow={setImagePickerVisible}
                setMultiImages={setMultiImages}
                // setFileObject={setAttachmentImage}
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </ScreenBoiler>
  );
};

export default JobDetails;

const styles = ScaledSheet.create({
  desc: {
    width: windowWidth * 0.9,
    lineHeight: moderateScale(20, 0.3),
    color: Color.white,
    fontSize: moderateScale(10, 0.6),
    marginTop: moderateScale(20, 0.3),
  },
  reviewCard: {
    borderWidth: 1,
    borderColor: Color.white,
    width: '95%',
    padding: moderateScale(10, 0.6),
    flexDirection: 'row',
  },
  review_imageContainer: {
    height: windowHeight * 0.07,
    width: windowHeight * 0.07,
    borderRadius: (windowHeight * 0.07) / 2,
    overflow: 'hidden',
  },
  review_text: {
    fontSize: moderateScale(15, 0.6),
    color: Color.white,
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(5, 0.6),
  },
  imagesContainer: {
    marginTop: moderateScale(10, 0.3),
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  addImageContainer: {
    marginTop: moderateScale(10, 0.3),
    width: windowWidth * 0.14,
    backgroundColor: Color.white,
    borderRadius: moderateScale(5, 0.3),
    borderWidth: 2,
    borderColor: Color.blue,
    height: windowHeight * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(10, 0.3),
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
  attachmentContainer: {
    backgroundColor: Color.white,
    borderColor: Color.black,
    borderWidth: 1,
    height: windowHeight * 0.08,
    width: windowHeight * 0.13,
    borderRadius: moderateScale(10, 0.6),
    textAlign: 'center',
    alignItems: 'center',
    marginRight: moderateScale(10, 0.3),
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: windowWidth * 0.95,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: moderateScale(15, 0.6),
    color: '#353434',
    width: windowWidth * 0.9,
    marginleft: moderateScale(10, 0.3),
    marginTop: moderateScale(15, 0.3),
  },
  statusbtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.55,
    alignSelf: 'center',
    paddingVertical: moderateScale(5, 0.6),
    alignItems: 'center',
    marginBottom: moderateScale(5, 0.6),
  },
  noData: {
    width: windowWidth * 0.95,
    height: windowHeight * 0.18,
    alignItems: 'center',
  },
  h1View: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: moderateScale(16, 0.6),
  },
  h1: {
    color: Color.white,
    fontSize: moderateScale(17, 0.6),
    marginVertical: moderateScale(20, 0.3),
  },
  priceBox: {
    marginTop: moderateScale(10, 0.6),
    padding: moderateScale(5, 0.6),
    height: windowHeight * 0.05,
    paddingHorizontal: moderateScale(10, 0.6),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(10, 0.6),
  },
  modalView: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.9,
    borderRadius: moderateScale(15, 0.3),
    backgroundColor: '#f2fce4',
  },
  bidView: {
    flexDirection: 'row',
    width: windowWidth * 0.8,
    paddingHorizontal: moderateScale(10, 0.6),
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingVertical: moderateScale(15, 0.6),
  },
  detailText: {
    color: Color.white,
    fontSize: moderateScale(17, 0.6),
    marginVertical: moderateScale(10, 0.3),
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ImageView: {
    width: moderateScale(60, 0.3),
    height: moderateScale(50, 0.3),
    borderRadius: moderateScale(10, 0.3),
    overflow: 'hidden',
  },
  text: {
    color: Color.white,
    fontSize: moderateScale(17, 0.6),
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txt: {
    color: Color.white,
    fontSize: moderateScale(14, 0.6),
    marginBottom: moderateScale(10, 0.3),
    marginTop: moderateScale(20, 0.3),
  },
  bidrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: moderateScale(15, 0.6),
  },
  bidtxt: {
    color: Color.white,
    fontSize: moderateScale(13, 0.6),
    marginBottom: moderateScale(10, 0.3),
    marginTop: moderateScale(20, 0.3),
    color: Color.blue,
  },
  bidlength: {
    color: Color.white,
    fontSize: moderateScale(13, 0.6),
    marginBottom: moderateScale(10, 0.3),
    marginTop: moderateScale(20, 0.3),
    color: Color.white,
    marginLeft: moderateScale(7, 0.6),
  },
});
