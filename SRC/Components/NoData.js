import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native'
import { windowHeight, windowWidth } from '../Utillity/utils';

const NoData = ({textStyle, style, text}) => {
  return (
    <View
      style={style}>
      <Lottie
        source={require('../Assets/Images/animation3.json')}
        autoPlay
        loop
      />
      <Text style={styles.nodata}>{text ? text : 'Data not found'}</Text>
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({ 
    nodata:{
    color: Color.white,
    fontWeight:'500',
    fontSize:18,
    position:'absolute',
    bottom:0,

  }});
