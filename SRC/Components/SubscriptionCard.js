import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import {FlatList} from 'native-base';
import {current} from '@reduxjs/toolkit';
import CustomButton from './CustomButton';
import {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import { useSelector } from 'react-redux';
import NoData from './NoData';

const SubscriptionCard = ({
  featuresArray,
  type,
  onPress,
  price,
  currentPlan,
  loader,
}) => {
  // console.log(currentPlan);
  const userRole = useSelector(state => state.commonReducer.selectedRole);


  return (
    <View
      style={[
        styles.container,
        // {backgroundColor: type == 'premium' ? Color.themeColor : Color.white},
      ]}>
      {currentPlan == type && (
        <View
          style={[
            styles.imageContainer,
            {
              position: 'absolute',
              width: 50,
              height: 50,
              right: moderateScale(10, 0.3),
              top: moderateScale(20, 0.3),
            },
          ]}>
          <CustomImage
            resizeMode={'stretch'}
            source={require('../Assets/Images/crown.png')}
            style={{
              alignSelf: 'center',
              width: '100%',
              height: '100%',
            }}
          />
        </View>
      )}
      <View style={styles.headerContainer}>
        <View style={styles.imageContainer}>
          <CustomImage
            resizeMode={'stretch'}
            source={
              type == 'basic'
                ? require('../Assets/Images/bigineer.png')
                : require('../Assets/Images/premiumman.png')
            }
            style={{
              alignSelf: 'center',
              width: '100%',
              height: '100%',
            }}
          />
        </View>
        <View style={styles.textContainer}>
          <CustomText
            style={[
              styles.heading,
              // {color: type == 'premium' ? Color.white : Color.black},
            ]}>
            {type == 'basic' ? 'Starter' : 'Premium'}{' '}
          </CustomText>
          <CustomText
            style={[
              styles.heading,
              // {color: type == 'premium' ? Color.white : Color.black},
            ]}>
            ${price}/
            {
              <CustomText
                style={{
                  fontSize: moderateScale(10, 0.3),
                  // color: type == 'premium' ? Color.white : Color.themeLightGray,
                }}>
                month
              </CustomText>
            }
          </CustomText>
        </View>
      </View>
      <CustomText
        style={[
          styles.mainHeading,
          // {color: type == 'premium' ? Color.white : Color.black},
        ]}>
        Features Included are
      </CustomText>
      <FlatList
        nestedScrollEnabled={true}
        data={featuresArray}
        style={{
          height: '60%',
          width: '80%',
          marginTop: moderateScale(20, 0.3),
        }}
        contentContainerStyle={{
          paddingBottom: moderateScale(20, 0.3),
        }}
        renderItem={({item, index}) => {
          return (
            <View style={styles.featureContainer}>
              <View style={styles.checkedContainer}>
                <CustomImage
                  source={require('../Assets/Images/checked.png')}
                  style={{
                    width: '100%',
                    height: '100%',
                    // tintColor: type == 'premium' ? Color.white : Color.black,
                  }}
                />
              </View>
              <CustomText
                style={[
                  styles.text,
                  // {color: type == 'premium' ? Color.white : Color.black},
                ]}>
                {item}
              </CustomText>
            </View>
          );
        }}
      />
      <CustomButton
        text={
          loader
            ? 'Please Wait'
            : currentPlan == type
            ? 'Subscribed'
            : currentPlan == 'premium'
            ? 'Upgraded to Premium'
            : 'Subscribe'
        }
        isBold
        textColor={Color.white}
        width={windowWidth * 0.75}
        height={windowHeight * 0.06}
        marginTop={moderateScale(20, 0.3)}
        onPress={onPress}
        bgColor={userRole == 'Qbid Member'
        ? Color.blue
        : userRole == 'Qbid Negotiator'
        ? Color.themeColor
        : Color.black}
        // borderColor={Color.white}
        // borderWidth={2}
        borderRadius={moderateScale(30, 0.3)}
        disabled={loader || currentPlan == type || currentPlan == 'premium'}
      />
    </View>
  );
};

export default SubscriptionCard;

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.6,
    backgroundColor: 'white',
    marginTop: moderateScale(20, 0.3),
    borderRadius: moderateScale(10, 0.3),
    padding: moderateScale(10, 0.3),
    marginVertical: moderateScale(10, 0.3),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },

  headerContainer: {
    width: '80%',
    height: '18%',
    marginTop: moderateScale(20, 0.3),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Color.themeLightGray,
    borderStyle: 'dashed',
  },
  imageContainer: {
    width: windowWidth * 0.2,
    height: '80%',
    borderRadius: moderateScale(10, 0.3),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    overflow: 'hidden',
    // alignItems : 'center'
  },
  textContainer: {
    height: '80%',
    // justifyContent : 'flex-start',
    // backgroundColor : 'green',
    width: windowWidth * 0.3,
  },
  heading: {
    fontSize: moderateScale(20, 0.3),
    color: Color.themeBlack,
    fontWeight: 'bold',
  },
  mainHeading: {
    width: '80%',
    marginTop: moderateScale(20, 0.3),
    fontSize: moderateScale(13, 0.3),
    fontWeight: 'bold',
  },
  featureContainer: {
    width: '80%',
    paddingVertical: moderateScale(5, 0.3),
    flexDirection: 'row',
  },
  checkedContainer: {
    width: moderateScale(20, 0.3),
    height: moderateScale(20, 0.3),
    overflow: 'hidden',
  },
  text: {
    marginLeft: moderateScale(10, 0.3),
    fontSize: moderateScale(12, 0.3),
  },
});
