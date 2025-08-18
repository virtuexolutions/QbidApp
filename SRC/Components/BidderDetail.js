import { useNavigation } from '@react-navigation/native';
import { Icon } from 'native-base';
import { useState } from 'react';
import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native';
import ImageView from 'react-native-image-viewing';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import Constants from '../Assets/Utilities/Constants';
import { Post } from '../Axios/AxiosInterceptorFunction';
import CustomText from '../Components/CustomText';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import RatingComponent from './RatingComponent';
import BidDetailsModal from './BidDetailsModal';

const BidderDetail = ({ item, photo, price, title, date, message, onPressDetails }) => {
  console.log('🚀 ~ BidderDetail ~ item:', item);
  const token = useSelector(state => state.authReducer.token);
  console.log("🚀 ~ BidderDetail ~ token:", token)
  const navigation = useNavigation();
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const [isLoading, setIsLoading] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  const imagesArray = item?.attachment?.map((item, index) => {
    return { uri: item?.image };
  });

  const bidDelete = async id => {
    const url = `auth/negotiator/bid_delete`;
    const body = {
      id: item?.bid_id,
    };
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    console.log(response?.data, 'responseeeeeeeeeeeeeeeeeeee')
    setIsLoading(false);
    if (response != undefined) {
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPressDetails}
      style={[
        styles.container,
        userRole == 'Qbid Member'
          ? {
            borderColor: Color.lightGrey,
            backgroundColor: 'transparent',
          }
          : {
            borderColor: Color.lightGrey,
            backgroundColor: 'transparent',
          },
      ]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={
            item?.image
              ? { uri: item?.image }
              : require('../Assets/Images/dummyman1.png')
          }
          style={styles.image}
        />
        <View style={{ marginLeft: moderateScale(10, 0.3) }}>
          <CustomText
            noOfLines={2}
            style={[
              Constants.h4,
              {
                width: windowWidth * 0.5,
                color: Color.black,
                fontWeight: 'bold',
              },
              userRole == 'Qbid Member'
                ? {
                  borderColor: Color.black,
                }
                : {
                  borderColor: Color.lightGrey,
                },
            ]}>
            {item?.name}
          </CustomText>
          <RatingComponent
            disable={true}
            rating={item?.rating}
            starColor={'#ffa534'}
            starStyle={{
              marginRight: moderateScale(1, 0.3),
              marginTop: moderateScale(1, 0.3),
            }}
            starSize={moderateScale(9, 0.3)}
          // ratingGiven={star}
          // setRatingGiven={setStar}
          />
        </View>
      </View>
      <CustomText
        numberOfLines={4}
        style={[
          {
            fontSize: moderateScale(11, 0.6),
            marginTop: moderateScale(10, 0.3),
            width: '100%',
            color: Color.white,
          },
        ]}>
        {item?.description}
      </CustomText>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {item?.attachment?.length > 0 && (
          <CustomText
            isBold
            style={{
              color: Color.blue,
              fontSize: moderateScale(12, 0.6),
              marginTop: moderateScale(10, 0.3),
            }}>
            Attachments...
          </CustomText>
        )}
        <CustomText
          onPress={() => {
            // if (finalImagesArray.length > 0) {F
            setImageModalVisible(true);
            // } else {
            //   return Platform.OS == 'android'
            //     ? ToastAndroid.show('No attachments', ToastAndroid.SHORT)
            //     : Alert.alert('No Attachments');
            // }
          }}
          isBold
          style={{
            color: Color.blue,
            fontSize: moderateScale(12, 0.6),
            marginTop: moderateScale(10, 0.3),
          }}>
          {"$ " + item?.price}
        </CustomText>
      </View>

      {/* <FlatList
        data={item?.review}
        renderItem={({item, index}) => {
          return (
            <View style={styles.view}>
              <View style={styles.mainview}>
                <CustomImage
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  source={{uri: item?.user_info?.photo}}
                />
              </View>
              <View
                style={{
                  paddingHorizontal: moderateScale(10, 0.3),
                }}>
                <CustomText isBold style={styles.text}>
                  {item?.user_info?.first_name}
                </CustomText>
                <CustomText style={styles.text2}>{item?.text}</CustomText>
                <CustomText
                  style={[styles.text2, {color: Color.veryLightGray}]}>
                  {moment().format('MMM Do, YYYY')}
                </CustomText>
              </View>
            </View>
          );
        }}
      /> */}

      <ImageView
        images={imagesArray}
        imageIndex={0}
        visible={imageModalVisible}
        onRequestClose={() => setImageModalVisible(false)}
      />
      <View
        style={{
          position: 'absolute',
          right: moderateScale(40, 0.6),
          top: moderateScale(10, 0.3),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {/* <TouchableOpacity
          style={{
            position: 'absolute',
            right: -25,
          }}
          onPress={() => {
            navigation.navigate('')
          }}>
          <Icon
            name={'edit'}
            as={Feather}
            size={moderateScale(10, 0.6)}
            color={Color.black}
          />
        </TouchableOpacity> */}
        <View
          style={{
            width: moderateScale(6, 0.6),
            height: moderateScale(6, 0.6),
            borderRadius: moderateScale(3, 0.6),
            backgroundColor:
              userRole == 'Qbid Member'
                ? Color.blue
                : userRole == 'Qbid Negotiator'
                  ? Color.themeColor
                  : Color.black,
          }}
        />

        <CustomText
          style={{
            fontSize: moderateScale(8, 0.6),
            color: Color.white,
            marginLeft: moderateScale(3, 0.3),
          }}>
          {item?.status == 'accept'
            ? 'Accepted'
            : item?.status == 'reject'
              ? 'Rejected'
              : 'pending'}
        </CustomText>
        {item?.status == 'pending' &&
          userRole == 'Business Qbidder' &&
          (isLoading ? (
            <ActivityIndicator size={'small'} color={'white'} />
          ) : (
            <Icon
              onPress={() => {
                console.log('assaassssssssssssssssssssssssssss', item?.bid_id);
                // item = {}
                bidDelete(item?.bid_id);
              }}
              style={{
                position: 'absolute',
                right: -25,
              }}
              as={Feather}
              name="trash"
              size={moderateScale(12, 0.6)}
              color={Color.white}
            />
          ))}
      </View>

    </TouchableOpacity>
  );
};
const styles = ScaledSheet.create({
  container: {
    width: windowWidth * 0.91,
    marginRight: moderateScale(10, 0.3),
    borderWidth: 1,
    borderColor: Color.lightGrey,
    backgroundColor: Color.themeColor,
    borderRadius: moderateScale(5, 0.3),
    padding: moderateScale(10, 0.3),
    marginVertical: moderateScale(5, 0.6),
  },
  image: {
    width: windowWidth * 0.11,
    height: windowWidth * 0.11,

    borderRadius: moderateScale((windowWidth * 0.11) / 2, 0.3),
  },
  heading1: {
    color: Color.black,
    fontSize: moderateScale(17, 0.6),
    textTransform: 'uppercase',
    marginTop: moderateScale(10, 0.6),
  },
  view: {
    flexDirection: 'row',
    marginVertical: moderateScale(10, 0.3),
    paddingHorizontal: moderateScale(10, 0.3),
  },
  mainview: {
    height: windowHeight * 0.06,
    width: windowHeight * 0.06,
    borderRadius: (windowHeight * 0.06) / 2,
    overflow: 'hidden',
  },
  text: {
    color: Color.black,
    fontSize: moderateScale(13, 0.6),
    textTransform: 'uppercase',
  },
  text2: {
    color: Color.black,
    fontSize: moderateScale(12, 0.6),
    width: windowWidth * 0.75,
  },
});

export default BidderDetail;
