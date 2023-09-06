import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  // Image,
  ImageBackground,
  Platform,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  PanResponder,
} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../Components/CustomButton';
import {ScrollView} from 'native-base';
import {useIsFocused} from '@react-navigation/native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {validateEmail} from '../Config';
import {setSelectedRole, setUserData} from '../Store/slices/common';
import {setUserLogin, setUserToken, setWalkThrough} from '../Store/slices/auth';
import {useDispatch, useSelector} from 'react-redux';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import CustomDropDown from '../Components/CustomDropDown';
import navigationService from '../navigationService';
// import GalleryManager from 'react-native-gallery-manager';
import RNFetchBlob from 'rn-fetch-blob';
import DraggableView from 'react-native-draggable-reanimated';
import PinchZoomView from 'react-native-pinch-zoom-view';

import {useRef} from 'react';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  console.log('🚀 ~ file: Color.js:4 ~ userRole:', userRole);
  const [firstSection, setFirstSection] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedType] = useState('Qbid Member');
  const [images, setImages] = useState([]);
  console.log(
    '🚀 ~ file: LoginScreen.js:43 ~ LoginScreen ~ images:',
    images[0]?.uri,
  );
  const [baseImage, setBaseImage] = useState('');

  const servicesArray = ['Qbid Negotiator', 'Qbid Member'];

  const imageRef = useRef();
  const [scale, setScale] = useState(1);
  const [previousScale, setPreviousScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [rotate , setRotate] = useState(0);
  console.log(
    '🚀 ~ file: LoginScreen.js:57 ~ LoginScreen ~ translateX:',
    translateX,
  );
  const [translateY, setTranslateY] = useState(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      if (gesture.numberActiveTouches === 2) {
        // Pinch-to-zoom
        const distance = Math.sqrt(
          (gesture.dx - gesture.x0) ** 2 + (gesture.dy - gesture.y0) ** 2,
        );
        const newScale = previousScale * (distance / gesture.previousDistance);
        setScale(newScale);
      } else {
        // Dragging
        setTranslateX(gesture.dx);
        setTranslateY(gesture.dy);
      }
    },
    onPanResponderRelease: () => {
      setPreviousScale(scale);
    },
  });

  // const getData = async () => {
  //   GalleryManager.getAssets({
  //     type: 'image',
  //     startFrom: 0,
  //     limit: 5,
  //     // albumName : 'Camera'
  //   })
  //     .then(response => {
  //       console.log('data ===== ?? ?', response);
  //       setImages(response?.assets);
  //     })
  //     .catch(err => {
  //       // no rejects are defined currently on iOS
  //     });
  // };

  const getImageData = async () => {
    try {
      console.log('image uri =========== ??', images[0]?.uri);
      const response = await RNFetchBlob.fs.readFile(images[0]?.uri, 'base64');
      const base64Data = response;
      // return console.log("🚀 ~ file: LoginScreen.js:66 ~ getImageData ~ base64Data:", base64Data)
      setBaseImage(base64Data);
    } catch (error) {
      console.log('Error reading image:', error);
    }
  };

  useEffect(() => {
    dispatch(setSelectedRole(selectedRole));
    // getData()
  }, [selectedRole]);

  // useEffect(() => {
  //   if(images.length > 0){

  //     getImageData()
  //   }

  // }, [images])

  return (
    //   <ScreenBoiler

    //   statusBarBackgroundColor={Color.themeColor}
    //   statusBarContentStyle={"light-content"}
    <>
      <CustomStatusBar
        backgroundColor={
          userRole == 'Qbid Member' ? Color.blue : Color.themeColor
        }
        barStyle={'light-content'}
      />
      <ImageBackground
        style={{
          flex: 1,
          // justifyContent : 'center',
          alignItems: 'center',
          // width: windowWidth,
          // height: windowHeight,
        }}
        resizeMode={'stretch'}
        source={
          userRole == 'Qbid Member'
            ? require('../Assets/Images/backgroundImage.png')
            : require('../Assets/Images/backgroungNegotiator.png')
        }> 
      <ScrollView
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true} 
          contentContainerStyle={{
            alignSelf: 'center',
            alignItems: 'center',
            paddingTop: windowHeight * 0.1,
          }}
          style={{
            width: '100%',
            flexGrow: 0,
            // minHeight : windowHeight * 0.6,
            // backgroundColor : 'red',
          }}>
          <View style={[styles?.textContainer]}>
            <CustomImage
              source={
                userRole == 'Qbid Member'
                  ? require('../Assets/Images/logoSplash.png')
                  : require('../Assets/Images/logoSplash2.png')
              }
              resizeMode={'contain'}
              style={[styles.bottomImage]}
            />
          </View>

          <DropDownSingleSelect
            array={servicesArray}
            item={selectedRole}
            setItem={setSelectedType}
            placeholder={selectedRole}
            width={windowWidth * 0.9}
            dropDownHeight={windowHeight * 0.06}
            dropdownStyle={{
              width: windowWidth * 0.9,
              borderBottomWidth: 0,
              marginTop: moderateScale(30, 0.6),
            }}
          />

          <TextInputWithTitle
            titleText={'Enter your Email'}
            secureText={false}
            placeholder={'Enter your Email'}
            setText={setEmail}
            value={email}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.86}
            // border={1}
            borderColor={'#ffffff'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.6)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
          />
          <TextInputWithTitle
            titleText={'Enter your password'}
            secureText={true}
            placeholder={'Enter your password'}
            setText={setPassword}
            value={password}
            viewHeight={0.07}
            viewWidth={0.9}
            inputWidth={0.86}
            // border={1}
            // borderColor={'#1B5CFB45'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.6)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
            marginBottom={moderateScale(10, 0.3)}
          />
          <CustomText
            onPress={() => {
              navigationService.navigate('EnterPhone', {fromForgot: true});
            }}
            style={[
              styles.txt3,
              {
                color: userRole == 'Qbid Negotiator' ? Color.white : Color.blue,
                marginTop: moderateScale(20, 0.3),
              },
            ]}>
            {'Forgot Password?'}
          </CustomText>

          <CustomButton
            text={
              isLoading ? (
                <ActivityIndicator color={'#FFFFFF'} size={'small'} />
              ) : (
                'Login'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.9}
            height={windowHeight * 0.07}
            marginTop={moderateScale(10, 0.3)}
            onPress={() => {
              navigationService.navigate('AddCard');
              // handleLogin('Receptionist');
              // alert('Action to be happened')
              // navigationService.navigate('HomeScreen')
            }}
            bgColor={userRole == 'Qbid Negotiator' ? Color.themeColor  :Color.blue}
            // borderColor={Color.white}
            // borderWidth={2}
            borderRadius={moderateScale(30, 0.3)}
          />

          <View style={styles.container2}>
            <CustomText style={styles.txt5}>
              {"Don't have an account? "}
            </CustomText>

            <TouchableOpacity
              activeOpacity={0.8}
              style={{marginLeft: windowWidth * 0.01}}
              onPress={() => navigationService.navigate('Signup')}>
              <CustomText
                style={[
                  styles.txt4,
                  {
                    color:
                      userRole == 'Qbid Negotiator'
                        ? Color.themeColor
                        : Color.purple,
                  },
                ]}>
                {'Sign Up'}
              </CustomText>
            </TouchableOpacity>
          </View>
          <CustomText
            onPress={() => {
              // navigationService.navigate('EnterPhone', {fromForgot: true});
              dispatch(setWalkThrough(false));
            }}
            style={[
              styles.txt3,
              {color: userRole == 'Qbid Negotiator' ? Color.white : Color.blue},
            ]}>
            {'Quick App Tour'}
          </CustomText>
          
           {
            images.map((item , index)=>{
              return(
              
                <CustomImage 
                  // source={{ uri: `data:image/png;base64,${baseImage}` }}
                  source={{uri : item?.uri}}
                style={{
                  width : 100,
                  height :  100,
                  marginBottom : 30
                }}
                resizeMethod={'resize'}
                />
              
               
              )
            })
          }
        </ScrollView>
     
      

      </ImageBackground>
    </>
    // </ScreenBoiler>
  );
};








