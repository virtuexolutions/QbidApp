import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import CustomText from './CustomText';
import Color from '../Assets/Utilities/Color';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {useState} from 'react';

const CustomStatusModal1 = ({
  isModalVisible,
  setModalVisible,
  statusArray,
  setData,
  text,
  data,
}) => {
  const Data = ['TECH', 'BANKING', 'FASHION', 'CONSTRUCTION'];
  const Data1 = ['REMOTE', '401K', 'PAID VACATIONS', 'PET FRIENDLY'];
  const [categoryindex, setCategoryIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);

  const BENEFITS = item => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(selected => selected !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <Modal
      isVisible={isModalVisible}
      hasBackdrop={true}
      onBackdropPress={() => {
        setModalVisible(false);
      }}
      backdropOpacity={0.7}
      style={{
        alignSelf: 'center',
      }}>
      <View
        style={{
          width: windowWidth * 0.95,
          height: windowHeight * 0.5,
          backgroundColor: Color.white,
        }}>
        <View
          style={{
            width: '100%',
            paddingVertical: moderateScale(10, 0.6),
            backgroundColor: Color.themeColor,
            justifyContent: 'center',
          }}>
          <CustomText
            style={{
              fontSize: moderateScale(17, 0.6),
              width: windowWidth * 0.5,
              paddingLeft: moderateScale(10, 0.6),
            }}>
            FIELD CATEGORY
          </CustomText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: windowWidth * 0.95,
            paddingLeft: moderateScale(10, 0.6),
            marginTop: moderateScale(20, 0.3),
          }}>
          {Data.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setCategoryIndex(index);
                }}
                style={{
                  //   width: windowWidth * 0.2,
                  flexBasis: '27%',
                  marginRight: moderateScale(15, 0.3),
                  paddingVertical: moderateScale(12, 0.6),
                  marginBottom: moderateScale(10, 0.3),
                  borderWidth: moderateScale(1, 0.3),
                  borderColor: Color.veryLightGray,
                  borderRadius: moderateScale(5, 0.3),
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:
                    categoryindex == index ? '#000' : 'transparent',
                }}>
                <CustomText
                  style={{
                    fontSize: moderateScale(12, 0.6),
                    color: categoryindex == index ? '#fff' : '#000',
                  }}>
                  {item}
                </CustomText>
              </TouchableOpacity>
            );
          })}
        </View>

        <View
          style={{
            width: '100%',
            paddingVertical: moderateScale(10, 0.6),
            backgroundColor: Color.themeColor,
            justifyContent: 'center',
            marginTop: moderateScale(20, 0.3),
          }}>
          <CustomText
            style={{
              fontSize: moderateScale(17, 0.6),
              width: windowWidth * 0.5,
              paddingLeft: moderateScale(10, 0.6),
            }}>
            BENEFITS
          </CustomText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: windowWidth * 0.95,
            paddingLeft: moderateScale(10, 0.6),
            marginTop: moderateScale(20, 0.3),
          }}>
          {Data1.map((item, index) => {
            const isSelected = selectedItems.includes(item);
            return (
              <TouchableOpacity
                onPress={() => {
                  BENEFITS(item);
                }}
                style={[styles.item, isSelected && styles.selectedItem]}>
                <CustomText
                  style={[styles.itemText, isSelected && styles.selectedItemText]}>
                  {item}
                </CustomText>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Modal>
  );
};

export default CustomStatusModal1;

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

  item: {
    flexBasis: '27%',
    marginRight: moderateScale(15, 0.3),
    paddingVertical: moderateScale(12, 0.6),
    marginBottom: moderateScale(10, 0.3),
    borderWidth: moderateScale(1, 0.3),
    borderColor: Color.veryLightGray,
    borderRadius: moderateScale(5, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemText: {
    fontSize: moderateScale(10, 0.6),
  },
  selectedItem: {
    backgroundColor: 'black', 
  },
  selectedItemText: {
    color: 'white', 
  },
});
