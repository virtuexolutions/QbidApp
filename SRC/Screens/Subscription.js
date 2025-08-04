import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import ScreenBoiler from '../Components/ScreenBoiler';
import SubscriptionCard from '../Components/SubscriptionCard';
import { windowWidth } from '../Utillity/utils';

const Subscription = (props) => {
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const dispatch = useDispatch()
  const user = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);
  const fromStores = props?.route?.params?.fromStores;

  const [isLoading, setIsLoading] = useState(false);
  // const getSubscription = async () =>{
  //   const url = 'auth/cuurent/plan';
  //   const params ={
  //     current_plan : user?.current_plan
  //   }

  //   setIsLoading(true)
  //   const response = await Post(url , params , apiHeader(token))
  //   setIsLoading(false);
  //   if(response != undefined){
  //     // console.log( 'here is the response ===>',response?.data);
  //     dispatch(setUserData(response?.data?.user_info))
  //     fromStores && props.navigation.goBack()
  //   }
  // }
  return (
    <ScreenBoiler
      showHeader={true}
      statusBarBackgroundColor={
        userRole == 'Qbid Member'
          ? Color.themeBgColor
          : userRole == 'Qbid Negotiator'
            ? Color.themeBgColorNegotiator
            : Color.themebgBusinessQbidder
      }
      statusBarContentStyle={'light-content'}
      headerColor={
        userRole == 'Qbid Member'
          ? Color.themeBgColor
          : userRole == 'Qbid Negotiator'
            ? Color.themeBgColorNegotiator
            : Color.themebgBusinessQbidder
      }
      showBack={true}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{

        }}
        style={{
          width: windowWidth,
          // backgroundColor : Color.white
        }}>
        <LinearGradient
          style={{
            alignItems: 'center',
            paddingBottom: moderateScale(20, 0.6)
            // height: windowHeight * 0.97 ,
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
          <CustomText style={styles.heading}>Get Started Today</CustomText>
          <CustomText style={styles.subheading}>
            {userRole == 'Qbid Member' ? 'Select your plan and benefits  ' : ' Choose Your plan in order to avail benifits accordingly'}
          </CustomText>
          <SubscriptionCard
            type={'basic'}
            price={userRole == 'Qbid Member' ? 5.00 : 10.00}
            featuresArray={[
              '2 Helps a Month',
              '2 QBIDs a Month ',
              '1 Free Month with 1 year Subscription',
              // 'Lorem ipsum dolor',
              // 'Lorem ipsum dolor',
            ]}
            // onPress={getSubscription}
            currentPlan={'basic'}
            loader={isLoading}
          />
          <SubscriptionCard
            type={'premium'}
            price={userRole == 'Qbid Member' ? 10.00 : 20.00}
            featuresArray={[
              '6 Helps a Month',
              '5 QBID Quotes a Month',
              '2 Free Months with 1 yr Subscription',
              'Can share or let a Friend use them as well',
              'All Benefits Start over Each Month No Rolls',
            ]}
            // onPress={getSubscription}
            currentPlan={'basic'}
            loader={isLoading}

          />
        </LinearGradient>
      </ScrollView>
    </ScreenBoiler>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  heading: {
    fontSize: moderateScale(20, 0.6),
    fontWeight: '700',
    marginTop: moderateScale(20, 0.3),
    color: Color.black,
  },
  subheading: {
    fontSize: moderateScale(12, 0.6),
    // fontWeight : '700',
    marginTop: moderateScale(10, 0.3),
    color: Color.white,
  },
});
