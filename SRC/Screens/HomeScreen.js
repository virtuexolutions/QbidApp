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
import CustomImage from '../Components/CustomImage';
import Modal from 'react-native-modal';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import CustomButton from '../Components/CustomButton';
import ImagePickerModal from '../Components/ImagePickerModal';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {useIsFocused} from '@react-navigation/native';
import Lottie from 'lottie-react-native';

const HomeScreen = () => {
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const servicesArray = useSelector(state => state.commonReducer.servicesArray);
  const token = useSelector(state => state.authReducer.token);
  // console.log(
  //   '🚀 ~ file: HomeScreen.js:20 ~ HomeScreen ~ servicesArray',
  //   servicesArray,
  // );
  const [searchData, setSearchData] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showMultiImageModal, setShowMultiImageModal] = useState(false);
  const [multiImages, setMultiImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedView, setSelectedView] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoading, setsubmitLoading] = useState(false);
  const isFocused = useIsFocused();
  // console.log(
  //   '🚀 ~ file: HomeScreen.js:27 ~ HomeScreen ~ selectedView',
  //   selectedView,
  // );
  const [selectedService, setSelectedService] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [visible, setVisible] = useState(false);
  const [qbidName, setQbidName] = useState('');
  const [qbidDetail, setQbidDetail] = useState('');
  const [qbiddetail1, setQbidDetail1] = useState('');
  const [myQuotes, setMyQuotes] = useState([]);
  console.log("🚀 ~ file: HomeScreen.js:72 ~ HomeScreen ~ myQuotes:", myQuotes[0]?.bids)
  const [proposals, setProposals] = useState([]);
  // console.log("🚀 ~ file: HomeScreen.js:73 ~ HomeScreen ~ proposals:", proposals)

  const getAllData = async () => {
    setIsLoading(true);
    const [response1, response2] = await Promise.all([
      Get('auth/member/bid_help', token),
      Get('auth/member/quote', token),
    ]);
    setIsLoading(false);

    if (response1 != undefined) {
      // console.log("🚀 ~ file: HomeScreen.js:85 ~ getAllData ~ response1:", response1?.data)
      setProposals(response1?.data?.bid_help_info?.data);
    }

    if (response2 != undefined) {
      // console.log("🚀 ~ file: HomeScreen.js:90 ~ getAllData ~ response2:",response2?.data?.quote_info?.data?.length)
      setMyQuotes(response2?.data?.quote_info?.data);
    }
  };

  const seekHelp = async () => {
    const url = 'auth/member/bid_help';
    const body = {
      Qbid_name: qbidName,
      service_type: qbidDetail,
      description: qbiddetail1,
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
    if (multiImages.length == 0) {
      return Platform.OS == 'android'
        ? ToastAndroid.show(`Image is required`, ToastAndroid.SHORT)
        : Alert.alert(`Image is required`);
    } else {
      multiImages?.map((item, index) => {
        formData.append(`images[${index}]`, item);
      });
    }

    // console.log('🚀 ~ file: HomeScreen.js:85 ~ seekHelp ~ formData:', formData);
    setsubmitLoading(true);
    const response = await Post(url, formData, apiHeader(token));
    setsubmitLoading(false);

    if (response != undefined) {
      // console.log(
      //   '🚀 ~ file: HomeScreen.js:91 ~ seekHelp ~ response:',
      //   response?.data,
      // );

      toggleModal();
    }
  };

  useEffect(() => {
    getAllData();
  }, [isFocused]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      setVisible(true);
    });
  }, []);


  


  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <ScreenBoiler
      statusBarBackgroundColor={Color.themeBgColor}
      statusBarContentStyle={'dark-content'}
      showHeader={true}
      //  showBack={true}
    >
      <LinearGradient
        style={{
          width: windowWidth,
          height: windowHeight * 0.89,
        }}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[Color.themeColor, '#83D475', '#ABE098']}>
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
              width={windowWidth * 0.8}
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

            <View
              style={{width: windowWidth * 0.14, height: windowHeight * 0.06}}>
              <CustomImage
                source={require('../Assets/Images/Group.png')}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                resizeMode="contain"
                onPress={() => {
                  toggleModal();
                }}
              />
            </View>

            <Modal
              isVisible={modalVisible}
              onBackdropPress={() => {
                setModalVisible(false);
              }}>
              <View
                style={{
                  width: windowWidth * 0.9,
                  paddingVertical: moderateScale(10, 0.6),
                  // height: windowHeight * 0.55,
                  borderRadius: moderateScale(15, 0.3),
                  backgroundColor: '#f2fce4',
                  borderWidth: 2,
                  borderColor: Color.themeColor,

                  alignItems: 'center',
                }}>
                <View style={{marginTop: moderateScale(20, 0.3)}}>
                  <CustomText
                    isBold
                    style={{
                      fontSize: moderateScale(14, 0.6),
                    }}>
                    QBid Help
                  </CustomText>
                </View>

                <View style={{marginTop: moderateScale(10, 0.3)}}>
                  <TextInputWithTitle
                    secureText={false}
                    placeholder={'Qbid name'}
                    setText={setQbidName}
                    value={qbidName}
                    viewHeight={0.07}
                    viewWidth={0.75}
                    inputWidth={0.68}
                    border={1}
                    borderColor={Color.themeColor}
                    backgroundColor={'#FFFFFF'}
                    marginTop={moderateScale(10, 0.6)}
                    color={Color.themeColor}
                    placeholderColor={Color.themeLightGray}
                    borderRadius={moderateScale(25, 0.3)}
                  />
                  <DropDownSingleSelect
                    array={servicesArray}
                    setItem={setQbidDetail}
                    item={qbidDetail}
                    borderColor={Color.themeColor}
                    borderWidth={1}
                    backgroundColor={'white'}
                    marginTop={moderateScale(10, 0.6)}
                    placeholder={'Service Type'}
                    placeholderColor={Color.themeLightGray}
                    width={windowWidth * 0.75}
                    dropDownHeight={windowHeight * 0.06}
                    dropdownStyle={{
                      width: windowWidth * 0.75,
                    }}
                  />
                  <TextInputWithTitle
                    secureText={false}
                    placeholder={'description'}
                    setText={setQbidDetail1}
                    value={qbiddetail1}
                    viewHeight={0.2}
                    viewWidth={0.75}
                    inputWidth={0.68}
                    border={1}
                    borderColor={Color.themeColor}
                    backgroundColor={'#FFFFFF'}
                    marginTop={moderateScale(10, 0.6)}
                    color={Color.themeColor}
                    placeholderColor={Color.themeLightGray}
                    multiline={true}
                    // borderRadius={moderateScale(25, 0.3)}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      marginRight: moderateScale(10, 0.6),
                      width: windowWidth * 0.6,
                      // backgroundColor: 'red',
                      alignSelf: 'center',
                      marginTop: moderateScale(15, 0.3),
                      paddingHorizontal: moderateScale(10, 0.6),
                    }}>
                    {multiImages.map((item, index) => {
                      return (
                        <View
                          style={{
                            width: windowWidth * 0.15,
                            height: windowHeight * 0.08,
                            marginRight: moderateScale(10, 0.6),
                            marginTop: moderateScale(5, 0.3),
                          }}>
                          <CustomImage
                            source={{uri: item?.uri}}
                            style={{
                              height: '100%',
                              width: '100%',
                              borderRadius: moderateScale(5, 0.3),
                            }}
                          />
                        </View>
                      );
                    })}
                  </View>

                  <CustomButton
                    text={'Upload Images'}
                    textColor={Color.white}
                    width={windowWidth * 0.5}
                    height={windowHeight * 0.06}
                    marginTop={moderateScale(30, 0.3)}
                    onPress={() => {
                      multiImages?.length < 5 && setShowMultiImageModal(true);
                    }}
                    bgColor={Color.themeColor}
                    borderRadius={moderateScale(30, 0.3)}
                  />

                  <CustomButton
                    onPress={() => {
                      seekHelp();
                    }}
                    text={
                      submitLoading ? (
                        <ActivityIndicator color={'#FFFFFF'} size={'small'} />
                      ) : (
                        'Submit'
                      )
                    }
                    textColor={Color.white}
                    width={windowWidth * 0.4}
                    height={windowHeight * 0.06}
                    marginTop={moderateScale(10, 0.3)}
                    bgColor={
                      userRole == 'Qbid Member'
                        ? Color.blue
                        : userRole == 'Qbid Negotiator'
                        ? Color.themeColor
                        : Color.black
                    }
                    borderRadius={moderateScale(30, 0.3)}
                  />

                  <ImagePickerModal
                    show={showMultiImageModal}
                    setShow={setShowMultiImageModal}
                    setMultiImages={setMultiImages}
                  />
                </View>
              </View>
            </Modal>
            {/* <Icon
              name={'sound-mix'}
              as={Entypo}
              size={moderateScale(22, 0.3)}
              color={Color.themeDarkGray}
              onPress={() => {
                setSelectedView('negotiator');
                setIsModalVisible(true);
              }}
            /> */}
          </View>
          <View style={styles.row}>
            <CustomText isBold style={styles.header}>
              Proposals
            </CustomText>
            <CustomText
              onPress={() => {
                navigationService.navigate('SeeAllScreen', {
                  type: 'negotiator',
                  data:proposals
                });
              }}
              style={styles.viewall}>
              View all
            </CustomText>
          </View>

          {isLoading ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: windowHeight * 0.2,
                width: windowWidth,
              }}>
              <ActivityIndicator size={'large'} color={'white'} />
            </View>
          ) : (
            <FlatList
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      width: windowWidth * 0.95,
                      height: windowHeight * 0.18,
                      // backgroundColor: 'green',
                      alignItems: 'center',
                    }}>
                    <Lottie
                      source={require('../Assets/Images/animation3.json')}
                      autoPlay
                      loop
                    />
                    <Text style={styles.nodata}>Data not found</Text>
                  </View>

                  // <Text>hello</Text>
                );
              }}
              data={proposals}
              // data={[]}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: moderateScale(15, 0.3),
              }}
              renderItem={({item, index}) => {
                return <NegotiatorCard key={index} item={item} />;
              }}
            />
          )}
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: Color.lightGrey,
              width: '95%',
              marginTop: moderateScale(20, 0.3),
            }}
          />
          <View style={styles.row}>
            <CustomText style={styles.header} isBold>
              My Quotes
            </CustomText>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: windowWidth * 0.2,
                marginRight: moderateScale(5, 0.3),
              }}>
              <CustomText
                onPress={() => {
                  navigationService.navigate('SeeAllScreen', {
                    type: 'qoutes',
                    data: myQuotes,
                  });
                }}
                style={styles.viewall}>
                View all
              </CustomText>
              <Icon
                name={'sound-mix'}
                as={Entypo}
                size={moderateScale(15, 0.3)}
                color={Color.themeDarkGray}
                onPress={() => {
                  setSelectedView('myqoutes');
                  setIsModalVisible(true);
                }}
              />
            </View>
          </View>
          {isLoading ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: windowWidth,
                height: windowHeight * 0.3,
              }}>
              <ActivityIndicator color={'white'} size={'large'} />
            </View>
          ) : (
            <FlatList
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      width: windowWidth * 0.95,
                      height: windowHeight * 0.18,
                      // backgroundColor: 'green',
                      alignItems: 'center',
                    }}>
                    <Lottie
                      source={require('../Assets/Images/animation3.json')}
                      autoPlay
                      loop
                    />
                    <Text style={styles.nodata}>Data not found</Text>
                  </View>

                  // <Text>hello</Text>
                );
              }}
              data={myQuotes?.length > 5 ? myQuotes.slice(0, 5) : myQuotes}
              // data={[]}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: moderateScale(15, 0.3),
                paddingTop: moderateScale(20, 0.3),
              }}
              renderItem={({item, index}) => {
                // console.log("🚀 ~ file: HomeScreen.js:512 ~ HomeScreen ~ item:", item)
                return <MyQouteCard item={item} key={index} />;
              }}
            />
          )}
        </ScrollView>
      </LinearGradient>
      <CustomStatusModal
        isModalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        statusArray={
          selectedView == 'negotiator'
            ? servicesArray
            : [
                {name: 'Recommended'},
                {name: 'Working On'},
                {name: 'Seeking Help'},
              ]
        }
        data={selectedView == 'negotiator' ? selectedService : selectedStatus}
        setData={
          selectedView == 'negotiator' ? setSelectedService : setSelectedStatus
        }
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
    </ScreenBoiler>
  );
};

