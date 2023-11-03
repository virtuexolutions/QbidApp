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
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VendorCards = ({item}) => {
  const navigation =useNavigation()
  console.log('🚀 ~ file: VendorCards.js:16 ~ VendorCards ~ item:', item);

  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector(state => state.authReducer.token);
  console.log('🚀 ~ file: VendorCards.js:15 ~ VendorCards ~ token:', token);

  return (
    <TouchableOpacity
    onPress={()=> navigation.navigate('NegotiatorPortfolio' ,  {fromSearch :true , item:item})}
      style={{
        height: windowHeight * 0.24,
        backgroundColor: '#fff',
        width: windowWidth * 0.39,
        borderRadius: 20,
        marginHorizontal: 10,
      }}>
      <View
        style={{
          height: windowHeight * 0.13,
          width: windowWidth * 0.39,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          overflow: 'hidden',
        }}>
        <CustomImage
          source={item?.photo}
          style={{
            height: '100%',
            width: '100%',
            overflow: 'hidden',
          }}
        />
      </View>
      <CustomText style={styles.title} isBold>
        {item?.first_name}
      </CustomText>
      <CustomText style={styles.decription} isBold>
        {item?.email}
      </CustomText>
      <View
        style={{
          // paddingHorizontal:20,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          // paddingTop:2,
          // backgroundColor:'red'
        }}>
        <Icon name="star" as={AntDesign} size={13} color="black" />
        <CustomText
          style={{
            fontSize: moderateScale(13),
          }}>
          3/5
        </CustomText>
      </View>
      <CustomText numberOfLines={2} style={styles.decription}>
        {item?.description}
      </CustomText>
      {/* <CustomButton    
      text={'ViewDetails'}
      textColor={Color.white}
      width={windowWidth * 0.2}
      height={windowHeight * 0.03}
      marginTop={moderateScale(10, 0.3)}
      marginBottom={moderateScale(10, 0.3)}
      bgColor={Color.blue}
      borderRadius={moderateScale(30, 0.3)}
      fontSize={moderateScale(11, 0.6)}

      /> */}
    </TouchableOpacity>
  );
};

export default VendorCards;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 10,
    width:windowWidth*0.37
  },
  decription: {
    fontSize: 12,
    paddingHorizontal: 15,
    // paddingVertical: 5,
    textAlign: 'center',
    width: windowWidth * 0.37,
    color: Color.darkGray,
  },
});