//  {/* <View style={{
//    flex: 1,
//    justifyContent: 'center',
//    alignItems: 'center',
//    backgroundColor: '#F5FCFF',
// }}>

//          <Svg
//         width='100%'
//         height='100%'
//         style={{ flex : 1}}
//         {...panResponder.panHandlers}
//         >
//         <Image
//           ref={imageRef}
//           href={require('../Assets/Images/user3.jpg')}
//           width={100}
//           height={100}
//           transform={`scale(${scale}) translate(${translateX}, ${translateY})`}
//           />
//       </Svg>
//       </View> */}
//       <View style={styles.container}>
//       <TransformableImage
//         source={require('../Assets/Images/user3.jpg')}
//         style={styles.image1}
//       />
//     </View>

// <ImageBackground
//         style={{
//           width: windowWidth * 0.7,
//           height: windowHeight * 0.3,
//           backgroundColor: 'blue',
//           alignSelf: 'center',
//           marginTop: windowHeight * 0.2,
//         }}
//         resizeMode={'stretch'}
//         source={require('../Assets/Images/user3.jpg')}>
//         <PinchZoomView minScale={0} maxScale={2}>
//           <CustomImage
//             style={{
//               width: windowWidth * 0.5,
//               height: windowHeight * 0.3,
//               // backgroundColor : 'red'
//             }}
//             resizeMode={'stretch'}
//             source={require('../Assets/Images/beard.png')}
//           />
//         </PinchZoomView>
//         <PinchZoomView maxScale={1} minScale={0}>
//           <CustomImage
//             style={{
//               width: windowWidth * 0.6,
//               height: windowHeight * 0.2,
//               transform: [{ rotate: `${rotate}deg`}]
//               // backgroundColor : 'red'
//             }}
//             resizeMode={'stretch'}
//             source={require('../Assets/Images/mustaches.png')}
//           />
//         </PinchZoomView>
//       </ImageBackground>
//       <CustomText isBold onPress={()=>{
//         setRotate(prev=>prev + 3)
//       }} style={{
//         fontSize : 20 ,
//         marginTop : moderateScale(50,0.3)
//       }}>Rotate Beard right</CustomText>
//       <CustomText isBold onPress={()=>{
//         setRotate(prev=>prev - 3)
//       }} style={{
//         fontSize : 20 ,
//         marginTop : moderateScale(50,0.3)
//       }}>Rotate Beard Left</CustomText>

const styles = ScaledSheet.create({
  bottomImage: {
    width: windowWidth * 0.4,
  },

  textContainer: {
    marginTop: moderateScale(20, 0.3),
  },

  Heading: {
    fontSize: moderateScale(20, 0.3),
    // fontWeight: 'bold',
    color: '#ffffff',

    alignSelf: 'flex-start',
  },

  txt3: {
    fontSize: moderateScale(10, 0.6),
    alignSelf: 'center',
    fontWeight: '600',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image1: {
    width: 200,
    height: 200,
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.9,
    // marginTop: moderateScale(10,0.3),
  },
  txt4: {
    color: Color.purple,
    fontSize: moderateScale(15, 0.6),
    marginTop: moderateScale(8, 0.3),
    fontWeight: 'bold',
  },
  txt5: {
    color: Color.white,
    marginTop: moderateScale(10, 0.3),
    fontSize: moderateScale(15, 0.6),
  },
  dropDown: {
    backgroundColor: Color.red,
  },
});

export default LoginScreen;