export default HomeScreen;

const styles = ScaledSheet.create({
  container: {
    // height : windowHeight * 0.85,
    width: windowWidth,
    // backgroundColor: Color.themeColor,
  },
  header: {
    color: Color.black,
    fontSize: moderateScale(16, 0.3),

    width: windowWidth * 0.6,
  },
  row: {
    width: windowWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(15, 0.3),
    marginTop: moderateScale(15, 0.3),
  },
  viewall: {
    fontSize: moderateScale(12, 0.3),
    color: Color.black,
  },
  nodata: {
    color: Color.white,
    fontWeight: '500',
    fontSize: 18,
    position: 'absolute',
    bottom: 0,
    // marginTop:20
  },
});

{
  /* <FlatList
      data={[{
        companyName : 'ABC company',
        fullName : 'john marco',
        number : '12345678',
        address : 'abc street newyork , USA',
        email : 'john@gmail.com',
        Qbid_member_name : 'Chris',
        Qbid_member_email : 'chrisnevins@gmail.com',
        contact : '+1(333)111-1111',
        image : 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg'
      },
      {
        companyName : 'ABC company',
        fullName : 'john marco',
        number : '12345678',
        address : 'abc street newyork , USA',
        email : 'john@gmail.com',
        Qbid_member_name : 'Chris',
        Qbid_member_email : 'chrisnevins@gmail.com',
        contact : '+1(333)333-1111',
        image : 'https://media.istockphoto.com/id/1021170914/photo/beautiful-landscape-in-park-with-tree-and-green-grass-field-at-morning.jpg?s=612x612&w=is&k=20&c=Qd0K-pvuKcje8CGDcJkJ3UJzHbGtGYRw8wwcbno99O4='

      },
      {
        companyName : 'ABC company',
        fullName : 'john marco',
        number : '12345678',
        address : 'abc street newyork , USA',
        email : 'john@gmail.com',
        Qbid_member_name : 'Chris',
        Qbid_member_email : 'chrisnevins@gmail.com',
        contact : '+1(333)111-222',
        image : 'https://media.istockphoto.com/id/1216579927/photo/colorful-sunset-scenery-on-open-field.jpg?s=612x612&w=is&k=20&c=qPm0H72LjrnQ22yWKPIycy6tCQsutL230c7-Ttl8_FU='


      },
    ]}
      showsVerticalScrollIndicator ={false}
      contentContainerStyle={{
        paddingTop : moderateScale(20,0.3),
        paddingBottom : moderateScale(50,0.3),

      }}
      renderItem={({item , index})=>{
        return(
          <BidDetailCard item={item} />
        )
      }}
      /> */
}
