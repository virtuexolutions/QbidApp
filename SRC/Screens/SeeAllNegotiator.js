import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState, useRef} from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import Color from '../Assets/Utilities/Color';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import SearchContainer from '../Components/SearchContainer';
import CustomStatusModal from '../Components/CustomStatusModal';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import JobCard from '../Components/JobCard';
import navigationService from '../navigationService';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import Card from '../Components/Card';
import NoData from '../Components/NoData';

const SeeAllNegotiator = props => {
  const type = props?.route?.params?.type;
  const data = props?.route?.params?.data;

  const servicesArray = useSelector(state => state.commonReducer.servicesArray);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const token = useSelector(state => state.authReducer.token);
   console.log(
    '🚀 ~ file: SeeAllNegotiator.js:30 ~ SeeAllNegotiator ~ token:',
    type, data,
  );

  const scrollViewRef = useRef();

  const [searchData, setSearchData] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');

  const [pageNum, setpageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [newArray, setNewArray] = useState([]);

  const searchQuotes = async () => {
    const url = `auth/negotiator/search/${type}`;
    const body = {search: searchData};

    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      setNewArray(response?.data?.quote_info?.data);
    }
  };

  const getData = async type1 => {
    const url =
      type == 'Recommended'
        ? `auth/negotiator/quote/recommended?page=${pageNum}`
        : type == 'Working On'
        ? `auth/negotiator/quote/working?page=${pageNum}`
        : `auth/negotiator/hiring/list?page=${pageNum}`;
    type1 == 'loadMore' ? setLoadMore(true) : setIsLoading(true);
    const response = await Get(url, token);
    type1 == 'loadMore' ? setLoadMore(false) : setIsLoading(false);
    if (response != undefined) {
        return console.log(
        '🚀 ~ file: SeeAllNegotiator.js:74 ~ getData ~ response:',
        response?.data,
      );
      if(type == 'Working On'){
        type1 == 'loadMore'
        ? setNewArray(prev => [...prev, ...response?.data?.quote_info])
        : setNewArray(response?.data?.hiring_info?.data);
      }
      else if (type != 'job posts') {
        type1 == 'loadMore'
          ? setNewArray(prev => [...prev, ...response?.data?.quote_info])
          : setNewArray(response?.data?.quote_info);
      } else {
        type1 == 'loadMore'
          ? setNewArray(prev => [...prev, ...response?.data?.hiring_info?.data])
          : setNewArray(response?.data?.hiring_info?.data);
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
    searchQuotes();
  }, [searchData]);

  useEffect(() => {
    if (pageNum == 1) {
      getData();
    } else {
      if (newArray?.length == data?.length) {
        getData('loadMore');
      }
    }
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
            justifyContent: 'center',
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
        </View>

        {isLoading ? (
          <View
            style={{
              width: windowWidth,
              height: windowHeight * 0.75,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator color={'white'} size={'large'} />
          </View>
        ) : (
          <FlatList
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',

                    height: windowHeight * 0.5,
                  }}>
                  <NoData
                    style={{
                      width: windowWidth * 0.95,
                      height: windowHeight * 0.3,

                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                </View>
              );
            }}
            // onEndReached={() => {
            //   setpageNum(prev => prev + 1);
            // }}
            ref={scrollViewRef}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            data={newArray}
            numColumns={type != 'Seeking Help' ? 2 : 1}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              width: windowWidth,
              alignItems: 'center',
              // paddingHorizontal: moderateScale(15, 0.3),
              paddingTop: moderateScale(20, 0.6),
              paddingBottom: moderateScale(80, 0.6),
            }}
            renderItem={({item, index}) => {
              return type != 'Seeking Help' ? (
                <JobCard
                  key={index}
                  fromSeeAll={true}
                  item={item}
                  style={index % 2 == 0 && {marginRight: moderateScale(7, 0.3)}}
                  onPress={() => {
                    navigationService.navigate('JobDetails', {item});
                  }}
                />
              ) : (
                <Card item={item} />
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
