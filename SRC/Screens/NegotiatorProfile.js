import {
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import { FlatList, Icon } from 'native-base';
import { windowHeight, windowWidth } from '../Utillity/utils';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import CategoriesSelector from '../Components/CategoriesSelector';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import { ScrollView } from 'react-native';
import SearchContainer from '../Components/SearchContainer';
import ProductCard from '../Components/ProductCard';
import {
  setCartData,
  setProductColor,
  setProductSize,
} from '../Store/slices/common';
import { useDispatch, useSelector } from 'react-redux';
import CustomImage from '../Components/CustomImage';
import LinearGradient from 'react-native-linear-gradient';
import numeral from 'numeral';
import ShowMoreAndShowLessText from '../Components/ShowMoreAndShowLessText';
import ReviewCard from '../Components/ReviewCard';
import CustomButton from '../Components/CustomButton';
// import Share from 'react-native-share';
import navigationService from '../navigationService';

const NegotiatorProfile = props => {
  const dispatch = useDispatch();
  const cartData = useSelector(state => state.commonReducer.cartData);
  const [showMore, setShowMore] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  
  const detail = {
    image: require('../Assets/Images/shoes2.jpg'),
    name: 'Shoes nike',
    id: 6,
    quantity: 1,
    price: 200,
    array: [
      require('../Assets/Images/shoes2.jpg'),
      require('../Assets/Images/shoes2.jpg'),
      require('../Assets/Images/shoes2.jpg'),
      require('../Assets/Images/shoes2.jpg'),
    ],
    description: 'Best shoes2 up so far in the market with the comfort',
    brandName: 'Nike',
    availbleSizes: ['8', '8.5', '9', '9.5', '10'],
    Reviews: [
      {
        name: 'John',
        rating: 3,
        description: 'good Product',
        image: require('../Assets/Images/basicman.jpg'),
      },
      {
        name: 'John bro',
        rating: 5,
        description: 'Very good Product',
        image: require('../Assets/Images/basicman.jpg'),
      },
      {
        name: 'John bro',
        rating: 5,
        description: 'Very good Product',
        image: require('../Assets/Images/basicman.jpg'),
      },
      {
        name: 'John bro',
        rating: 5,
        description: 'Very good Product',
        image: require('../Assets/Images/basicman.jpg'),
      },
      {
        name: 'John bro',
        rating: 5,
        description: 'Very good Product',
        image: require('../Assets/Images/basicman.jpg'),
      },
    ],
    availbleColor: ['Red', 'Yellow', 'grey', 'pink', 'blue'],
  };

  const userRole = useSelector(state => state.commonReducer.selectedRole);

  return (
    <ScreenBoiler
      showHeader={true}
      title={'Details'}
      statusBarBackgroundColor={
        userRole == 'Qbid Member'
          ? Color.blue
          : userRole == 'Qbid Negotiator'
            ? Color.themeColor
            : Color.black
      }
      statusBarContentStyle={'dark-content'}
      // headerColor={Color.white}
      headerType={1}
      showBack={true}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: windowWidth,
          backgroundColor: 'white',
          // maxHeight : windowHeight * 0.8
        }}
        contentContainerStyle={styles.scroll}>
        <View
          style={{
            width: windowWidth * 0.87,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(26, 0.3),
              color: Color.black,
              width: windowWidth * 0.45,
              textAlign: 'left',
            }}>
            {detail?.name}
          </CustomText>
        </View>
        <FlatList
          style={styles.bannerView}
          data={detail?.array}
          horizontal
          pagingEnabled
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  width: windowWidth * 0.95,
                  height: windowHeight * 0.46,
                }}>
                <CustomImage
                  source={item}
                  resizeMode={'stretch'}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
                {/* <View style={{position : 'absolute' , bottom : 0}}> */}
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  colors={['#8A8A8A00', '#000000']}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    borderRadius: 5,
                    justifyContent: 'flex-end',
                    shadowOffset: { height: 2, width: 0 },
                    shadowOpacity: 1,
                    shadowRadius: 4,
                    width: '100%',
                    alignItems: 'center',
                    paddingBottom: moderateScale(20, 0.3),
                    paddingTop: moderateScale(60, 0.3),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      marginTop: moderateScale(10, 0.3),
                      alignItems: 'center',
                    }}>
                    {detail?.array.map((x, index1) => {
                      return (
                        <View
                          style={{
                            width: index1 == index ? 11 : 7,
                            height: index1 == index ? 11 : 7,
                            backgroundColor:
                              index1 == index ? Color.green : Color.white,
                            marginRight: moderateScale(5, 0.3),
                            borderRadius: index1 == index ? 5.5 : 3.5,
                          }}></View>
                      );
                    })}
                  </View>
                </LinearGradient>
                {/* </View> */}
              </View>
            );
          }}
        />
        <View
          style={{
            marginTop: moderateScale(10, 0.3),
            width: windowWidth * 0.87,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <CustomText
            isBold
            style={{
              fontSize: moderateScale(25, 0.3),
              color: Color.green,
              width: windowWidth * 0.45,
              textAlign: 'left',
            }}>
            {numeral(detail?.price).format('$0,0.0')}
          </CustomText>
        </View>
        <ShowMoreAndShowLessText
          style={{
            marginTop: moderateScale(10, 0.3),
            fontSize: moderateScale(13, 0.3),
          }}
          minTextLength={25}>
          {detail?.description}
        </ShowMoreAndShowLessText>
        <View
          style={{
            width: windowWidth * 0.87,
            flexDirection: 'row',
            justifyContent: 'space-between',
            // backgroundColor: 'red',
            marginTop: moderateScale(10, 0.3),
          }}>
          <CustomText
            style={{
              fontSize: moderateScale(15, 0.3),
              color: Color.themeLightGray,
              width: windowWidth * 0.35,
            }}>
            Brand
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(15, 0.3),
              color: Color.black,
              width: windowWidth * 0.45,
            }}>
            {detail?.brandName}
          </CustomText>
        </View>
        <View
          style={{
            width: windowWidth * 0.87,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: moderateScale(10, 0.3),
          }}>
          <CustomText
            style={{
              fontSize: moderateScale(15, 0.3),
              color: Color.themeLightGray,
              width: windowWidth * 0.35,
            }}>
            Available Sizes
          </CustomText>
        </View>
        <View
          style={{
            width: windowWidth * 0.87,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: moderateScale(10, 0.3),
          }}>
          <CustomText
            style={{
              fontSize: moderateScale(15, 0.3),
              color: Color.themeLightGray,
              width: windowWidth * 0.35,
            }}>
            Available Colors
          </CustomText>
        </View>
        <CustomText
          isBold
          style={{
            fontSize: moderateScale(20, 0.3),
            color: Color.black,
            width: windowWidth * 0.87,
            marginTop: moderateScale(20, 0.3),
          }}>
          Satisfied Customers
        </CustomText>
        {detail?.Reviews.slice(
          0,
          showMore == false ? 3 : detail?.Reviews.length,
        ).map((x, index) => {
          return <ReviewCard item={x} />;
        })}
        {detail?.Reviews?.length > 3 && (
          <CustomButton
            text={showMore ? 'Show less' : 'Show More'}
            isBold
            textColor={Color.white}
            width={windowWidth * 0.8}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            onPress={() => {
              setShowMore(!showMore);
            }}
            bgColor={Color.green}
            borderRadius={moderateScale(10, 0.3)}
          />
        )}
        <CustomButton
          text={'Hire Now'}
          isBold
          textColor={Color.white}
          width={windowWidth * 0.8}
          height={windowHeight * 0.06}
          marginTop={moderateScale(20, 0.3)}
          // onPress={}
          bgColor={Color.green}
          disabled={cartData.some(x => x?.id == detail?.id)}
        />
      </ScrollView>
    </ScreenBoiler>
  );
};

export default NegotiatorProfile;

const styles = ScaledSheet.create({
  bannerView: {
    width: windowWidth * 0.95,
    height: windowHeight * 0.46,
    backgroundColor: 'black',
    marginTop: moderateScale(10, 0.3),
  },
  sizeBox: {
    paddingVertical: moderateScale(3, 0.3),
    paddingHorizontal: moderateScale(5, 0.3),
    borderRadius: moderateScale(5, 0.3),
    borderWidth: 1,
    borderColor: Color.themeLightGray,
    marginRight: moderateScale(5, 0.3),
  },
  colorBox: {
    width: moderateScale(20, 0.3),
    height: moderateScale(20, 0.3),
    borderRadius: moderateScale(10, 0.3),
    marginRight: moderateScale(5, 0.3),
  },
  scroll: {
    paddingTop: moderateScale(10, 0.3),
    alignItems: 'center',
    paddingBottom: moderateScale(30, 0.3),
  }
});
