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
import {Actionsheet, Icon} from 'native-base';
import {ScrollView} from 'react-native';
import SearchContainer from '../Components/SearchContainer';
import Entypo from 'react-native-vector-icons/Entypo';
import MyQouteCard from '../Components/MyQouteCard';
import navigationService from '../navigationService';
import {useDispatch, useSelector} from 'react-redux';
import CustomStatusModal from '../Components/CustomStatusModal';
import LinearGradient from 'react-native-linear-gradient';
import {setUserToken} from '../Store/slices/auth';
import CustomAlertModal from '../Components/CustomAlertModal';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {useIsFocused} from '@react-navigation/native';
import NoData from '../Components/NoData';
import VendorCards from '../Components/VendorCards';
import HelpCard from '../Components/HelpCard';
// import SkeeingHelpCard from '../Components/SkeeingHelpCard';

const HomeScreen = () => {
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const userData = useSelector(state => state.commonReducer.userData);
  const servicesArray = useSelector(state => state.commonReducer.servicesArray);
  const token = useSelector(state => state.authReducer.token);
  console.log("🚀 ~ HomeScreen ~ token:==============>", token)
  const [searchData, setSearchData] = useState('');
  const [showMultiImageModal, setShowMultiImageModal] = useState(false);
  const [multiImages, setMultiImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();
  const [visible, setVisible] = useState(false);
  const [myQuotes, setMyQuotes] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [selectedData1, setSelectedData1] = useState('');
  const [negotiator, setNegotiator] = useState([]);
  const [selectedData2, setSelectedData2] = useState('');
  const [selectedData3, setSelectedData3] = useState('');
  const [helpResponse, setHelpResponse] = useState([]);

  const getAllData = async () => {
    setIsLoading(true);
    const [response1, response2, response3] = await Promise.all([
      Get('auth/member/negotiator', token),
      Get('auth/member/quote', token),
      Get('auth/member/quote_help', token),
    ]);
    setIsLoading(false);
    if (response1 != undefined) {
      setNegotiator(response1?.data?.negotitator_info);
    }
    if (response2 != undefined) {
      setMyQuotes(response2?.data?.quote_info?.data);
    }
      console.log("🚀 ~ getAllData ~ response2:", response2.data.quote_info?.data)
    if (response3 != undefined) {
      console.log(
        '🚀 ~ getAllData ~ response3:',
        JSON.stringify(response3?.data?.quote_info?.data, null, 2),
      );
      setHelpResponse(response3?.data?.quote_info?.data);
    }
  };

  // const filterQuotes = async () => {
  //   const url = `auth/member/search_type/${selectedStatus}`;
  //   setIsLoading(true);
  //   const response = await Get(url, token);
  //   setIsLoading(false);
  //   if (response != undefined) {

  //     setMyQuotes(response?.data?.quote_info);
  //   }
  // };

  useEffect(() => {
    getAllData();
  }, [isFocused]);

  // useEffect(() => {
  //   if (selectedStatus != '') {
  //     filterQuotes();
  //   }
  // }, [selectedStatus]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      setVisible(true);
    });
  }, []);

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
            paddingBottom: moderateScale(105, 0.3),
            paddingTop: moderateScale(40, 0.3),
          }}>
          <View
            style={{
              width: windowWidth * 0.93,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: moderateScale(10, 0.6),
              alignItems: 'center',
            }}>
            <SearchContainer
              onPress={() => {
                if (selectedData1 == '') {
                  // return Platform.OS == 'android'
                  //   ? ToastAndroid.show(
                  //       'please select any category',
                  //       ToastAndroid.SHORT,
                  //     )
                  //   :
                  Alert.alert('Please select any category');
                } else {
                  navigationService.navigate('SeeAllScreen', {
                    type: selectedData1,
                  });
                }
              }}
              width={windowWidth * 0.8}
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
              size={moderateScale(18, 0.3)}
              color={Color.themeDarkGray}
              onPress={() => {
                setModalVisible1(true);
              }}
            />
          </View>
          <View style={styles.row}>
            <CustomText isBold style={styles.header}>
              Popular negotiator
            </CustomText>
            <CustomText
              onPress={() => {
                navigationService.navigate('SeeAllScreen', {
                  type: 'negotiator',
                  data: negotiator,
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
                  <NoData
                    style={{
                      height: windowHeight * 0.2,
                      width: windowWidth * 0.5,
                      alignItems: 'center',
                    }}
                  />
                );
              }}
              data={negotiator.slice(0, 5)}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: moderateScale(15, 0.3),
                paddingTop: moderateScale(10, 0.3),
              }}
              renderItem={({item, index}) => {
                return <VendorCards item={item} />;
                // return <NegotiatorCard key={index} item={item} />;
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
              }}>
              <CustomText
                onPress={() => {
                  navigationService.navigate('SeeAllScreen', {
                    type: 'quotes',
                    data: myQuotes,
                  });
                }}
                style={styles.viewall}>
                View all
              </CustomText>
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
                  <NoData
                    style={{
                      height: windowHeight * 0.2,
                      width: windowWidth * 0.5,
                      alignItems: 'center',
                    }}
                  />
                );
              }}
              // data={myQuotes
              //   ?.filter(item => item?.type == null)
              //   .reverse()
              //   .slice(0, 5)}
              data={
                myQuotes?.length > 5
                  ? myQuotes.reverse().slice(0, 5)
                  : myQuotes.reverse()
              }
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: moderateScale(15, 0.3),
                paddingTop: moderateScale(20, 0.3),
              }}
              renderItem={({item, index}) => {
                return <MyQouteCard item={item} key={index} type={'quote'} />;
              }}
            />
          )}
          <View style={styles.row}>
            <CustomText style={styles.header} isBold>
              seeking help
            </CustomText>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <CustomText
                onPress={() => {
                  navigationService.navigate('SeeAllScreen', {
                    type: 'help',
                    data: myQuotes,
                  });
                }}
                style={styles.viewall}>
                View all
              </CustomText>
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
                  <NoData
                    style={{
                      height: windowHeight * 0.2,
                      width: windowWidth * 0.5,
                      alignItems: 'center',
                    }}
                  />
                );
              }}
              data={helpResponse}
              // data={myQuotes.filter(item => item?.type == 'help')}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: moderateScale(15, 0.3),
                paddingTop: moderateScale(20, 0.3),
              }}
              renderItem={({item, index}) => {
                // console.log(
                //   '🚀 ~ HomeScreen ~ item================>response3 here:',
                //   item,
                // );
                return <HelpCard item={item} />;
              }}
            />
          )}
        </ScrollView>
      </LinearGradient>
      <CustomStatusModal
        isModalVisible={modalVisible1}
        setModalVisible={setModalVisible1}
        statusArray={[{name: 'negotiator'}, {name: 'quotes'}]}
        data={selectedData1}
        setData={setSelectedData1}
        text={'category'}
      />
      <CustomStatusModal
        isModalVisible={modalVisible2}
        setModalVisible={setModalVisible2}
        statusArray={[{name: 'Level 5'}, {name: 'level 4'}, {name: 'level 3'}]}
        data={selectedData2}
        setData={setSelectedData2}
        text={'filter negotiator level'}
      />
      <CustomStatusModal
        isModalVisible={modalVisible3}
        setModalVisible={setModalVisible3}
        statusArray={[
          {name: 'Completed'},
          {name: 'Pending'},
          {name: 'onGoing'},
        ]}
        data={selectedData3}
        setData={setSelectedData3}
        text={'filter by quote status'}
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
