import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { windowHeight, windowWidth } from '../Utillity/utils'
import CustomImage from './CustomImage'
import CustomText from './CustomText'
import CustomButton from './CustomButton'
import { moderateScale } from 'react-native-size-matters'

const VendorCards = ({item}) => {
  return (
    <View style={{
        height:windowHeight*0.28,
        backgroundColor:'#fff',
        width:windowHeight*0.23,
        borderRadius:20,
        marginHorizontal:10
    }}>
        <View style={{ 
            height:windowWidth*0.3,
            width:windowWidth*0.46,
            borderTopRightRadius:20,
            borderTopLeftRadius:20,
            overflow:'hidden'
        }}>
            <CustomImage 
            source={item?.image}
            style={{
                height:'100%',
                width:'100%',
            overflow:'hidden'

            }}/>
        </View>
      <CustomText style={styles.title} isBold> 
        {item?.title}
        </CustomText>
      <CustomText style={styles.subtitle}>{item?.subtitle}</CustomText>
      <CustomButton    
      text={'ViewDetails'}
      textColor={Color.white}
      width={windowWidth * 0.25}
      height={windowHeight * 0.04}
      marginTop={moderateScale(10, 0.3)}
      marginBottom={moderateScale(10, 0.3)}
      bgColor={Color.blue}
      borderRadius={moderateScale(30, 0.3)}
      fontSize={moderateScale(11, 0.6)}

      />

    </View>
  )
}

export default VendorCards

const styles = StyleSheet.create({
    title:{
        fontSize:15,
        textAlign:'center',
        paddingTop:10
      },
    subtitle:{
        fontSize:12,
        paddingHorizontal:10,
       textAlign:'center',
     }
})