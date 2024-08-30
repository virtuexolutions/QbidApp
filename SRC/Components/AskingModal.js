import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  OS,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import navigationService from '../navigationService';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useNavigation} from '@react-navigation/native';

const AskingModal = ({modalVisible, setModalVisible, item}) => {
  const token = useSelector(state => state.authReducer.token);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const helpQuoteWithdraw = async () => {
    const url = 'auth/member/quote_withdraw';
    const body = {
      quote_id: item?.id,
    };
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show('Bid Withdrawing sucessfully', ToastAndroid.SHORT)
        : alert('Bid Withdrawing sucessfully');
      setModalVisible(false);
      navigation.navigate('CreateNew');
    }
  };

  return (
    <Modal
      hasBackdrop={true}
      isVisible={modalVisible}
      onBackdropPress={() => {
        setModalVisible(false);
      }}>
      <View style={styles.main}>
        <View
          style={{
            width: '100%',
            height: windowHeight * 0.065,
            backgroundColor: Color.blue,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CustomText style={styles.heading} isBold>
            Add details here
          </CustomText>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            width: '85%',
            height: '60%',
          }}>
          <CustomButton
            textColor={Color.white}
            width={windowWidth * 0.3}
            height={windowHeight * 0.06}
            borderRadius={moderateScale(10, 0.4)}
            text={'add details'}
            fontSize={moderateScale(15, 0.3)}
            onPress={() => {
              item?.title == null &&
                navigationService.navigate('CreateNewHelp', {
                  item: item,
                });
            }}
            isBold
            marginHorizontal={moderateScale(10, 0.6)}
            bgColor={Color.green}
            marginTop={moderateScale(15, 0.3)}
            marginBottom={moderateScale(5, 0.3)}
          />

          <CustomButton
            textColor={Color.white}
            width={windowWidth * 0.3}
            height={windowHeight * 0.06}
            borderRadius={moderateScale(10, 0.4)}
            text={'withdraw'}
            fontSize={moderateScale(15, 0.3)}
            onPress={() => {
              helpQuoteWithdraw();
            }}
            isBold
            bgColor={Color.red}
            marginTop={moderateScale(15, 0.3)}
            marginBottom={moderateScale(5, 0.3)}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AskingModal;

const styles = StyleSheet.create({
  main: {
    backgroundColor: Color.white,
    borderRadius: moderateScale(20, 0.3),
    height: windowHeight * 0.2,
    width: windowWidth * 0.8,
    borderWidth: moderateScale(2, 0.6),
    borderColor: Color.blue,
    marginHorizontal: moderateScale(20, 0.6),
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    height: windowHeight * 0.1,
    width: windowWidth * 0.2,
  },
  heading: {
    color: Color.white,
    fontSize: moderateScale(22, 0.6),
  },
});
