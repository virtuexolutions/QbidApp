import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {windowHeight, windowWidth} from '../Utillity/utils';
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

const Detailcards = ({title, data, iconName, iconType , marginTop , containerStyle , textColor}) => {
    const userRole = useSelector(state => state.commonReducer.selectedRole);
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // justifyContent : 'space-between',
          width: windowWidth * 0.4,
          marginTop: marginTop,
          //  backgroundColor : 'green',
          //  marginLeft : moderateScale(10,0.3)
        }}>
        <View
          style={[{
            width: windowWidth * 0.1,
            height: windowWidth * 0.1,
            borderRadius: windowWidth * 0.05,
            backgroundColor: Color.white,
            justifyContent: 'center',
            alignItems: 'center',
          },containerStyle]}>
          <Icon
            name={iconName}
            as={iconType}
            size={moderateScale(15, 0.6)}
            color={userRole == 'Qbid Member' ?  Color.blue : Color.themeColor}
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          />
        </View>
        <View style={{marginLeft: moderateScale(6, 0.6)}}>
          <CustomText
            isBold
            style={{fontSize: moderateScale(11, 0.6), color: textColor ? textColor : Color.white}}>
            {title}
          </CustomText>
          <CustomText
            style={{fontSize: moderateScale(9, 0.6), color: textColor ? textColor : Color.white}}>
            {data}
          </CustomText>
        </View>
      </View>
    );
  };
  export default Detailcards ;