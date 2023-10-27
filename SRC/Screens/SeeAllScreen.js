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
import {useEffect} from 'react';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {ActivityIndicator} from 'react-native';

const SeeAllScreen = props => {
  const servicesArray = useSelector(state => state.commonReducer.servicesArray);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const token = useSelector(state => state.authReducer.token);

  const type = props?.route?.params?.type;
  const data = props?.route?.params?.data;
  // console.log('🚀 ~ file: SeeAllScreen.js:29 ~ SeeAllScreen ~ data:', data?.length);

  const [searchData, setSearchData] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  console.log("🚀 ~ file: SeeAllScreen.js:37 ~ SeeAllScreen ~ loadMore:", loadMore)
  const [newArray, setNewArray] = useState([]);

  const [pageNum, setPageNum] = useState(1);
  // console.log("🚀 ~ file: SeeAllScreen.js:43 ~ SeeAllScreen ~ pageNum:", pageNum)
  const scrollViewRef = useRef();

  const handleScroll = event => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const maxOffset =
      event.nativeEvent.contentSize.height -
      event.nativeEvent.layoutMeasurement.height;

    // Check if you've reached the end
    if (currentOffset >= maxOffset) {
      // You've reached the end of the ScrollView
      setPageNum(prev => prev + 1);
      console.log('Reached the end of ScrollView');
    }
  };

  const getData = async value => {
    const url =
      type == 'qoutes'
        ? `auth/member/quote?page=${pageNum}`
        : `auth/member/bid_help?page=${pageNum}`;
    value == 'loadMore' ? setLoadMore(true) : setIsLoading(true);
    const response = await Get(url, token);
    value == 'loadMore' ? setLoadMore(false) : setIsLoading(false);
    console.log(
      '🚀 ~ file: SeeAllScreen.js:43 ~ getData ~ response:',
      response?.data,
    );

    if (response != undefined) {
      console.log(
        '🚀 ~ file: SeeAllScreen.js:71 ~ getData ~ response:',
        response?.data?.quote_info?.data,
      );

      // setNewArray(response?.data?.quote_info?.data)

      if(type == 'qoutes'){
      //  console.log('Here')
        value == 'loadMore' ? setNewArray(prev => [...prev, ...response?.data?.quote_info?.data]) : setNewArray(response?.data?.quote_info?.data)
      }else{
        value == 'loadMore' ? setNewArray(prev => [...prev, ...response?.data?.bid_help_info?.data]) : setNewArray(response?.data?.bid_help_info?.data)
      }


    }
  };

  useEffect(() => {
    if (pageNum == 1) {
      getData();
    } else {
     
      getData('loadMore');

      
      
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
            ? Color.themeBgColorNegotiator
            : Color.themebgBusinessQbidder
        }>
        {/* <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: moderateScale(20, 0.3),
          paddingTop: moderateScale(40, 0.3),
        }}> */}

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

        <FlatList
          // data={type == 'negotiator' ? negotiatorsArray : myQoutesArray}
          data={newArray}
          ref={scrollViewRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          numColumns={type == 'negotiator' ? 2 : 1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            width: windowWidth,
            alignItems: 'center',
            // paddingHorizontal: moderateScale(15, 0.3),
            paddingVertical: moderateScale(20, 0.3),
            paddingBottom: moderateScale(50, 0.6),
          }}
          renderItem={({item, index}) => {
            return type == 'negotiator' ? (
              <NegotiatorCard
                item={item}
                containerStyle={{
                  width: windowWidth * 0.45,
                  height: windowHeight * 0.28,
                }}
                fromSeeAll={true}
              />
            ) : (
              <MyQouteCard item={item} />
            );
          }}
          ListHeaderComponent={() => {
            return (
              <CustomText style={styles.header}>
                {type == 'negotiator' ? 'Proposal' : 'My Qoutes'}
              </CustomText>
            );
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

export default SeeAllScreen;

const styles = ScaledSheet.create({
  header: {
    color: Color.black,
    fontSize: moderateScale(16, 0.3),
    fontWeight: 'bold',
    width: windowWidth * 0.9,
  },
});
