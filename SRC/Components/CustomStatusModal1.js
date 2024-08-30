import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import CustomText from './CustomText';
import Color from '../Assets/Utilities/Color';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {Post} from '../Axios/AxiosInterceptorFunction';
import CustomButton from './CustomButton';

const CustomStatusModal1 = ({
  isModalVisible,
  setModalVisible,
  statusArray,
  setFilters,
  searchCards,
  text,
  filters,
}) => {
  const services = useSelector(state => state.commonReducer.servicesArray);
  const token = useSelector(state => state.authReducer.token);

  const negotiatorData = [
    {
      name: 'level',
      data: ['Bronze', 'Gold', 'Silver', 'platinum'],
    },
    {
      name: 'expertise',
      data: [
        'Auto repair',
        'plumbing Projects',
        'HAVC repair/Replacement',
        'Handyman Projects',
        'Heavy Duty Vehicles',
        'Medium duty mechanical repair diesel',
        'Roof Replacement',
        'Home Remodel',
        'Pool Builder/Remodel',
        'Power Sport Mechanical Repair',
        'Garage door install or repair',
        'Painting int/ext',
        'Carpet/tile/wood flooring',
        'Back yard Grill installs',
        'Fence repair/install',
        'Landscape projects',
        'Outdoor kitchen projects',
        'RV/cramper/repairs',
        'Concrete projects',
        'Solar installation',
        'Wedding event planners',
        'Sprinkler installation projects',
      ],
    },
  ];

  const [categoryindex, setCategoryIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <Modal
      isVisible={isModalVisible}
      hasBackdrop={true}
      onBackdropPress={() => {
        setModalVisible(false);
      }}
      backdropOpacity={0.7}
      style={{
        alignSelf: 'center',
      }}>
      <View
        style={{
          width: windowWidth * 0.95,
          // height: windowHeight * 0.5,
          paddingBottom:moderateScale(10,.3),
          borderRadius:moderateScale(10,.6),
          overflow:'hidden',
          backgroundColor: Color.white,
        }}>
        <View
          style={{
            width: windowWidth * 0.95,
            // marginTop: moderateScale(20, 0.3),
          }}>
          {negotiatorData.map((item, index) => {
            return (
              <>
                <View
                  style={{
                    width: windowWidth * 0.95,
                    alignSelf: 'center',
                    paddingVertical: moderateScale(5, 0.6),
                    backgroundColor: Color.themeColor,
                    justifyContent: 'center',
                  }}>
                  <CustomText
                    style={{
                      fontSize: moderateScale(15, 0.6),
                      // width: windowWidth * 0.5,
                      color:Color.white,
                      paddingLeft: moderateScale(10, 0.6),
                    }}>
                    {item?.name}
                  </CustomText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    paddingHorizontal: moderateScale(10, 0.6),
                    paddingVertical: moderateScale(5, 0.6),
                  }}>
                  {item?.data?.map((i, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          if (filters?.hasOwnProperty(item?.name)) {
                            if (filters[item?.name]?.includes(i)) {
                              setFilters(prev => {
                                return {
                                  ...prev,
                                  [item?.name]: prev[item?.name]?.filter(
                                    d => d != i,
                                  ),
                                };
                              });
                            } else {
                              setFilters(prev => {
                                return {...prev};
                              }, filters[item?.name]?.push(i));
                            }
                          } else {
                            setFilters(prev => {
                              return {...prev, [item?.name]: [i]};
                            });
                          }
                        }}
                        style={{
                          
                          marginVertical: moderateScale(5, 0.6),
                          marginHorizontal: moderateScale(5, 0.3),
                          padding: moderateScale(5, 0.6),
                          borderWidth: moderateScale(1, 0.3),
                          borderColor: Color.blue,
                          borderRadius: moderateScale(5, 0.3),
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: filters[item?.name]?.includes(i)
                            ? Color.blue
                            : 'transparent',
                        }}>
                        <CustomText
                          style={{
                            fontSize: moderateScale(10, 0.6),
                            color: filters[item?.name]?.includes(i)
                              ? '#fff'
                              : '#000',
                          }}>
                          {i}
                        </CustomText>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </>
            );
          })}
        </View>
        <CustomButton
          isBold
          text={'Done'}
          textColor={Color.white}
          width={windowWidth * 0.25}
          height={windowHeight * 0.04}
          marginTop={moderateScale(10, 0.3)}
          bgColor={Color.themeColor}
          borderRadius={moderateScale(30, 0.3)}
          fontSize={moderateScale(11, 0.6)}
          onPress={() => {    
            searchCards() 
            setModalVisible(false);
          }}
        />
      </View>
    </Modal>
  );
};

export default CustomStatusModal1;

const styles = ScaledSheet.create({
  statusModal: {
    alignSelf: 'center',
    // height : windowHeight * 0.5,
    width: windowWidth * 0.9,
    // paddingHorizontal: moderateScale(10, 0.3),
    backgroundColor: Color.white,
    borderRadius: moderateScale(5, 0.3),
    overflow: 'hidden',
    // marginTop: moderateScale(60, 0.3),
    // borderWidth: 1,
    borderColor: Color.themeBlack,
  },

  item: {
    flexBasis: '27%',
    marginRight: moderateScale(15, 0.3),
    paddingVertical: moderateScale(12, 0.6),
    marginBottom: moderateScale(10, 0.3),
    borderWidth: moderateScale(1, 0.3),
    borderColor: Color.veryLightGray,
    borderRadius: moderateScale(5, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemText: {
    fontSize: moderateScale(10, 0.6),
  },
  selectedItem: {
    backgroundColor: 'black',
  },
  selectedItemText: {
    color: 'white',
  },
});
