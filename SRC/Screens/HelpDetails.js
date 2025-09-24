import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
    ScrollView,
    View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import ScreenBoiler from '../Components/ScreenBoiler';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';

const HelpDetails = props => {
    const data = props?.route?.params?.data;
    const user = useSelector(state => state.commonReducer.userData);
    const token = useSelector(state => state.authReducer.token);
    const userRole = useSelector(state => state.commonReducer.selectedRole);
    const UserCoverLetterArray = useSelector(
        state => state.commonReducer.servicesArray,
    );
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();


    return (
        <ScreenBoiler
            hideUser={false}
            showHeader={true}
            showBack={true}
            statusBarBackgroundColor={Color.themebgBusinessQbidder}
            statusBarContentStyle={'light-content'}
            headerColor={Color.themebgBusinessQbidder}>
            <ScrollView
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                style={styles.sectionContainer}
                contentContainerStyle={
                    {
                        backgroundColor: 'red'
                    }
                }>
                <LinearGradient
                    style={{
                        height: windowHeight * 0.97,
                        paddingBottom: moderateScale(80, 0.6),
                        paddingTop: moderateScale(40, 0.6),
                        paddingLeft: moderateScale(15, 0.6),
                    }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={
                        userRole == 'Qbid Member'
                            ? Color.themeBgColor
                            : userRole == 'Qbid Negotiator'
                                ? Color.themeBgColorNegotiator
                                : Color.themebgBusinessQbidder
                    }>
                    <View style={{
                        width: windowWidth * 0.93,
                        height: windowWidth * 0.22,
                        backgroundColor: 'rgba(155, 155, 155, 0.8)',
                        borderRadius: moderateScale(10, 0.6),
                        justifyContent: "center",
                        paddingHorizontal: moderateScale(10, 0.6),
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            width: windowWidth * 0.16,
                            height: windowWidth * 0.16,
                            backgroundColor: Color.white,
                            borderRadius: windowWidth,

                        }}>
                            <CustomImage source={{ uri: data?.user_info?.photo }} style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: windowWidth
                            }} />
                        </View>
                        <View style={{
                            marginLeft: moderateScale(10, 0.6)
                        }}>
                            <CustomText isBold style={{
                                fontSize: moderateScale(15, 0.6),
                                color: Color.black,
                            }}>{data?.user_info?.first_name + data?.user_info?.last_name}</CustomText>
                            <CustomText style={{
                                fontSize: moderateScale(12, 0.6),
                                color: Color.black,
                            }}>{data?.user_info?.email}</CustomText>
                        </View>
                    </View>

                    <CustomText isBold style={{ fontSize: moderateScale(16, 0.6), color: Color.white, marginTop: moderateScale(10, 0.6) }}>title : </CustomText>
                    <CustomText style={{ fontSize: moderateScale(12, 0.6), color: Color.lightGrey }}>{data?.title}</CustomText>

                    <CustomText isBold style={{ fontSize: moderateScale(16, 0.6), color: Color.white, marginTop: moderateScale(10, 0.6) }}>description : </CustomText>
                    <CustomText style={{ fontSize: moderateScale(12, 0.6), color: Color.lightGrey }}>{data?.description}</CustomText>
                    <View style={[styles.row, { marginTop: moderateScale(10, 0.6) }]}>
                        <CustomText isBold style={{ fontSize: moderateScale(16, 0.6), color: Color.white }}>negotiator tip : </CustomText>
                        <CustomText style={{ fontSize: moderateScale(12, 0.6), color: Color.lightGrey }}>{data?.negotiator_tip}</CustomText>
                    </View>
                    <View style={[styles.row, { marginTop: moderateScale(10, 0.6) }]}>
                        <CustomText isBold style={{ fontSize: moderateScale(16, 0.6), color: Color.white }}>negotiator Offer Price : </CustomText>
                        <CustomText style={{ fontSize: moderateScale(12, 0.6), color: Color.lightGrey }}>{data?.offered_price}</CustomText>
                    </View>

                    <View style={[styles.row, { marginTop: moderateScale(10, 0.6) }]}>
                        <CustomText isBold style={{ fontSize: moderateScale(16, 0.6), color: Color.white }}>Service preference : </CustomText>
                        <CustomText style={{ fontSize: moderateScale(13, 0.6), color: Color.lightGrey }}>{data?.service_preference}</CustomText>
                    </View>

                    <View style={[styles.row, { marginTop: moderateScale(10, 0.6) }]}>
                        <CustomText isBold style={{ fontSize: moderateScale(16, 0.6), color: Color.white }}>State : </CustomText>
                        <CustomText style={{ fontSize: moderateScale(12, 0.6), color: Color.lightGrey, textTransform: 'uppercase' }}>{data?.state}</CustomText>
                    </View>

                    <View style={[styles.row, { marginTop: moderateScale(10, 0.6) }]}>
                        <CustomText isBold style={{ fontSize: moderateScale(16, 0.6), color: Color.white }}>City : </CustomText>
                        <CustomText style={{ fontSize: moderateScale(12, 0.6), color: Color.lightGrey }}>{data?.city}</CustomText>
                    </View>
                </LinearGradient>
            </ScrollView>
        </ScreenBoiler>
    );
};

