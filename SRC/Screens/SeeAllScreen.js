import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState, useRef} from 'react';
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
import CustomStatusModal from '../Components/CustomStatusModal';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {useEffect} from 'react';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {ActivityIndicator} from 'react-native';
import NoData from '../Components/NoData';
import VendorCards from '../Components/VendorCards';
import CustomStatusModal1 from '../Components/CustomStatusModal1';

const SeeAllScreen = props => {
  const servicesArray = useSelector(state => state.commonReducer.servicesArray);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const token = useSelector(state => state.authReducer.token);
  // console.log("🚀 ~ file: SeeAllScreen.js:29 ~ SeeAllScreen ~ token:", token)

  const type = props?.route?.params?.type;
  const data = props?.route?.params?.data;

  const [searchData, setSearchData] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [newArray, setNewArray] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const scrollViewRef = useRef();
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({level: [], expertise: []});
  console.log(
    '🚀 ~ file: SeeAllScreen.js:45 ~ SeeAllScreen ~ filters:',
    filters,
  );

  const handleScroll = event => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const maxOffset =
      event.nativeEvent.contentSize.height -
      event.nativeEvent.layoutMeasurement.height;

    if (currentOffset >= maxOffset) {
      setPageNum(prev => prev + 1);
    }
  };

  const searchCards = async () => {
    const url = 'auth/member/search';
    const body = {
      ...filters,
      search: searchData,
    };
    console.log('🚀 ~ file: SeeAllScreen.js:69 ~ searchCards ~ body:', body);
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);

    if (response != undefined) {
      console.log(
        '🚀 ~ file: SeeAllScreen.js:73 ~ searchCards ~ response:',
        response?.data,
      );

      setNewArray(response?.data?.negotiator_info);
    }
  };

  const filterQuotes = async () => {
    const url = `auth/member/search_type/${selectedStatus}?title=${searchData}`;
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      //  console.log(
      //   '🚀 ~ file: HomeScreen.js:97 ~ filterQuotes ~ response:',
      //   response?.data?.quote_info[0]?.images,
      // );
      setNewArray(response?.data?.quote_info);
    }
  };

  const getData = async value => {
    console.log('Page num ======>>>>> getData');

    const url = `auth/member/quote?page=${pageNum}`;
    value == 'loadMore' ? setLoadMore(true) : setIsLoading(true);
    const response = await Get(url, token);
    value == 'loadMore' ? setLoadMore(false) : setIsLoading(false);

    if (response != undefined) {
      console.log(
        '🚀 ~ file: SeeAllScreen.js:100 ~ getData ~ response:',
        response?.data,
      );
      if (type == 'quotes') {
        //  console.log('Here')
        value == 'loadMore'
          ? setNewArray(prev => [...prev, ...response?.data?.quote_info?.data])
          : setNewArray(response?.data?.quote_info?.data);
      } else {
        value == 'loadMore'
          ? setNewArray(prev => [
              ...prev,
              ...response?.data?.bid_help_info?.data,
            ])
          : setNewArray(response?.data?.bid_help_info?.data);
      }
    }
  };

  useEffect(() => {
    if (pageNum == 1) {
      type == 'quotes' && getData('');
    } else {
      type == 'quotes' && getData('loadMore');
    }
  }, [pageNum]);

  useEffect(() => {
    if (selectedStatus !=  '' || searchData != '') {
      type == 'quotes' && filterQuotes();
    }
  }, [selectedStatus ,searchData]);

  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      type == 'negotiator' && searchCards();
    }
  
  }, [searchData]);

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
      showBack={true}>
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
            ? Color.themeBgColorNegotiators
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
              type == 'negotiator'
                ? setFilterVisible(true)
                : setIsModalVisible(true);
            }}
          />
        </View>

        {isLoading ? (
          <View
            style={{
              justifyContent: 'center',
              height: windowHeight * 0.7,
            }}>
            <ActivityIndicator color={Color.white} size={'large'} />
          </View>
        ) : (
          <FlatList
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    // backgroundColor:'red',
                    height: windowHeight * 0.5,
                  }}>
                  <NoData
                    style={{
                      width: windowWidth * 0.95,
                      height: windowHeight * 0.3,
                      // backgroundColor: 'green',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                </View>
              );
            }}
            data={newArray}
            ref={scrollViewRef}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            numColumns={type == 'negotiator' ? 2 : 1}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              width: windowWidth,
              alignItems: 'center',
              paddingVertical: moderateScale(20, 0.3),
              paddingBottom: moderateScale(50, 0.6),
            }}
            renderItem={({item, index}) => {
              return type == 'negotiator' ? (
                <VendorCards item={item} />
              ) : (
                <MyQouteCard item={item} />
              );
            }}
            ListHeaderComponent={() => {
              return <CustomText style={styles.header}>{type}</CustomText>;
            }}
            ListFooterComponent={() => {
              return (
                loadMore && (
                  <View style={{alignSelf: 'center'}}>
                    <ActivityIndicator size={'small'} color={'white'} />
                  </View>
                )
              );
            }}
          />
        )}
        <CustomStatusModal
          isModalVisible={isModalVisible}
          setModalVisible={setIsModalVisible}
          text={'status'}
          statusArray={[
            {name: 'pending'},
            {name: 'onGoing'},
            {name: 'completed'},
          ]}
          data={selectedStatus}
          setData={setSelectedStatus}
        />
        <CustomStatusModal1
          isModalVisible={filterVisible}
          setModalVisible={setFilterVisible}
          filters={filters}
          setFilters={setFilters}
          searchCards={searchCards}
          // setData={setSelectFilters}
        />
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default SeeAllScreen;

const styles = ScaledSheet.create({
  header: {
    color: Color.black,
    fontSize: moderateScale(16, 0.3),
    fontWeight: 'bold',
    width: windowWidth * 0.9,
    marginBottom: moderateScale(10, 0.6),
  },
});
