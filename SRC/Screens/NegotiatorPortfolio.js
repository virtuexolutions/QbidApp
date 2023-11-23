import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  View,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {
  moderateScale,
  moderateVerticalScale,
  ScaledSheet,
} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import ImagePickerModal from '../Components/ImagePickerModal';
import Constants from '../Assets/Utilities/Constants';
import RatingComponent from '../Components/RatingComponent';
import CustomText from '../Components/CustomText';
import {Icon} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import ImageView from 'react-native-image-viewing';
import Detailcards from '../Components/Detailcards';
import CustomButton from '../Components/CustomButton';
import {ActivityIndicator} from 'react-native';
import CustomModal from '../Components/CustomModal';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomDropDownMultiSelect from '../Components/CustomDropDownMultiSelect';
import {useNavigation} from '@react-navigation/native';
import {AirbnbRating} from 'react-native-ratings';
import moment from 'moment';

import {Post, Get} from '../Axios/AxiosInterceptorFunction';
import {setUserData} from '../Store/slices/common';
import navigationService from '../navigationService';

const NegotiatorPortfolio = props => {
  const fromSearch = props?.route?.params?.fromSearch;
  const item = props?.route?.params?.item;
  console.log("🚀 ~ file: NegotiatorPortfolio.js:50 ~ NegotiatorPortfolio ~ item:", item?.ratings)

  const userdata = useSelector(state => state.commonReducer.userData);
  // console.log("🚀 ~ file: NegotiatorPortfolio.js:52 ~ NegotiatorPortfolio ~ userdata:", userdata?.photo)
  const servicesArray = useSelector(state => state.commonReducer.servicesArray);
  const token = useSelector(state => state.authReducer.token);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  
  const navigation = useNavigation();

  const [image, setImage] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState({});
  const [imageType, setimageType] = useState('profile');
  const [imageToShow, setImageToShow] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [availibility, setAvailibility] = useState(false);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(
    fromSearch ? item?.first_name : userdata?.first_name,
  );
  const [lastName, setLastName] = useState(
    fromSearch ? item?.last_name : userdata?.last_name,
  );
  const [companyName, setCompanyName] = useState(
    fromSearch ? item?.company_name : userdata?.company_name,
  );
  const [jobStatus, setJobStatus] = useState(
    fromSearch ? item?.job_status : userdata?.status,
  );
  const [email, setEmail] = useState(
    fromSearch ? item?.email : userdata?.email,
  );
  const [contact, setContact] = useState(
    fromSearch ? item?.phone : userdata?.phone,
  );
  const [address, setAddress] = useState(
    fromSearch ? item?.address : userdata?.address,
  );
  const [city, setCity] = useState(
    fromSearch
      ? item?.city
        ? item?.city
        : 'not availble'
      : userdata?.city
      ? userdata?.city
      : '',
  );
  const [state, setState] = useState(
    fromSearch ? item?.state ? item?.state  :'not availble' :
    userdata?.state ? userdata?.state : '');
  const [zipCode, setZipCode] = useState(
    fromSearch ? item?.zip ? item?.zip : 'not availble' :
    userdata?.zip ? userdata?.zip : '');
  const [services, setServices] = useState(
    fromSearch ? item?.expertise ? JSON.parse(item?.expertise) :[] :
    userdata?.expertise ? JSON.parse(
      userdata?.expertise) : [],
  );
  const [language, setLanguage] = useState(
    fromSearch ? item?.language ? JSON.parse(item?.language) :[] :
    userdata?.language ? JSON.parse(userdata?.language) : [],
  );

  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState('');
  // console.log("🚀 ~ file: NegotiatorPortfolio.js:116 ~ NegotiatorPortfolio ~ setReview:", setReview)

  const updateProfile = async () => {
    const url = 'auth/negotiator/profile_update';
    const body = {
      first_name: firstName,
      last_name: lastName,
      company_name: companyName,
      status: jobStatus,
      address: address,
      city: city,
      state: state,
      zip: zipCode,
      expertise: services,
      language: language,
    };


    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} cannot be empty`, ToastAndroid.SHORT)
          : Alert.alert(`${key} cannot be empty`);
      }
    }
    if (isNaN(zipCode)) {
      return Platform.OS == 'android'
        ? ToastAndroid.show(`enter a valid zipcode`, ToastAndroid.SHORT)
        : Alert.alert(`Enter a valid zipcode`);
    }

    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response?.data?.success) {
      //  console.log("🚀 ~ file: NegotiatorPortfolio.js:151 ~ updateProfile ~ response:", response?.data)
      setEditProfile(false);
      dispatch(setUserData(response?.data?.user))
    }
  };

  // const hireNow = async () =>{
// const url =''
// const body ={
//   address: address,
//       city: city,
//       state: state,
//       zip: zipCode,
// }

// }

  const reviews = async () => {
    const url = 'auth/review';
    
    setIsLoading(true);
    const response = await Get('auth/review', token);
    // console.log("🚀 ~ file: NegotiatorPortfolio.js:157 ~ reviews ~ response:", response)
    setIsLoading(false);
    
    if (response != undefined) {
      setReview(response?.data?.review);
    }
  };


  const changeProfileImage = async (type, body, key) => {
    const url = `auth/negotiator/${type}`;
    const formData = new FormData();
    formData.append(key, body);

    setIsLoading(true);
    const response = await Post(url, formData, apiHeader(token));
    setIsLoading(false);
  
    if (response != undefined) {
    //  console.log("🚀 ~ file: NegotiatorPortfolio.js:192 ~ changeProfileImage ~ response:", response?.data)
     
      dispatch(setUserData(response?.data?.user));
      Platform.OS == 'android'
        ? ToastAndroid.show(`${type} updated successfully`, ToastAndroid.SHORT)
        : Alert.alert(`${type} updated successfully`);
    }
  };

  useEffect(() => {
    reviews();
  }, []);

  useEffect(() => {
    if (imageType == 'profile') {
      if (Object.keys(image).length > 0) {
        changeProfileImage('photo_update', image,'photo');
        setImage({})
      }
    } else {
      if (Object.keys(coverPhoto).length > 0) {
        changeProfileImage('coverphoto_update', coverPhoto, 'coverphoto');
        setCoverPhoto({})
      }
    }
  }, [image, coverPhoto]);

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
      showBack={true}>
      <LinearGradient
        style={{
          height: windowHeight * 0.96,
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
        {!availibility && (
          <View
            style={{
              position: 'absolute',
              zIndex: 1,
              width: windowWidth,
              // height : moderateScale(30,0.3),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 0, 0,0.8)',
              marginBottom: moderateScale(10, 0.3),
              paddingHorizontal: moderateScale(5, 0.3),
              paddingVertical: moderateScale(5, 0.6),
            }}>
            <CustomText
              style={{
                fontSize: moderateScale(11, 0.3),
                color: Color.white,
                textAlign: 'center',
              }}>
              {userRole == 'Qbid Member'
                ? 'Negotiator is not accepting any job right now , you can not make hiring request'
                : 'Account Availibility is set to Disable , reset it from edit availibility'}
            </CustomText>
          </View>
        )}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: moderateScale(75, 0.3),
            backgroundColor: '#FFFFFF',
          }}
          style={{
            width: '100%',
            flexGrow: 0,
          }}>
          <View style={styles.upperContainer}>
            <View
              style={{
                width: '100%',
                height: '60%',
              }}>
              <CustomImage
                onPress={() => {
                  setImageToShow([
                    userdata?.coverphoto
                      ? {uri: userdata?.coverphoto}
                      : require('../Assets/Images/coverPhoto.jpg'),
                  ]);
                  setVisible(true);
                }}
                source={
                  userRole != 'Qbid Member'
                    ? Object.keys(coverPhoto).length > 0
                      ? {uri: coverPhoto?.uri}
                      : {uri: userdata?.coverphoto}
                    : {uri: item?.coverphoto}
                }
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
              {userRole != 'Qbid Member' && (
                <TouchableOpacity
                  onPress={() => {
                    setimageType('cover');
                    setShowModal(true);
                  }}
                  style={[
                    styles.edit,
                    {
                      backgroundColor: '#EEEEEE',

                      right: moderateScale(10, 0.3),
                    },
                  ]}>
                  <Icon
                    name="camera"
                    as={FontAwesome}
                    style={styles.icon}
                    color={Color.black}
                    size={moderateScale(16, 0.3)}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View
              style={{
                marginTop: -windowWidth * 0.15,
                marginLeft: moderateScale(15, 0.3),
                width: windowWidth * 0.25,
              }}>
              <CustomImage
                onPress={() => {
                  setImageToShow([
                   
                       {uri: userdata?.photo}
                  ]);
                  setVisible(true);
                }}
                source={
                  // userRole != 'Qbid Member'
                  //   ? Object.keys(image).length > 0
                  //     ? {uri: image?.uri}
                  //     : {uri: userdata?.photo}
                  //   : {uri: item?.photo}
                  {uri: userdata?.photo}
                }
                style={styles.image}
              />

              {userRole != 'Qbid Member' && (
                <TouchableOpacity
                  onPress={() => {
                    setimageType('profile');
                    setShowModal(true);
                  }}
                  style={[
                    styles.edit,
                    {
                      backgroundColor:
                        userRole == 'Qbid Member'
                          ? Color.blue
                          : userRole == 'Qbid Negotiator'
                          ? Color.themeColor
                          : Color.black,
                    },
                  ]}>
                  <Icon
                    name="camera"
                    as={FontAwesome}
                    style={styles.icon}
                    color={Color.white}
                    size={moderateScale(16, 0.3)}
                  />
                </TouchableOpacity>
              )}
            </View>
            {userRole != 'Qbid Member' && (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  setEditProfile(true);
                }}
                style={[
                  {
                    backgroundColor: '#e1e1e1',
                    right: 10,
                    top: '62%',
                    position: 'absolute',
                    paddingHorizontal: moderateScale(10, 0.6),
                    paddingVertical: moderateScale(4, 0.6),
                    borderRadius: moderateScale(5, 0.6),
                  },
                ]}>
                <CustomText
                  isBold
                  style={{
                    fontSize: moderateScale(11, 0.6),
                  }}>
                  Edit Profile
                </CustomText>
              </TouchableOpacity>
            )}
            <View style={{marginLeft: moderateScale(10, 0.3)}}>
              <CustomText
                numberOfLines={2}
                style={[
                  Constants.h4,
                  {
                    width: windowWidth * 0.5,
                    color: Color.black,
                    fontWeight: 'bold',
                  },
                  userRole == 'Qbid Member'
                    ? {
                        borderColor: Color.black,
                      }
                    : {
                        borderColor: Color.lightGrey,
                      },
                ]}>
                {`${firstName} ${lastName}`}
              </CustomText>
              <RatingComponent
                disable={true}
                rating={ 
                  fromSearch ? Math.floor(item?.average_rating): 
                  Math.floor(userdata?.average_rating)
                }
                starColor={'#ffa534'}
                starStyle={{
                  marginRight: moderateScale(1, 0.3),
                  marginTop: moderateScale(1, 0.3),
                }}
                starSize={moderateScale(12, 0.3)}
              />
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: moderateScale(10, 0.3),
              }}>
              <DetailContainer
                imageName={'man'}
                type={Entypo}
                subtitle={availibility ? 'Yes' : 'No'}
                title={'Availibility'}
                editEnable
                edit={availibility}
                setEdit={setAvailibility}
              />
              <DetailContainer
                imageName={'briefcase'}
                type={Entypo}
                subtitle={
                  fromSearch ?item?.numb_jobs_done ?  item?.numb_jobs_done :'' : 
                  userdata?.numb_jobs_done ? userdata?.numb_jobs_done : 0
                }
                title={'Jobs'}
              />
              <DetailContainer
                imageName={'dollar'}
                type={FontAwesome}
                subtitle={
                  fromSearch ? item?.total_earning :
                  userdata?.total_earning}
                title={'Total earning'}
              />
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: Color.lightGrey,
              width: '95%',
            }}
          />
          <View style={styles.lowerContainer}>
            <CustomText
              isBold
              style={{
                color: Color.black,
                fontSize: moderateScale(17, 0.6),
                textTransform: 'uppercase',
              }}>
              INFO
            </CustomText>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                paddingRight: moderateScale(5, 0.6),
                flexWrap: 'wrap',
              }}>{
                !fromSearch  &&  <>
                <Detailcards
                data={email}
                iconName={'envelope'}
                title={'Email'}
                iconType={FontAwesome}
                textColor={Color.black}
                containerStyle={{
                  backgroundColor: '#EEEEEE',
                }}
                marginTop={moderateScale(10, 0.3)}
              />
              <Detailcards
                data={
                  fromSearch ? item?.phone ? item?.phone  : 'not availble' :
                  userdata?.phone}
                iconName={'phone'}
                title={'Contact'}
                iconType={FontAwesome}
                marginTop={moderateScale(10, 0.3)}
                textColor={Color.black}
                containerStyle={{
                  backgroundColor: '#EEEEEE',
                }}
              />
               </>
              }
              
              <Detailcards
                data={
                  fromSearch ? item?.company_name ?  item?.company_name  : 'not availble':
                  userdata?.company_name}
                iconName={'building'}
                title={'Company name'}
                iconType={FontAwesome}
                marginTop={moderateScale(10, 0.3)}
                textColor={Color.black}
                containerStyle={{
                  backgroundColor: '#EEEEEE',
                }}
              />
              <Detailcards
                data={
                  fromSearch ? item?.designation ? item?.designation : 'not available':
                  userdata?.rating <= 3
                    ? 'Bronze'
                    : userdata?.rating <= 3.5
                    ? 'Silver'
                    : userdata?.rating <= 4
                    ? 'Gold'
                    : 'Platinum'
                }
                iconName={'trophy'}
                title={'Qbid Level'}
                iconType={FontAwesome}
                marginTop={moderateScale(10, 0.3)}
                textColor={Color.black}
                containerStyle={{
                  backgroundColor: '#EEEEEE',
                }}
              />
            </View>
            <CustomText
              isBold
              style={styles.heading1}>
              Expertise
            </CustomText>
            {
            services?.map((x, index) => {
                return (
                  <View
                    style={styles.language}>
                    <View
                      style={{
                        width: moderateScale(7, 0.6),
                        height: moderateScale(7, 0.6),
                        borderRadius: moderateScale(3.5, 0.6),
                        backgroundColor:
                          userRole == 'Qbid Member'
                            ? Color.blue
                            : userRole == 'Qbid Negotiator'
                            ? Color.themeColor
                            : Color.black,
                      }}
                    />
                    <CustomText
                      numberOfLines={2}
                      style={{
                        fontSize: moderateScale(11, 0.6),
                        color: Color.black,
                        marginLeft: moderateScale(3, 0.3),
                      }}>
                      {x}
                    </CustomText>
                  </View>
                );
              })}
            <CustomText
              isBold
              style={styles.heading1}>
              Languages
            </CustomText>
            {
            language?.map((x, index) => {
                return (
                  <View
                    style={styles.language}>
                    <View
                      style={{
                        width: moderateScale(7, 0.6),
                        height: moderateScale(7, 0.6),
                        borderRadius: moderateScale(3.5, 0.6),
                        backgroundColor:
                          userRole == 'Qbid Member'
                            ? Color.blue
                            : userRole == 'Qbid Negotiator'
                            ? Color.themeColor
                            : Color.black,
                      }}
                    />
                    <CustomText
                      numberOfLines={2}
                      style={{
                        fontSize: moderateScale(11, 0.6),
                        color: Color.black,
                        marginLeft: moderateScale(3, 0.3),
                      }}>
                      {x}
                    </CustomText>
                  </View>
                );
              })}
            <FlatList
            ListHeaderComponent={()=> { 
              return(
              <CustomText
              isBold
              style={styles.heading1}>
              reviews
            </CustomText>
              )
            }}
              data={item?.ratings ? item?.ratings : userdata?.negotiator_review}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={styles.view}>
                    <View
                      style={styles.mainview}>
                      <CustomImage
                        style={{
                          height: '100%',
                          width: '100%',
                        }}
                        source={{uri :item?.user_info?.photo}}
                      />
                    </View>
                    <View
                      style={{
                        paddingHorizontal: moderateScale(10, 0.3),
                      }}>
                      <CustomText
                        isBold
                        style={styles.text}>
                        {item?.user_info?.first_name}
                      </CustomText>
                      <CustomText
                        style={styles.text2}>
                        {item?.text}
                      </CustomText>
                      <CustomText
                        style={styles.text2}>
                        {moment().format('MMM Do, YYYY')}
                      </CustomText>
                    </View>
                  </View>
                );
              }}
            />
      
          </View>
          {userRole == 'Qbid Member' && (
            <CustomButton
              text={'Hire Now'}
              textColor={Color.white}
              width={windowWidth * 0.92}
              height={windowHeight * 0.07}
              marginTop={moderateScale(20, 0.3)}
              bgColor={
                userRole == 'Qbid Member'
                  ? Color.blue
                  : userRole == 'Qbid Negotiator'
                  ? Color.themeColor
                  : Color.black
              }
              borderRadius={moderateScale(30, 0.3)}
              onPress={()=>{navigationService.navigate('CreateNew',{hire:true, id:item?.id})}}
            />
          )}
        </ScrollView>
        <ImagePickerModal
          show={showModal}
          setShow={setShowModal}
          setFileObject={imageType == 'profile' ? setImage : setCoverPhoto}
        />
        <ImageView
          images={imageToShow}
          visible={visible}
          onRequestClose={() => setVisible(false)}
        />
        <CustomModal
          isVisible={editProfile}
          setIsVisible={setEditProfile}
          container={{
            width: windowWidth * 0.9,
            borderRadius: moderateScale(10, 0.6),
            height: windowHeight * 0.8,
            overflow: 'hidden',
          }}
          contentContainerStyle={{}}>
          <LinearGradient
            style={{
              alignItems: 'center',
              paddingVertical: moderateScale(10, 0.6),
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
            <TouchableOpacity
              onPress={() => {
                setEditProfile(false);
              }}
              activeOpacity={0.7}
              style={{
                width: windowWidth * 0.15,
                paddingVertical: moderateScale(10, 0.6),
                alignSelf: 'flex-start',
              }}>
              <Icon
                name="arrowleft"
                as={AntDesign}
                style={styles.icon}
                color={Color.white}
                size={moderateScale(20, 0.3)}
              />
            </TouchableOpacity>

            <TextInputWithTitle
              title={'First Name'}
              secureText={false}
              placeholder={'First Name'}
              setText={setFirstName}
              value={firstName}
              viewHeight={0.06}
              viewWidth={0.8}
              inputWidth={0.78}
              borderColor={'#ffffff'}
              backgroundColor={'#FFFFFF'}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
            />
            <TextInputWithTitle
              title={'Last Name'}
              secureText={false}
              placeholder={'Last Name'}
              setText={setLastName}
              value={lastName}
              viewHeight={0.06}
              viewWidth={0.8}
              inputWidth={0.78}
              borderColor={'#ffffff'}
              backgroundColor={'#FFFFFF'}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
            />
            {userRole != 'Qbid Member' && (
              <>
                <TextInputWithTitle
                  title={'Company Name'}
                  secureText={false}
                  placeholder={'Company Name'}
                  setText={setCompanyName}
                  value={companyName}
                  viewHeight={0.06}
                  viewWidth={0.8}
                  inputWidth={0.78}
                  borderColor={'#ffffff'}
                  backgroundColor={'#FFFFFF'}
                  color={Color.themeColor}
                  placeholderColor={Color.themeLightGray}
                  borderRadius={moderateScale(25, 0.3)}
                />

                <View style={styles.userTypeContainer}>
                  <View style={styles.innerContainer}>
                    <CustomText
                      isBold
                      style={[
                        styles.txt2,
                        {
                          color:
                            userRole == 'Qbid Member'
                              ? Color.black
                              : Color.white,
                        },
                      ]}>
                      Retired
                    </CustomText>
                    <TouchableOpacity
                      onPress={() => {
                        setJobStatus('Retired');
                      }}
                      activeOpacity={0.9}
                      style={[
                        styles.circle,
                        jobStatus == 'Retired' && {
                          backgroundColor: Color.themeColor,
                          borderColor: Color.white,
                        },
                      ]}></TouchableOpacity>
                  </View>
                  <View style={styles.innerContainer}>
                    <CustomText
                      isBold
                      style={[
                        styles.txt2,
                        {
                          color:
                            userRole == 'Qbid Member'
                              ? Color.black
                              : Color.white,
                        },
                      ]}>
                      Self-Employed
                    </CustomText>
                    <TouchableOpacity
                      onPress={() => {
                        setJobStatus('Self-Employed');
                      }}
                      activeOpacity={0.9}
                      style={[
                        styles.circle,
                        jobStatus == 'Self-Employed' && {
                          backgroundColor: Color.themeColor,
                          borderColor: Color.white,
                        },
                      ]}></TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            <TextInputWithTitle
              title={'Email'}
              secureText={false}
              placeholder={'Email'}
              setText={setEmail}
              value={email}
              viewHeight={0.06}
              viewWidth={0.8}
              inputWidth={0.78}
              disable
              borderColor={'#ffffff'}
              backgroundColor={Color.veryLightGray}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
            />
            <TextInputWithTitle
              title={'Contact'}
              secureText={false}
              placeholder={'Contact'}
              setText={setContact}
              value={contact}
              viewHeight={0.06}
              viewWidth={0.8}
              inputWidth={0.78}
              disable
              borderColor={'#ffffff'}
              backgroundColor={Color.veryLightGray}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
            />
            <TextInputWithTitle
              title={'Address'}
              secureText={false}
              placeholder={'Address'}
              setText={setAddress}
              value={address}
              viewHeight={0.06}
              viewWidth={0.8}
              inputWidth={0.78}
              borderColor={'#ffffff'}
              backgroundColor={'#FFFFFF'}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
            />
            <TextInputWithTitle
              title={'City'}
              secureText={false}
              placeholder={'City'}
              setText={setCity}
              value={city}
              viewHeight={0.06}
              viewWidth={0.8}
              inputWidth={0.78}
              borderColor={'#ffffff'}
              backgroundColor={'#FFFFFF'}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
            />
            <TextInputWithTitle
              title={'State'}
              secureText={false}
              placeholder={'State'}
              setText={setState}
              value={state}
              viewHeight={0.06}
              viewWidth={0.8}
              inputWidth={0.78}
              backgroundColor={'#FFFFFF'}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
            />
            <TextInputWithTitle
              title={'Zip code'}
              secureText={false}
              placeholder={'Zip code'}
              setText={setZipCode}
              value={zipCode}
              viewHeight={0.06}
              viewWidth={0.8}
              inputWidth={0.78}
              backgroundColor={'#FFFFFF'}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
            />
            {userRole != 'Qbid Member' && (
              <>
                <CustomDropDownMultiSelect
                  title={'Pick Languages'}
                  array={[
                    {name: 'English', id: 'English'},
                    {name: 'Dutch', id: 'Dutch'},
                    {name: 'Spanish', id: 'Spanish'},
                    {name: 'French', id: 'French'},
                    {name: 'Portugese', id: 'Portugese'},
                  ]}
                  item={language}
                  setItem={setLanguage}
                  maxHeight={windowHeight * 0.2}
                  marginTop={moderateScale(8, 0.3)}
                  containerStyle={{
                    width: windowWidth * 0.8,
                    height: windowHeight * 0.06,
                  }}
                />
                <CustomDropDownMultiSelect
                  title={'Pick Expertise'}
                  array={servicesArray}
                  item={services}
                  setItem={setServices}
                  maxHeight={windowHeight * 0.3}
                  containerStyle={{
                    width: windowWidth * 0.8,
                    height: windowHeight * 0.06,
                  }}
                />
              </>
            )}

            <CustomButton
              text={
                isLoading ? (
                  <ActivityIndicator color={'#FFFFFF'} size={'small'} />
                ) : (
                  'Update'
                )
              }
              textColor={Color.white}
              width={windowWidth * 0.8}
              height={windowHeight * 0.07}
              marginTop={moderateScale(10, 0.3)}
              onPress={() => {
                updateProfile();
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
          </LinearGradient>
        </CustomModal>
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default NegotiatorPortfolio;

const styles = ScaledSheet.create({
  upperContainer: {
    width: windowWidth,
    height: windowHeight * 0.5,
    backgroundColor: Color.white,
    overflow: 'hidden',
  },
  image: {
    width: windowWidth * 0.25,
    height: windowWidth * 0.25,
    borderWidth: 5,
    borderColor: '#EEEEEE',
    borderRadius: moderateScale((windowWidth * 0.25) / 2, 0.6),
  },
  edit: {
    backgroundColor: Color.blue,
    width: moderateScale(30, 0.6),
    height: moderateScale(30, 0.6),
    position: 'absolute',
    bottom: moderateScale(5, 0.3),
    right: moderateScale(0, 0.3),
    borderRadius: moderateScale(15, 0.6),
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '100%',
    textAlign: 'center',
  },
  title: {
    color: '#7B8491',
    fontSize: moderateScale(12, 0.6),
  },
  subTitle: {
    color: Color.black,
    fontSize: moderateScale(13, 0.6),
  },
  lowerContainer: {
    width: windowWidth,
    paddingVertical: moderateScale(20, 0.6),
    backgroundColor: Color.white,
    marginTop: moderateScale(10, 0.3),
    paddingLeft: moderateScale(10, 0.6),
  },
  userTypeContainer: {
    width: windowWidth * 0.7,
    paddingTop: moderateScale(20, 0.3),
    paddingBottom: moderateScale(10, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circle: {
    height: moderateScale(14, 0.3),
    width: moderateScale(14, 0.3),
    borderRadius: moderateScale(7, 0.3),
    borderWidth: 1,
    backgroundColor: Color.white,
    borderColor: Color.themeColor,
    marginLeft: moderateScale(15, 0.3),
  },
  heading: {
    fontSize: moderateScale(12, 0.6),
    width: '48%',
  },
  innerContainer: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  view:{
    flexDirection: 'row',
    marginVertical: moderateScale(10, 0.3),
    paddingHorizontal: moderateScale(10, 0.3),
    // backgroundColor:'red'
  },
  mainview:{
    height: windowHeight * 0.06,
    width: windowHeight * 0.06,
    borderRadius: (windowHeight * 0.06) / 2,
    overflow: 'hidden',
  },
  text:{
    color: Color.black,
    fontSize: moderateScale(13, 0.6),
    textTransform: 'uppercase',
  },
  text2:{
    color: Color.black,
    fontSize: moderateScale(12, 0.6),
    width: windowWidth * 0.75,
  },
  heading1:{
    color: Color.black,
    fontSize: moderateScale(17, 0.6),
    textTransform: 'uppercase',
    marginTop: moderateScale(10, 0.6),
  },
  language:{
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginTop: moderateScale(7, 0.3),
    paddingLeft: moderateScale(15, 0.6),
  },

});

const DetailContainer = ({
  imageName,
  type,
  title,
  subtitle,
  editEnable,
  edit,
  setEdit,
}) => {
  const userRole = useSelector(state => state.commonReducer.selectedRole);

  return (
    <View
      style={{
        width: windowWidth * 0.2,
        alignItems: 'center',
      }}>
      {editEnable && userRole != 'Qbid Member' && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setEdit(!edit);
          }}
          style={[
            styles.edit,
            {
              backgroundColor: '#EEEEEE',
              zIndex: 1,
              right: moderateScale(0, 0.3),
              top: 0,
              width: moderateScale(20, 0.6),
              height: moderateScale(20, 0.6),
              borderRadius: moderateScale(10, 0.6),
            },
          ]}>
          <Icon
            name={edit ? 'toggle-on' : 'toggle-off'}
            as={FontAwesome}
            style={styles.icon}
            color={Color.black}
            size={moderateScale(10, 0.3)}
            onPress={() => {
              setEdit(!edit);
            }}
          />
        </TouchableOpacity>
      )}
      <Icon
        name={imageName}
        as={type}
        color={
          userRole == 'Qbid Member'
            ? Color.blue
            : userRole == 'Qbid Negotiator'
            ? Color.themeColor
            : Color.black
        }
        size={moderateScale(20, 0.6)}
      />
      <CustomText style={styles.title}>{title}</CustomText>
      <CustomText isBold style={styles.subTitle}>
        {subtitle}
      </CustomText>
    </View>
  );
};
