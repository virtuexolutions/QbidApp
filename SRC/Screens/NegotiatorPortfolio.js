import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import CustomImage from '../Components/CustomImage';
import ImagePickerModal from '../Components/ImagePickerModal';
import Constants from '../Assets/Utilities/Constants';
import RatingComponent from '../Components/RatingComponent';
import CustomText from '../Components/CustomText';
import {Icon} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import ImageView from 'react-native-image-viewing';
import Detailcards from '../Components/Detailcards';
import CustomButton from '../Components/CustomButton';
import {ActivityIndicator} from 'react-native';
import CustomModal from '../Components/CustomModal';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomDropDownMultiSelect from '../Components/CustomDropDownMultiSelect';

const NegotiatorPortfolio = () => {
  const servicesArray = useSelector(state => state.commonReducer.servicesArray);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const [image, setImage] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState({});
  const [imageType, setimageType] = useState('profile');
  const [imageToShow, setImageToShow] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [availibility, setAvailibility] = useState(false);
  console.log(
    '🚀 ~ file: NegotiatorPortfolio.js:38 ~ NegotiatorPortfolio ~ editProfile:',
    editProfile,
  );

  //Edit Profile Modal
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

  return (
    <ScreenBoiler
      showHeader={true}
      statusBarBackgroundColor={
        userRole == 'Qbid Member'
          ? Color.themeBgColor
          : Color.themeBgColorNegotiator
      }
      statusBarContentStyle={'light-content'}
      headerColor={
        userRole == 'Qbid Member'
          ? Color.themeBgColor
          : Color.themeBgColorNegotiator
      }
      showBack={true}>
      <LinearGradient
        style={{
          height: windowHeight * 0.96,
        }}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={
          userRole == 'Qbid Member'
            ? Color.themeBgColor
            : Color.themeBgColorNegotiator
        }>
        {!availibility && (
          <View
            style={{
              position: 'absolute',
              zIndex: 1,
              width: windowWidth,
              // height : moderateScale(30,0.3),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 0, 0,0.8)',
              marginBottom: moderateScale(10, 0.3),
              paddingHorizontal: moderateScale(5, 0.3),
              paddingVertical: moderateScale(5, 0.6),
            }}>
            <CustomText
              style={{
                fontSize: moderateScale(11, 0.3),
                color: Color.white,
                textAlign: 'center',
              }}>
              {userRole == 'Qbid Member'
                ? 'Negotiator is not accepting any job right now , you can not make hiring request'
                : 'Account Availibility is set to Disable , reset it from edit availibility'}
            </CustomText>
          </View>
        )}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: moderateScale(50, 0.3),
            backgroundColor: '#FFFFFF',
          }}
          style={{
            width: '100%',
            flexGrow: 0,
          }}>
          <View style={styles.upperContainer}>
            <View
              style={{
                width: '100%',
                height: '60%',
              }}>
              <CustomImage
                onPress={() => {
                  setImageToShow([
                    Object.keys(coverPhoto).length > 0
                      ? {uri: coverPhoto?.uri}
                      : require('../Assets/Images/coverPhoto.jpg'),
                  ]);
                  setVisible(true);
                }}
                source={
                  Object.keys(coverPhoto).length > 0
                    ? {uri: coverPhoto?.uri}
                    : require('../Assets/Images/coverPhoto.jpg')
                }
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
              {userRole == 'Qbid Negotiator' && (
                <TouchableOpacity
                  onPress={() => {
                    setimageType('cover');
                    setShowModal(true);
                  }}
                  style={[
                    styles.edit,
                    {
                      backgroundColor: '#EEEEEE',

                      right: moderateScale(10, 0.3),
                    },
                  ]}>
                  <Icon
                    name="camera"
                    as={FontAwesome}
                    style={styles.icon}
                    color={Color.black}
                    size={moderateScale(16, 0.3)}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View
              style={{
                marginTop: -windowWidth * 0.15,
                marginLeft: moderateScale(15, 0.3),
                width: windowWidth * 0.25,
              }}>
              {Object.keys(image).length > 0 ? (
                <CustomImage
                  onPress={() => {
                    setImageToShow([{uri: coverPhoto?.uri}]);
                    setVisible(true);
                  }}
                  source={{uri: image?.uri}}
                  style={styles.image}
                />
              ) : (
                <CustomImage
                  onPress={() => {
                    setImageToShow([require('../Assets/Images/man1.jpg')]);
                    setVisible(true);
                  }}
                  style={styles.image}
                  source={require('../Assets/Images/man1.jpg')}
                />
              )}
              {userRole == 'Qbid Negotiator' && (
                <TouchableOpacity
                  onPress={() => {
                    setimageType('profile');
                    setShowModal(true);
                  }}
                  style={[
                    styles.edit,
                    {
                      backgroundColor:
                        userRole == 'Qbid Member'
                          ? Color.blue
                          : Color.themeColor,
                    },
                  ]}>
                  <Icon
                    name="camera"
                    as={FontAwesome}
                    style={styles.icon}
                    color={Color.white}
                    size={moderateScale(16, 0.3)}
                  />
                </TouchableOpacity>
              )}
            </View>
            {userRole == 'Qbid Negotiator' && (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  setEditProfile(true);
                }}
                style={[
                  {
                    backgroundColor: '#e1e1e1',
                    right: 10,
                    top: '62%',
                    position: 'absolute',
                    paddingHorizontal: moderateScale(10, 0.6),
                    paddingVertical: moderateScale(4, 0.6),
                    borderRadius: moderateScale(5, 0.6),
                  },
                ]}>
                <CustomText
                  isBold
                  style={{
                    fontSize: moderateScale(11, 0.6),
                  }}>
                  Edit Profile
                </CustomText>
              </TouchableOpacity>
            )}
            <View style={{marginLeft: moderateScale(10, 0.3)}}>
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
                {`${firstName} ${lastName}`}
              </CustomText>
              <RatingComponent
                disable={true}
                rating={4.2}
                starColor={'#ffa534'}
                starStyle={{
                  marginRight: moderateScale(1, 0.3),
                  marginTop: moderateScale(1, 0.3),
                }}
                starSize={moderateScale(12, 0.3)}
              />
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: moderateScale(10, 0.3),
              }}>
              <DetailContainer
                imageName={'man'}
                type={Entypo}
                subtitle={availibility ? 'Yes' : 'No'}
                title={'Availibility'}
                editEnable
                edit={availibility}
                setEdit={setAvailibility}
              />
              <DetailContainer
                imageName={'briefcase'}
                type={Entypo}
                subtitle={'20'}
                title={'Jobs'}
              />
              <DetailContainer
                imageName={'dollar'}
                type={FontAwesome}
                subtitle={'$10k+'}
                title={'Total earning'}
              />
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: Color.lightGrey,
              width: '95%',
            }}
          />
          <View style={styles.lowerContainer}>
            <CustomText
              isBold
              style={{
                color: Color.black,
                fontSize: moderateScale(17, 0.6),
                textTransform: 'uppercase',
              }}>
              INFO
            </CustomText>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                paddingRight: moderateScale(5, 0.6),
                flexWrap: 'wrap',
              }}>
              <Detailcards
                data={'john@gmail.com'}
                iconName={'envelope'}
                title={'Email'}
                iconType={FontAwesome}
                textColor={Color.black}
                containerStyle={{
                  backgroundColor: '#EEEEEE',
                }}
                marginTop={moderateScale(10, 0.3)}
              />
              <Detailcards
                data={'(+1)-1111111'}
                iconName={'phone'}
                title={'Contact'}
                iconType={FontAwesome}
                marginTop={moderateScale(10, 0.3)}
                textColor={Color.black}
                containerStyle={{
                  backgroundColor: '#EEEEEE',
                }}
              />
              <Detailcards
                data={'xyz office'}
                iconName={'building'}
                title={'Company name'}
                iconType={FontAwesome}
                marginTop={moderateScale(10, 0.3)}
                textColor={Color.black}
                containerStyle={{
                  backgroundColor: '#EEEEEE',
                }}
              />
              <Detailcards
                data={'Gold'}
                iconName={'trophy'}
                title={'Qbid Level'}
                iconType={FontAwesome}
                marginTop={moderateScale(10, 0.3)}
                textColor={Color.black}
                containerStyle={{
                  backgroundColor: '#EEEEEE',
                }}
              />
            </View>
            <CustomText
              isBold
              style={{
                color: Color.black,
                fontSize: moderateScale(17, 0.6),
                textTransform: 'uppercase',
                marginTop: moderateScale(10, 0.6),
              }}>
              Expertise
            </CustomText>
            {['HAVC repair/Replacement', 'Handyman Projects'].map(
              (x, index) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      alignItems: 'center',
                      marginTop: moderateScale(7, 0.3),
                      paddingLeft: moderateScale(15, 0.6),
                    }}>
                    <View
                      style={{
                        width: moderateScale(7, 0.6),
                        height: moderateScale(7, 0.6),
                        borderRadius: moderateScale(3.5, 0.6),
                        backgroundColor:
                          userRole == 'Qbid Member'
                            ? Color.blue
                            : Color.themeColor,
                      }}
                    />
                    <CustomText
                      numberOfLines={2}
                      style={{
                        fontSize: moderateScale(11, 0.6),
                        color: Color.black,
                        marginLeft: moderateScale(3, 0.3),
                      }}>
                      {x}
                    </CustomText>
                  </View>
                );
              },
            )}
            <CustomText
              isBold
              style={{
                color: Color.black,
                fontSize: moderateScale(17, 0.6),
                textTransform: 'uppercase',
                marginTop: moderateScale(10, 0.6),
              }}>
              Languages
            </CustomText>
            {['English', 'Portugese', 'French'].map((x, index) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    marginTop: moderateScale(7, 0.3),
                    paddingLeft: moderateScale(15, 0.6),
                  }}>
                  <View
                    style={{
                      width: moderateScale(7, 0.6),
                      height: moderateScale(7, 0.6),
                      borderRadius: moderateScale(3.5, 0.6),
                      backgroundColor:
                        userRole == 'Qbid Member'
                          ? Color.blue
                          : Color.themeColor,
                    }}
                  />
                  <CustomText
                    numberOfLines={2}
                    style={{
                      fontSize: moderateScale(11, 0.6),
                      color: Color.black,
                      marginLeft: moderateScale(3, 0.3),
                    }}>
                    {x}
                  </CustomText>
                </View>
              );
            })}
          </View>
          {userRole == 'Qbid Member' && (
            <CustomButton
              text={'Hire Now'}
              textColor={Color.white}
              width={windowWidth * 0.92}
              height={windowHeight * 0.07}
              marginTop={moderateScale(20, 0.3)}
              bgColor={
                userRole == 'Qbid Member' ? Color.blue : Color.themeColor
              }
              borderRadius={moderateScale(30, 0.3)}
              disabled={!availibility}
            />
          )}
        </ScrollView>
        <ImagePickerModal
          show={showModal}
          setShow={setShowModal}
          setFileObject={imageType == 'profile' ? setImage : setCoverPhoto}
        />
        <ImageView
          images={imageToShow}
          visible={visible}
          onRequestClose={() => setVisible(false)}
        />
        <CustomModal
          isVisible={editProfile}
          setIsVisible={setEditProfile}
          container={{
            width: windowWidth * 0.9,
            // backgroundColor : Color.themeColor,
            borderRadius: moderateScale(10, 0.6),
            height: windowHeight * 0.8,
            overflow: 'hidden',
          }}
          contentContainerStyle={{}}>
          <LinearGradient
            style={{
              // width: windowWidth,
              // height: windowHeight * 0.89,
              alignItems: 'center',
              paddingVertical: moderateScale(30, 0.6),
            }}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={userRole == 'Qbid Member' ?  Color.themeBgColor : Color.themeBgColorNegotiator}>
            <TextInputWithTitle
              title={'First Name'}
              secureText={false}
              placeholder={'First Name'}
              setText={setFirstName}
              value={firstName}
              viewHeight={0.06}
              viewWidth={0.8}
              inputWidth={0.78}
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
              viewHeight={0.06}
              viewWidth={0.8}
              inputWidth={0.78}
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
                  viewHeight={0.06}
                  viewWidth={0.8}
                  inputWidth={0.78}
                  // border={1}
                  borderColor={'#ffffff'}
                  backgroundColor={'#FFFFFF'}
                  color={Color.themeColor}
                  placeholderColor={Color.themeLightGray}
                  borderRadius={moderateScale(25, 0.3)}
                />

                <View style={styles.userTypeContainer}>
                  <View style={styles.innerContainer}>
                    <CustomText
                      isBold
                      style={[
                        styles.txt2,
                        {
                          color:
                            userRole == 'Qbid Member'
                              ? Color.black
                              : Color.white,
                        },
                      ]}>
                      Retired
                    </CustomText>
                    <TouchableOpacity
                      onPress={() => {
                        setJobStatus('Retired');
                      }}
                      activeOpacity={0.9}
                      style={[
                        styles.circle,
                        jobStatus == 'Retired' && {
                          backgroundColor: Color.themeColor,
                          borderColor: Color.white,
                        },
                      ]}></TouchableOpacity>
                  </View>
                  <View style={styles.innerContainer}>
                    <CustomText
                      isBold
                      style={[
                        styles.txt2,
                        {
                          color:
                            userRole == 'Qbid Member'
                              ? Color.black
                              : Color.white,
                        },
                      ]}>
                      Self-Employed
                    </CustomText>
                    <TouchableOpacity
                      onPress={() => {
                        setJobStatus('Self-Employed');
                      }}
                      activeOpacity={0.9}
                      style={[
                        styles.circle,
                        jobStatus == 'Self-Employed' && {
                          backgroundColor: Color.themeColor,
                          borderColor: Color.white,
                        },
                      ]}></TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            <TextInputWithTitle
              title={'Email'}
              secureText={false}
              placeholder={'Email'}
              setText={setEmail}
              value={email}
              viewHeight={0.06}
              viewWidth={0.8}
              inputWidth={0.78}
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
              viewHeight={0.06}
              viewWidth={0.8}
              inputWidth={0.78}
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
              viewHeight={0.06}
              viewWidth={0.8}
              inputWidth={0.78}
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
              viewHeight={0.06}
              viewWidth={0.8}
              inputWidth={0.78}
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
              viewHeight={0.06}
              viewWidth={0.8}
              inputWidth={0.78}
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
              viewHeight={0.06}
              viewWidth={0.8}
              inputWidth={0.78}
              backgroundColor={'#FFFFFF'}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
              // marginBottom={moderateScale(10, 0.3)}
            />
            {userRole == 'Qbid Negotiator' && (
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
                    width: windowWidth * 0.8,
                    height: windowHeight * 0.06,
                  }}
                />
                <CustomDropDownMultiSelect
                  title={'Pick Expertise'}
                  array={servicesArray}
                  item={services}
                  setItem={setServices}
                  maxHeight={windowHeight * 0.3}
                  containerStyle={{
                    width: windowWidth * 0.8,
                    height: windowHeight * 0.06,
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
              width={windowWidth * 0.8}
              height={windowHeight * 0.07}
              marginTop={moderateScale(10, 0.3)}
              // onPress={() => {
              //   dispatch(setUserToken({token: 'dasdawradawdawrtfeasfzs'}));
              // }}
              bgColor={
                userRole == 'Qbid Member' ? Color.blue : Color.themeColor
              }
              // borderColor={Color.white}
              // borderWidth={2}
              borderRadius={moderateScale(30, 0.3)}
            />
          </LinearGradient>
        </CustomModal>
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default NegotiatorPortfolio;

const styles = ScaledSheet.create({
  upperContainer: {
    width: windowWidth,
    height: windowHeight * 0.5,
    // borderRadius: moderateScale(2, 0.6),
    backgroundColor: Color.white,
    overflow: 'hidden',
  },
  image: {
    width: windowWidth * 0.25,
    height: windowWidth * 0.25,
    borderWidth: 5,
    borderColor: '#EEEEEE',
    borderRadius: moderateScale((windowWidth * 0.25) / 2, 0.6),
  },
  edit: {
    backgroundColor: Color.blue,
    width: moderateScale(30, 0.6),
    height: moderateScale(30, 0.6),
    position: 'absolute',
    bottom: moderateScale(5, 0.3),
    right: moderateScale(0, 0.3),
    borderRadius: moderateScale(15, 0.6),
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '100%',
    textAlign: 'center',
  },
  title: {
    color: '#7B8491',
    fontSize: moderateScale(12, 0.6),
  },
  subTitle: {
    color: Color.black,
    fontSize: moderateScale(13, 0.6),
  },
  lowerContainer: {
    width: windowWidth,
    paddingVertical: moderateScale(20, 0.6),
    // borderRadius: moderateScale(10, 0.3),
    backgroundColor: Color.white,
    marginTop: moderateScale(10, 0.3),
    paddingLeft: moderateScale(10, 0.6),
  },
  userTypeContainer: {
    width: windowWidth * 0.7,
    // backgroundColor : Color.red,
    paddingTop: moderateScale(20, 0.3),
    paddingBottom: moderateScale(10, 0.3),
    // marginTop: moderateScale(10, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circle: {
    height: moderateScale(14, 0.3),
    width: moderateScale(14, 0.3),
    borderRadius: moderateScale(7, 0.3),
    borderWidth: 1,
    backgroundColor: Color.white,
    borderColor: Color.themeColor,
    marginLeft: moderateScale(15, 0.3),
  },
  heading: {
    fontSize: moderateScale(12, 0.6),
    width: '48%',
  },
  innerContainer: {
    width: '48%',
    // backgroundColor : 'green',
    // paddingVertical : moderateScale(5,0.3),
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const DetailContainer = ({
  imageName,
  type,
  title,
  subtitle,
  editEnable,
  edit,
  setEdit,
}) => {
  const userRole = useSelector(state => state.commonReducer.selectedRole);

  return (
    <View
      style={{
        width: windowWidth * 0.2,
        alignItems: 'center',
      }}>
      {editEnable && userRole == 'Qbid Negotiator' && (
        <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setEdit(!edit);
        }}
          style={[
            styles.edit,
            {
              backgroundColor: '#EEEEEE',
              zIndex: 1,
              right: moderateScale(0, 0.3),
              top: 0,
              width: moderateScale(20, 0.6),
              height: moderateScale(20, 0.6),
              borderRadius: moderateScale(10, 0.6),
            },
          ]}>
          <Icon
            name={edit ? 'toggle-on' : 'toggle-off'}
            as={FontAwesome}
            style={styles.icon}
            color={Color.black}
            size={moderateScale(10, 0.3)}
            onPress={() => {
              setEdit(!edit);
            }}
          />
        </TouchableOpacity>
      )}
      <Icon
        name={imageName}
        as={type}
        color={userRole == 'Qbid Member' ? Color.blue : Color.themeColor}
        size={moderateScale(20, 0.6)}
      />
      <CustomText style={styles.title}>{title}</CustomText>
      <CustomText isBold style={styles.subTitle}>
        {subtitle}
      </CustomText>
    </View>
  );
};
