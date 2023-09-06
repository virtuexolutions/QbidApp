import React, { useState } from "react";
import { View, Image, ScrollView } from "react-native";
import { ScaledSheet, moderateScale } from "react-native-size-matters";
import CustomText from "../Components/CustomText";
import Constants from "../Assets/Utilities/Constants";
import { windowHeight, windowWidth } from "../Utillity/utils";
import Color from "../Assets/Utilities/Color";
import moment from "moment";
import RatingComponent from "./RatingComponent";

const ReviewCard = ({ item ,photo, title, date, message }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={item?.image}
          style={styles.image}
        />
        <View style={{ marginLeft: moderateScale(10, 0.3) }}>
          <CustomText
            noOfLines={2}
            style={[
              Constants.h4,
              {
                width: windowWidth * 0.5,
                color: Color.black,
                fontWeight: "bold",
              },
            ]}
          >
            {item?.name}
          </CustomText>
          <RatingComponent 
            disable={true}
            rating={item?.rating}
            starColor= {'#ffa534'}
            starStyle={{
                marginRight : moderateScale(1,0.3),
                marginTop : moderateScale(1,0.3)
            }}
            starSize={moderateScale(9,0.3)}
            // ratingGiven={star}
            // setRatingGiven={setStar}
            />

        
        </View>
      </View>
      <CustomText
        numberOfLines={4}
        style={[
          {
            marginTop: moderateScale(10, 0.3),
            width: "80%",
            
            color: Color.themeBlack,
          },
        ]}
      >
        {item?.description}
      </CustomText>
      <CustomText noOfLines={1} style={{
        marginTop : moderateScale(10,0.3),
        // position : 'absolute',
        // right : 0,
        // bottom : 0
        width : '100%',
        textAlign : 'right'
      }}>
            {moment().format('ll')}
          </CustomText>
    </View>
  );
};
const styles = ScaledSheet.create({
  container: {
    width: windowWidth * 0.87,
    // height: windowHeight * 0.3,
    // marginTop: moderateScale(20, 0.3),
    marginRight: moderateScale(10, 0.3),
    borderBottomWidth: 1,
    borderColor: Color.lightGrey,
    // backgroundColor: Color.green,
    borderRadius: moderateScale(10, 0.3),
    paddingTop: moderateScale(20, 0.3),
    // paddingHorizontal: moderateScale(15, 0.3),
    marginBottom: moderateScale(20, 0.3),
   
  },
  image: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,

    borderRadius: moderateScale((windowWidth * 0.1) / 2, 0.3),
  },
});

export default ReviewCard;
