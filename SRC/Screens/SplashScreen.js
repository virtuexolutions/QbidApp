import React from "react";
import { ImageBackground, View } from "react-native";
import * as Animatable from "react-native-animatable";
import Color from "../Assets/Utilities/Color";
import CustomText from "../Components/CustomText";
import CustomImage from "../Components/CustomImage";
import { windowHeight, windowWidth } from "../Utillity/utils";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import ScreenBoiler from "../Components/ScreenBoiler";

const SplashScreen = () => {
  const backgroundImage = require("../Assets/Images/logoSplash.png");
  return (
    <ScreenBoiler
     
      statusBarBackgroundColor={Color.themeColor}
      statusBarContentStyle={"light-content"}
    >
 <ImageBackground
        style={{
          flex: 1,
          justifyContent : 'center',
          alignItems : 'center',
          // width: windowWidth,
          // height: windowHeight,
         
        }}
        resizeMode={'stretch'}
        source={require('../Assets/Images/backgroundImage.png')}>
     
        <Animatable.View
          animation="zoomInUp"
          duration={2500}
          useNativeDriver
          style={[styles?.textContainer]}
        
          
        >
          <CustomImage
            source={backgroundImage}
            resizeMode={"contain"}
            style={[styles.bottomImage]}
          />
        </Animatable.View>
    </ImageBackground>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    height: windowHeight,
    width: windowWidth,
    backgroundColor : Color.themeColor
  },
  bottomImage: {
    width : windowWidth * 0.65
  },
  textContainer: {
    flexDirection: "row",
    alignSelf :'center',
    width : windowWidth * 0.5,
    height :windowWidth * 0.5,
    borderRadius : moderateScale(windowWidth* 0.7 / 2 , 0.3),
    justifyContent : 'center',
    alignItems : 'center',
    // backgroundColor : Color.white,
    

  },
  LogoText: {
    fontSize: moderateScale(35, 0.3),
    fontWeight: "bold",
  },
 
});

export default SplashScreen;
