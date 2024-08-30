import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import { windowHeight, windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import ScreenBoiler from '../Components/ScreenBoiler'
import CustomText from '../Components/CustomText'
import { ScrollView } from 'native-base'

const QbidDetails = (props) => {
  const data = props?.route?.params?.data;
  return (
    <ScreenBoiler
    statusBarBackgroundColor={Color.themeColor}
    statusBarContentStyle={'dark-content'}
    showHeader={true}
    showBack={true}
    >
     <ScrollView
     showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={{
        
      }}
      >
       <CustomText style={styles.header}>Qbid Details</CustomText>
 
      
       
      </ScrollView>
 
    </ScreenBoiler>
  )
}

export default QbidDetails

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