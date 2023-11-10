import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FlatList} from 'native-base';
import CustomText from './CustomText';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Modal from 'react-native-modal';

const ListModal = ({
  title,
  listArray,
  isModalVisible,
  setIsModalVisible,
  data,
  setData,
}) => {
  return (
    <Modal
      hasBackdrop={true}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      isVisible={isModalVisible}
      onBackdropPress={() => {
        setIsModalVisible(false);
      }}>
      <View
        style={{
          overflow: 'hidden',
          borderRadius: moderateScale(5, 0.3),
          width: windowWidth * 0.7,
          backgroundColor: 'white',
          alignItems: 'center',
          paddingBottom : moderateScale(10,0.3)
        }}>
        <View style={styles.header}>
          <CustomText style={styles.headerText}>{title}</CustomText>
        </View>
        <FlatList
          bounces={false}
          style={{
            width: '100%',
          }}
          data={listArray}
          renderItem={({item, index}) => {
            return (
              <CustomText
                onPress={() => {
                  setData(item);
                  setIsModalVisible(false)
                }}
                style={[
                  styles.listData,
                  data == item && {backgroundColor: Color.themePink},
                ]}>
                {item}
              </CustomText>
            );
          }}
        />
      </View>
    </Modal>
  );
};

export default ListModal;

const styles = StyleSheet.create({
  headerText: {
    color: Color.white,
    fontSize: moderateScale(17, 0.3),
    fontWeight: 'bold',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: windowHeight * 0.06,
    backgroundColor: Color.themeColor,
    borderBottomLeftRadius: moderateScale(10, 0.3),
    borderBottomRightRadius: moderateScale(10, 0.3),
  },
  listData: {
    height : windowHeight * 0.05,
    borderBottomWidth: 1,
    borderColor: Color.themeLightGray,
    fontSize: moderateScale(15, 0.3),
    color: Color.black,
    fontWeight: '700',
    width: '100%',
    textAlign: 'center',
  },
});
