import React, {useState} from 'react';
import {View, Image, ScrollView} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import Constants from '../Assets/Utilities/Constants';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import moment from 'moment';
import RatingComponent from './RatingComponent';
import {useSelector} from 'react-redux';
import CustomButton from './CustomButton';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {ActivityIndicator} from 'react-native';

const BidderDetail = ({item, photo, title, date, message}) => {
  // console.log('🚀 ~ file: BidderDetail.js:16 ~ BidderDetail ~ item:', item);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const token = useSelector(state => state.authReducer.token);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View
      style={[
        styles.container,
        userRole == 'Qbid Member'
          ? {
              borderColor: Color.lightGrey,
              backgroundColor: 'transparent',
            }
          : {
              borderColor: Color.lightGrey,
              backgroundColor: 'transparent',
            },
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={item?.image} style={styles.image} />
        <View style={{marginLeft: moderateScale(10, 0.3)}}>
          <CustomText
            noOfLines={2}
            style={[
              Constants.h4,
              {
                width: windowWidth * 0.5,
                color: Color.black,
                fontWeight: 'bold',
              },
              userRole == 'Qbid Member'
                ? {
                    borderColor: Color.black,
                  }
                : {
                    borderColor: Color.lightGrey,
                  },
            ]}>
            {item?.name}
          </CustomText>
          <RatingComponent
            disable={true}
            rating={item?.rating}
            starColor={'#ffa534'}
            starStyle={{
              marginRight: moderateScale(1, 0.3),
              marginTop: moderateScale(1, 0.3),
            }}
            starSize={moderateScale(9, 0.3)}
            // ratingGiven={star}
            // setRatingGiven={setStar}
          />
        </View>
      </View>
      <CustomText
        numberOfLines={4}
        style={[
          {
            fontSize: moderateScale(11, 0.6),
            marginTop: moderateScale(10, 0.3),
            width: '100%',
            color: Color.white,
          },
        ]}>
        {item?.description}
      </CustomText>
      <View
        style={{
          position: 'absolute',
          right: moderateScale(40, 0.6),
          top: moderateScale(10, 0.3),
          flexDirection:'row',
          alignItems:'center'
        }}>
        <View
          style={{
            width: moderateScale(6, 0.6),
            height: moderateScale(6, 0.6),
            borderRadius: moderateScale(3, 0.6),
            backgroundColor:
              userRole == 'Qbid Member'
                ? Color.blue
                : userRole == 'Qbid Negotiator'
                ? Color.themeColor
                : Color.black,
          }}
        />
        <CustomText
          style={{
            // backgroundColor: 'orange',
            fontSize: moderateScale(8, 0.6),
            color: Color.white,
            marginLeft: moderateScale(3, 0.3),
          }}>
          {item?.status == 'accept'
            ? 'Accepted'
            : item?.status == 'reject'
            ? 'Rejected'
            : 'pending'}
        </CustomText>
      </View>   
    </View>
  );
};
const styles = ScaledSheet.create({
  container: {
    width: windowWidth * 0.91,
    // height: windowHeight * 0.3,
    // marginTop: moderateScale(20, 0.3),
    marginRight: moderateScale(10, 0.3),
    borderWidth: 1,
    borderColor: Color.lightGrey,
    backgroundColor: Color.themeColor,
    borderRadius: moderateScale(5, 0.3),
    padding: moderateScale(10, 0.3),
    marginVertical: moderateScale(5, 0.6),
    // paddingHorizontal: moderateScale(15, 0.3),
    // marginBottom: moderateScale(20, 0.3),
  },
  image: {
    width: windowWidth * 0.11,
    height: windowWidth * 0.11,

    borderRadius: moderateScale((windowWidth * 0.11) / 2, 0.3),
  },
});

export default BidderDetail;
