import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomButton from './CustomButton';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
import Modal from 'react-native-modal';
import {moderateScale} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {mode} from 'native-base/lib/typescript/theme/tools';
import {useSelector} from 'react-redux';
import ReviewModal from './ReviewModal';
import {useIsFocused} from '@react-navigation/native';

const ReviewAskingModal = ({modalVisible, setModalVisible, data}) => {
  const [rbRef, setRbRef] = useState(null);
  const userRole = useSelector(state => state.commonReducer.selectedRole);

  return (
    <Modal
      hasBackdrop={true}
      isVisible={modalVisible}
      onBackdropPress={() => {
        // setModalVisible(false);
      }}>
      <View style={styles.main}>
        <View style={styles.image}>
          <CustomImage
            style={{
              height: '100%',
              width: '100%',
            }}
            source={require('../Assets/Images/party.png')}
          />
        </View>
        <CustomText style={styles.heading}>
          Your opinion helps us improve and provide better service. Please take
          a moment to share your thoughts about your experience with us.
        </CustomText>

        <CustomButton
          textColor={Color.white}
          width={windowWidth * 0.5}
          height={windowHeight * 0.05}
          borderRadius={moderateScale(30, 0.4)}
          text={'review'}
          fontSize={moderateScale(15, 0.3)}
          onPress={() => {
            rbRef.open();
            // setModalVisible(false);
          }}
          isBold
          bgColor={Color.blue}
          marginTop={moderateScale(15, 0.3)}
          marginBottom={moderateScale(5, 0.3)}
        />
      </View>
      <ReviewModal
        setRef={setRbRef}
        item={data}
        rbRef={rbRef}
        setModalVisible={setModalVisible}
        onClose={() => {
          rbRef.close(), setModalVisible(false);
        }}
      />
    </Modal>
  );
};

export default ReviewAskingModal;

const styles = StyleSheet.create({
  main: {
    backgroundColor: Color.white,
    borderRadius: moderateScale(20, 0.3),
    padding: moderateScale(10, 0.6),
    height: windowHeight * 0.35,
    width: windowWidth * 0.8,
    borderWidth: moderateScale(2, 0.6),
    borderColor: Color.blue,
    marginHorizontal: moderateScale(20, 0.6),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.1,
  },
  heading: {
    paddingVertical: moderateScale(5, 0.6),
    color: Color.black,
    fontSize: moderateScale(12, 0.6),
    textAlign: 'center',
  },
});
