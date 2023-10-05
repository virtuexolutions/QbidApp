import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import navigationService from '../navigationService';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';

const JobCard = ({fromSeeAll, style, onPress}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const userRole = useSelector(state => state.commonReducer.selectedRole);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          onPress ? onPress() : setModalVisible(!modalVisible);
        }}
        activeOpacity={0.9}
        style={[
          styles.joccard,
          fromSeeAll && {
            width: windowWidth * 0.46,
            height: windowHeight * 0.22,
          },
          style,
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigationService.navigate('MyAccounts');
            }}
            style={{
              width: fromSeeAll
                ? moderateScale(50, 0.3)
                : moderateScale(36, 0.3),
              height: fromSeeAll
                ? moderateScale(50, 0.3)
                : moderateScale(36, 0.3),
              borderRadius: fromSeeAll
                ? moderateScale(25, 0.3)
                : moderateScale(18, 0.3),

              overflow: 'hidden',
            }}>
            <CustomImage
              onPress={() => {
                navigationService.navigate('MyAccounts');
              }}
              source={require('../Assets/Images/man1.jpg')}
              resizeMode={'cover'}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </TouchableOpacity>
          <CustomText
            isBold
            style={{
              fontSize: fromSeeAll
                ? moderateScale(11, 0.6)
                : moderateScale(9, 0.6),
              marginLeft: moderateScale(5, 0.3),
            }}>
            Auto Parts
          </CustomText>
        </View>
        <CustomText
          numberOfLines={3}
          style={{
            fontSize: fromSeeAll
              ? moderateScale(9, 0.6)
              : moderateScale(8, 0.6),
            color: '#575757',
            marginTop: moderateScale(5, 0.3),
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum
          dolor sit amet, consectetur adipiscing elit
        </CustomText>
        <View
          style={{
            flexDirection: 'row',
            marginTop: moderateScale(10, 0.3),
            justifyContent: 'space-between',
          }}>
          <View>
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(9, 0.6),
              }}>
              $19.857.00
            </CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(8, 0.6),
                //  backgroundColor : 'red'
              }}>
              Vendor Qoute
            </CustomText>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginRight: moderateScale(2, 0.3),
            }}>
            <CustomText
              isBold
              style={{
                fontSize: moderateScale(9, 0.6),
              }}>
              10%
            </CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(8, 0.6),
                //  backgroundColor : 'red'
              }}>
              Offering
            </CustomText>
          </View>
        </View>
        <CustomButton
          text={'View Details'}
          textColor={Color.white}
          width={fromSeeAll && windowWidth * 0.18}
          height={fromSeeAll && windowHeight * 0.03}
          marginTop={moderateScale(10, 0.3)}
          onPress={() => {
            // navigationService.navigate('JobDetails')
          }}
          bgColor={ userRole == 'Qbid Member'
          ? Color.blue
          : userRole == 'Qbid Negotiator'
          ? Color.themeColor
          : Color.black}
          // borderColor={Color.white}
          // borderWidth={2}
          borderRadius={moderateScale(30, 0.3)}
          alignSelf={'flex-start'}
          fontSize={fromSeeAll ? moderateScale(8, 0.6) : moderateScale(7, 0.6)}
        />
      </TouchableOpacity>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
        }}>
        <View
          style={{
            width: windowWidth * 0.75,
            paddingVertical: moderateScale(20, 0.6),
            alignSelf:'center',
            // height: windowHeight * 0.35,
            borderRadius: moderateScale(15, 0.3),
            backgroundColor: Color.white,
            borderWidth: 2,
            borderColor: Color.blue,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
          }}>
          <View
            style={{
              width: windowWidth * 0.2,
              height: windowWidth * 0.2,
              borderRadius: (windowWidth * 0.2) / 2,
              borderWidth: 2,
              borderColor: Color.blue,
              overflow: 'hidden',
            }}>
            <CustomImage
              source={require('../Assets/Images/Avatar2.jpg')}
              resizeMode="cover"
              style={{
                height: '100%',
                width: '100%',
              }}
            />
          </View>

          <CustomText
            style={{
              width: windowWidth * 0.9,
              textAlign: 'center',
              marginTop: moderateScale(10, 0.3),
              color: Color.black,
              fontSize:moderateScale(14, 0.3),
            }}>
            Are you Sure You want to Help.?
          </CustomText>

          <View
            style={{
              width: windowWidth * 0.6,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: moderateScale(10, 0.3),
              marginBottom: moderateScale(10, 0.3),
            }}>
            <CustomButton
              isBold
              text={'Accept'}
              textColor={Color.white}
              width={windowWidth * 0.25}
              height={windowHeight * 0.04}
              marginTop={moderateScale(10, 0.3)}
              bgColor={Color.themeColor}
              borderRadius={moderateScale(30, 0.3)}
              fontSize={moderateScale(11, 0.6)}
              onPress={() => {
                setModalVisible(false);
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
                setModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default JobCard;

const styles = ScaledSheet.create({
  joccard: {
    marginHorizontal: moderateScale(5, 0.6),
    width: windowWidth * 0.315,
    height: windowHeight * 0.2,
    borderRadius: moderateScale(10, 0.6),
    backgroundColor: Color.white,
    marginTop: moderateScale(10, 0.3),
    overflow: 'hidden',
    paddingLeft: moderateScale(5, 0.6),
    paddingTop: moderateScale(5, 0.6),
  },
});
