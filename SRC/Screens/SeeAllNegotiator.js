import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
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
import CustomStatusModal from '../Components/CustomStatusModal';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import JobCard from '../Components/JobCard';

const SeeAllNegotiator = props => {
  const servicesArray = useSelector(state => state.commonReducer.servicesArray);
  const userRole = useSelector(state => state.commonReducer.selectedRole);


  const type = props?.route?.params?.type;

  const [searchData, setSearchData] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  console.log('🚀 ~ file: SeeAllNegotiator.js:6 ~ SeeAllNegotiator ~ type', type);
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
      statusBarBackgroundColor={userRole == 'Qbid Member'
      ? Color.themeBgColor
      : userRole == 'Qbid Negotiator'
      ? Color.themeBgColorNegotiator
      : Color.themebgBusinessQbidder}
      statusBarContentStyle={'light-content'}
      showHeader={true}
      showBack={true}
      headerColor={userRole == 'Qbid Member'
      ? Color.themeBgColor
      : userRole == 'Qbid Negotiator'
      ? Color.themeBgColorNegotiator
      : Color.themebgBusinessQbidder}
      >
         <LinearGradient
        style={{
          height: windowHeight * 0.96,
        }}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={userRole == 'Qbid Member'
        ? Color.themeBgColor
        : userRole == 'Qbid Negotiator'
        ? Color.themeBgColorNegotiator
        : Color.themebgBusinessQbidder}>
     
        <View
          style={{
            width: windowWidth * 0.93,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf : 'center'
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
            color={Color.lightGrey}
            onPress={() => {
                setIsModalVisible(true)
            }}
          />
        </View>
        
        <FlatList
          data={[1,2,3,4,5,6,7,8]}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            width : windowWidth,
            alignItems : 'center',
            // paddingHorizontal: moderateScale(15, 0.3),
            paddingTop: moderateScale(20, 0.6),
            paddingBottom : moderateScale(40,0.6),
          }}
          renderItem={({item, index}) => {
            console.log(index % 2 == 0)
            return(
                <JobCard fromSeeAll={true} style={index % 2 == 0 && {marginRight : moderateScale(7,0.3)}} />
            )
          }}
          ListHeaderComponent={()=>{
            return(
              <CustomText style={styles.header}>
             {type}
            </CustomText>
            )
          }}
        />
      {/* </ScrollView> */}
      <CustomStatusModal
        isModalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        statusArray={
          type == 'negotiator'
            ? servicesArray
            : [{name: 'pending'}, {name: 'onGoing'}, {name: 'completed'}]
        }
        data={selectedStatus}
        setData={setSelectedStatus}
      />
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default SeeAllNegotiator;

const styles = ScaledSheet.create({
 
  header: {
    color: Color.white,
    fontSize: moderateScale(20, 0.3),
    fontWeight: 'bold',
    width: windowWidth * 0.9,

  },


});
