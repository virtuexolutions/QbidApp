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
import CustomImage from './CustomImage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DropDownSingleSelect from './DropDownSingleSelect';
import {Post} from '../Axios/AxiosInterceptorFunction';
// import { platform } from 'os';

const HelpModal = ({modalVisible, setModalVisible}) => {
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);

  // console.log('🚀 ~ HelpModal ~ userData:', userData);
  const servicesArray = useSelector(state => state.commonReducer.servicesArray);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedService, setSelectedService] = useState('');
  // console.log('🚀 ~ selectedService==========:)', selectedService);

  const help = async () => {
    const url = 'auth/member/quote_help';
    const body = {
      // user_id: userData?.id,
      service_preference: selectedService,
    };
    // console.log("🚀 ~ help ~ body:", body)
  
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      // console.log('🚀 ~ help ~ response:', response?.data);
      Platform.OS == 'android'
        ? ToastAndroid.show(
            'help request send successfully',
            ToastAndroid.SHORT,
          )
        : alert('Help Request Send successfully');
      setSelectedService('');
      setModalVisible(false);
    
    }
  };

  return (
    <Modal
      hasBackdrop={true}
      // style={{
      //   justifyContent: 'center',
      //   alignItems: 'center',
      // }}
      isVisible={modalVisible}
      onBackdropPress={() => {
        setModalVisible(false);
      }}>
      <View style={styles.main}>
        <View style={styles.image}>
          <CustomImage
            style={{
              height: '100%',
              width: '100%',
            }}
            source={require('../Assets/Images/help.png')}
          />
        </View>
        <CustomText style={styles.heading} isBold>
          how can i help you
        </CustomText>

        <DropDownSingleSelect
          array={servicesArray.filter(x => x?.name)}
          item={selectedService}
          setItem={setSelectedService}
          placeholder={'Service preference'}
          width={windowWidth * 0.7}
          dropDownHeight={windowHeight * 0.06}
          dropdownStyle={{
            borderWidth: moderateScale(1, 0.6),
            width: windowWidth * 0.7,
            borderRadius: moderateScale(15, 0.6),
            marginTop: moderateScale(15, 0.3),
          }}
        />

        <CustomButton
          textColor={Color.white}
          width={windowWidth * 0.5}
          height={windowHeight * 0.05}
          borderRadius={moderateScale(30, 0.4)}
          text={'help'}
          fontSize={moderateScale(15, 0.3)}
          onPress={() => {
            help();
          }}
          isBold
          bgColor={Color.blue}
          marginTop={moderateScale(15, 0.3)}
          marginBottom={moderateScale(5, 0.3)}
        />
      </View>
    </Modal>
  );
};

export default HelpModal;

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
    height: windowHeight * 0.1,
    width: windowWidth * 0.2,
  },
  heading: {
    color: Color.blue,
    fontSize: moderateScale(22, 0.6),
  },
});
