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
// import {formRegEx, formRegExReplacer, imageUrl} from '../Config';
import CustomButton from '../Components/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import CustomDropDownMultiSelect from '../Components/CustomDropDownMultiSelect';

const MyAccounts = props => {
  const dispatch = useDispatch();
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const user = useSelector(state => state.commonReducer.userData);
  const servicesArray = useSelector(state => state.commonReducer.servicesArray);
  const token = useSelector(state => state.authReducer.token);
  
  const [showModal, setShowModal] = useState(false);
  const [imageObject, setImageObject] = useState({});
  const [firstName, setFirstName] = useState(
    user?.first_name ? user?.first_name : '',
  );
  const [lastName, setLastName] = useState(
    user?.last_name ? user?.last_name : '',
  );
  const [companyName, setCompanyName] = useState(
    user?.company_name ? user?.company_name : '',
  );
  const [jobStatus, setJobStatus] = useState('');
  const [email, setEmail] = useState(user?.email ? user?.email : '');
  const [contact, setContact] = useState(user?.phone ? user?.phone : '');
  const [address, setAddress] = useState(user?.address ? user?.address : '');
  const [city, setCity] = useState(user?.city ? user?.city : '');
  const [state, setState] = useState(user?.state ? user?.state : '');
  const [zipCode, setZipCode] = useState(user?.zip ? `${user?.zip}` : '');
  const [services, setServices] = useState(
    user?.expertise ? JSON.parse(user?.expertise) : [],
  ); //for negotiator
  const [language, setLanguage] = useState(
    user?.language ? JSON.parse(user?.language) : [],
  ); //for negotiator

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
        
        console.log("🚀 ~ MyAccounts ~ user:", user)
      console.log("🚀 ~ EditProfile ~ imageObject:", imageObject)

      const EditProfile = async () => {
    const params = {
      first_name: firstName,
      last_name: lastName,
      address: address,
      phone: contact,
      // company_name: companyName,
      email: email,
      city: city,
      state: state,
      zip: zipCode,
    };
    const formdata = new FormData();
    for (let key in params) {
      if ([undefined, '', null].includes(params[key])) {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} is empty`, ToastAndroid.SHORT)
          : Alert.alert(`${key} is empty`);
      }
      formdata.append(key, params[key]);
    }
    services?.map((item, index) =>
      formdata.append(`expertise[${index}]`, item),
    );
    language?.map((item, index) => formdata.append(`language[${index}]`, item));
    if (Object.keys(imageObject).length > 0) {
      formdata.append('photo', imageObject);
    }

    const url = 'auth/profile';
    setIsLoading(true);
    const response = await Post(url, formdata, apiHeader(token, true));
    setIsLoading(false);

    if (response !== undefined) {
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
      statusBarBackgroundColor={
        userRole == 'Qbid Member'
          ? Color.themeBgColor
          : userRole == 'Qbid Negotiator'
          ? Color.themeBgColorNegotiator
          : Color.themebgBusinessQbidder
      }
      statusBarContentStyle={'light-content'}
      headerColor={
        userRole == 'Qbid Member'
          ? Color.themeBgColor
          : userRole == 'Qbid Negotiator'
          ? Color.themeBgColorNegotiator
          : Color.themebgBusinessQbidder
      }
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
          colors={
            userRole == 'Qbid Member'
              ? Color.themeBgColor
              : userRole == 'Qbid Negotiator'
              ? Color.themeBgColorNegotiator
              : Color.themebgBusinessQbidder
          }>
          <View>
            <CustomImage
              onPress={() => {
                setIsVisible(true);
              }}
              source={
                Object.keys(imageObject).length > 0
                  ? {uri: imageObject?.uri}
                  : {uri: user?.photo}
              }
              style={[styles.image]}
            />

            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                width: moderateScale(30, 0.3),
                height: moderateScale(30, 0.3),
                borderRadius: moderateScale(15, 0.3),
                backgroundColor:
                  userRole == 'Qbid Member'
                    ? Color.blue
                    : userRole == 'Qbid Negotiator'
                    ? Color.themeColor
                    : Color.black,
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
          {userRole == 'Qbid Negotiator' && (
            <>
              <TextInputWithTitle
                title={'Company Name'}
                secureText={false}
                placeholder={'Company Name'}
                setText={setCompanyName}
                value={companyName}
                viewHeight={0.07}
                viewWidth={0.9}
                inputWidth={0.86}
                // border={1}
                borderColor={'#ffffff'}
                backgroundColor={'#FFFFFF'}
                // marginTop={moderateScale(15, 0.3)}
                color={Color.themeColor}
                placeholderColor={Color.themeLightGray}
                borderRadius={moderateScale(25, 0.3)}
              />
            </>
          )}
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

          {userRole != 'Qbid Member' && (
            <>
              <CustomDropDownMultiSelect
                title={'Pick Languages'}
                array={[
                  {name: 'English', id: 'English'},
                  {name: 'Dutch', id: 'Dutch'},
                  {name: 'Spanish', id: 'Spanish'},
                  {name: 'French', id: 'French'},
                  {name: 'Portugese', id: 'Portugese'},
                ]}
                item={language}
                setItem={setLanguage}
                maxHeight={windowHeight * 0.2}
                marginTop={moderateScale(8, 0.3)}
                containerStyle={{
                  width: windowWidth * 0.9,
                  height: windowHeight * 0.07,
                }}
              />
              <CustomDropDownMultiSelect
                title={'Pick Expertise'}
                array={servicesArray}
                item={services}
                setItem={setServices}
                maxHeight={windowHeight * 0.3}
                containerStyle={{
                  width: windowWidth * 0.9,
                  height: windowHeight * 0.07,
                }}
              />
            </>
          )}

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
            onPress={() => {
              EditProfile();
            }}
            bgColor={
              userRole == 'Qbid Member'
                ? Color.blue
                : userRole == 'Qbid Negotiator'
                ? Color.themeColor
                : Color.black
            }
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
