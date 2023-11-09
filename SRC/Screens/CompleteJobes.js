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


const CompleteJobes = props => {
  const data1 = props?.route?.params?.item;
  console.log('🚀 ~ file: CompleteJobes.js:42 ~ CompleteJobes ~ data1:', data1);
  const user = useSelector(state => state.commonReducer.userData);
  const UserCoverLetterArray = useSelector(
    state => state.commonReducer.servicesArray,
  );

  const [data, setData] = useState(data1);
  // console.log('🚀 ~ file: JobDetails.js:47 ~ JobDetails ~ data:', data);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const token = useSelector(state => state.authReducer.token);
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bidDone, setBidDone] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [fullName, setFullName] = useState('');
  const [Email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [desc, setDesc] = useState('');
  const isFocused = useIsFocused();
  const [coverletterRole, setCoverLetterRole] = useState('Expertise In');
  const [userData, setUserData] = useState({});
  const [review, setReview] = useState('');

  const dummydata = [
    {
      name: 'john',
      image: require('../Assets/Images/man1.jpg'),
      comment: 'hello every one',
    },
    {
      name: 'john',
      image: require('../Assets/Images/man1.jpg'),
      comment: 'hhfjshdfjhskdfhjkshd',
    },
    {
      name: 'john',
      image: require('../Assets/Images/man1.jpg'),
      comment: 'hello eltjikrejti reauthu ierterhtrtvery one',
    },
  ];

  const imagesSilder = [
    require('../Assets/Images/man1.jpg'),
    require('../Assets/Images/man2.jpg'),
    require('../Assets/Images/man3.jpg'),
    require('../Assets/Images/master.png'),
    require('../Assets/Images/user3.jpg'),
  ];

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
            paddingTop: moderateScale(40, 0.6),
            paddingLeft: moderateScale(15, 0.6),
            // backgroundColor:'red'
          }}>
          <View
            style={
              {
                // alignItems:'center',
                // width:windowWidth*0.2
                // backgroundColor:'red',
                // paddingHorizontal:moderateScale(5,0.3)
              }
            }>
            <SliderBox
              // dotColor="#8080ff"
              // paginationBoxVerticalPadding={20}
              autoplay={true}
              autoplayInterval={1000}
              images={imagesSilder}
              sliderBoxHeight={230}
              parentWidth={360}
            />
            <CustomText
              style={{
                fontSize: moderateScale(20, 0.6),
                paddingVertical: moderateScale(20, 0.3),
                color: Color.white,
              }}
              isBold>
              Bid name
            </CustomText>
            <View
              style={{
                flexDirection: 'row',
                width: windowWidth,
              }}>
              <View style={styles.views}>
                <CustomText style={styles.viewText} isBold>
                  price
                </CustomText>
                <CustomText style={styles.viewText} isBold>
                  $50
                </CustomText>
              </View>
              <View
                style={[
                  styles.views,
                  {
                    marginHorizontal: moderateScale(30, 0.3),
                    width: windowWidth * 0.28,
                  },
                ]}>
                <CustomText
                  style={[
                    styles.viewText,
                    {
                      paddingHorizontal: 0,
                    },
                  ]}
                  isBold>
                  vendor quote
                </CustomText>
                <CustomText style={styles.viewText} isBold>
                  4
                </CustomText>
              </View>
              <View style={styles.views}>
                <CustomText style={styles.viewText} isBold>
                  offering
                  {/* {item?.description} */}
                </CustomText>
                <CustomText style={styles.viewText} isBold>
                  10%
                </CustomText>
              </View>
            </View>
            <CustomText
              style={{
                fontSize: moderateScale(20, 0.6),
                paddingVertical: moderateScale(15, 0.3),
                color: Color.white,
              }}
              isBold>
              descrpition
            </CustomText>
            <CustomText
              numberOfLines={4}
              style={{
                fontSize: moderateScale(14, 0.6),
                //  paddingVertical: moderateScale(20, 0.3),
                width: windowWidth * 0.87,
                color: Color.white,
              }}>
              descrpitioqwhgety
            </CustomText>
            <View
              style={{
                flexDirection: 'row',
                width: windowWidth * 0.89,
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: moderateScale(10, 0.3),
              }}>
              <CustomText
                style={{
                  fontSize: moderateScale(18, 0.6),
                  color: Color.white,
                }}
                isBold>
                earning from this project
              </CustomText>
              <CustomText
                style={{
                  fontSize: moderateScale(18, 0.6),
                  color: Color.white,
                }}
                isBold>
                $90
              </CustomText>
            </View>
            <View>
              <CustomText
                style={{
                  fontSize: moderateScale(20, 0.6),
                  color: Color.white,
                }}
                isBold>
                Review
              </CustomText>
              <FlatList
          data={dummydata}
          horizontal
          pagingEnabled
          renderItem={({item, index}) => {}
        }
          />
              <View
                    style={{
                      flexDirection: 'row',
                      marginVertical: moderateScale(10, 0.3),
                      paddingHorizontal: moderateScale(10, 0.3),
                      backgroundColor:Color.white,
                      width:windowWidth*0.89,
                      borderRadius:moderateScale(10,0.3),
                      // paddingHorizontal:moderateScale(15,0.3),
                      paddingVertical:moderateScale(10,0.3),
                      alignItems:'center',  
                    }}>
                    <View
                      style={{
                        height: windowHeight * 0.08,
                        width: windowHeight * 0.08,
                        borderRadius: (windowHeight * 0.08) / 2,
                        overflow: 'hidden',
                      }}>
                      <CustomImage
                        style={{
                          height: '100%',
                          width: '100%',
                        }}
                        source={require('../Assets/Images/man1.jpg')}
                      />
                    </View>
                    <View
                      style={{
                        paddingHorizontal: moderateScale(10, 0.3),
                        // paddingVertical: moderateScale(5, 0.3),
                      }}> 
                      <View style={{
                        flexDirection:'row',
                        alignItems:'center'
                      }}>
                        <CustomText
                              isBold
                              style={{
                                color: Color.black,
                                fontSize: moderateScale(13, 0.6),
                                textTransform: 'uppercase',
                                paddingRight:moderateScale(10,0.3)
                              }}>
                              name
                            </CustomText>
                            <Icon name='star' as={FontAwesome} color={'black'} size={15}/>
                      </View>
                      <CustomText
                        style={{
                          color: Color.black,
                          fontSize: moderateScale(12, 0.6),
                          width: windowWidth * 0.75,
                          // paddingVertical:moderateScale(5,0.3)
                        }}>
                       text
                      </CustomText>
                      <CustomText
                        style={{
                          color: Color.Grey,
                          fontSize: moderateScale(12, 0.6),
                          width: windowWidth * 0.75,
                        }}>
                        {moment().format('MMM Do, YYYY')}
                      </CustomText>
                    </View>
                  </View>

            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default CompleteJobes;

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
    // backgroundColor : 'red',
    justifyContent: 'space-between',
  },
  views: {
    height: windowHeight * 0.12,
    width: windowWidth * 0.23,
    // padding:10,
    backgroundColor: Color.white,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewText: {
    fontSize: moderateScale(13, 0.6),
    paddingHorizontal: moderateScale(10, 0.3),
    paddingVertical: moderateScale(5, 0.3),
    color: Color.black,
    // backgroundColor:'red',
    // textAlign:'c0enter'
  },
  imageConatiner: {
    height: windowHeight * 0.07,
    width: windowHeight * 0.07,
    borderRadius: (windowHeight * 0.07) / 2,
    overflow: 'hidden',
  },
});
