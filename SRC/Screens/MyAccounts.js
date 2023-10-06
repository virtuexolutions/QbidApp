import React, {useState} from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import ImageView from 'react-native-image-viewing';
import ScreenBoiler from '../Components/ScreenBoiler';
import {Icon} from 'native-base';
import CustomImage from '../Components/CustomImage';
import {setUserData} from '../Store/slices/common';
import {Patch, Post} from '../Axios/AxiosInterceptorFunction';
import ImagePickerModal from '../Components/ImagePickerModal';
import {formRegEx, formRegExReplacer, imageUrl} from '../Config';
import CustomButton from '../Components/CustomButton';
import LinearGradient from 'react-native-linear-gradient';

const MyAccounts = props => {
  const dispatch = useDispatch();
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const user = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);
  const [showModal, setShowModal] = useState(false);
  const [imageObject, setImageObject] = useState({});
  const [firstName, setFirstName] = useState('Charles');
  const [lastName, setLastName] = useState(' A.Lee');
  const [companyName, setCompanyName] = useState(''); //for negotiator
  const [jobStatus, setJobStatus] = useState(''); //for negotiator
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [services, setServices] = useState([
    'Auto repair',
    'plumbing Projects',
    'HAVC repair/Replacement',
  ]); //for negotiator
  const [language, setLanguage] = useState(['English']); //for negotiator

  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const imageArray =
    Object.keys(imageObject).length > 0
      ? [
          {
            uri: imageObject.uri,
          },
        ]
      : user?.photo
      ? [
          {
            uri: `${user?.photo}`,
          },
        ]
      : [require('../Assets/Images/man1.jpg')];

  const EditProfile = async () => {
    const params = {
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      email: email,
      country: country,
    };
    const formdata = new FormData();
    for (let key in params) {
      if ([undefined, '', null].includes(params[key])) {
        return Platform.OS == 'android'
          ? ToastAndroid.show(
              `${key.replace(formRegEx, formRegExReplacer)} is empty`,
              ToastAndroid.SHORT,
            )
          : Alert.alert(
              `${key.replace(formRegEx, formRegExReplacer)} is empty`,
            );
      }
      formdata.append(key, params[key]);
    }
    if (Object.keys(imageObject).length > 0) {
      formdata.append('photo', imageObject);
    }
    console.log(formdata);

    const url = 'auth/profile';
    setIsLoading(true);
    const response = await Post(url, formdata, apiHeader(token, true));
    setIsLoading(false);

    if (response !== undefined) {
      console.log('response?.data?.data?.user', response?.data);
      dispatch(setUserData(response?.data?.user_info));

      Platform.OS == 'android'
        ? ToastAndroid.show('Profile Updated Succesfully', ToastAndroid.SHORT)
        : Alert.alert('Profile Updated Succesfully');
      props.navigation.goBack();
    }
  };
  return (
    <ScreenBoiler
      showHeader={true}
      statusBarBackgroundColor={Color.themeBgColor}
      statusBarContentStyle={'light-content'}
      headerColor={Color.themeBgColor}
      hideUser={true}
      showBack={true}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{maxHeight: windowHeight * 0.97}}
        contentContainerStyle={{
          backgroundColor: 'transparent',
          minHeight: windowHeight * 0.9,
        }}>
        <LinearGradient
          style={{
       
            alignItems: 'center',
            paddingVertical: moderateScale(30, 0.6),
          }}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={Color.themeBgColor}>
          <View>
            {Object.keys(imageObject).length > 0 ? (
              <CustomImage
                onPress={() => {
                  setIsVisible(true);
                }}
                source={{uri: imageObject?.uri}}
                style={[styles.image]}
              />
            ) : (
              <CustomImage
                onPress={() => {
                  setIsVisible(true);
                }}
                style={[styles.image]}
                source={
                  user?.photo
                    ? {uri: `${user?.photo}`}
                    : require('../Assets/Images/user2.png')
                }
              />
            )}

            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                width: moderateScale(30, 0.3),
                height: moderateScale(30, 0.3),
                borderRadius: moderateScale(15, 0.3),
                backgroundColor: Color.blue,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                bottom: moderateScale(8, 0.3),
                right: moderateScale(10, 0.3),
              }}
              onPress={() => setShowModal(true)}>
              <Icon
                name="pencil"
                as={FontAwesome}
                size={moderateScale(18, 0.3)}
                color={Color.white}
              />
            </TouchableOpacity>
          </View>

          <TextInputWithTitle
            title={'First Name'} 
            secureText={false}
            placeholder={'First Name'}    
            setText={setFirstName}
            value={firstName}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.88}
            // border={1}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
          />
          <TextInputWithTitle
            title={'Last Name'}
            secureText={false}
            placeholder={'Last Name'}
            setText={setLastName}
            value={lastName}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.88}
            // border={1}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
          />

          <TextInputWithTitle
            title={'Email'}
            secureText={false}
            placeholder={'Email'}
            setText={setEmail}
            value={email}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.88}
            // border={1}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
          />
          <TextInputWithTitle
            title={'Contact'}
            secureText={false}
            placeholder={'Contact'}
            setText={setContact}
            value={contact}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.88}
            // border={1}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
          />
          <TextInputWithTitle
            title={'Address'}
            secureText={false}
            placeholder={'Address'}
            setText={setAddress}
            value={address}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.88}
            // border={1}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
          />
          <TextInputWithTitle
            title={'City'}
            secureText={false}
            placeholder={'City'}
            setText={setCity}
            value={city}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.88}
            // border={1}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
          />
          <TextInputWithTitle
            title={'State'}
            secureText={false}
            placeholder={'State'}
            setText={setState}
            value={state}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.88}
            backgroundColor={'#FFFFFF'}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
            // marginBottom={moderateScale(10, 0.3)}
          />
          <TextInputWithTitle
            title={'Zip code'}
            secureText={false}
            placeholder={'Zip code'}
            setText={setZipCode}
            value={zipCode}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.88}
            backgroundColor={'#FFFFFF'}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
            // marginBottom={moderateScale(10, 0.3)}
          />

          <CustomButton
            text={
              isLoading ? (
                <ActivityIndicator color={'#FFFFFF'} size={'small'} />
              ) : (
                'Update'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.9}
            height={windowHeight * 0.07}
            marginTop={moderateScale(20, 0.3)}
            // onPress={() => {
            //   dispatch(setUserToken({token: 'dasdawradawdawrtfeasfzs'}));
            // }}
            bgColor={Color.blue}
            borderRadius={moderateScale(30, 0.3)}
          />
        </LinearGradient>
      </ScrollView>
      <ImagePickerModal
        show={showModal}
        setShow={setShowModal}
        setFileObject={setImageObject}
        crop={true}
      />
      <ImageView
        images={imageArray}
        imageIndex={0}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      />
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  filterContainer: {
    height: windowHeight * 0.078,
    width: windowWidth * 0.15,
    // paddingHorizontal: moderateScale(7, 0.3),
    marginTop: moderateScale(10, 0.3),
    marginLeft: moderateScale(10, 0.3),
    borderRadius: moderateScale(5, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    height: windowHeight * 0.9,
    width: windowWidth,
    backgroundColor: Color.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20, 0.3),
  },
  button: {
    marginTop: moderateScale(20, 0.3),
    height: windowHeight * 0.06,
    width: windowWidth * 0.8,
    paddingHorizontal: moderateScale(40, 0.3),
    borderRadius: moderateScale(10, 0.3),
    backgroundColor: Color.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: windowWidth * 0.35,
    width: windowWidth * 0.35,
    borderRadius: moderateScale((windowWidth * 0.35) / 2, 0.3),
    right: moderateScale(5, 0.3),
    marginTop: moderateScale(20, 0.3),
  },
});

export default MyAccounts;
