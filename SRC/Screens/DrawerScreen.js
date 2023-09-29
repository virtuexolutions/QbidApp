import {
  BackHandler,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import Color from '../Assets/Utilities/Color';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import {Actionsheet, Icon} from 'native-base';
import navigationService from '../navigationService';
import CustomImage from '../Components/CustomImage';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomButton from '../Components/CustomButton';
import LinearGradient from 'react-native-linear-gradient';


const DrawerScreen = () => {
    const [selectedtext,setSelectedText] = useState(false)

  const data = [
    {
      id: 1,
      name: 'Home',
      onPress: () => {},
    },
    {
      id: 2,
      name: 'Chat',
      onPress: () => {},
    },
    {
      id: 3,
      name: 'Notifications',
      onPress: () => {},
    },
    {
      id: 4,
      name: 'Qbid Details',
      onPress: () => {},
    },
    {
      id: 5,
      name: 'Member Ship',
      onPress: () => {},
    },
    {
      id: 6,
      name: 'Mileage Ring',
      onPress: () => {},
    },
    {
      id: 7,
      name: 'Negotiator',
      onPress: () => {},
    },
    {
      id: 8,
      name: 'Setting',
      onPress: () => {},
    },
  ];
  return (
    <LinearGradient
      start={{x: 0, y: 1}}
      end={{x: 0, y: 0}}
      colors={['#f3f8ec', '#d9efba', '#dcf6cd', '#e0f5c8']}
      style={{
        marginTop: moderateScale(15, 0.3),
        justifyContent: 'center',
        borderRadius: moderateScale(20, 0.3),
        alignSelf: 'center',
        width: windowWidth * 0.9,
        height: windowHeight * 0.95,
        backgroundColor: '#d9efba',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}>
      {data.map((item, index) => (
        <TouchableOpacity
          onPress={item?.onPress}
          activeOpacity={0.8}
          style={{
            width: windowWidth * 0.6,
            borderBottomWidth: item == data[data.length -1] ? 0 : 0.5,
            borderColor: Color.themeColor,
            margin: moderateScale(5, 0.3),
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <CustomText
           isBold
            style={{
              width: windowWidth * 0.5,
              fontSize: moderateScale(15, 0.6) ,
              color: Color.black,
              textAlign: 'center',
              paddingVertical: moderateScale(10, 0.6),
            }}>
            {item?.name}
          </CustomText>
        </TouchableOpacity>
      ))}
    </LinearGradient>
  );
};

export default DrawerScreen;

const styles = StyleSheet.create({});
