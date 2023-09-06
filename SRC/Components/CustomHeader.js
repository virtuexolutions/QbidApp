import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';
import { Icon } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import navigationService from '../navigationService';
import { useNavigation } from '@react-navigation/native';
import { setUserLogOut } from '../Store/slices/common';
import { useDispatch } from 'react-redux';
import { setUserLogoutAuth } from '../Store/slices/auth';


const CustomHeader = ({leftIcon, RightIcon, text , style }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation();

 
  return (
    <View style={[styles.header,style && style]}>
        {leftIcon &&
        <Icon
        name='left'
        as={AntDesign}
        size={moderateScale(20,0.3)}
        color={Color.themePink}
        style={{
            position : 'absolute',
            left : moderateScale(10,0.3),
        }}
        onPress={()=>{
          navigation.goBack()
      }}
      />
      
    }
      <CustomText style={styles.text}>{text}</CustomText>
     
     {RightIcon &&
      <Icon
        name='log-out'
        as={Entypo}
        size={moderateScale(20,0.3)}
        color={Color.themePink}
        style={{
            position : 'absolute',
            right : moderateScale(10,0.3),
        }}
        onPress={()=>{
         dispatch(setUserLogOut())
         dispatch(setUserLogoutAuth())

        }}
        />
    }
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    marginTop : windowHeight * 0.1,
    width: windowWidth * 0.9,
    height: windowHeight * 0.1,
    borderRadius: moderateScale(10, 0.3),
    justifyContent : 'center',
    backgroundColor : Color.white,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    
    elevation: 17,
    alignSelf : 'center'
  },
  text : {
    color: Color.themeColor,
    fontSize : moderateScale(15,0.6),
    alignSelf : 'center',
    fontWeight : 'bold',
  },
});
