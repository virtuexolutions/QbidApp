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
import {Post} from '../Axios/AxiosInterceptorFunction';
import {ActivityIndicator} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const NegotiatorCard = ({item, fromSeeAll}) => {
  console.log('🚀 ~ file: NegotiatorCard.js:16 ~ NegotiatorCard ~ item:', item);
  const token = useSelector(state => state.authReducer.token);
  // console.log("🚀 ~ file: NegotiatorCard.js:18 ~ NegotiatorCard ~ token:", token)
  const [isLoading, setIsLoading] = useState(false);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contactButton, setContactButton] = useState(false);

  const approveRequest = async status => {
    const url = '';
    setIsLoading(true);
    const response = await Post(url, {status: status}, apiHeader(token));
    setIsLoading(false);

    if (response != undefined) {
      // console.log("🚀 ~ file: HomeScreen.js:85 ~ approveRequest ~ response:", response?.data)
      toggleModal();
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // console.log('Proposal', item);
  return (
    <>
      <View
        style={{
          width: fromSeeAll ? windowWidth * 0.46 : windowWidth * 0.5,
          // height: windowHeight * 0.25,
          paddingVertical: moderateScale(10, 0.6),
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
            {item?.bid_name}
          </CustomText>
          <CustomText
            numberOfLines={1}
            isBold
            style={{
              color: Color.white,
              fontSize: moderateScale(12, 0.6),
            }}>
            {item?.service_type}
          </CustomText>
          <CustomText
            numberOfLines={5}
            isBold
            style={{
              color: Color.white,
              fontSize: moderateScale(9, 0.6),
              // lineHeight: moderateScale(14, 0.3),
            }}>
            {item?.description}
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
            // height:
            //   item == item?.negotiator_info
            //     ? windowHeight * 0.45
            //     : windowHeight * 0.27,
            width: windowWidth * 0.9,
            paddingVertical: moderateScale(15, 0.6),
            // height: windowHeight * 0.55,
            borderRadius: moderateScale(15, 0.3),
            backgroundColor: Color.white,
            borderWidth: 2,
            borderColor: Color.themeColor,
            // alignItems: 'center',
          }}>
          <View
            style={{
              width: windowWidth * 0.22,
              height: windowWidth * 0.22,
              borderRadius: (windowWidth * 0.22) / 2,
              overflow: 'hidden',
              borderWidth: 2,
              borderColor: Color.themeColor,
              marginHorizontal: moderateScale(15, 0.6),
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
          <View
            style={{
              flexDirection: 'row',
              width: windowWidth * 0.9,
              paddingHorizontal: moderateScale(25, 0.6),
              // backgroundColor: 'red',
            }}>
            <CustomText
              style={{
                width: windowWidth * 0.45,
                // textAlign: 'center',
                paddingHorizontal: moderateScale(10, 0.6),
                marginTop: moderateScale(10, 0.3),
                fontSize: moderateScale(14, 0.6),
                color: Color.black,
              }}>
              {item?.bid_name}
            </CustomText>
            <CustomText
              style={{
                width: windowWidth * 0.6,
                marginTop: moderateScale(10, 0.3),
                fontSize: moderateScale(13, 0.6),
                color: Color.black,
              }}>
              {item?.service_type}
            </CustomText>
          </View>

          <CustomText
            // numberOfLines={2}
            style={{
              width: windowWidth * 0.9,
              textAlign: 'center',
              paddingHorizontal: moderateScale(30, 0.6),
              marginTop: moderateScale(10, 0.3),
              fontSize: moderateScale(13, 0.6),
              color: Color.veryLightGray,
              paddingVertical: moderateScale(10, 0.6),
            }}>
            {item?.description}
          </CustomText>

          {item?.negotiator_info && (
            <>
              <View
                style={{
                  borderColor: Color.themeColor,
                  borderTopWidth: 2,
                  flexDirection: 'row',
                  width: windowWidth * 0.85,
                  justifyContent: 'space-between',
                  // paddingHorizontal:20
                }}>
                <View
                  style={{
                    width: windowWidth * 0.15,
                    height: windowWidth * 0.15,
                    borderRadius: (windowWidth * 0.15) / 2,
                    overflow: 'hidden',
                    borderWidth: 2,
                    borderColor: Color.themeColor,
                    marginHorizontal: moderateScale(15, 0.6),
                    marginTop: moderateScale(10, 0.6),
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

                <View
                  style={{
                    width: windowWidth * 0.4,
                    // backgroundColor: 'red',
                  }}>
                  <CustomText
                    style={{
                      width: windowWidth * 0.2,
                      // textAlign: 'center',
                      // paddingHorizontal: moderateScale(30, 0.6),
                      marginTop: moderateScale(10, 0.3),
                      fontSize: moderateScale(13, 0.6),
                      color: Color.black,
                    }}>
                    {item?.negotiator_info?.first_name}
                  </CustomText>
                  <CustomText
                    style={{
                      width: windowWidth * 0.9,
                      marginTop: moderateScale(10, 0.3),
                      fontSize: moderateScale(13, 0.6),
                      color: Color.black,
                    }}>
                    {item?.negotiator_info?.email}
                  </CustomText>
                  <CustomText
                    style={{
                      width: windowWidth * 0.9,
                      
                      marginTop: moderateScale(10, 0.3),
                      fontSize: moderateScale(13, 0.6),
                      paddingBottom: moderateScale(40, 0.6),
                      color: Color.black,
                    }}>
                    {item?.negotiator_info?.phone}
                  </CustomText>
                </View>
                <View
                  style={{
                    backgroundColor: 'green',
                  }}>
                  <CustomButton
                    text={'Edit'}
                    textColor={Color.white}
                    iconName={'message1'}
                    iconType={AntDesign}
                    width={windowWidth * 0.28}
                    height={windowHeight * 0.035}
                    fontSize={moderateScale(10, 0.6)}
                    marginTop={moderateScale(4, 0.3)}
                    bgColor={Color.themeBlue}
                    borderRadius={moderateScale(20, 0.3)}
                    iconStyle={{
                      fontSize: moderateScale(19, 0.6),
                      // backgroundColor: 'blue',
                      // height: windowHeight * 0.07,
                      // color: 'white',
                    }}
                    marginRight={moderateScale(5, 0.3)}
                    isBold
                  />
                </View>
              </View>
              {/* <View
                style={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                }}>
                <CustomButton
                //  iconName={}
                //  iconType={}
                //  iconStyle={}
                  text={'contact negotiator'}
                  textColor={Color.white}
                  width={windowWidth * 0.35}
                  height={windowHeight * 0.05}
                  marginTop={moderateScale(5, 0.3)}
                  // onPress={() => }
                  bgColor={Color.blue}
                  borderRadius={moderateScale(30, 0.3)}
                  fontSize={moderateScale(12, 0.3)}
                />
              </View> */}
            </>
          )}

          {/* <View
            style={{
              width:windowWidth*0.6,
              flexDirection: 'row',
              justifyContent:'space-evenly'
            }}>
            <CustomButton
              isBold
              text={isLoading ? <ActivityIndicator size={'small'} color={'white'}/>:'Approve'}
              textColor={Color.white}
              width={windowWidth * 0.25}
              height={windowHeight * 0.04}
              marginTop={moderateScale(10, 0.3)}
              bgColor={Color.blue}
              borderRadius={moderateScale(30, 0.3)}
              fontSize={moderateScale(11, 0.6)}
              onPress={() => {
                approveRequest('approve')

                
              }}
            />
            <CustomButton
              isBold
              text={isLoading ? <ActivityIndicator size={'small'} color={'white'}/>:'decline'}
              textColor={Color.white}
              width={windowWidth * 0.25}
              height={windowHeight * 0.04}
              marginTop={moderateScale(10, 0.3)}
              bgColor={Color.red}
              borderRadius={moderateScale(30, 0.3)}
              fontSize={moderateScale(11, 0.6)}
              onPress={() => {
                approveRequest('decline')
              }}
            
            />
          </View> */}
        </View>
      </Modal>
    </>
  );
};

export default NegotiatorCard;
