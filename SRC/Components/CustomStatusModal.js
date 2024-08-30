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
  text,
  data,
}) => {
  return (
    <Modal
      isVisible={isModalVisible}
      hasBackdrop={true}
      onBackdropPress={() => {
        setModalVisible(false);
      }}
      backdropOpacity={0.7}
      style={
        {
          // alignItems: 'center',
          // justifyContent: 'center',
        }
      }>
      <View
        style={
          {
            // paddingVertical:moderateScale(20,0.6),
            // maxHeight : windowHeight * 0.5,
            // paddingVertical: moderateScale(10, 0.3),
          }
        }>
        <ScrollView
          style={styles.statusModal}
          contentContainerStyle={
            {
              // paddingTop: moderateScale(15, 0.3),
            }
          }>
          <View
            style={{
              backgroundColor: Color.themeColor,
              paddingVertical: moderateScale(10, 0.6),
              borderTopLeftRadius: moderateScale(5, 0.6),
              borderTopRightRadius: moderateScale(5, 0.6),
            }}>
            <CustomText
              style={{
                fontSize: moderateScale(15, 0.6),
                textAlign: 'center',

                color: 'white',
              }}>
              {text}
            </CustomText>
          </View>
          {statusArray &&
            statusArray.map((item, index) => {
              return (
                <CustomText
                  key={index}
                  onPress={() => {
                    if (item?.name == 'All') {
                      setData('');
                      setModalVisible(false);
                    } else {
                      setData(item?.name);
                      setModalVisible(false);
                    }
                  }}
                  style={{
                    borderBottomWidth:
                      index + 1 == statusArray.length ? 0 : moderateScale(1),
                    borderColor: Color.themeLightGray,
                    // width: windowWidth * 0.,
                    lineHeight: moderateScale(40, 0.3),
                    // marginTop: moderateScale(10, 0.3),
                    textAlign: 'center',
                    paddingBottom: moderateScale(5, 0.3),
                    // backgroundColor: 'transparent',
                    // backgroundColor: item?.name == data  ? Color.blue : 'white',
                    color: (item?.name == data || (item?.name=='All'&& data=='')) ? Color.blue : 'black',
                  }}
                  isBold={(item?.name == data || (item?.name=='All'&& data=='')) ? true : false}>
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
    // height : windowHeight * 0.5,
    width: windowWidth * 0.9,
    // paddingHorizontal: moderateScale(10, 0.3),
    backgroundColor: Color.white,
    borderRadius: moderateScale(5, 0.3),
    overflow: 'hidden',
    // marginTop: moderateScale(60, 0.3),
    // borderWidth: 1,
    borderColor: Color.themeBlack,
  },
});
