import {BackHandler, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import Color from '../Assets/Utilities/Color';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import BidDetailCard from '../Components/BidDetailCard';
import {Actionsheet, Icon} from 'native-base';
import {ScrollView} from 'react-native';
import SearchContainer from '../Components/SearchContainer';
import Entypo from 'react-native-vector-icons/Entypo';
import NegotiatorCard from '../Components/NegotiatorCard';
import MyQouteCard from '../Components/MyQouteCard';
import navigationService from '../navigationService';
import {useDispatch, useSelector} from 'react-redux';
import CustomStatusModal from '../Components/CustomStatusModal';
import LinearGradient from 'react-native-linear-gradient';
import {setUserToken} from '../Store/slices/auth';
import CustomAlertModal from '../Components/CustomAlertModal';
import { setSelectedRole } from '../Store/slices/common';

const HomeScreen = () => {
 
  const servicesArray = useSelector(state => state.commonReducer.servicesArray);
  // console.log("🚀 ~ file: HomeScreen.js:20 ~ HomeScreen ~ servicesArray", servicesArray)
  const [searchData, setSearchData] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedView, setSelectedView] = useState('');
  console.log(
    '🚀 ~ file: HomeScreen.js:27 ~ HomeScreen ~ selectedView',
    selectedView,
  );
  const [selectedService, setSelectedService] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      setVisible(true);
    });
  }, []);

  const negotiatorsArray = [
    {
      name: 'Walter A. Jones',
      rating: 4,
      expertiseIn: ['plumbing equipment'],
      description:
        'Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor',
      image: require('../Assets/Images/man1.jpg'),
    },
    {
      name: 'jpsephine A. Suarez',
      rating: 3,
      expertiseIn: ['plumbing equipment', 'test3', 'test2'],
      description:
        'Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor',
      image: require('../Assets/Images/man2.jpg'),
    },
    {
      name: 'Ronald N. Voegele',
      rating: 5,
      expertiseIn: ['plumbing equipment', 'test3', 'test2'],
      description:
        'Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor',
      image: require('../Assets/Images/man3.jpg'),
    },
    {
      name: 'Walter A. Jones',
      rating: 4,
      expertiseIn: ['plumbing equipment', 'test3', 'test2'],
      description:
        'Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor',
      image: require('../Assets/Images/man1.jpg'),
    },
  ];
  const myQoutesArray = [
    {
      qouteName: 'Car parts purchasing',
      negotiatorName: 'john marco',
      negotiatorImage: require('../Assets/Images/man1.jpg'),
      number: '12345678',
      address: 'abc street newyork , USA',
      email: 'john@gmail.com',
      Qbid_member_name: 'Chris',
      Qbid_member_email: 'chrisnevins@gmail.com',
      contact: '+1(333)111-1111',
      image:
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
      status: 'pending',
      vendorPrice: 4000,
    },
    {
      qouteName: 'Car parts',
      negotiatorName: 'john marco',
      negotiatorImage: require('../Assets/Images/man3.jpg'),
      number: '12345678',
      address: 'abc street newyork , USA',
      email: 'john@gmail.com',
      Qbid_member_name: 'Chris',
      Qbid_member_email: 'chrisnevins@gmail.com',
      contact: '+1(333)333-1111',
      image:
        'https://media.istockphoto.com/id/1021170914/photo/beautiful-landscape-in-park-with-tree-and-green-grass-field-at-morning.jpg?s=612x612&w=is&k=20&c=Qd0K-pvuKcje8CGDcJkJ3UJzHbGtGYRw8wwcbno99O4=',
      status: 'onGoing',
      vendorPrice: 4000,
      negotiatorPrice: 2000,
    },
    {
      qouteName: 'Car parts',
      negotiatorName: 'john marco',
      negotiatorImage: require('../Assets/Images/man2.jpg'),
      number: '12345678',
      address: 'abc street newyork , USA',
      email: 'john@gmail.com',
      Qbid_member_name: 'Chris',
      Qbid_member_email: 'chrisnevins@gmail.com',
      contact: '+1(333)111-222',
      image:
        'https://media.istockphoto.com/id/1216579927/photo/colorful-sunset-scenery-on-open-field.jpg?s=612x612&w=is&k=20&c=qPm0H72LjrnQ22yWKPIycy6tCQsutL230c7-Ttl8_FU=',
      status: 'completed',
      rating: 4,
      vendorPrice: 4000,
      negotiatorPrice: 2000,
    },
    {
      qouteName: 'Car parts',
      negotiatorName: 'john marco',
      negotiatorImage: require('../Assets/Images/man1.jpg'),
      number: '12345678',
      address: 'abc street newyork , USA',
      email: 'john@gmail.com',
      Qbid_member_name: 'Chris',
      Qbid_member_email: 'chrisnevins@gmail.com',
      contact: '+1(333)111-222',
      image:
        'https://media.istockphoto.com/id/1216579927/photo/colorful-sunset-scenery-on-open-field.jpg?s=612x612&w=is&k=20&c=qPm0H72LjrnQ22yWKPIycy6tCQsutL230c7-Ttl8_FU=',
      status: 'completed',
      rating: 0,
      vendorPrice: 4000,
      negotiatorPrice: 2000,
    },
  ];

  

  return (
    <ScreenBoiler
      statusBarBackgroundColor={Color.themeBgColor}
      statusBarContentStyle={'dark-content'}
      showHeader={true}
      //  showBack={true}
    >
      <LinearGradient
        style={{
          width: windowWidth,
          height: windowHeight * 0.89,
        }}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[Color.themeColor, '#83D475', '#ABE098']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: moderateScale(20, 0.3),
            paddingTop: moderateScale(40, 0.3),
          }}>
          <View
            style={{
              width: windowWidth * 0.93,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <SearchContainer
              width={windowWidth * 0.85}
              input
              inputStyle={{
                height: windowHeight * 0.05,
              }}
              style={{
                height: windowHeight * 0.06,
                marginBottom: moderateScale(10, 0.3),
                borderRadius: moderateScale(5, 0.3),
              }}
              data={searchData}
              setData={setSearchData}
            />
            <Icon
              name={'sound-mix'}
              as={Entypo}
              size={moderateScale(22, 0.3)}
              color={Color.themeDarkGray}
              onPress={() => {
                setSelectedView('negotiator');
                setIsModalVisible(true);
              }}
            />
          </View>
          <View style={styles.row}>
            <CustomText isBold style={styles.header}>
              Qbid List-Negotiator
            </CustomText>
            <CustomText
              onPress={() => {
                navigationService.navigate('SeeAllScreen', {
                  type: 'negotiator',
                });
              }}
              style={styles.viewall}>
              View all
            </CustomText>
          </View>

          <FlatList
            data={negotiatorsArray}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: moderateScale(15, 0.3),
            }}
            renderItem={({item, index}) => {
              return <NegotiatorCard item={item} />;
            }}
          />
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: Color.lightGrey,
              width: '95%',
              marginTop: moderateScale(20, 0.3),
            }}
          />
          <View style={styles.row}>
            <CustomText style={styles.header}>My Qoutes</CustomText>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: windowWidth * 0.2,
                marginRight: moderateScale(5, 0.3),
              }}>
              <CustomText
                onPress={() => {
                  navigationService.navigate('SeeAllScreen', {type: 'qoutes'});
                }}
                style={styles.viewall}>
                View all
              </CustomText>
              <Icon
                name={'sound-mix'}
                as={Entypo}
                size={moderateScale(15, 0.3)}
                color={Color.themeDarkGray}
                onPress={() => {
                  setSelectedView('myqoutes');
                  setIsModalVisible(true);
                }}
              />
            </View>
          </View>
          <FlatList
            data={myQoutesArray}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: moderateScale(15, 0.3),
              paddingTop: moderateScale(20, 0.3),
            }}
            renderItem={({item, index}) => {
              return <MyQouteCard item={item} />;
            }}
          />
        </ScrollView>
      </LinearGradient>
      <CustomStatusModal
        isModalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        statusArray={
          selectedView == 'negotiator'
            ? servicesArray
            : [{name: 'pending'}, {name: 'onGoing'}, {name: 'completed'}]
        }
        data={selectedView == 'negotiator' ? selectedService : selectedStatus}
        setData={
          selectedView == 'negotiator' ? setSelectedService : setSelectedStatus
        }
      />
      <CustomAlertModal
        isModalVisible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onOKPress={() => {
          setVisible(false);
          BackHandler.exitApp();
        }}
        title={'Are you sure !!'}
        message={'You Want to exit the App ?'}
        iconType={2}
        areYouSureAlert
      />
    </ScreenBoiler>
  );
};

