import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import Color from '../Assets/Utilities/Color';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
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
import {Get} from '../Axios/AxiosInterceptorFunction';

const NegotiatorHomeScreen = () => {
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const token = useSelector(state => state.authReducer.token);
  const [searchData, setSearchData] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recommended, setRecommended] = useState([]);
  console.log(
    '🚀 ~ file: NegotiatorHomeScreen.js:38 ~ NegotiatorHomeScreen ~ recommended:',
    recommended,
  );
  // const [workingOn, setWorkingOn] = useState([])
  // const [seekingHelp, setseekingHelp] = useState([])

  const getRecommended = async () => {
    const url = 'auth/negotiator/quote/recommended';
    // setIsLoading(true);
    const response = await Get(url, token);
    // setIsLoading(false);

    if (response != undefined) {
      console.log(
        '🚀 ~ file: NegotiatorHomeScreen.js:50 ~ getRecommended ~ response:',
        response?.data,
      );
      setRecommended(response?.data?.quote_info);
    }
  };

  const getWorkingOn = async () => {
    const url = 'auth/negotiator/quote/recommended';
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);

    if (response != undefined) {
      // console.log("🚀 ~ file: NegotiatorHomeScreen.js:63 ~ getWorkingOn ~ response:", response)
    }
  };

  const getSeekingHelp = async () => {
    const url = 'auth/negotiator/quote/recommended';
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);

    if (response != undefined) {
      // console.log("🚀 ~ file: NegotiatorHomeScreen.js:77 ~ getSeekingHelp ~ response:", response)
    }
  };

  const getProposals = async () => {
    setIsLoading(true);
    const [a, b] = await Promise.all([
      getRecommended(),
      getWorkingOn(),
      getSeekingHelp(),
    ]);
    setIsLoading(false);

    console.log(
      '🚀 ~ file: NegotiatorHomeScreen.js:45 ~ getProposals ~ result:',
      a,
    );
  };

  useEffect(() => {
    // getRecommended();
    getProposals();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      setVisible(true);
    });
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
      }
      //  showBack={true}
    >
      <LinearGradient
        style={{
          width: windowWidth,
          height: windowHeight * 0.89,
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
            paddingBottom: moderateScale(60, 0.3),
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
              width={windowWidth * 0.85}
              input
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
                  //  backgroundColor : 'red'
                }}>
                30%
              </CustomText>
              <CustomText
                style={{
                  fontSize: moderateScale(9, 0.6),
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
                    //  backgroundColor : 'red'
                  }}>
                  Revenue
                </CustomText>
                <CustomText
                  isBold
                  style={{
                    fontSize: moderateScale(17, 0.6),
                  }}>
                  $19.857.00
                </CustomText>
              </View>
              <View style={[styles.revenueContainer, {marginTop: '2%'}]}>
                <Icon
                  name="star"
                  as={AntDesign}
                  size={moderateScale(22, 0.3)}
                  color={Color.black}
                />
                <CustomText
                  style={{
                    fontSize: moderateScale(13, 0.6),
                    //  backgroundColor : 'red'
                  }}>
                  Your level
                </CustomText>
                <CustomText
                  isBold
                  style={{
                    fontSize: moderateScale(17, 0.6),
                    color: '#FF9529',
                  }}>
                  Gold
                </CustomText>
              </View>
            </View>
          </View>

          {isLoading ? (
            <View
              style={{
                width: windowWidth,
                height: windowHeight * 0.4,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
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
                        type: 'recommended',
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
                    Working On
                  </CustomText>
                  <CustomText
                    onPress={() => {
                      navigationService.navigate('SeeAllNegotiator', {
                        type: 'Working On',
                      });
                    }}
                    style={styles.viewall}>
                    View all
                  </CustomText>
                </View>

                <FlatList
                  data={[1, 2, 3, 4, 5]}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingHorizontal: moderateScale(15, 0.3),
                  }}
                  renderItem={({item, index}) => {
                    return (
                      <JobCard
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
                    Seeking Help
                  </CustomText>
                  <CustomText
                    onPress={() => {
                      navigationService.navigate('SeeAllNegotiator', {
                        type: 'Job Requests',
                      });
                    }}
                    style={styles.viewall}>
                    View all
                  </CustomText>
                </View>

                <FlatList
                  data={[1, 2, 3, 4, 5]}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingHorizontal: moderateScale(15, 0.3),
                  }}
                  renderItem={({item, index}) => {
                    return <JobCard />;
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
            {name: 'pending'},
            {name: 'onGoing'},
            {name: 'completed'},
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
    // backgroundColor : 'green',
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
});
