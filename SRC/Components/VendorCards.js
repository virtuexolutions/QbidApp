import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import {moderateScale} from 'react-native-size-matters';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import {useEffect} from 'react';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const VendorCards = ({item}) => {
  console.log(
    '🚀 ~ file: VendorCards.js:18 ~ VendorCards ~ item:',
    item?.user_info,
  );
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector(state => state.authReducer.token);
  const [expertise, setexpertise] = useState(
    item?.expertise
      ? JSON.parse(item?.expertise)
      : item?.user_info?.expertise
      ? JSON.parse(item?.user_info?.expertise)
      : [],
  );

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('NegotiatorPortfolio', {
          fromSearch: true,
          item: item,
        })
      }
      style={styles.mainContainer}>
      <View style={styles.imageConatiner}>
        <CustomImage
          onPress={() =>
            navigation.navigate('NegotiatorPortfolio', {
              fromSearch: true,
              item:item,
            })
          }
          source={{uri: item?.photo ? item?.photo : item?.user_info?.photo}}
          style={{
            height: '100%',
            width: '100%',
            overflow: 'hidden',
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: moderateScale(5, 0.3),
        }}>
        <CustomText style={styles.title} numberOfLines={1} isBold>
          {item?.first_name}
        </CustomText>
        <View style={styles.view1}>
          <Icon
            name="star"
            as={AntDesign}
            size={13}
            color={
              '#CD7F32'
              // item?.average_rating <= 3
              //   ? '#CD7F32'
              //   : item?.average_rating <= 3.5
              //   ? '#C0C0C0'
              //   : item?.average_rating <= 4
              //   ? '#FF9529'
              //   : '#e5e4e2'
            }
          />
          <CustomText
            style={{
              fontSize: moderateScale(13),
            }}>
            {`${
              item?.average_rating ? Math.round(item?.average_rating, 2) : 0
            }/5`}
          </CustomText>
        </View>
      </View>
      <CustomText style={styles.decription} isBold>
        {item?.company_name}
      </CustomText>
      {expertise.slice(0, 2).map((item, index) => {
        return (
          <CustomText style={styles.decription} isBold>
            {item}
          </CustomText>
        );
      })}
    </TouchableOpacity>
  );
};

export default VendorCards;

const styles = StyleSheet.create({
  mainContainer: {
    height: windowHeight * 0.24,
    backgroundColor: '#fff',
    width: windowWidth * 0.39,
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: moderateScale(7, 0.3),
  },
  imageConatiner: {
    height: windowHeight * 0.13,
    width: windowWidth * 0.39,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    overflow: 'hidden',
  },
  title: {
    // backgroundColor:'red',
    width: windowWidth * 0.22,
    fontSize: 14,
    paddingHorizontal: moderateScale(5, 0.3),
  },
  decription: {
    fontSize: 12,
    textAlign: 'center',
    width: windowWidth * 0.39,
    color: Color.darkGray,
  },
  view1: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