export default HomeScreen;

const styles = ScaledSheet.create({
  container: {
    // height : windowHeight * 0.85,
    width: windowWidth,
    // backgroundColor: Color.themeColor,
  },
  header: {
    color: Color.black,
    fontSize: moderateScale(16, 0.3),

    width: windowWidth * 0.6,
  },
  row: {
    width: windowWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(15, 0.3),
    marginTop: moderateScale(15, 0.3),
  },
  viewall: {
    fontSize: moderateScale(12, 0.3),
    color: Color.black,
  },
});

{
  /* <FlatList
      data={[{
        companyName : 'ABC company',
        fullName : 'john marco',
        number : '12345678',
        address : 'abc street newyork , USA',
        email : 'john@gmail.com',
        Qbid_member_name : 'Chris',
        Qbid_member_email : 'chrisnevins@gmail.com',
        contact : '+1(333)111-1111',
        image : 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg'
      },
      {
        companyName : 'ABC company',
        fullName : 'john marco',
        number : '12345678',
        address : 'abc street newyork , USA',
        email : 'john@gmail.com',
        Qbid_member_name : 'Chris',
        Qbid_member_email : 'chrisnevins@gmail.com',
        contact : '+1(333)333-1111',
        image : 'https://media.istockphoto.com/id/1021170914/photo/beautiful-landscape-in-park-with-tree-and-green-grass-field-at-morning.jpg?s=612x612&w=is&k=20&c=Qd0K-pvuKcje8CGDcJkJ3UJzHbGtGYRw8wwcbno99O4='

      },
      {
        companyName : 'ABC company',
        fullName : 'john marco',
        number : '12345678',
        address : 'abc street newyork , USA',
        email : 'john@gmail.com',
        Qbid_member_name : 'Chris',
        Qbid_member_email : 'chrisnevins@gmail.com',
        contact : '+1(333)111-222',
        image : 'https://media.istockphoto.com/id/1216579927/photo/colorful-sunset-scenery-on-open-field.jpg?s=612x612&w=is&k=20&c=qPm0H72LjrnQ22yWKPIycy6tCQsutL230c7-Ttl8_FU='


      },
    ]}
      showsVerticalScrollIndicator ={false}
      contentContainerStyle={{
        paddingTop : moderateScale(20,0.3),
        paddingBottom : moderateScale(50,0.3),

      }}
      renderItem={({item , index})=>{
        return(
          <BidDetailCard item={item} />
        )
      }}
      /> */
}
