import {ActivityIndicator, Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {Actionsheet, FlatList, Icon} from 'native-base';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomText from './CustomText';
import numeral from 'numeral';
import moment from 'moment/moment';
import CustomButton from './CustomButton';
import CustomImage from './CustomImage';
import DownloadImageModal from './DownloadImageModal';
import navigationService from '../navigationService'

const BidDetailCard = ({item}) => {
  const [completeState, setCompleteState] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible , setIsVisible] = useState(false) ;

  // const progressStepStyle = {
  //   // activeStepIconBorderColor: 'red',
  //   activeLabelColor: '#0a0d64',
  //   // activeStepIconBorderWidth : 0,
  //   // activeStepNumColor: 'white',
  //   // activeStepIconColor: '#0a0d64',
  //   // completedStepIconColor: '#0a0d64',
  //   // completedProgressBarColor: '#0a0d64',
  //   completedCheckColor: 'white',
  //   stepSize: 10,
  // };

  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          right: moderateScale(10, 0.3),
          top: moderateScale(2, 0.3),
          flexDirection: 'row',
          zIndex: 1,
        }}>
        <Icon
          name="clouddownload"
          as={AntDesign}
          size={moderateScale(25, 0.3)}
          color={Color.themeColor}
          onPress={() => {
            setIsVisible(true);
          }}
        />
        <Icon
          name="phone-square-alt"
          as={FontAwesome5Icon}
          size={moderateScale(22, 0.3)}
          color={Color.themeColor}
          style={{
            marginLeft: moderateScale(10, 0.3),
          }}
          onPress={() => {
            setIsOpen(true);
          }}
        />
      </View>
      <View style={styles.memberInfo}>
        <CustomText numberOfLines={1} style={styles.header}>
          Member info
        </CustomText>
        <CustomText
          numberOfLines={1}
          style={[styles.simpleText, {marginTop: moderateScale(5, 0.3)}]}>
          {item?.companyName}
        </CustomText>
        <CustomText numberOfLines={1} style={styles.simpleText}>
          {item?.fullName}
        </CustomText>
        <CustomText numberOfLines={1} style={styles.simpleText}>
          {item?.number}
        </CustomText>
        <CustomText numberOfLines={2} style={styles.simpleText}>
          {item?.address}
        </CustomText>

        <CustomText style={styles.email}>{item?.email}</CustomText>
      </View>
      <CustomText
        numberOfLines={1}
        style={[styles.header, {marginTop: moderateScale(10, 0.3)}]}>
        Qbid Member
      </CustomText>
      <CustomText numberOfLines={1} style={styles.simpleText}>
        {item?.Qbid_member_name}
      </CustomText>
      <CustomText
        numberOfLines={1}
        style={[
          styles.simpleText,
          {
            fontWeight: 'bold',
            textDecorationLine: 'underline',
            fontSize: moderateScale(10, 0.3),
          },
        ]}>
        {item?.Qbid_member_email}
      </CustomText>

      <TouchableOpacity
      activeOpacity={0.9}
      onPress={()=>{navigationService.navigate('QbidStatus',{data : [{title : 'Sent to Vendor' ,status : 'completed'},
      {title : 'Member Submitted QBid' ,status : 'completed'},
      {title : 'Waiting for a Negotiator' ,status : 'completed'},
      {title : 'In progress' ,status : 'non-completed'},
      {title : 'Quote sent to Member' ,status : 'non-completed'},
      {title : 'Waiting on Acceptance' ,status : 'non-completed'},
      {title : 'Declined/Completed/Cancelled/Unfinished Qbid' ,status : 'non-completed'},
    ]})}}
        style={{
          marginTop: moderateScale(10, 0.3),
          width: windowWidth * 0.82,
          // backgroundColor : 'red',
          borderTopWidth: 2,
          borderColor: Color.themeColor,
          marginTop: moderateScale(20, 0.3),
          // backgroundColor : 'red'
        }}>
        <FlatList
          horizontal={true}
          data={[
            'Completed',
            'Completed',
            'Completed',
            'non-Completed',
            'non-Completed',
            'non-Completed',
            'non-Completed',
          ]}
          style={{
            // position : 'absolute',
            // backgroundColor : 'red',
            height: windowHeight * 0.05,
            flexGrow: 0,
            marginTop: moderateScale(-8, 0.3),
            flexDirection: 'row',
          }}
          contentContainerStyle={{
            justifyContent: 'space-between',
          }}
          renderItem={({item, index}) => {
            return item == 'Completed' ? (
              <CustomImage
                source={require('../Assets/Images/check.png')}
                resizeMode={'contain'}
                style={{
                  marginLeft:
                    index == 0 ? moderateScale(0, 0.3) : windowWidth * 0.091,
                }}
                onPress={()=>{navigationService.navigate('QbidStatus',{data : [{title : 'Sent to Vendor' ,status : 'completed'},
                {title : 'Member Submitted QBid' ,status : 'completed'},
                {title : 'Waiting for a Negotiator' ,status : 'completed'},
                {title : 'In progress' ,status : 'non-completed'},
                {title : 'Quote sent to Member' ,status : 'non-completed'},
                {title : 'Waiting on Acceptance' ,status : 'non-completed'},
                {title : 'Declined/Completed/Cancelled/Unfinished Qbid' ,status : 'non-completed'},
              ]})}}
              />
            ) : (
              <Icon
                name={'checkcircle'}
                as={AntDesign}
                color={Color.themeLightGray}
                size={moderateScale(15, 0.3)}
                style={{
                  marginLeft: windowWidth * 0.091,
                }}
                onPress={()=>{navigationService.navigate('QbidStatus',{data : [{title : 'Sent to Vendor' ,status : 'completed'},
                {title : 'Member Submitted QBid' ,status : 'completed'},
                {title : 'Waiting for a Negotiator' ,status : 'completed'},
                {title : 'In progress' ,status : 'non-completed'},
                {title : 'Quote sent to Member' ,status : 'non-completed'},
                {title : 'Waiting on Acceptance' ,status : 'non-completed'},
                {title : 'Declined/Completed/Cancelled/Unfinished Qbid' ,status : 'non-completed'},
              ]})}}
              />
            );
          }}
        />
      </TouchableOpacity>
      <CustomText style={styles.blueText}>
        Vendor : {numeral(17).format('$0,0.00')}
      </CustomText>
      <CustomText
        style={[
          styles.simpleText,
          {
            marginTop: moderateScale(20, 0.3),
            fontWeight: 'bold',
            textDecorationLine: 'underline',
            fontSize: moderateScale(11, 0.3),
          },
        ]}>
        {moment().format('DD/MM/YYYY hh:mm A')}
      </CustomText>
      <View
        style={{
          position: 'absolute',
          right: moderateScale(10, 0.3),
          bottom: moderateScale(20, 0.3),
        }}>
        <CustomButton
          text={
            isLoading ? (
              <ActivityIndicator color={'#FFFFFF'} size={'small'} />
            ) : (
              'In Process'
            )
          }
          textColor={Color.blue}
          width={windowWidth * 0.25}
          height={windowHeight * 0.04}
          // marginTop={moderateScale(10, 0.3)}
          onPress={() => {}}
          bgColor={Color.white}
          borderColor={Color.blue}
          borderWidth={1}
          borderRadius={moderateScale(30, 0.3)}
          fontSize={moderateScale(12, 0.3)}
        />
        <CustomButton
          text={
            isLoading ? (
              <ActivityIndicator color={'#FFFFFF'} size={'small'} />
            ) : (
              'Qbid Details'
            )
          }
          textColor={Color.white}
          width={windowWidth * 0.25}
          height={windowHeight * 0.04}
          marginTop={moderateScale(5, 0.3)}
          onPress={() => {navigationService.navigate('QbidDetails',{data : item})}}
          bgColor={Color.blue}
          borderRadius={moderateScale(30, 0.3)}
          fontSize={moderateScale(12, 0.3)}
        />
      </View>
      <Actionsheet
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}>
        <Actionsheet.Content
          style={{
            backgroundColor: '#F2FCE4',
          }}>
          <Actionsheet.Item
            style={{
              backgroundColor: '#F2FCE4',
              height: windowHeight * 0.2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: windowWidth * 0.9,
                  backgroundColor: '#F2FCE4',
                }}>
                <View
                  style={{
                    width: moderateScale(70, 0.3),
                    height: moderateScale(70, 0.3),
                    borderRadius: moderateScale(35, 0.3),
                    backgroundColor: Color.themeColor,
                    marginRight: moderateScale(40, 0.3),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name={'telephone'}
                    as={Foundation}
                    color={'#F2FCE4'}
                    size={moderateScale(50, 0.3)}
                    style={{
                      textAlign : 'center'
                    }}
                    onPress={() => {
                     Linking.openURL(`tel:${item?.contact}`)
                    }}
                  />
                </View>
                <View
                  style={{
                    width: moderateScale(70, 0.3),
                    height: moderateScale(70, 0.3),
                    borderRadius: moderateScale(35, 0.3),
                    backgroundColor: Color.themeColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                     <Icon
                    name={'envelope'}
                    as={FontAwesome}
                    color={'#F2FCE4'}
                    size={moderateScale(40, 0.3)}
                    style={{
                      textAlign : 'center',
                    }}
                    onPress={() => {
                      Linking.openURL(`sms:${item?.contact}?body=${'Enter Your Message'}`)
                    }}
                  />

                  </View>
              </View>
            }
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
      <DownloadImageModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      url={item?.image}
      imageName={'ViewDrone.jpg'}
      />
      
    </View>
  );
};

export default BidDetailCard;

const styles = ScaledSheet.create({
  container: {
    width: windowWidth * 0.9,
    borderRadius: moderateScale(20, 0.3),
    backgroundColor: '#F8FFEE',
    height: windowHeight * 0.45,
    marginBottom: moderateScale(10, 0.3),
    paddingHorizontal: moderateScale(10, 0.3),
  },
  memberInfo: {
    borderBottomWidth: 2,
    borderColor: '#B2FF4B',
    height: '35%',
    // backgroundColor : 'red'
  },
  header: {
    color: Color.black,
    fontSize: moderateScale(12, 0.3),
    fontWeight: 'bold',
    marginTop: moderateScale(10, 0.3),
  },
  simpleText: {
    color: Color.black,
    fontSize: moderateScale(11, 0.3),
    width: '60%',
    // backgroundColor : 'red'
    // marginTop : moderateScale(10,0.3)
  },
  email: {
    position: 'absolute',
    bottom: moderateScale(5, 0.3),
    right: moderateScale(10, 0.3),
    fontSize: moderateScale(12, 0.3),
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: Color.black,
  },
  blueText: {
    color: '#0D668E',
    fontSize: moderateScale(15, 0.3),
    fontWeight: 'bold',
  },
});
