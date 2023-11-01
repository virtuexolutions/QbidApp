import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useRef, useState} from 'react';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomText from '../Components/CustomText';
import {Icon} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {AirbnbRating} from 'react-native-ratings';
import TextInputWithTitle from './TextInputWithTitle';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';

const ReviewModal = ({ setRef}) => {
  const token = useSelector(state => state.authReducer.token);
  // console.log('🚀 ~ file: ReviewModal.js:17 ~ ReviewModal ~ token:', token);
  const rbRef = useRef();
  const [loading, setLoading] = useState();
  const [review, setReview] = useState();
  const [rating, setRating] = useState();

  const sendReview = async () => {
    const url = 'auth/review';
    const body = {rating: rating, quote_id: item?.id, text: review};
    setLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setLoading(false);
    if (response == !undefined) {
      // console.log('first');
    }
  };

  return (
    <RBSheet
      ref={ref => setRef(ref)}
      height={450}
      openDuration={250}
      customStyles={{
        container: {
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          height: windowHeight * 0.65,
        },
      }}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: Color.white,
        }}>
        <View
          style={{
            backgroundColor: Color.white,
            width: windowWidth * 0.2,
            height: windowHeight * 0.01,
            borderRadius: 10,
            marginTop: 10,
          }}></View>
        <CustomText style={styles.Text}>What is you rate? </CustomText>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 20,
          }}>
          <AirbnbRating
            count={5}
            defaultRating={0}
            onFinishRating={rating => {
              setRating(rating)
              // console.log('Rating====>>>>', rating);
            }}
          />
        </View>

        <CustomText
          style={{
            width: windowWidth * 0.6,
            fontSize: 17,
            textAlign: 'center',
          }}>
          Please share your opinion about the product
        </CustomText>
        <TextInputWithTitle
          multiline={true}
          secureText={false}
          placeholder={'Your review'}
          setText={setReview}
          value={review}
          viewHeight={0.15}
          viewWidth={0.75}
          inputWidth={0.66}
          border={1}
          borderColor={Color.green}
          backgroundColor={'#FFFFFF'}
          marginTop={moderateScale(15, 0.6)}
          color={Color.themeColor}
          placeholderColor={Color.themeLightGray}
          borderRadius={moderateScale(25, 0.3)}
        />
        <TouchableOpacity
          // onPress={()=>
          // }
          style={{
            backgroundColor: Color.themeColor,
            width: windowWidth * 0.7,
            padding: moderateScale(20, 0.3),
            borderRadius: moderateScale(30, 0.3),
            alignItems: 'center',
            marginVertical: 30,
          }}>
          <CustomText style={styles.btnText}>Send review</CustomText>
        </TouchableOpacity>
      </View>
    </RBSheet>
  );
};

export default ReviewModal;

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: moderateScale(10, 0.3),
  },
  Text: {
    fontSize: 18,
    textAlign: 'center',
    paddingTop: moderateScale(30, 0.3),
  },
  input: {
    backgroundColor: Color.lightGrey,
    width: windowWidth * 0.9,
    height: windowHeight * 0.16,
    marginVertical: moderateScale(20, 0.3),
    borderRadius: moderateScale(15, 0.3),
    paddingHorizontal: moderateScale(20, 0.3),
    // marginHorizontal:20
  },
  btnText: {
    color: Color.white,
    fontSize: moderateScale(17, 0.3),
  },
});
