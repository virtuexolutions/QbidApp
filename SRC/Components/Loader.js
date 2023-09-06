import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { useSelector } from "react-redux";
import Color from "../Assets/Utilities/Color";
import CustomText from "./CustomText";

const Loader = (props) => {
  // const reduxTextObject = useSelector((state) => state.langViewReducer.data);
  const { bgColor, textColor, height, width, text, size } = props;
  return (
    <View
      style={[
        styles.container,
        bgColor && {
          backgroundColor: bgColor,
        },
        height && {
          height: height,
          position: "relative",
        },
        width && {
          width: width,
        },
      ]}
    >
      <ActivityIndicator
        size={size}
        color={textColor ? textColor : Color.green}
      />
      {text && (
        <CustomText
          style={[
            styles.text,
            bgColor && {
              color: Color.black,
            },
            textColor && {
              color: textColor,
            },
          ]}
          isBold
        >
          Please Wait
        </CustomText>
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  text: {
    fontSize: moderateScale(17, 0.3),
    marginTop: moderateScale(5, 0.3),
    color: Color.white,
  },
});

export default Loader;
