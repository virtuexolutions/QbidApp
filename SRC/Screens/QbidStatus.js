import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import ScreenBoiler from '../Components/ScreenBoiler';
import CustomText from '../Components/CustomText';
import { windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';

const QbidStatus = (props) => {
    const data = props?.route?.params?.data;
  return (
    <ScreenBoiler
    statusBarBackgroundColor={Color.themeColor}
    statusBarContentStyle={'dark-content'}
    showHeader={true}
    showBack={true}
    >
     <View
      style={styles.container}
      >
       <CustomText style={styles.header}>Qbid Status</CustomText>
 
       <FlatList
       data={data}
       showsVerticalScrollIndicator ={false}
       contentContainerStyle={{
         paddingTop : moderateScale(20,0.3),
         paddingBottom : moderateScale(50,0.3),
 
       }}
       renderItem={({item , index})=>{
         return(
         <View
         style={[styles.textContainer,{borderColor : item?.status != 'completed' ?  Color.themeLightGray : Color.lightGreen}]}
         >
            <CustomText style={styles.text}>{item?.title}</CustomText>
         </View>
         )
       }}
       />
       
      </View>
 
    </ScreenBoiler>
  )
}

export default QbidStatus

const styles = ScaledSheet.create({
    container : {
        height : windowHeight * 0.9,
        width : windowWidth,
        backgroundColor : Color.themeColor,
        alignItems : 'center',
      },
      header : {
        color : Color.black,
        fontSize : moderateScale(25,0.3),
        fontWeight : 'bold' 
      },
      textContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingHorizontal : moderateScale(15,0.3),
        width : windowWidth * 0.9,
        height : windowHeight * 0.075,
        borderRadius : moderateScale(30,0.3),
        backgroundColor : '#F8FFEE',
        alignItems : 'center',
        marginTop : moderateScale(10,0.3),
        borderWidth : 2
      },
      text : {
        fontSize : moderateScale(11,0.3),
        color : Color.black
      },    
})