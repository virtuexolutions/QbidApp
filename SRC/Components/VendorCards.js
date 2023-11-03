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
  console.log("🚀 ~ file: VendorCards.js:18 ~ VendorCards ~ item:", item)
  const navigation =useNavigation()
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector(state => state.authReducer.token);

  return (
    <TouchableOpacity
    onPress={()=> navigation.navigate('NegotiatorPortfolio' ,  {fromSearch :true , item:item})}
      style={styles.mainContainer}>
      <View
        style={styles.imageConatiner}>
        <CustomImage
          source={{uri:item?.photo}}
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
        style={styles.view1}>
        <Icon name="star" as={AntDesign} size={13} color="black" />
        <CustomText
          style={{
            fontSize: moderateScale(13),
          }}>
         {`${item?.rating ? item?.rating : 0 }/5`}
        </CustomText>
      </View>
      {/* <CustomText numberOfLines={2} style={styles.decription}>
        {item?.description}
      </CustomText> */}
      
    </TouchableOpacity>
  );
};

export default VendorCards;

const styles = StyleSheet.create({
  mainContainer:{
    height: windowHeight * 0.24,
    backgroundColor: '#fff',
    width: windowWidth * 0.39,
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical:moderateScale(5,.3),
  },
  imageConatiner:{
    height: windowHeight * 0.13,
    width: windowWidth * 0.39,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    overflow: 'hidden',
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 10,
    width:windowWidth*0.37
  },
  decription: {
    fontSize: 10,
    paddingHorizontal: 15,
    // paddingVertical: 5,
    textAlign: 'center',
    width: windowWidth * 0.37,
    color: Color.darkGray,
  },
  view1:{
    // paddingHorizontal:20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // paddingTop:2,
    // backgroundColor:'red'
  }
});
