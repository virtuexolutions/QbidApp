import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  ToastAndroid,
  View
} from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import RBSheet from 'react-native-raw-bottom-sheet';
import { moderateScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Post } from '../Axios/AxiosInterceptorFunction';
import CustomText from '../Components/CustomText';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import CustomButton from './CustomButton';
import TextInputWithTitle from './TextInputWithTitle';

const ReviewModal = ({
  setRef,
  rbRef,
  item,
  onClose,
  setbuttonName,
  setModalVisible,
}) => {
  const token = useSelector(state => state.authReducer.token);
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  console.log('ReviewModal itemmmmmmmmmmm', item)
  const sendReview = async () => {
    const url = 'auth/review';
    const body = { rating: rating, quote_id: item?.id, text: review };
    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
          : Alert.alert(`${key} is required`);
      }
    }
    setLoading(true);
    const response = await Post(url, body, apiHeader(token));
    console.log('🚀 ~ sendReview ~ response:', response?.data?.review);
    setLoading(false);
    if (response?.data?.review) {
      rbRef.close()
      Platform.OS == 'android'
        ? ToastAndroid.show('Review sent', ToastAndroid.SHORT)
        : Alert.alert('Review sent');
      setRating(0);
      setReview('');
      setbuttonName('reviewed');
    }
  };

  return (
    <RBSheet
      closeOnDragDown={true}
      ref={ref => setRef(ref)}
      height={450}
      dragFromTopOnly={true}
      openDuration={250}
      // closeOnPressMask={true}
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
            reviews={['OK', 'Good', 'Very Good', 'Wow', 'Amazing']}
            count={5}
            defaultRating={0}
            onFinishRating={rating => {
              setRating(rating);
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

        <CustomButton
          text={
            loading ? (
              <ActivityIndicator size={'small'} color={'white'} />
            ) : (
              'send review'
            )
          }
          textColor={Color.white}
          width={windowWidth * 0.55}
          height={windowHeight * 0.08}
          marginTop={moderateScale(15, 0.3)}
          onPress={() => {
            sendReview();
          }}
          bgColor={Color.themeColor}
          borderRadius={moderateScale(30, 0.3)}
          fontSize={moderateScale(15, 0.3)}
        />
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
  },
  btnText: {
    color: Color.white,
    fontSize: moderateScale(17, 0.3),
  },
});
