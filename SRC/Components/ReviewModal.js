import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomText from '../Components/CustomText';
import {Icon} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native';

const ReviewModal = ({
  ref,
  setRef
}) => {
  // const [ref, setRef] = useState(null);s
  const rbRef = useRef();
  return (
   
      <RBSheet
        ref={ref => setRef(ref)}
        height={450}
        openDuration={250}
        customStyles={{
          container: {
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
          },
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'grey',
              width: windowWidth * 0.2,
              height: windowHeight * 0.01,
              borderRadius: 10,
              marginTop: 10,
            }}></View>
          <CustomText style={styles.Text}>
            What is you rate? </CustomText>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 20,
              // paddingLeft:95
            }}>
            <Icon
              style={styles.icon}
              name="star-o"
              as={FontAwesome}
              size={28}
              color="grey"
            />
            <Icon
              style={styles.icon}
              name="star-o"
              as={FontAwesome}
              size={28}
              color="grey"
            />
            <Icon
              style={styles.icon}
              name="star-o"
              as={FontAwesome}
              size={28}
              color="grey"
            />
            <Icon
              style={styles.icon}
              name="star-o"
              as={FontAwesome}
              size={28}
              color="grey"
            />
            <Icon
              style={styles.icon}
              name="star-o"
              as={FontAwesome}
              size={28}
              color="grey"
            />
          </View>

          <CustomText
            style={{
              width: windowWidth * 0.6,
              fontSize: 17,
              textAlign: 'center',
            }}>
            Please share your opinion about the product
          </CustomText>
          <TextInput style={styles.input} placeholder="Your review" />
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              width: windowWidth * 0.7,
              padding: 15,
              borderRadius: 30,
              alignItems: 'center',
            }}>
            <CustomText style={styles.btnText}>Send review</CustomText>
          </TouchableOpacity>
        </View>
      </RBSheet>
    
  );
};

export default ReviewModal;

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 10,
  },
  Text: {
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 30,
  },
  input: {
    backgroundColor: 'lightgrey',
    width: windowWidth * 0.9,
    height: windowHeight * 0.16,
    marginVertical: 20,
    borderRadius: 15,
    // marginHorizontal:20
  },
  btnText: {
    color: 'white',
    fontSize: 16,
  },
});
