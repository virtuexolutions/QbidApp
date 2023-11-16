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

const YourJobes = props => {
  const servicesArray = useSelector(state => state.commonReducer.servicesArray);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const token = useSelector(state => state.authReducer.token);
  // console.log("🚀 ~ file: SeeAllNegotiator.js:30 ~ SeeAllNegotiator ~ token:", token)

  const type = props?.route?.params?.type;
  console.log(
    '🚀 ~ file: SeeAllNegotiator.js:33 ~ SeeAllNegotiator ~ type:',
    type,
  );
  const data = props?.route?.params?.data;

  const scrollViewRef = useRef();

  const [searchData, setSearchData] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');

  const [pageNum, setpageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [newArray, setNewArray] = useState([]);
  const [completedjobescards, setCompletedjobescards] = useState('');

  // console.log("🚀 ~ file: SeeAllNegotiator.js:46 ~ SeeAllNegotiator ~ newArray:", newArray)
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
    const completedjobes = async()=>{
  const url ='auth/negotiator/quote/complete'
  setIsLoading(true)
  const response = await Get('auth/negotiator/quote/complete' , token)
  console.log("🚀 ~ file: YourJobes.js:73 ~ completedjobes ~ response:", response?.data?.quote_info?.data)
  setIsLoading(false)
  if(response != undefined){
    setCompletedjobescards(response?.data?.quote_info?.data)
  }
    }

    useEffect(() => {
      completedjobes()
    }, [])

  // const dummydata = [
  //   {
  //     title: 'autorepair',
  //     name: 'john',
  //     image: require('../Assets/Images/man1.jpg'),
  //     quoted_price: 20,
  //     offering_percentage: 10,
  //     notes: 'kfdkshdfgdshgfsbdfnbcnvbxncvkjtrhtuerht',
  //   },
  //   {
  //     title: 'plumbing project',
  //     name: 'alexender',
  //     image: require('../Assets/Images/man1.jpg'),
  //     offering_percentage: 15,
  //     quoted_price: 20,
  //     notes: 'kfdkshdfgdshgfsbdfnbcnvbxncvkjtrhtuerht',
  //   },
  //   {
  //     title: 'autorepair',
  //     name: 'matthew',
  //     image: require('../Assets/Images/man1.jpg'),
  //     offering_percentage: 10,
  //     quoted_price: 20,
  //     notes: 'kfdkshdfgdshgfsbdfnbcnvbxncvkjtrhtuerht',
  //   },
  //   {
  //     title: 'autorepair',
  //     name: 'john',
  //     image: require('../Assets/Images/man1.jpg'),
  //     quoted_price: 20,
  //     offering_percentage: 10,
  //     notes: 'kfdkshdfgdshgfsbdfnbcnvbxncvkjtrhtuerht',
  //   },
    
  // ];
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
        <CustomText isBold style={styles.heading}>
          completed Jobes
        </CustomText>

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
            ref={scrollViewRef}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            data={completedjobescards}
            numColumns={type != 'Seeking Help' ? 2 : 1}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              width: windowWidth,
              alignItems: 'center',
              paddingBottom: moderateScale(80, 0.6),
            }}
            renderItem={({item, index}) => {
              // console.log("🚀 ~ file: SeeAllNegotiator.js:230 ~ SeeAllNegotiator ~ item:", item)
              console.log(index % 2 == 0);
              return type != 'Seeking Help' ? (
                <TouchableOpacity
                  onPress={() =>
                    navigationService.navigate('CompleteJobes', {item: item})
                  }
                  style={{
                    flexDirection: 'row',
                    marginVertical: moderateScale(10, 0.3),
                    paddingHorizontal: moderateScale(10, 0.3),
                    backgroundColor: Color.white,
                    width: windowWidth * 0.45,
                    borderRadius: moderateScale(10, 0.3),
                    marginHorizontal: moderateScale(5, 0.3),
                    paddingVertical: moderateScale(10, 0.3),
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: windowHeight * 0.08,
                      width: windowHeight * 0.08,
                      borderRadius: 10,
                      overflow: 'hidden',
                    }}>
                    <CustomImage
                      style={{
                        height: '100%',
                        width: '100%',
                      }}
                      source={{ uri : item?.user_info?.photo}}
                      // {uri: user?.photo}
                    />
                  </View>
                  <View
                    style={{
                      paddingHorizontal: moderateScale(10, 0.3),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <CustomText
                        isBold
                        style={{
                          color: Color.black,
                          fontSize: moderateScale(12, 0.6),
                          textTransform: 'uppercase',
                          paddingRight: moderateScale(10, 0.3),
                        }}>
                        {item?.user_info?.first_name}
                      </CustomText>
                        </View>
                    <CustomText
                      style={{
                        color: Color.black,
                        fontSize: moderateScale(12, 0.6),
                        width: windowWidth * 0.75,
                      }}>
                     earning
                    </CustomText>
                    <CustomText
                      style={{
                        color: Color.black,
                        fontSize: moderateScale(12, 0.6),
                        width: windowWidth * 0.75,
                      }}>
                     {item?.user_info?.total_earning}
                    </CustomText>
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

export default YourJobes;

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
});
