import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import navigationService from '../navigationService';

const JobCard = ({fromSeeAll  ,style}) => {
  return (
    <TouchableOpacity 
    onPress={() => {
      navigationService.navigate('JobDetails')
    }}
    activeOpacity={0.9} style={[styles.joccard,fromSeeAll && {
        width: windowWidth * 0.46,
        height: windowHeight * 0.22,
    },style]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigationN.navigate('MyAccounts');
          }}
          style={{
            width: fromSeeAll ? moderateScale(50, 0.3) :moderateScale(36, 0.3),
            height: fromSeeAll ? moderateScale(50, 0.3) :moderateScale(36, 0.3),
            borderRadius: fromSeeAll ? moderateScale(25, 0.3) :moderateScale(18, 0.3),

            overflow: 'hidden',
          }}>
          <CustomImage
            onPress={() => {
              navigationN.navigate('MyAccounts');
            }}
            source={require('../Assets/Images/man1.jpg')}
            resizeMode={'cover'}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </TouchableOpacity>
        <CustomText
          isBold
          style={{
            fontSize: fromSeeAll ? moderateScale(11,0.6) : moderateScale(9, 0.6),
            marginLeft: moderateScale(5, 0.3),
          }}>
          Auto Parts
        </CustomText>
      </View>
      <CustomText
        numberOfLines={3}
        style={{
          fontSize: fromSeeAll ? moderateScale(9,0.6) : moderateScale(8, 0.6),
          color: '#575757',
          marginTop: moderateScale(5, 0.3),
        }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum
        dolor sit amet, consectetur adipiscing elit
      </CustomText>
      <View
        style={{
          flexDirection: 'row',
          marginTop: moderateScale(10, 0.3),
          justifyContent: 'space-between',
        }}>
        <View>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(9, 0.6),
            }}>
            $19.857.00
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(8, 0.6),
              //  backgroundColor : 'red'
            }}>
            Vendor Qoute
          </CustomText>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginRight: moderateScale(2, 0.3),
          }}>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(9, 0.6),
            }}>
            10%
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(8, 0.6),
              //  backgroundColor : 'red'
            }}>
            Offering
          </CustomText>
        </View>
      </View>
      <CustomButton
            text={'View Details'}
            textColor={Color.white}
            width={fromSeeAll && windowWidth * 0.18}
            height={fromSeeAll && windowHeight * 0.03}
            marginTop={moderateScale(10, 0.3)}
            onPress={() => {
              navigationService.navigate('JobDetails')
            }}
            bgColor={Color.blue}
            // borderColor={Color.white}
            // borderWidth={2}
            borderRadius={moderateScale(30, 0.3)}
            alignSelf={'flex-start'}
            fontSize={fromSeeAll ? moderateScale(8,0.6) : moderateScale(7, 0.6)}
           
          />

    </TouchableOpacity>
  );
};

export default JobCard;

const styles = ScaledSheet.create({
  joccard: {
    marginHorizontal:moderateScale(5,.6),
    width: windowWidth * 0.315,
    height: windowHeight * 0.2,
    borderRadius: moderateScale(10, 0.6),
    backgroundColor: Color.white,
    marginTop: moderateScale(10, 0.3),
    overflow: 'hidden',
    paddingLeft: moderateScale(5, 0.6),
    paddingTop: moderateScale(5, 0.6),
  },
});
