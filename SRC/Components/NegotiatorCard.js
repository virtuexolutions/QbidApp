import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { windowHeight, windowWidth } from '../Utillity/utils'
import { moderateScale } from 'react-native-size-matters'
import Color from '../Assets/Utilities/Color'
import CustomImage from './CustomImage'
import CustomText from './CustomText'
import RatingComponent from './RatingComponent'
import { TouchableOpacity } from 'react-native'
import navigationService from '../navigationService'

const NegotiatorCard = ({item , containerStyle , fromSeeAll}) => {
    // const [star ,setStar] = useState(0);
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={()=>{navigationService.navigate('NegotiatorPortfolio')}} style={[styles.card,containerStyle]}>
        <View style={{
        width : '100%', height : '60%'
    }}>

    <CustomImage 
    source={item?.image}
    style={{
        width : '100%', height : '100%'
    }}
    onPress={()=>{navigationService.navigate('NegotiatorPortfolio')}}
    />
    </View>
    <View style={{
        alignItems : 'center',
        width : '100%',
        paddingTop : moderateScale(4,0.3),
    }}>
        <CustomText isBold style={{
            fontSize : fromSeeAll ? moderateScale(12,0.3) : moderateScale(10,0.3) ,
        }}>{item?.name}</CustomText>
            <RatingComponent 
            disable={true}
            rating={item?.rating}
            starColor= {'#ffa534'}
            starStyle={{
                marginRight : moderateScale(1,0.3),
                marginTop : moderateScale(1,0.3)
            }}
            starSize={fromSeeAll ? moderateScale(11,0.3) : moderateScale(9,0.3)}
            // ratingGiven={star}
            // setRatingGiven={setStar}
            />

            <CustomText numberOfLines={2} style={[styles.expertise,{width : '80%' , textAlign : 'center'}]}>{item?.expertiseIn.length > 1 ? `${item?.expertiseIn[0]} , ${item?.expertiseIn[1]} , ${item?.expertiseIn[2]} ...` : `${item?.expertiseIn[0]}`  }</CustomText>

        
       
    </View>
            <View style={styles.viewDetail}>
                <CustomText isBold style={styles.expertise}>View Details</CustomText>
            </View>
  
    </TouchableOpacity>
  )
}

export default NegotiatorCard

const styles = StyleSheet.create({
    card :{ 
        width : windowWidth * 0.315 ,
        marginRight : moderateScale(7,0.3),
        height : windowHeight * 0.21 ,
        borderRadius : moderateScale(10,0.3),backgroundColor : Color.white,
        marginTop : moderateScale(10,0.3),
        overflow : 'hidden'
    },
    expertise :{
        fontSize : moderateScale(9,0.3),
        color : Color.themeLightGray,
        // textAlign : 'center'
    },
    viewDetail:{position : 'absolute' , bottom : 0 , right : 5 }
})