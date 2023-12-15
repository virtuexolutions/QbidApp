import {
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import ShowMoreAndShowLessText from '../Components/ShowMoreAndShowLessText';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {Icon} from 'native-base';
import MarkCheckWithText from '../Components/MarkCheckWithText';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomButton from '../Components/CustomButton';
import {ActivityIndicator} from 'react-native';
import ReviewCard from '../Components/ReviewCard';
import BidderDetail from '../Components/BidderDetail';
import Detailcards from '../Components/Detailcards';
import Modal from 'react-native-modal';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import numeral from 'numeral';
import {useIsFocused} from '@react-navigation/native';
import NoData from '../Components/NoData';
import {validateEmail} from '../Config';
import ImageView from 'react-native-image-viewing';

const JobDetails = props => {
  const data1 = props?.route?.params?.item;
  console.log('🚀 ~ file: JobDetails.js:42 ~ JobDetails ~ data1:', data1);

  const user = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const UserCoverLetterArray = useSelector(
    state => state.commonReducer.servicesArray,
  );

  const [data, setData] = useState(data1);
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bidDone, setBidDone] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [fullName, setFullName] = useState('');
  const [Email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [desc, setDesc] = useState('');
  const isFocused = useIsFocused();
  const [coverletterRole, setCoverLetterRole] = useState('Expertise In');
  const [userData, setUserData] = useState({});
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [finalImagesArray, setFinalImagesArray] = useState([]);

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
    if (desc.length < 100) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Description is too short', ToastAndroid.SHORT)
        : Alert.alert('Description is too short');
    }

    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);

    if (response != undefined) {
      setBidDone(true);
      setModalVisible(!isModalVisible);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    bidDetails();
  }, [isFocused]);

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
            paddingBottom: moderateScale(80, 0.6),
            paddingTop: moderateScale(40, 0.6),
            paddingLeft: moderateScale(15, 0.6),
            // backgroundColor:'redx'
          }}>
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
                  }}>
                  <CustomText
                    isBold
                    style={{
                      color: Color.white,
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
                      marginLeft: moderateScale(3, 0.3),
                    }}>
                    {data?.status}
                  </CustomText>
                </View>
              </View>
              <ShowMoreAndShowLessText minTextLength={50} style={styles.desc}>
                {data?.notes ? data?.notes : data?.coverletter}
              </ShowMoreAndShowLessText>
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
                  data={'Chris'}
                  iconName={'vcard'}
                  title={'Member Name'}
                  iconType={FontAwesome}
                  marginTop={moderateScale(10, 0.3)}
                />
                <Detailcards
                  data={numeral(data?.asking_price).format('$0,0a')}
                  iconName={'calculator'}
                  title={'Expected Qoute'}
                  iconType={Entypo}
                  marginTop={moderateScale(10, 0.3)}
                />
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
                  data={numeral(data?.quoted_price).format('$0,0a')}
                  iconName={'calculator'}
                  title={'Vendor Qoute'}
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
              </View>
              {userRole != 'Qbid Member' && (
                <>
                  <CustomText
                    isBold
                    style={{
                      color: Color.white,
                      fontSize: moderateScale(17, 0.6),
                      marginVertical: moderateScale(10, 0.3),

                    }}>
                    {`You will earn`}
                  </CustomText>
                  <View
                    style={{
                      width: windowWidth * 0.2,
                      height: windowHeight * 0.08,
                      paddingHorizontal:moderateScale(10,.6),
                      backgroundColor: 'white',
                      justifyContent:'center',
                      alignItems:'center',
                      borderRadius: moderateScale(10, 0.6),
                    }}>
                    <View>
                    <CustomText
                      isBold
                      style={{
                        color: Color.black,
                        fontSize: moderateScale(17, 0.6),
                       
                      }}>
                      {data1?.quote_info?.negotiator_amount ? `${numeral(
                        data1?.quote_info?.negotiator_amount,
                      ).format('$0,0a')}` : `${numeral(
                        ((data?.quoted_price - data?.asking_price)*data?.offering_percentage)/100
                      ).format('$0,0a')}` }
                    </CustomText>
                    </View>
                  </View>
                </>
              ) }
              {userRole != 'Qbid Member' && (
                <>
                  <CustomText
                    isBold
                    style={{
                      color: Color.white,
                      fontSize: moderateScale(17, 0.6),
                      marginVertical: moderateScale(10, 0.3),
                    }}>
                    User Details
                  </CustomText>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
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
                      <CustomText
                        isBold
                        style={{
                          color: Color.white,
                          fontSize: moderateScale(17, 0.6),
                        }}>
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
                  <CustomText
                    isBold
                    style={{
                      color: Color.white,
                      fontSize: moderateScale(17, 0.6),
                      marginBottom: moderateScale(10, 0.3),
                      marginTop: moderateScale(20, 0.3),
                    }}>
                    Applied Negotiators
                  </CustomText>
                  <FlatList
                    data={
                      data?.bids?.some(item => item?.status == 'accept')
                        ? [data?.bids?.find(item => item?.status == 'accept')]
                        : data?.bids
                    }
                    ListEmptyComponent={() => {
                      return (
                        <NoData
                          style={{
                            width: windowWidth * 0.95,
                            height: windowHeight * 0.18,
                            // backgroundColor: 'green',
                            alignItems: 'center',
                          }}
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
                              name: item?.user_info?.first_name,
                              rating: item?.rating,
                              review: data1?.review,
                              description: item?.coverletter,
                              status: item?.status,
                              id: item?.id,
                            }}
                          />
                          {data?.status == 'pending' &&
                            item?.status == 'pending' && (
                              <View
                                key={index}
                                style={{
                                  flexDirection: 'row',
                                  // backgroundColor: 'black',
                                  justifyContent: 'space-between',
                                  width: windowWidth * 0.55,
                                  alignSelf: 'center',
                                  paddingVertical: moderateScale(5, 0.6),
                                  alignItems: 'center',
                                  marginBottom: moderateScale(5, 0.6),
                                }}>
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
                </>
              ) : userRole != 'Qbid Member' &&
                bidDone &&
                data1?.type != 'specific' ? (
                <>
                  <CustomText
                    isBold
                    style={{
                      color: Color.white,
                      fontSize: moderateScale(17, 0.6),
                      marginVertical: moderateScale(20, 0.3),
                    }}>
                    Your Bid Detail
                  </CustomText>
                  <BidderDetail
                    item={{
                      photo: require('../Assets/Images/man1.jpg'),
                      name: user?.first_name,
                      rating: user?.rating,
                      description: userData?.coverletter
                        ? userData?.coverletter
                        : desc,
                      status: data?.status,
                      id: data?.id,
                    }}
                  />
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
                      text={'Bid Now'}
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
        </ScrollView>
      </LinearGradient>

      <ImageView
        images={finalImagesArray}
        imageIndex={0}
        visible={imageModalVisible}
        onRequestClose={() => setImageModalVisible(false)}
      />

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          setFullName('');
          setEmail('');
          setNumber('');
          setCoverLetterRole('');
          setDesc('');
          setModalVisible(false);
        }}>
        <View
          style={{
            width: windowWidth * 0.9,
            height: windowHeight * 0.75,
            borderRadius: moderateScale(15, 0.3),
            backgroundColor: '#f2fce4',
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
              borderColor={Color.blue}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(15, 0.6)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
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
              borderColor={Color.blue}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(15, 0.6)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
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
              borderColor={Color.blue}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(15, 0.6)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
              keyboardType={'numeric'}
            />
            <DropDownSingleSelect
              array={UserCoverLetterArray}
              backgroundColor={'white'}
              item={coverletterRole}
              borderColor={Color.blue}
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
              placeholder={'Cover Letter'}
              setText={setDesc}
              value={desc}
              viewHeight={0.15}
              viewWidth={0.75}
              inputWidth={0.66}
              border={1}
              borderColor={Color.blue}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(15, 0.6)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
            />

            <CustomButton
              text={
                isLoading ? (
                  <ActivityIndicator color={'#FFFFFF'} size={'small'} />
                ) : (
                  'Done'
                )
              }
              textColor={Color.white}
              width={windowWidth * 0.45}
              height={windowHeight * 0.06}
              marginTop={moderateScale(30, 0.3)}
              onPress={() => {
                bidNow();
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
          </View>
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
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: windowWidth * 0.95,
    // backgroundColor : 'red',
    justifyContent: 'space-between',
  },
});
