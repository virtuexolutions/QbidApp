import {
  ActivityIndicator,
  Alert,
  BackHandler,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import Color from '../Assets/Utilities/Color';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import {Actionsheet, Icon} from 'native-base';
import {ScrollView} from 'react-native';
import SearchContainer from '../Components/SearchContainer';
import Entypo from 'react-native-vector-icons/Entypo';
import navigationService from '../navigationService';
import {useDispatch, useSelector} from 'react-redux';
import CustomStatusModal from '../Components/CustomStatusModal';
import LinearGradient from 'react-native-linear-gradient';
import CustomAlertModal from '../Components/CustomAlertModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import JobCard from '../Components/JobCard';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {useIsFocused} from '@react-navigation/native';
import GetLocation from 'react-native-get-location';
import NoData from '../Components/NoData';
import {setLocation} from '../Store/slices/common';

const NegotiatorHomeScreen = () => {
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  // console.log("🚀 ~ file: NegotiatorHomeScreen.js:40 ~ NegotiatorHomeScreen ~ userData:", userData)

  const dispatch = useDispatch();

  const [searchData, setSearchData] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recommended, setRecommended] = useState([]);
  const [working, setWorking] = useState([]);
  const [jobPosting, setJobPosting] = useState([]);
  const isFocused = useIsFocused();
  const [isLocation, setIsLocation] = useState(false);
  const [bidList, setBidList] = useState([]);
  console.log('🚀 ~ NegotiatorHomeScreen ~ bidList:', bidList);
  // const [recommand ,setRecommand] =useState([])

  // const getRecommand =async () => {

  //   const url = 'auth/negotiator/quote/recommended'
  //   setIsLoading(true)
  //   const response =await Get(url ,token)
  //  return  console.log("🚀 ~ file: NegotiatorHomeScreen.js:61 ~ getRecommand ~ response:", response?.data?.quote_info)

  //  setIsLoading(false)
  //   if(response != undefined){
  //     setRecommand()

  //   }
  // }

  const getProposal = async () => {
    setIsLoading(true);

    const [response1, response2, response3, response4] = await Promise.all([
      Get('auth/negotiator/quote/recommended', token),
      Get('auth/negotiator/quote/working', token),
      Get('auth/my_bid_list', token),
      Get('auth/negotiator/hiring/list', token),
    ]);
    setIsLoading(false);
    if (response1 != undefined) {
    //  return console.log(response1?.data?.quote_info?.data);
      ![null, undefined, ''].includes(response2?.data?.quote_info?.data) &&
        setRecommended(response1?.data?.quote_info?.data);
    }
    if (response2 != undefined) {
      // console.log(
      //   '🚀 ~ file: NegotiatorHomeScreen.js:83 ~ getProposal ~ response2:',
      //   response2?.data?.quote_info?.data,
      // );
      ![null, undefined, ''].includes(response2?.data?.quote_info?.data) &&
        setWorking(response2?.data?.quote_info?.data);
      // setWorking(prev => [...prev, ...response2?.data?.hiring_info?.data]);
    }
    if (response3 != undefined) {
     console.log('🚀 ~ getProposal ~ response3:', response3?.data);
      setBidList(response3?.data?.quote_info);
    }

    if (response4 != undefined) {
    //  return console.log(
    //     '🚀 ~ file: NegotiatorHomeScreen.js:89 ~ getProposal ~ response3:',
    //     response4?.data?.hiring_info?.data,
    //   );
      setJobPosting(response4?.data?.hiring_info?.data);
    }
  };

  useEffect(() => {
    getProposal();
  }, [isFocused]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      setVisible(true);
    });
  }, []);

  const getLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
      isLocation,
    })
      .then(location => {
        console.log(
          '🚀 ~ file: NegotiatorHomeScreen.js:119 ~ getLocation ~ location:',
          location,
        );
        setIsLocation(location);
        dispatch(setLocation(location));
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <ScreenBoiler
      statusBarBackgroundColor={
        userRole == 'Qbid Member'
          ? Color.themeBgColor
          : userRole == 'Qbid Negotiator'
          ? Color.themeBgColorNegotiator
          : Color.themebgBusinessQbidder
      }
      statusBarContentStyle={'dark-content'}
      showHeader={true}
      headerColor={
        userRole == 'Qbid Member'
          ? Color.themeBgColor
          : userRole == 'Qbid Negotiator'
          ? Color.themeBgColorNegotiator
          : Color.themebgBusinessQbidder
      }>
      <LinearGradient
        style={{
          width: windowWidth,
          height: windowHeight * 0.9,
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
          style={styles.container}
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: moderateScale(80, 0.3),
            paddingTop: moderateScale(40, 0.3),
          }}>
          <View
            style={{
              width: windowWidth * 0.93,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <SearchContainer
              onPress={() => {
                if (selectedStatus == '') {
                  return Platform.OS == 'android'
                    ? ToastAndroid.show(
                        'Please select any category',
                        ToastAndroid.SHORT,
                      )
                    : Alert.alert('Please select any category');
                } else {
                  navigationService.navigate('SeeAllNegotiator', {
                    type: selectedStatus,
                  });
                }
              }}
              width={windowWidth * 0.85}
              inputStyle={{
                height: windowHeight * 0.05,
              }}
              style={{
                height: windowHeight * 0.06,
                marginBottom: moderateScale(10, 0.3),
                borderRadius: moderateScale(5, 0.3),
              }}
              data={searchData}
              setData={setSearchData}
            />
            <Icon
              name={'sound-mix'}
              as={Entypo}
              size={moderateScale(22, 0.3)}
              color={Color.white}
              onPress={() => {
                setIsModalVisible(true);
              }}
            />
          </View>
          <View style={styles.upperContainer}>
            <View style={styles.percentContainer}>
              <Icon
                name="area-graph"
                as={Entypo}
                size={moderateScale(60, 0.3)}
                color={Color.black}
              />
              <CustomText
                isBold
                style={{
                  fontSize: moderateScale(45, 0.6),
                  color: Color.black,
                }}>
                30%
              </CustomText>
              <CustomText
                style={{
                  fontSize: moderateScale(9, 0.6),
                  color: Color.black,
                }}>
                +5.44% then last Month
              </CustomText>
            </View>
            <View
              style={{
                width: '49%',
                height: windowHeight * 0.2,
              }}>
              <View style={styles.revenueContainer}>
                <Icon
                  name="attach-money"
                  as={MaterialIcons}
                  size={moderateScale(20, 0.3)}
                  color={Color.black}
                />
                <CustomText
                  style={{
                    fontSize: moderateScale(13, 0.6),
                    color: Color.black,
                  }}>
                  Revenue
                </CustomText>
                <CustomText
                  isBold
                  style={{
                    fontSize: moderateScale(17, 0.6),
                    color: Color.black,
                  }}>
                  {userData?.total_earning}
                </CustomText>
              </View>
              <View style={[styles.revenueContainer, {marginTop: '2%'}]}>
                <Icon
                  name="star"
                  as={AntDesign}
                  size={moderateScale(22, 0.3)}
                  color={'#FF9529'}
                />
                <CustomText
                  style={{
                    fontSize: moderateScale(13, 0.6),
                  }}>
                  Your level
                </CustomText>
                <CustomText
                  isBold
                  style={{
                    fontSize: moderateScale(17, 0.6),
                    color: Color.black,
                  }}>
                  {userData?.average_rating > 4
                    ? 'Platinum'
                    : userData?.average_rating > 3.5
                    ? 'Gold'
                    : userData?.average_rating > 3
                    ? 'Silver'
                    : 'Bronze'}
                </CustomText>
              </View>
            </View>
          </View>

          {isLoading ? (
            <View style={styles.loader}>
              <ActivityIndicator size={'large'} color={'white'} />
            </View>
          ) : (
            <>
              <View style={styles.recommendedContainer}>
                <View style={styles.row}>
                  <CustomText isBold style={styles.heading}>
                    QBIDS Open for Bid
                  </CustomText>
                  <CustomText
                    onPress={() => {
                      navigationService.navigate('SeeAllNegotiator', {
                        type: 'Recommended',
                        data: recommended,
                      });
                    }}
                    style={styles.viewall}>
                    View all
                  </CustomText>
                </View>

                <FlatList
                  data={recommended}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingHorizontal: moderateScale(15, 0.3),
                  }}
                  renderItem={({item, index}) => {
                    return (
                      <JobCard
                        key={index}
                        item={item}
                        onPress={() => {
                          navigationService.navigate('JobDetails', {item});
                        }}
                      />
                    );
                  }}
                  ListEmptyComponent={() => {
                    return (
                      <NoData
                        style={{
                          width: windowWidth * 0.95,
                          height: windowHeight * 0.18,
                          alignItems: 'center',
                        }}
                      />
                    );
                  }}
                />
              </View>
              <View style={styles.recommendedContainer}>
                <View style={styles.row}>
                  <CustomText isBold style={styles.heading}>
                    accpeted qbids
                  </CustomText>
                  <CustomText
                    onPress={() => {
                      navigationService.navigate('SeeAllNegotiator', {
                        type: 'Working On',
                        data: working,
                      });
                    }}
                    style={styles.viewall}>
                    View all
                  </CustomText>
                </View>

                <FlatList
                  ListEmptyComponent={() => {
                    return (
                      <NoData
                        style={{
                          width: windowWidth * 0.95,
                          height: windowHeight * 0.18,
                          alignItems: 'center',
                        }}
                      />
                    );
                  }}
                  data={working}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingHorizontal: moderateScale(15, 0.3),
                  }}
                  renderItem={({item, index}) => {
                    return (
                      <JobCard
                        key={index}
                        item={item}
                        onPress={() => {
                          navigationService.navigate('JobDetails', {
                            item,
                          });
                        }}
                      />
                    );
                  }}
                />
              </View>
            

              <View style={styles.recommendedContainer}>
                <View style={styles.row}>
                  <CustomText isBold style={styles.heading}>
                    QBids Waiting Approvals
                  </CustomText>
                  <CustomText
                    onPress={() => {
                      navigationService.navigate('SeeAllNegotiator', {
                        type: 'applied Jobs',
                        data: working,
                      });
                    }}
                    style={styles.viewall}>
                    View all
                  </CustomText>
                </View>

                <FlatList
                  ListEmptyComponent={() => {
                    return (
                      <NoData
                        style={{
                          width: windowWidth * 0.95,
                          height: windowHeight * 0.18,
                          alignItems: 'center',
                        }}
                      />
                    );
                  }}
                  // data={bidList && bidList.reverse().slice(0,5)}
                  data={bidList}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingHorizontal: moderateScale(15, 0.3),
                  }}
                  renderItem={({item, index}) => {
                    return (
                      <JobCard
                        key={index}
                        item={item}
                        onPress={() => {
                          navigationService.navigate('JobDetails', {
                            item,
                          });
                        }}
                      />
                    );
                  }}
                />
              </View>

             
              <View style={styles.recommendedContainer}>
                <View style={styles.row}>
                  <CustomText isBold style={styles.heading}>
                    job requests
                  </CustomText>
                  <CustomText
                    onPress={() => {
                      navigationService.navigate('SeeAllNegotiator', {
                        type: 'Job Request',
                        data: jobPosting,
                      });
                    }}
                    style={styles.viewall}>
                    View all
                  </CustomText>
                </View>

                <FlatList
                  data={jobPosting}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingHorizontal: moderateScale(15, 0.3),
                  }}
                  ListEmptyComponent={() => {
                    return (
                      <NoData
                        style={{
                          width: windowWidth * 0.95,
                          height: windowHeight * 0.18,
                          alignItems: 'center',
                        }}
                      />
                    );
                  }}
                  renderItem={({item, index}) => {
                    return (
                      <JobCard
                        key={index}
                        item={item}
                        getProposal={getProposal}
                      />
                    );
                  }}
                />
              </View>
            </>
          )}
        </ScrollView>
        <CustomStatusModal
          isModalVisible={isModalVisible}
          setModalVisible={setIsModalVisible}
          statusArray={[
            {name: 'Recommended'},
            {name: 'Working On'},
            {name: 'Job Request'},
            {name: 'applied Jobs'},
          ]}
          data={selectedStatus}
          setData={setSelectedStatus}
        />
        <CustomAlertModal
          isModalVisible={visible}
          onClose={() => {
            setVisible(false);
          }}
          onOKPress={() => {
            setVisible(false);
            BackHandler.exitApp();
          }}
          title={'Are you sure !!'}
          message={'You Want to exit the App ?'}
          iconType={2}
          areYouSureAlert
        />
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default NegotiatorHomeScreen;

