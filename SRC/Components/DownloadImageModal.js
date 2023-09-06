import { ActivityIndicator, PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import { windowHeight, windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import CustomText from './CustomText'
import CustomButton from './CustomButton'
import ImageView from "react-native-image-viewing" ;
import RNFetchBlob from 'rn-fetch-blob';


const DownloadImageModal = ({isVisible , setIsVisible , imageName , url}) => {
    const [visible , setVisible] = useState(false)


    const checkPermission = async () => {
    
        // Function to check the platform
        // If iOS then start downloading
        // If Android then ask for permission
    
        if (Platform.OS === 'ios') {
          downloadImage();
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'Storage Permission Required',
                message:
                  'App needs access to your storage to download Photos',
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              // Once user grant the permission start downloading
              console.log('Storage Permission Granted.');
              downloadImage();
            } else {
              // If permission denied then show alert
              alert('Storage Permission Not Granted');
            }
          } catch (err) {
            // To handle permission related exception
            console.warn(err);
          }
        }
      };
    
      const downloadImage = () => {
        // Main function to download the image
        
        // To add the time suffix in filename
        let date = new Date();
        // Image URL which we want to download
        let image_URL = url;    
        // Getting the extention of the file
        let ext = getExtention(image_URL);
        ext = '.' + ext[0];
        // Get config and fs from RNFetchBlob
        // config: To pass the downloading related options
        // fs: Directory path where we want our image to download
        const { config, fs } = RNFetchBlob;
        let PictureDir = fs.dirs.PictureDir;
        let options = {
          fileCache: true,
          addAndroidDownloads: {
            // Related to the Android only
            useDownloadManager: true,
            notification: true,
            path:
              PictureDir +
              '/image_' + 
              Math.floor(date.getTime() + date.getSeconds() / 2) +
              ext,
            description: 'Image',
          },
        };
        config(options)
          .fetch('GET', image_URL)
          .then(res => {
            // Showing alert after successful downloading
            console.log('res -> ', JSON.stringify(res));
            alert('Image Downloaded Successfully.');
          });
      };
    
      const getExtention = filename => {
        // To get the file extension
        return /[.]/.exec(filename) ?
                 /[^.]+$/.exec(filename) : undefined;
      };


  return (
  <Modal isVisible={isVisible}
  hasBackdrop={true}
  onBackdropPress={()=>{
    // setIsVisible(false)
  }}
  style={{
    justifyContent : 'center',
    alignItems : 'center'
  }}
  >
    <View style={styles.container}>

    <CustomText style={styles.text} >{`please select any option to get the file \n ${imageName}`}</CustomText>
    <View
        style={{
        flexDirection : 'row',
        marginTop : moderateScale(10,0.3),
        width : windowWidth * 0.55,
        justifyContent : 'space-between'
        }}>
        <CustomButton
          text={'Download'}
          textColor={'#0D6992'}
          width={windowWidth * 0.25}
          height={windowHeight * 0.04}
          // marginTop={moderateScale(10, 0.3)}
          onPress={checkPermission}
          bgColor={'#F2FCE4'}
          borderColor={'#0D6992'}
          borderWidth={1}
          borderRadius={moderateScale(30, 0.3)}
          fontSize={moderateScale(12, 0.3)}
        />
        <CustomButton
          text={'Open'}
          textColor={'#0D6992'}
          width={windowWidth * 0.25}
          height={windowHeight * 0.04}
          onPress={() => {setVisible(true)}}
          bgColor={'#F2FCE4'}
          borderColor={'#0D6992'}
          borderWidth={1}
          borderRadius={moderateScale(30, 0.3)}
          fontSize={moderateScale(12, 0.3)}

        />
      </View>
      <CustomButton
          text={'Cancel'}
          textColor={Color.white}
          width={windowWidth * 0.25}
          height={windowHeight * 0.04}
          onPress={() => { setIsVisible(false)}}
          bgColor={'#00ADEF'}
          marginTop ={moderateScale(20,0.3)}
          borderRadius={moderateScale(30, 0.3)}
          fontSize={moderateScale(12, 0.3)}
        />
    </View>
    <ImageView
      images={[{uri : url}]}
      visible={visible}
      onRequestClose={() => setVisible(false)}
      />

  </Modal>
  )
}

export default DownloadImageModal

const styles = ScaledSheet.create({
    container : {
        width : windowWidth * 0.9,
        height : windowHeight * 0.37,
        borderRadius : moderateScale(25,0.3),
        borderWidth : 2,
        borderColor : Color.themeColor,
        backgroundColor : '#F2FCE4',
        justifyContent : 'center',
        alignItems : 'center'
    },
    text : {
        fontWeight : 'bold',
        fontSize : moderateScale(15,0.3),
        color : Color.black,
        textAlign : 'center',
        lineHeight : moderateScale(40,0.3)
    },
})