import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { windowHeight, windowWidth } from '../Utillity/utils';
import { moderateScale } from 'react-native-size-matters';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import navigationService from '../navigationService';
import AskingModal from '../Components/AskingModal';
import { useNavigation } from '@react-navigation/native';

const HelpCard = ({ item }) => {
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableOpacity style={styles.card}>
        <View
          style={{
            position: 'absolute',
            zIndex: 1000,
            width: '37%',
            height: '23%',
            top: moderateScale(5, 0.3),
          }}>
          <CustomText
            style={{
              color: Color.white,
              fontSize: moderateScale(9, 0.3),
              zIndex: 1000,
              position: 'absolute',
              textAlign: 'center',
              top: 6,
              left: 0,
              right: 0,
              bottom: 0,
            }}>
            {item?.status}
          </CustomText>
          <CustomImage
            source={require('../Assets/Images/bedge1.png')}
            resizeMode={'stretch'}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
        <View style={styles.cardimage}>
          <CustomImage
            onPress={() => {
              item?.status == 'accepted' &&
                navigation.navigate('NegotiatorPortfolio', { item: item?.negotiator_info, fromSearch: true })
            }}
            style={{
              height: '100%',
              width: '100%',
            }}
            source={
              item?.user_info?.photo
                ? { uri: item?.user_info?.photo }
                : require('../Assets/Images/dummyman2.png')
            }
          />
        </View>
        <CustomButton
          isBold
          text={'view Details'}
          textColor={Color.white}
          onPress={() => {
            navigationService.navigate('CreateNewHelp', { item: item })
            // if (item?.title != null) {
            // } else {
            //   item?.status == 'accepted' &&
            //     setModalVisible(true);
            // }
          }}
          bgColor={Color.blue}
          width={windowWidth * 0.5}
          height={windowHeight * 0.052}
          borderRadius={moderateScale(30, 0.3)}
          fontSize={moderateScale(13, 0.3)}
        />
      </TouchableOpacity>
      <AskingModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        item={item}
      />
    </>
  );
};

export default HelpCard;

const styles = StyleSheet.create({
  card: {
    height: windowHeight * 0.17,
    width: windowWidth * 0.35,
    backgroundColor: 'white',
    marginVertical: moderateScale(10, 0.3),
    marginHorizontal: moderateScale(10, 0.6),
    overflow: 'hidden',
    borderRadius: moderateScale(10, 0.6),
  },
  cardimage: {
    height: '70%',
    overflow: 'hidden',
  },
});
