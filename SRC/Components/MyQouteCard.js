import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import RatingComponent from './RatingComponent';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
import Color from '../Assets/Utilities/Color';
import numeral from 'numeral';
import CustomButton from './CustomButton';
import navigationService from '../navigationService';

const MyQouteCard = ({item}) => {
  console.log("🚀 ~ file: MyQouteCard.js:14 ~ MyQouteCard ~ item:", item)

  // const data = item?.bids?.find(item=> item?.status == 'accept')
  // console.log("🚀 ~ file: MyQouteCard.js:17 ~ MyQouteCard ~ data:", data)
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() => {
        navigationService.navigate('JobDetails', {item:item});
      }}>
      <View
        style={{
          position: 'absolute',
          zIndex: 1000,
          width: '17%',
          height: '30%',
          top: moderateScale(10, 0.3),
          //   alignItems : 'center'
          //   borderRadius: moderateScale(10, 0.3),
        }}>
        <CustomText
          style={{
            color: Color.white,
            fontSize: moderateScale(9, 0.3),
            zIndex: 1000,
            position: 'absolute',
            textAlign: 'center',
            top: 6,
            left: 0,
            right: 0,
            bottom: 0,
          }}>
          {item?.status}
        </CustomText>
        <CustomImage
          source={require('../Assets/Images/bedge1.png')}
          resizeMode={'stretch'}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>
      <View
        style={{
          width: '40%',
          height: '100%',
          borderRadius: moderateScale(10, 0.3),
          overflow: 'hidden',
        }}>
        <CustomImage
          source={
            item?.status == 'pending'
              ? {uri: item?.images[0]?.image}
              : item?.negotiatorImage
          }
          style={{
            width: '100%',
            height: '100%',
          }}
          onPress={() => {
            navigationService.navigate('JobDetails', {item:item});
          }}
        />
      </View>
      <View
        style={{
          // alignItems : 'center',
          height: '100%',
          width: '58%',
          // backgroundColor : '#DDDDDD',
          paddingTop: moderateScale(4, 0.3),
        }}>
        <CustomText
          numberOfLines={2}
          isBold
          style={{
            fontSize: moderateScale(14, 0.3),
            width: windowWidth * 0.3,
          }}>
          {item?.title}
        </CustomText>

        <CustomText numberOfLines={1} style={styles.entity} isBold>
          Assigned To :{' '}
          {
            <CustomText
              style={{
                fontSize: moderateScale(12, 0.3),
                color: Color.themeLightGray,
              }}>
              {item?.status == 'pending' ? 'not yet' : item?.bids?.find(item=> item?.status == 'accept')?.fullname}
            </CustomText>
          }
        </CustomText>

        <CustomText numberOfLines={1} style={styles.entity} isBold>
          Vendor Price :{' '}
          {
            <CustomText
              style={{
                fontSize: moderateScale(12, 0.3),
                color: Color.blue,
              }}>
              {numeral(item?.asking_price).format('$0,0a')}
            </CustomText>
          }
        </CustomText>
        <CustomText numberOfLines={1} style={styles.entity} isBold>
          Negotiator Price :{' '}
          {
            <CustomText
              style={{
                fontSize: moderateScale(12, 0.3),
                color: Color.blue,
              }}>
              {item?.status == 'pending'
                ? 'not yet'
                : numeral(item?.quoted_price).format('$0,0a')}
            </CustomText>
          }
        </CustomText>

        {item?.status == 'completed' && item?.rating > 0 && (
          <RatingComponent
            disable={true}
            rating={item?.rating}
            starColor={'#ffa534'}
            starStyle={{
              marginRight: moderateScale(1, 0.3),
              marginTop: moderateScale(1, 0.3),
            }}
            starSize={moderateScale(10, 0.3)}
            // ratingGiven={star}
            // setRatingGiven={setStar}
            style={{
              position: 'absolute',
              top: 5,
              right: moderateScale(5, 0.3),
            }}
          />
        )}

        {item?.status != 'pending' && (
          <CustomButton
            text={
              item?.status == 'onGoing'
                ? 'Complete'
                : item?.status == 'completed' &&
                  [0, undefined].includes(item?.rating)
                ? 'Review'
                : 'Hire Again'
            }
            textColor={Color.white}
            // width={windowWidth * 0.9}
            // height={windowHeight * 0.07}
            marginTop={moderateScale(2, 0.3)}
            onPress={() => {
              alert('This Negotiator will be hired again');
            }}
            bgColor={Color.blue}
            // borderColor={Color.white}
            // borderWidth={2}
            borderRadius={moderateScale(30, 0.3)}
            alignSelf={'flex-end'}
            fontSize={moderateScale(9, 0.3)}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default MyQouteCard;

const styles = StyleSheet.create({
  card: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.15,
    borderRadius: moderateScale(10, 0.3),
    padding: moderateScale(5, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Color.white,
    marginBottom: moderateScale(10, 0.3),
    // overflow : 'hidden'
  },
  entity: {
    fontSize: moderateScale(11, 0.3),
    color: Color.black,
    //  backgroundColor : 'blue',
    width: windowWidth * 0.45,
  },
});
