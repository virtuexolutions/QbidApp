import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
import JobCard from '../Components/JobCard';
import navigationService from '../navigationService';
import SeekingHelpCard from '../Components/SeekingHelpCard';
import {Socket} from 'engine.io-client';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import Card from '../Components/Card';
import NoData from '../Components/NoData';
import CustomImage from '../Components/CustomImage';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import {useIsFocused} from '@react-navigation/native';
import ReviewModal from '../Components/ReviewModal';
import {imageUrl} from '../Config';
import {off} from 'npm';

const YourJobs = props => {
  const type = props?.route?.params?.type;
  const data = props?.route?.params?.data;

  const servicesArray = useSelector(state => state.commonReducer.servicesArray);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const token = useSelector(state => state.authReducer.token);
  console.log('🚀 ~ token:', token);

  const isFocused = useIsFocused();
  const scrollViewRef = useRef();

  const [searchData, setSearchData] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [pageNum, setpageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [newArray, setNewArray] = useState([]);
  const [completedJobscards, setCompletedJobscards] = useState('');
  const [item, setItem] = useState('all');
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
  const completedJobs = async () => {
    const url = `auth/negotiator/quote/complete?status=${item}`;
    setIsLoading(true);
    const response = await Get(url, token);

    setIsLoading(false);

    if (response != undefined) {
      setCompletedJobscards(response?.data?.quote_info?.data);
    }
  };

  useEffect(() => {
    completedJobs();
  }, [isFocused, item]);

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
        {/* <CustomText isBold style={styles.heading}>
          completed Jobs
        </CustomText> */}

        <DropDownSingleSelect
          array={[
            'completed',
            // 'reject',
            'pending',
            'accepted',
            'onGoing',
            'review',
            // 'waiting for approval',
          ]}
          backgroundColor={Color.white}
          item={item}
          setItem={setItem}
          placeholder={'Choose any category'}
          width={windowWidth * 0.9}
          dropdownStyle={{
            width: windowWidth * 0.95,
            borderBottomWidth: 0,
            marginTop: moderateScale(30, 0.3),
            marginHorizontal: moderateScale(15, 0.3),
          }}
        />
        {/* 
        {isLoading ? (
          <View
            style={{
              width: windowWidth,
              height: windowHeight * 0.75,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color={'white'} size={'large'} />
          </View>
        ) : ( */}
        <FlatList
          ListEmptyComponent={() => {
            return (
              <View style={styles.nodataView}>
                <NoData style={styles.NoData} />
              </View>
            );
          }}
          ref={scrollViewRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          data={completedJobscards}
          numColumns={type != 'Seeking Help' ? 2 : 1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            width: windowWidth,
            alignItems: 'center',
            paddingBottom: moderateScale(80, 0.6),
          }}
          renderItem={({item, index}) => {
            console.log('🚀 ~ YourJobs ~ item:', item);
            console.log(index % 2 == 0);
            return type != 'Seeking Help' ? (
              <TouchableOpacity
                onPress={() =>
                  navigationService.navigate('CompleteJobs', {item: item})
                }
                style={styles.card}>
                <View style={styles.imageView}>
                  <CustomImage
                    style={styles.image}
                    source={{uri: item?.user_info?.photo}}
                  />
                </View>
                <View
                  style={{
                    paddingHorizontal: moderateScale(10, 0.3),
                  }}>
                  <View style={styles.row}>
                    <CustomText numberOfLines={1} style={styles.title}>
                      quote title :
                    </CustomText>
                    <CustomText numberOfLines={1} style={styles.titletext}>
                      {item?.title}
                    </CustomText>
                  </View>
                  <View style={styles.row2}>
                    <CustomText style={styles.off}>
                      offeringpercentage :
                    </CustomText>
                    <CustomText style={styles.off}>
                      {item?.offering_percentage}
                    </CustomText>
                  </View>
                </View>
              </TouchableOpacity>
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
        {/* // )} */}
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

export default YourJobs;

const styles = ScaledSheet.create({
  header: {
    color: Color.white,
    fontSize: moderateScale(20, 0.3),
    fontWeight: 'bold',
    width: windowWidth * 0.9,
  },
  heading: {
    color: Color.white,
    marginLeft: moderateScale(15, 0.3),
    fontSize: moderateScale(20, 0.6),
    paddingTop: moderateScale(10, 0.3),
  },
  nodataView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight * 0.5,
  },
  NoData: {
    width: windowWidth * 0.95,
    height: windowHeight * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    // flexDirection: 'row',
    marginVertical: moderateScale(10, 0.3),
    // paddingHorizontal: moderateScale(10, 0.3),
    backgroundColor: Color.white,
    width: windowWidth * 0.42,
    height: windowHeight * 0.15,
    borderRadius: moderateScale(10, 0.3),
    marginHorizontal: moderateScale(5, 0.3),
    // paddingVertical: moderateScale(10, 0.3),
    alignItems: 'center',
  },
  imageView: {
    height: windowHeight * 0.1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    width: windowWidth * 0.42,
    paddingVertical: moderateScale(3, 0.6),
    paddingHorizontal: moderateScale(3, 0.6),
  },
  row2: {
    flexDirection: 'row',
    width: windowWidth * 0.42,
    paddingHorizontal: moderateScale(3, 0.6),
  },
  title: {
    color: Color.black,
    fontSize: moderateScale(10, 0.6),
  },
  titletext: {
    color: Color.black,
    fontSize: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(2, 0.6),
    width : windowWidth *0.25,
  },
  off: {
    color: Color.black,
    fontSize: moderateScale(10, 0.6),
    paddingHorizontal : moderateScale(2,.6)
  },
});
