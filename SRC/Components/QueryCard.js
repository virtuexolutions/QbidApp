import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { windowWidth } from '../Utillity/utils'
import { TouchableOpacity } from 'react-native'
import CustomImage from './CustomImage'
import CustomText from './CustomText'
import { moderateScale } from 'react-native-size-matters'

const QueryCard = ({
    image, name, query, date, onPress
}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{
            width: windowWidth * 0.9,
            height: windowWidth * 0.2,
            backgroundColor: 'rgba(235, 235, 235,0.5)',
            borderRadius: moderateScale(12, 0.6),
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: moderateScale(10, 0.6),
            marginTop: moderateScale(10, 0.6)
        }}>
            <View style={{
                width: moderateScale(50, 0.6),
                height: moderateScale(50, 0.6),
                backgroundColor: 'red',
                borderRadius: windowWidth
            }}>
                <CustomImage source={image} style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: windowWidth
                }} />
            </View>
            <View style={{
                width: '80%',
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: "center"
                }}>
                    <CustomText isBold style={{
                        fontSize: moderateScale(14, 0.6),
                        color: Color.black
                    }}>{name}</CustomText>
                    <CustomText style={{
                        fontSize: moderateScale(11, 0.6),
                        color: Color.blue
                    }}>{date}</CustomText>
                </View>
                <CustomText style={{
                    fontSize: moderateScale(12, 0.6),
                    color: Color.darkGray
                }}>{query}</CustomText>
            </View>
        </TouchableOpacity>
    )
}

export default QueryCard

const styles = StyleSheet.create({})