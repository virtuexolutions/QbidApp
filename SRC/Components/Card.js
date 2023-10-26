import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import CustomText from './CustomText';
import {TouchableOpacity} from 'react-native';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';
// import navigationService from '../navigationService';

const Card = ({item}) => {
  console.log("🚀 ~ file: Card.js:11 ~ Card ~ item:", item)
  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'white',
        borderRadius: 10,
      }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
        //   navigationService.navigate('MyAccounts');
        }}
        style={styles.cardstyle}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={styles.cardImage}>
            <CustomImage
              style={{
                height: '100%',
                width: '100%',
              }}
              source={require('../Assets/Images/man1.jpg')}
            />
          </View>

          <View
            style={{
              paddingHorizontal: 10,
            }}>
            <CustomText
              style={[styles.Text, {
                fontSize:17
              }]}
              isBold>
                name
             {item?.Qbid_name}
            </CustomText>

            <CustomText
              style={styles.Text}>
              qbid title
            </CustomText>
            <CustomText
              style={styles.Text}
              >
              Service type
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
    cardstyle:{
        height: windowHeight * 0.17,
        width: windowWidth * 0.9,
        paddingHorizontal: 15,
        borderRadius: 15,
        paddingVertical: 7,
        overflow: 'hidden',
      },
      cardImage:{
        
            height: windowHeight * 0.15,
            width: windowWidth * 0.24,
            overflow: 'hidden',
            borderRadius: 12,
          
      },
    Text:{fontWeight: '600',
    color: 'black',
    paddingVertical: 5,
    }
});
