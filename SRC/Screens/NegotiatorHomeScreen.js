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
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import BidDetailCard from '../Components/BidDetailCard';
import {Actionsheet, Icon} from 'native-base';
import {ScrollView} from 'react-native';
import SearchContainer from '../Components/SearchContainer';
import Entypo from 'react-native-vector-icons/Entypo';
import NegotiatorCard from '../Components/NegotiatorCard';
import MyQouteCard from '../Components/MyQouteCard';
import navigationService from '../navigationService';
import {useDispatch, useSelector} from 'react-redux';
import CustomStatusModal from '../Components/CustomStatusModal';
import LinearGradient from 'react-native-linear-gradient';
import {setUserToken} from '../Store/slices/auth';
import CustomAlertModal from '../Components/CustomAlertModal';
import {setSelectedRole} from '../Store/slices/common';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import JobCard from '../Components/JobCard';
import Modal from 'react-native-modal';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import SeekingHelpCard from '../Components/SeekingHelpCard';
import {useIsFocused} from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import Card from '../Components/Card';
import NoData from '../Components/NoData';

const NegotiatorHomeScreen = () => {
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);

  const [searchData, setSearchData] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recommended, setRecommended] = useState([]);
  const [working, setWorking] = useState([]);
  const [jobPosting, setJobPosting] = useState([]);
  const isFocused = useIsFocused();
  const [postJob ,setPostJob] = useState('')

  const getProposal = async () => {
    setIsLoading(true);

    const [response1, response2, response3] = await Promise.all([
      Get('auth/negotiator/quote/recommended', token),
      Get('auth/negotiator/quote/working', token),
      Get('auth/negotiator/bid_help', token),
    ]);
    setIsLoading(false);

    if (response1 != undefined) {
      console.log(
        '🚀 ~ file: NegotiatorHomeScreen.js:71 ~ getProposal ~ response1:',
        response1?.data,
      );

      ![null, undefined, ''].includes(response2?.data?.quote_info) &&
        setRecommended(response1?.data?.quote_info?.data);
    }
    if (response2 != undefined) {
      ![null, undefined, ''].includes(response2?.data?.quote_info) &&
        setWorking(response2?.data?.quote_info?.data);
    }
    if (response3 != undefined) {
      ![null, undefined, ''].includes(response2?.data?.quote_info) &&
        setJobPosting(response3?.data?.bid_help_info?.data);
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

  // const postedJob = async () => {
  //   const url =''
  //   setIsLoading(true)
  //   const response = await Get(url ,token)
  //   setIsLoading(false)
  //   if(response != undefined){
  //   setPostJob()
  //   }
  // }
  //   useEffect(() => {
  //     postedJob()
  //   }, [])
    
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
                  color={
                    userData?.rating <= 3
                      ? '#CD7F32'
                      : userData?.rating <= 3.5
                      ? '#C0C0C0'
                      : userData?.rating <= 4
                      ? '#FF9529'
                      : '#e5e4e2'
                  }
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
                    color:
                      userData?.rating <= 3
                        ? '#CD7F32'
                        : userData?.rating <= 3.5
                        ? '#C0C0C0'
                        : userData?.rating <= 4
                        ? '#FF9529'
                        : '#e5e4e2',
                  }}>
                  {userData?.rating <= 3
                    ? 'Bronze'
                    : userData?.rating <= 3.5
                    ? 'Silver'
                    : userData?.rating <= 4
                    ? 'Gold'
                    : 'Platinum'}
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
                    Recommended
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
                    Working On
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
                  data={
                    working.length > 5
                      ? working.reverse().splice(0, 5)
                      : working.reverse()
                  }
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingHorizontal: moderateScale(15, 0.3),
                  }}
                  renderItem={({item, index}) => {
                    // console.log(
                    //   '🚀 ~ file: NegotiatorHomeScreen.js:343 ~ NegotiatorHomeScreen ~ item:',
                    //   item,
                    // );
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
                />
              </View>

              <View style={styles.recommendedContainer}>
                <View style={styles.row}>
                  <CustomText isBold style={styles.heading}>
                    Job Posts
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
                  data={
                    working.length > 5
                      ? working.reverse().splice(0, 5)
                      : working.reverse()
                  }
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
                    return <JobCard key={index} item={item} />;
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
            {name: 'Seeking Help'},
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
