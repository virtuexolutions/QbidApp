import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
import { windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import navigationService from '../navigationService';

const AcceptedHelpRequestCard = ({ item }) => {
  console.log(item, 'iteeeeeeeeeeeeeeeeeeem')
  return (
    <TouchableOpacity style={styles.container} onPress={() => item?.title != null ? navigationService.navigate('HelpDetails', { data: item }) : null}>
      <View style={styles.imageContainer}>
        <CustomImage
          style={{
            width: '100%',
            height: '100%',
          }}
          source={{ uri: item?.user_info?.photo }}
        />
      </View>
      <View style={styles.rowContainer}>
        <CustomText style={styles.text}>name :</CustomText>
        <CustomText
          numberOfLines={1}
          style={[
            styles.text,
            {
              paddingHorizontal: moderateScale(10, 0.6),
              width: windowWidth * 0.28,
            },
          ]}>
          {item?.user_info?.first_name}
        </CustomText>
      </View>
      <View style={styles.rowContainer}>
        <CustomText style={styles.text}>help bid :</CustomText>
        <CustomText
          numberOfLines={1}
          style={[
            styles.text,
            {
              paddingHorizontal: moderateScale(10, 0.6),
              width: windowWidth * 0.28,
            },
          ]}>
          {item?.service_preference}
        </CustomText>
      </View>
      <View style={styles.rowContainer}>
        <CustomText style={styles.text}>Status :</CustomText>
        <CustomText isBold
          numberOfLines={1}
          style={[
            styles.text,
            {
              paddingHorizontal: moderateScale(7, 0.6),
              width: windowWidth * 0.28,
              color: item?.title != null ? '#03a300' : Color.veryLightGray
            },
          ]}>
          {item?.title != null ? "details added" : 'AWAITING DETAILS'}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

export default AcceptedHelpRequestCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    height: windowHeight * 0.17,
    width: windowWidth * 0.4,
    marginHorizontal: moderateScale(5, 3),
    borderRadius: moderateScale(10, 6),
    overflow: 'hidden',
  },
  imageContainer: {
    height: windowHeight * 0.11,
    width: windowWidth * 0.4,
  },
  rowContainer: {
    flexDirection: 'row',
    // backgroundColor :'red',
    width: '100%',
    paddingHorizontal: moderateScale(10, 0.6),
  },
  text: {
    fontSize: moderateScale(11, 0.6),
  },
});
