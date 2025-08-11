import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal';
import { moderateScale } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
import RatingComponent from './RatingComponent';
import { useSelector } from 'react-redux';
import ImageView from 'react-native-image-viewing';
import CustomButton from './CustomButton';
import { Post } from '../Axios/AxiosInterceptorFunction';

const BidDetailsModal = ({ show, setShow, data }) => {
    console.log("🚀 ~ BidDetailsModal ~ data:", data)
    const userRole = useSelector(state => state.commonReducer.selectedRole);
    const token = useSelector(state => state.authReducer.token);
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const imagesArray = data?.images?.map((item, index) => {
        return { uri: item?.image };
    });
    const [isLoading, setIsLoading] = useState(false);

    const arrayImage = [
        {
            id: 1,
            image: require('../Assets/Images/dummyman1.png')
        },
        {
            id: 2,
            image: require('../Assets/Images/dummyman1.png')
        },
        {
            id: 3,
            image: require('../Assets/Images/dummyman1.png')
        }, {
            id: 4,
            image: require('../Assets/Images/dummyman1.png')
        }
    ]

    const changeStatus = async (value, id) => {
        const url = `auth/member/bid/${id}`;
        setIsLoading(true);
        const response = await Post(url, { status: value }, apiHeader(token));
        setIsLoading(false);
        if (response != undefined) {
            setShow(false)
        }
    };


    return (
        <Modal
            isVisible={show}
            swipeDirection="up"
            onBackdropPress={() => {
                setShow(false);
            }}>
            <View style={styles.container}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <View style={{
                        width: moderateScale(80, 0.3),
                        height: moderateScale(80, 0.3),
                        borderRadius: moderateScale(10, 0.3),
                        overflow: 'hidden',
                    }}>
                        <CustomImage
                            source={
                                data?.images?.length > 0
                                    ? { uri: data?.images[0]?.image }
                                    : require('../Assets/Images/dummyman1.png')
                            }
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    </View>
                    <View
                        style={{
                            marginLeft: moderateScale(5, 0.3),
                        }}>
                        <CustomText
                            isBold
                            style={{
                                color: Color.black,
                                fontSize: moderateScale(17, 0.6),
                            }}>
                            {data?.user_info?.company_name}
                        </CustomText>
                        <CustomText
                            style={{
                                color: Color.black,
                                fontSize: moderateScale(11, 0.6),
                            }}>
                            {data?.expertise}
                        </CustomText>
                        <RatingComponent
                            disable={true}
                            rating={data?.rating}
                            starColor={'#ffa534'}
                            starStyle={{
                                marginRight: moderateScale(1, 0.3),
                                marginTop: moderateScale(1, 0.3),
                            }}
                            starSize={moderateScale(9, 0.3)}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            position: 'absolute',
                            // bottom: moderateScale(10, 0.3),
                            right: moderateScale(10, 0.3),
                            alignItems: 'center',
                        }}>
                        <View
                            style={{
                                width: moderateScale(6, 0.6),
                                height: moderateScale(6, 0.6),
                                borderRadius: moderateScale(3, 0.6),
                                backgroundColor:
                                    userRole == 'Qbid Member'
                                        ? Color.blue
                                        : userRole == 'Qbid Negotiator'
                                            ? Color.themeColor
                                            : Color.black,
                            }}
                        />
                        <CustomText
                            style={{
                                fontSize: moderateScale(8, 0.6),
                                color: Color.black,
                                marginLeft: moderateScale(3, 0.3),
                            }}>
                            {data?.status}
                        </CustomText>
                    </View>
                </View>
                <CustomText
                    numberOfLines={4}
                    style={[
                        {
                            fontSize: moderateScale(12, 0.6),
                            marginTop: moderateScale(10, 0.3),
                            width: '100%',
                            color: Color.darkGray,
                        },
                    ]}>
                    {data?.coverletter}
                </CustomText>

                <CustomText isBold style={{
                    fontSize: moderateScale(18, 0.6),
                    color: Color.blue,
                    marginTop: moderateScale(10, 0.6)
                }}>User Info</CustomText>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: windowWidth * 0.85,
                        height: windowWidth * 0.5,
                        backgroundColor: 'rgba(242, 241, 237, 0.5)',
                        padding: moderateScale(10, 0.5),
                        borderRadius: moderateScale(10, 0.6)
                    }}>
                        <CustomText isBold style={{ fontSize: moderateScale(12, 0.6), color: Color.black }}>Qbidder profile image :</CustomText>
                        <View style={{
                            width: windowWidth * 0.16,
                            height: windowWidth * 0.15,
                            backgroundColor: "red",
                            borderRadius: moderateScale(10, 0.6)
                        }}>
                            <CustomImage source={{ uri: data?.user_info?.photo }} style={{
                                width: '100%',
                                height: '100%',
                            }} />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginTop: moderateScale(5, 0.6)
                        }}>
                            <CustomText isBold style={{ fontSize: moderateScale(12, 0.6), color: Color.black }}>Qbidder Full Name :</CustomText>
                            <CustomText style={{ fontSize: moderateScale(12, 0.6), color: Color.black, marginLeft: moderateScale(6, 0.6) }}>{data?.user_info?.first_name + data?.user_info?.last_name}</CustomText>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginTop: moderateScale(5, 0.6)
                        }}>
                            <CustomText isBold style={{ fontSize: moderateScale(12, 0.6), color: Color.black }}>Qbidder Full Name :</CustomText>
                            <CustomText style={{ fontSize: moderateScale(12, 0.6), color: Color.black, marginLeft: moderateScale(6, 0.6) }}>{data?.user_info?.address}</CustomText>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginTop: moderateScale(5, 0.6)

                        }}>
                            <CustomText isBold style={{ fontSize: moderateScale(12, 0.6), color: Color.black }}>Qbidder Language :</CustomText>
                            <CustomText style={{ fontSize: moderateScale(12, 0.6), color: Color.black, marginLeft: moderateScale(6, 0.6) }}>
                                {data?.user_info?.language
                                    ? JSON.parse(data.user_info.language).join(', ')
                                    : '—'}
                            </CustomText>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginTop: moderateScale(5, 0.6)
                        }}>
                            <CustomText isBold style={{ fontSize: moderateScale(12, 0.6), color: Color.black }}>Qbidder expertise :</CustomText>
                            <CustomText style={{ fontSize: moderateScale(12, 0.6), color: Color.black, marginLeft: moderateScale(6, 0.6) }}>
                                {data?.user_info?.expertise
                                    ? JSON.parse(data.user_info.expertise).join(', ')
                                    : '—'}
                            </CustomText>
                        </View>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    {data?.images?.length > 0 && (
                        <CustomText
                            isBold
                            style={{
                                color: Color.blue,
                                fontSize: moderateScale(14, 0.6),
                                marginTop: moderateScale(10, 0.3),
                            }}>
                            Attachments
                        </CustomText>
                    )}
                    <CustomText
                        onPress={() => {
                            setImageModalVisible(true);
                        }}
                        isBold
                        style={{
                            color: Color.blue,
                            fontSize: moderateScale(16, 0.6),
                            marginTop: moderateScale(10, 0.3),
                        }}>
                        {"$ " + data?.price}
                    </CustomText>
                </View>
                <FlatList
                    data={data?.images}
                    ListEmptyComponent={<CustomText>no data found</CustomText>}
                    horizontal
                    renderItem={(({ item, index }) => {
                        console.log("🚀 ~ item:", item)
                        return (
                            <TouchableOpacity onPress={() => setImageModalVisible(true)} style={{
                                width: windowWidth * 0.19,
                                height: windowWidth * 0.2,
                                marginTop: moderateScale(10, 0.6),
                                marginRight: moderateScale(10, 0.6),
                                borderRadius: moderateScale(10, 0.6)
                            }}>
                                <CustomImage source={
                                    data?.images?.length > 0
                                        ? { uri: item.image }
                                        : require('../Assets/Images/dummyman1.png')
                                } style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: moderateScale(10, 0.6)
                                }} />
                            </TouchableOpacity>
                        )
                    })}
                />
                <ImageView
                    images={imagesArray}
                    imageIndex={0}
                    visible={imageModalVisible}
                    onRequestClose={() => setImageModalVisible(false)}
                />
                <>
                    {data?.status == 'pending' && (
                        <View style={styles.statusbtn}>
                            <CustomButton
                                isBold
                                text={
                                    isLoading ? (
                                        <ActivityIndicator
                                            color={'white'}
                                            size={moderateScale(20, 0.6)}
                                        />
                                    ) : (
                                        'Accept'
                                    )
                                }
                                textColor={Color.white}
                                width={windowWidth * 0.32}
                                height={windowHeight * 0.04}
                                bgColor={
                                    userRole == 'Qbid Member'
                                        ? Color.blue
                                        : userRole == 'Qbid Negotiator'
                                            ? Color.themeColor
                                            : Color.black
                                }
                                borderRadius={moderateScale(20, 0.3)}
                                fontSize={moderateScale(11, 0.6)}
                                onPress={() => {
                                    changeStatus('accept', data?.id);
                                }}
                            />
                            <CustomButton
                                isBold
                                text={'Decline'}
                                textColor={Color.white}
                                width={windowWidth * 0.32}
                                height={windowHeight * 0.04}
                                bgColor={
                                    userRole == 'Qbid Member'
                                        ? Color.blue
                                        : userRole == 'Qbid Negotiator'
                                            ? Color.themeColor
                                            : Color.black
                                }
                                borderRadius={moderateScale(20, 0.3)}
                                fontSize={moderateScale(11, 0.6)}
                                onPress={() => {
                                    changeStatus('reject', data?.id);
                                }}
                            />
                        </View>
                    )}

                </>
            </View>
        </Modal>
    )
}

export default BidDetailsModal

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        width: windowWidth * 0.9,
        height: windowHeight * 0.7,
        backgroundColor: Color.white,
        paddingHorizontal: moderateScale(10, 0.6),
        paddingVertical: moderateScale(20, 0.6)
    },
    statusbtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: windowWidth * 0.7,
        alignSelf: 'center',
        paddingVertical: moderateScale(5, 0.6),
        alignItems: 'center',
        marginBottom: moderateScale(5, 0.6),
    },
})