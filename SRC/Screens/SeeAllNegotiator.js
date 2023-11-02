import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState, useRef} from 'react';
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
import CustomStatusModal from '../Components/CustomStatusModal';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import JobCard from '../Components/JobCard';
import navigationService from '../navigationService';
import SeekingHelpCard from '../Components/SeekingHelpCard';
import {Socket} from 'engine.io-client';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import NoData from '../Components/NoData';

const SeeAllNegotiator = props => {
  const servicesArray = useSelector(state => state.commonReducer.servicesArray);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const token = useSelector(state => state.authReducer.token);

  const type = props?.route?.params?.type;
  const data = props?.route?.params?.data;

  const scrollViewRef = useRef();

  const [searchData, setSearchData] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  useState;
  const [pageNum, setpageNum] = useState(1);
 
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const [newArray, setNewArray] = useState([]);
 

  const getData = async type1 => {
    const url =
      type == 'recommended'
        ? `auth/negotiator/quote/recommended?page=${pageNum}`
        : type == 'Working On'
        ? `auth/negotiator/quote/working?page=${pageNum}`
        : `auth/negotiator/bid_help?page=${pageNum}`;
    type1 == 'loadMore' ? setLoadMore(true) : setIsLoading(true);
    const response = await Get(url, token);
    type1 == 'loadMore' ? setLoadMore(false) : setIsLoading(false);
    if (response != undefined) {
      // console.log(
      //   '🚀 ~ file: SeeAllNegotiator.js:67 ~ getData ~ response:',
      //   response?.data,
      // );
      if (type != 'Seeking Help') {
        type1 == 'loadMore'  
          ? setNewArray(prev => [...prev, ...response?.data?.quote_info?.data])
          : setNewArray(response?.data?.quote_info?.data);
      } else {
        type1 == 'loadMore'
          ? setNewArray(prev => [
              ...prev,
              ...response?.data?.bid_help_info?.data,
            ])
          : setNewArray(response?.data?.bid_help_info?.data);
      }
    }
  };

  const handleScroll = event => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const maxOffset =
      event.nativeEvent.contentSize.height -
      event.nativeEvent.layoutMeasurement.height;

    // Check if you've reached the end
    if (currentOffset >= maxOffset) {
      // You've reached the end of the ScrollView
      setpageNum(prev => prev + 1);
      // console.log('Reached the end of ScrollView');
    }
  };

  useEffect(() => {
    if (pageNum == 1) {
      getData();
    } else {
      if(newArray.length == data.length){

        getData('loadMore');
      }
    }

    // return () => {
    //   setpageNum(1);
    //   setNewArray([]);
    // };
  }, [pageNum]);

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
      showHeader={true}
      showBack={true}
      headerColor={
        userRole == 'Qbid Member'
          ? Color.themeBgColor
          : userRole == 'Qbid Negotiator'
          ? Color.themeBgColorNegotiator
          : Color.themebgBusinessQbidder
      }>
      <LinearGradient
        style={{
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
        <View
          style={{
            width: windowWidth * 0.93,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
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
            color={Color.lightGrey}
            onPress={() => {
              setIsModalVisible(true);
            }}
          />
        </View>

        {isLoading ? (
          <View
            style={{
              width: windowWidth,
              height: windowHeight * 0.75,
              alignSelf: 'center',
              justifyContent: 'center',
              // alignItems:'center'
            }}>
            <ActivityIndicator color={'white'} size={'large'} />
          </View>
        ) : (
          <FlatList
          ListEmptyComponent={()=>{
          return(
              <View style={{
                alignItems:'center',
                justifyContent:'center',
                // backgroundColor:'red',
                height:windowHeight*0.5
              }}>
                <NoData 
                style={{
                  width: windowWidth * 0.95,
                  height: windowHeight * 0.3,
                  // backgroundColor: 'green',
                  alignItems: 'center',
                  justifyContent:'center'
                }}
                />
              </View>
            )
          }}
            // onEndReached={() => {
            //   setpageNum(prev => prev + 1);
            // }}
            ref={scrollViewRef}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            data={newArray}
          // data={[]}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              width: windowWidth,
              alignItems: 'center',
              // paddingHorizontal: moderateScale(15, 0.3),
              paddingTop: moderateScale(20, 0.6),
              paddingBottom: moderateScale(80, 0.6),
            }}
            renderItem={({item, index}) => {
              console.log(index % 2 == 0);
              return type != 'Job Requests' ? (
                <JobCard
                  fromSeeAll={true}
                  item={item}
                  style={index % 2 == 0 && {marginRight: moderateScale(7, 0.3)}}
                  onPress={() => {
                    navigationService.navigate('JobDetails', {item});
                  }}
                />
              ) : (
                <SeekingHelpCard
                  fromSeeAll={true}
                  style={index % 2 == 0 && {marginRight: moderateScale(7, 0.3)}}
                  item={item}
                />
              );
            }}
            ListHeaderComponent={() => {
              return <CustomText style={styles.header}>{type}</CustomText>;
            }}
            ListFooterComponent={() => {
              return (
                loadMore && (
                  <View
                    style={{
                      alignSelf: 'center',
                      marginTop: moderateScale(10, 0.3),
                    }}>
                    <ActivityIndicator size={'small'} color={'white'} />
                  </View>
                )
              );
            }}
          />
        )}
        {/* </ScrollView> */}
        <CustomStatusModal
          isModalVisible={isModalVisible}
          setModalVisible={setIsModalVisible}
          statusArray={
            type == 'negotiator'
              ? servicesArray
              : [{name: 'pending'}, {name: 'onGoing'}, {name: 'completed'}]
          }
          data={selectedStatus}
          setData={setSelectedStatus}
        />
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default SeeAllNegotiator;

const styles = ScaledSheet.create({
  header: {
    color: Color.white,
    fontSize: moderateScale(20, 0.3),
    fontWeight: 'bold',
    width: windowWidth * 0.9,
  },
});