const styles = ScaledSheet.create({
  loader: {
    width: windowWidth,
    height: windowHeight * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperContainer: {
    width: windowWidth * 0.93,
    paddingVertical: moderateScale(10, 0.6),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  percentContainer: {
    width: '49%',
    paddingVertical: moderateScale(15, 0.6),
    backgroundColor: 'white',
    borderRadius: moderateScale(10, 0.6),
    paddingLeft: moderateScale(10, 0.6),
  },
  revenueContainer: {
    width: '100%',
    height: '55%',
    paddingVertical: moderateScale(10, 0.6),

    backgroundColor: 'white',
    borderRadius: moderateScale(10, 0.6),
    paddingLeft: moderateScale(10, 0.6),
    paddingTop: moderateScale(10, 0.6),
  },
  recommendedContainer: {
    width: windowWidth,
    marginTop: moderateScale(20, 0.3),
  },
  heading: {
    color: Color.white,
    marginLeft: moderateScale(15, 0.3),
    fontSize: moderateScale(20, 0.6),
    paddingVertical: moderateScale(10, 0.3),
  },
  row: {
    width: windowWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: moderateScale(15, 0.3),
  },
  viewall: {
    fontSize: moderateScale(12, 0.3),
    color: Color.white,
  },
  nodata: {
    color: Color.white,
    fontWeight: '500',
    fontSize: 18,
    position: 'absolute',
    bottom: 0,
  },
});
