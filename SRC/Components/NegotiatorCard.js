import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import navigationService from '../navigationService';
import CustomButton from './CustomButton';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';

const NegotiatorCard = ({item, fromSeeAll}) => {
  const [isLoading, setIsLoading] = useState(false);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  console.log('Proposal', item);
  return (
    <>
      <View
        style={{
          width: fromSeeAll ? windowWidth * 0.46 : windowWidth * 0.5,
          // height: windowHeight * 0.25,
          paddingVertical:moderateScale(10,0.6),
          backgroundColor: Color.blue,
          margin: moderateScale(5, 0.3),
          borderRadius: moderateScale(15, 0.3),
        }}>
        <View style={{padding: moderateScale(15, 0.6)}}>
          <CustomText
            numberOfLines={1}
            isBold
            style={{
              color: Color.white,
              fontSize: moderateScale(17, 0.6),
            }}>
            {item?.name}
          </CustomText>
          <CustomText
            numberOfLines={1}
            isBold
            style={{
              color: Color.white,
              fontSize: moderateScale(12, 0.6),
            }}>
            {item?.Title}
          </CustomText>
          <CustomText
            numberOfLines={5}
            isBold
            style={{
              color: Color.white,
              fontSize: moderateScale(9, 0.6),
              // lineHeight: moderateScale(14, 0.3),
            }}>
            {item?.desc}
          </CustomText>

          <CustomButton
            text={
              isLoading ? (
                <ActivityIndicator color={'#FFFFFF'} size={'small'} />
              ) : (
                'View Details'
              )
            }
            textColor={Color.blue}
            isBold
            width={windowWidth * 0.24}
            height={windowHeight * 0.05}
            marginTop={moderateScale(10, 0.3)}
            onPress={() => {
              // setBidDone(true);
              toggleModal();
            }}
            bgColor={Color.white}
            borderRadius={moderateScale(30, 0.3)}
            fontSize={moderateScale(9, 0.6)}
            alignSelf={'flex-start'}
          />
        </View>
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          setIsModalVisible(false);
        }}>
        <View
          style={{
            width: windowWidth * 0.9,
            paddingVertical: moderateScale(15, 0.6),
            // height: windowHeight * 0.55,
            borderRadius: moderateScale(15, 0.3),
            backgroundColor: Color.white,
            borderWidth: 2,
            borderColor: Color.themeColor,
            alignItems: 'center', 
          }}>
          <View
            style={{
              width: windowWidth * 0.22,
              height: windowWidth * 0.22,
              borderRadius: (windowWidth * 0.22) / 2,
              overflow: 'hidden',
              borderWidth: 2,
              borderColor: Color.themeColor,
            }}>
            <CustomImage
              source={require('../Assets/Images/man2.jpg')}
              style={{
                width: '100%',
                height: '100%',
              }}
              // resizeMode="cover"
            />
          </View>

          <CustomText
            style={{
              width: windowWidth * 0.9,
              textAlign: 'center',
              paddingHorizontal: moderateScale(30, 0.6),
              marginTop: moderateScale(20, 0.3),
              fontSize: moderateScale(15, 0.6),
              color: Color.black,
            }}>
            Charles Berge
          </CustomText>
          <CustomText
            style={{
              width: windowWidth * 0.9,
              textAlign: 'center',
              paddingHorizontal: moderateScale(30, 0.6),
              marginTop: moderateScale(10, 0.3),
              fontSize: moderateScale(13, 0.6),
              color: Color.black,
            }}>
            Charlesberge45@gmail.com
          </CustomText>
          <CustomText
            style={{
              width: windowWidth * 0.9,
              textAlign: 'center',
              paddingHorizontal: moderateScale(30, 0.6),
              marginTop: moderateScale(10, 0.3),
              fontSize: moderateScale(13, 0.6),
              color: Color.black,
            }}>
            +321742,122,921
          </CustomText>

          <CustomText
            style={{
              width: windowWidth * 0.9,
              textAlign: 'center',
              paddingHorizontal: moderateScale(30, 0.6),
              marginTop: moderateScale(10, 0.3),
              fontSize: moderateScale(13, 0.6),
              color: Color.black,
            }}>
            Expertise In Auto repair
          </CustomText>

          <CustomText
            numberOfLines={3}
            style={{
              width: windowWidth * 0.9,
              textAlign: 'center',
              paddingHorizontal: moderateScale(30, 0.6),
              marginTop: moderateScale(10, 0.3),
              fontSize: moderateScale(13, 0.6),
              color: Color.veryLightGray,
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum
            dolor sit amet, consectetur adipiscing elit
          </CustomText>

          <View
            style={{
              width:windowWidth*0.6,
              flexDirection: 'row',
              justifyContent:'space-evenly'
            }}>
            <CustomButton
              isBold
              text={'Approve'}
              textColor={Color.white}
              width={windowWidth * 0.25}
              height={windowHeight * 0.04}
              marginTop={moderateScale(10, 0.3)}
              bgColor={Color.blue}
              borderRadius={moderateScale(30, 0.3)}
              fontSize={moderateScale(11, 0.6)}
              onPress={() => {
                toggleModal();
              }}
            />
            <CustomButton
              isBold
              text={'Deciline'}
              textColor={Color.white}
              width={windowWidth * 0.25}
              height={windowHeight * 0.04}
              marginTop={moderateScale(10, 0.3)}
              bgColor={Color.red}
              borderRadius={moderateScale(30, 0.3)}
              fontSize={moderateScale(11, 0.6)}
              onPress={() => {
                toggleModal();
              }}
            
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default NegotiatorCard;