export default HelpDetails;

const styles = ScaledSheet.create({
    desc: {
        width: windowWidth * 0.9,
        lineHeight: moderateScale(20, 0.3),
        color: Color.white,
        fontSize: moderateScale(10, 0.6),
        marginTop: moderateScale(20, 0.3),
    },
    reviewCard: {
        borderWidth: 1,
        borderColor: Color.white,
        width: '95%',
        padding: moderateScale(10, 0.6),
        flexDirection: 'row',
    },
    review_imageContainer: {
        height: windowHeight * 0.07,
        width: windowHeight * 0.07,
        borderRadius: (windowHeight * 0.07) / 2,
        overflow: 'hidden',
    },
    review_text: {
        fontSize: moderateScale(15, 0.6),
        color: Color.white,
        paddingHorizontal: moderateScale(10, 0.6),
        paddingVertical: moderateScale(5, 0.6),
    },
    imagesContainer: {
        marginTop: moderateScale(10, 0.3),
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignSelf: 'center',
    },
    addImageContainer: {
        marginTop: moderateScale(10, 0.3),
        width: windowWidth * 0.14,
        backgroundColor: Color.white,
        borderRadius: moderateScale(5, 0.3),
        borderWidth: 2,
        borderColor: Color.blue,
        height: windowHeight * 0.07,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: moderateScale(10, 0.3),
        shadowColor: Color.themeColor,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
        overflow: 'hidden',
    },
    attachmentContainer: {
        backgroundColor: Color.white,
        borderColor: Color.black,
        borderWidth: 1,
        height: windowHeight * 0.08,
        width: windowHeight * 0.13,
        borderRadius: moderateScale(10, 0.6),
        textAlign: 'center',
        alignItems: 'center',
        marginRight: moderateScale(10, 0.3),
    },
    row: {
        flexDirection: 'row',
        width: windowWidth * 0.95,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    title: {
        fontSize: moderateScale(15, 0.6),
        color: '#353434',
        width: windowWidth * 0.9,
        marginleft: moderateScale(10, 0.3),
        marginTop: moderateScale(15, 0.3),
    },
    statusbtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: windowWidth * 0.55,
        alignSelf: 'center',
        paddingVertical: moderateScale(5, 0.6),
        alignItems: 'center',
        marginBottom: moderateScale(5, 0.6),
    },
    noData: {
        width: windowWidth * 0.95,
        height: windowHeight * 0.18,
        alignItems: 'center',
    },
    h1View: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: moderateScale(16, 0.6),
    },
    h1: {
        color: Color.white,
        fontSize: moderateScale(17, 0.6),
        marginVertical: moderateScale(20, 0.3),
    },
    priceBox: {
        marginTop: moderateScale(10, 0.6),
        padding: moderateScale(5, 0.6),
        height: windowHeight * 0.05,
        paddingHorizontal: moderateScale(10, 0.6),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(10, 0.6),
    },
    modalView: {
        width: windowWidth * 0.9,
        height: windowHeight * 0.95,
        borderRadius: moderateScale(15, 0.3),
        backgroundColor: '#f2fce4',
    },
    bidView: {
        flexDirection: 'row',
        width: windowWidth * 0.8,
        paddingHorizontal: moderateScale(10, 0.6),
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        paddingVertical: moderateScale(15, 0.6),
    },
    detailText: {
        color: Color.white,
        fontSize: moderateScale(17, 0.6),
        marginVertical: moderateScale(10, 0.3),
    },
    view: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ImageView: {
        width: moderateScale(60, 0.3),
        height: moderateScale(50, 0.3),
        borderRadius: moderateScale(10, 0.3),
        overflow: 'hidden',
    },
    text: {
        color: Color.white,
        fontSize: moderateScale(17, 0.6),
    },
    row2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    txt: {
        color: Color.white,
        fontSize: moderateScale(14, 0.6),
        marginBottom: moderateScale(10, 0.3),
        marginTop: moderateScale(20, 0.3),
    },
    bidrow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: moderateScale(15, 0.6),
    },
    bidtxt: {
        color: Color.white,
        fontSize: moderateScale(13, 0.6),
        marginBottom: moderateScale(10, 0.3),
        marginTop: moderateScale(20, 0.3),
        color: Color.blue,

    },
    bidlength: {
        color: Color.white,
        fontSize: moderateScale(13, 0.6),
        marginBottom: moderateScale(10, 0.3),
        marginTop: moderateScale(20, 0.3),
        color: Color.white,
        marginLeft: moderateScale(7, 0.6),
    },
});
