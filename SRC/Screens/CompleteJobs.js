import {
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import ShowMoreAndShowLessText from '../Components/ShowMoreAndShowLessText';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {Icon} from 'native-base';
import MarkCheckWithText from '../Components/MarkCheckWithText';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomButton from '../Components/CustomButton';
import {ActivityIndicator} from 'react-native';
import ReviewCard from '../Components/ReviewCard';
import BidderDetail from '../Components/BidderDetail';
import Detailcards from '../Components/Detailcards';
import Modal from 'react-native-modal';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import numeral from 'numeral';
import {useIsFocused} from '@react-navigation/native';
import NoData from '../Components/NoData';
import {validateEmail} from '../Config';
import moment from 'moment';
import {SliderBox} from 'react-native-image-slider-box';

const CompleteJobs = props => {
  const data1 = props?.route?.params?.item;
  
  const user = useSelector(state => state.commonReducer.userData);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const token = useSelector(state => state.authReducer.token);

  const [images, setImages] = useState([])



  useEffect(() => {
    setImages(data1?.images.map((item)=>{return ({uri:item?.image})}))
  
    
  }, [])
  



  return (
    <ScreenBoiler
      hideUser={false}
      showHeader={true}
      showBack={true}
      statusBarBackgroundColor={
        userRole == 'Qbid Member'
          ? Color.themeBgColor
          : userRole == 'Qbid Negotiator'
          ? Color.themeBgColorNegotiator
          : Color.themebgBusinessQbidder
      }
      statusBarContentStyle={'light-content'}
      headerColor={
        userRole == 'Qbid Member'
          ? Color.themeBgColor
          : userRole == 'Qbid Negotiator'
          ? Color.themeBgColorNegotiator
          : Color.themebgBusinessQbidder
      }>
      <LinearGradient
        style={{
          height: windowHeight * 0.97,
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
          style={styles.sectionContainer}
          contentContainerStyle={{
            paddingBottom: moderateScale(80, 0.6),
          }}>
          <View>
            <SliderBox
              autoplay={false}
              images={images}
              sliderBoxHeight={230}
              parentWidth={355}
            />
            <CustomText
              style={{
                fontSize: moderateScale(20, 0.6),
                paddingVertical: moderateScale(20, 0.3),
                color: Color.white,
                paddingHorizontal:moderateScale(10,0.6)
              }}
              isBold>
              {data1?.title}
            </CustomText>
            <View
              style={styles.parentview}>
              <View style={styles.views}>
                <CustomText
                  style={[
                    styles.viewText,
                    {
                    
                      color: Color.black,
                    },
                  ]}
                  isBold>
                 quoted price
                </CustomText>
                <CustomText style={styles.viewText} isBold>
                  {data1?.quoted_price}
                </CustomText>
              </View>
              <View
                style={
                  styles.views
                  
                  }>
                <CustomText
                  style={[
                    styles.viewText,
                    {
                      color: Color.black,
                      paddingHorizontal: 0,
                    },
                  ]}
                  isBold>
                 asking price
                </CustomText>
                <CustomText style={styles.viewText} isBold>
                {data1?.asking_price}
                 
                  {/* {data1?.notes} */}
                </CustomText>
              </View>
              <View style={styles.views}>
                <CustomText
                  style={[
                    styles.viewText,
                    {
                      color: Color.black,
                    },
                  ]}
                  isBold>
                  offering
                </CustomText>
                <CustomText style={styles.viewText} isBold>
                  {data1?.offering_percentage}
                </CustomText>
              </View>
            </View>
            <CustomText style={styles.heading} isBold>
              descrpition
            </CustomText>
            <CustomText numberOfLines={4} style={styles.description}>
              {data1?.notes}
            </CustomText>
            <View style={styles.view2}>
              <CustomText style={styles.heading1} isBold>
                earning from this project
              </CustomText>
              <CustomText style={styles.heading1} isBold>
               {data1?.user_info?.total_earning}
              </CustomText>
            </View>
            <CustomText style={styles.heading1} isBold>
              user detail
            </CustomText>
            <View style={styles.userview}>
              <View style={styles.imageview}>
                <CustomImage
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  source={{uri :data1?.user_info?.photo}}
                />
              </View>
              <View
                style={{
                  paddingHorizontal: moderateScale(10, 0.3),
                }}>
                <CustomText
                  isBold
                  style={[
                    styles.usertext,
                    {
                      textTransform: 'uppercase',
                    },
                  ]}>
                 {data1?.user_info?.first_name}
                  {/* {item?.name} */}
                </CustomText>
                <CustomText style={styles.usertext}>
                {data1?.user_info?.email}
                  {/* {item?.comment} */}
                </CustomText>
              </View>
            </View>
            <View>
              <CustomText style={styles.reviewheading} isBold>
                Review
              </CustomText>
              <FlatList
                data={data1?.review}
                renderItem={({item, index}) => {
                  return (
                    <View style={styles.reviewcard}>
                      <View style={styles.reviewimage}>
                        <CustomImage
                          style={{
                            height: '100%',
                            width: '100%',
                          }}
                          source={{uri:item?.user_info?.photo}}
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
                            style={[
                              styles.reviewtext,
                              {
                                textTransform: 'uppercase',
                              },
                            ]}>
                            {item?.user_info?.first_name}
                          </CustomText>
                          <Icon
                            name="star"
                            as={FontAwesome}
                            color={'black'}
                            size={15}
                          />
                        </View>
                        <CustomText style={styles.reviewtext}>
                          {item?.text}
                        </CustomText>
                        <CustomText style={styles.moment}>
                          {moment().format('MMM Do, YYYY')}
                        </CustomText>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default CompleteJobs;

const styles = ScaledSheet.create({
  desc: {
    width: windowWidth * 0.9,
    lineHeight: moderateScale(20, 0.3),
    color: Color.white,
    fontSize: moderateScale(10, 0.6),
    marginTop: moderateScale(20, 0.3),
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: windowWidth * 0.95,
    justifyContent: 'space-between',
  },
  views: {
    height: windowHeight * 0.12,
    width: windowWidth * 0.25,
    backgroundColor: Color.white,
    borderRadius: 10,
    // backgroundColor:'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewText: {
    fontSize: moderateScale(13, 0.6),
    paddingHorizontal: moderateScale(5, 0.3),
    paddingVertical: moderateScale(5, 0.3),
    color: Color.black,
    textAlign:'center',
    // backgroundColor:'blue'
  },
  imageConatiner: {
    height: windowHeight * 0.07,
    width: windowHeight * 0.07,
    borderRadius: (windowHeight * 0.07) / 2,
    overflow: 'hidden',
  },
  heading: {
    fontSize: moderateScale(20, 0.6),
    paddingVertical: moderateScale(15, 0.3),
    color: Color.white,
    paddingHorizontal:moderateScale(10,0.6)
  },
  description: {
    fontSize: moderateScale(14, 0.6),
    width: windowWidth * 0.87,
    color: Color.white,
    paddingHorizontal:moderateScale(10,0.6)

  },
  view2: {
    flexDirection: 'row',
    width: windowWidth * 0.89,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: moderateScale(10, 0.3),
  },
  heading1: {
    fontSize: moderateScale(18, 0.6),
    color: Color.white,
    paddingHorizontal:moderateScale(10,0.6)

  },
  userview: {
    flexDirection: 'row',
    marginVertical: moderateScale(10, 0.3),
    paddingHorizontal: moderateScale(10, 0.3),
    width: windowWidth * 0.89,
    borderRadius: moderateScale(10, 0.3),
    paddingVertical: moderateScale(10, 0.3),
    alignItems: 'center',
  },
  imageview: {
    height: windowHeight * 0.09,
    width: windowHeight * 0.09,
    borderRadius: 10,
    overflow: 'hidden',
  },
  usertext: {
    color: Color.white,
    fontSize: moderateScale(13, 0.6),
    paddingRight: moderateScale(10, 0.3),
  },
  reviewheading: {
    fontSize: moderateScale(20, 0.6),
    color: Color.white,
    paddingHorizontal:moderateScale(10,0.6)

  },
  reviewcard: {
    marginHorizontal:moderateScale(15,0.6),
    flexDirection: 'row',
    marginVertical: moderateScale(10, 0.3),
    paddingHorizontal: moderateScale(10, 0.3),
    backgroundColor: Color.white,
    width: windowWidth * 0.89,
    borderRadius: moderateScale(10, 0.3),
    paddingVertical: moderateScale(10, 0.3),
    alignItems: 'center',
  },
  reviewimage: {
    height: windowHeight * 0.08,
    width: windowHeight * 0.08,
    borderRadius: (windowHeight * 0.08) / 2,
    overflow: 'hidden',
  },
  reviewtext: {
    color: Color.black,
    fontSize: moderateScale(13, 0.6),
    paddingRight: moderateScale(10, 0.3),
  },
  moment: {
    color: Color.Grey,
    fontSize: moderateScale(12, 0.6),
    width: windowWidth * 0.75,
  },
  parentview:{
    flexDirection: 'row',
    width: windowWidth,
    justifyContent:'space-between',
    paddingHorizontal:moderateScale(15,0.6),
  } 
});
