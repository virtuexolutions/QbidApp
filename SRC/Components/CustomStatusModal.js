import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import CustomText from './CustomText';
import Color from '../Assets/Utilities/Color';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';

const CustomStatusModal = ({
  isModalVisible,
  setModalVisible,
  statusArray,
  setData,
  data,
}) => {
  // console.log(
  //   '🚀 ~ file: CustomStatusModal.js:10 ~ CustomStatusModal ~ statusArray',
  //   statusArray,
  // );
  return (
    <Modal
      isVisible={isModalVisible}
      hasBackdrop={true}
      onBackdropPress={() => {
        setModalVisible(false);
      }}
    //   animationIn={'fadeIn'}
    //   animationOut={'fadeOut'}
    //   animationInTiming={700}
    //   animationOutTiming={700}
      backdropOpacity={0.7}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <View style={{
            height : windowHeight * 0.3,
            // maxHeight : windowHeight * 0.5,
            paddingVertical : moderateScale(5,0.3)
        }}>

        
      <ScrollView
        style={styles.statusModal}
        contentContainerStyle={{
          paddingTop: moderateScale(15, 0.3),
        }}>
        {statusArray &&
          statusArray.map((item, index) => {
            return (
              <CustomText
              key={index}
                onPress={() => {
                  setData(item?.name);
                  setModalVisible(false);
                }}
                style={{
                  borderBottomWidth:
                    index + 1 == statusArray.length ? 0 : moderateScale(1),
                  borderColor: Color.themeLightGray,
                  // width: windowWidth * 0.,
                  lineHeight: moderateScale(35, 0.3),
                //   marginTop: moderateScale(10, 0.3),
                  textAlign: 'center',
                  paddingBottom: moderateScale(5, 0.3),
                  backgroundColor : data == item?.name ? Color.themeColor : 'transparent'
                }}>
                {item?.name}
              </CustomText>
            );
          })}
      </ScrollView>
      </View>
    </Modal>
  );
};

export default CustomStatusModal;

const styles = ScaledSheet.create({
  statusModal: {
    alignSelf: 'center',
    height : windowHeight * 0.5,
    width: windowWidth * 0.9,
    // paddingHorizontal: moderateScale(10, 0.3),
    backgroundColor: Color.white,
    borderRadius: moderateScale(5, 0.3),
    marginTop: moderateScale(60, 0.3),
    // borderWidth: 1,
    borderColor: Color.green,
  },
});
