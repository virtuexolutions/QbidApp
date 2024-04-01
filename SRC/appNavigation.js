import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationService from './navigationService';
import {useSelector} from 'react-redux';
import LoginScreen from './Screens/LoginScreen';
import Color from './Assets/Utilities/Color';
import ChatScreen from './Screens/ChatScreen';
import NotificationScreen from './Screens/NotificationScreen';
import HomeScreen from './Screens/HomeScreen';
import Settings from './Screens/Settings';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {moderateScale} from 'react-native-size-matters';
import {View} from 'react-native';
import CreateNew from './Screens/CreateNew';
import QbidStatus from './Screens/QbidStatus';
import QbidDetails from './Screens/QbidDetails';
import Walkthrough from './Screens/Walkthrough';
import Signup from './Screens/Signup';
import SeeAllScreen from './Screens/SeeAllScreen';
import EnterPhone from './Screens/EnterPhone';
import VerifyNumber from './Screens/VerifyNumber';
import ResetPassword from './Screens/ResetPassword';
import AddCard from './Screens/AddCard';
import PaymentMethod from './Screens/PaymentMethod';
import NegotiatorHomeScreen from './Screens/NegotiatorHomeScreen';
import SeeAllNegotiator from './Screens/SeeAllNegotiator';
import Subscription from './Screens/Subscription';
import JobDetails from './Screens/JobDetails';
import NegotiatorPortfolio from './Screens/NegotiatorPortfolio';
import MyAccounts from './Screens/MyAccounts';
import ChangePassword from './Screens/ChangePassword';
import TermsAndConditions from './Screens/TermsAndConditions';
import Support from './Screens/Support';
import MileRange from './Screens/MileRange';
import DrawerScreen from './Screens/DrawerScreen';
import YourJobes from './Screens/YourJobes';
import CompleteJobes from './Screens/CompleteJobes';
import CreateNewHelp from './Screens/CreateNewHelp';

const AppNavigator = () => {
  // const isLogin = false;
  const isGoalCreated = useSelector(state => state.authReducer.isGoalCreated);
  const walkThrough = useSelector(state => state.authReducer.userWalkThrough);
  const isVerified = useSelector(state => state.authReducer.isVerified);
  const token = useSelector(state => state.authReducer.token);
  // console.log("🚀 ~ file: appNavigation.js:52 ~ AppNavigator ~ token:", token)
  const selectedRole = useSelector(state => state.commonReducer.selectedRole);
  console.log("🚀 ~ file: appNavigation.js:53 ~ AppNavigator ~ selectedRole:", selectedRole)
  const isMileage = useSelector(state => state.authReducer.isMileage)

  const RootNav = createNativeStackNavigator();
  const RootNavLogged = createNativeStackNavigator();

  const AppNavigatorContainer = () => {
    const firstScreen =
      walkThrough == false
        ? 'Walkthrough'
        : (token != null && selectedRole == 'Business Qbidder' && isMileage == false) 
        ? 'MileRange'
        : token != null
        ? 'TabNavigation'
        : 'LoginScreen';

    return (
      <NavigationContainer ref={navigationService.navigationRef}>
        <RootNav.Navigator
          initialRouteName={firstScreen}
          screenOptions={{headerShown: false}}>
          <RootNav.Screen name="MileRange" component={MileRange} />
          <RootNav.Screen name="Walkthrough" component={Walkthrough} />
          <RootNav.Screen name="DrawerScreen" component={DrawerScreen} />
          <RootNav.Screen name="CreateNew" component={CreateNew} />
          <RootNav.Screen name="LoginScreen" component={LoginScreen} />
          <RootNav.Screen name="TabNavigation" component={TabNavigation} />
          <RootNav.Screen name="QbidStatus" component={QbidStatus} />
          <RootNav.Screen name="QbidDetails" component={QbidDetails} />
          <RootNav.Screen name="Signup" component={Signup} />
          <RootNav.Screen name="SeeAllScreen" component={SeeAllScreen} />
          <RootNav.Screen name="Subscription" component={Subscription} />
          <RootNav.Screen
            name="TermsAndConditions"
            component={TermsAndConditions}
          />
          <RootNav.Screen name="Support" component={Support} />
          <RootNav.Screen name="YourJobes" component={YourJobes} />
          <RootNav.Screen name="CompleteJobes" component={CompleteJobes} />

          <RootNav.Screen
            name="SeeAllNegotiator"
            component={SeeAllNegotiator}
          />
          <RootNav.Screen name="EnterPhone" component={EnterPhone} />
          <RootNav.Screen name="VerifyNumber" component={VerifyNumber} />
          <RootNav.Screen name="ResetPassword" component={ResetPassword} />
          <RootNav.Screen name="AddCard" component={AddCard} />
          <RootNav.Screen
            name="NegotiatorPortfolio"
            component={NegotiatorPortfolio}
          />
          <RootNav.Screen name="PaymentMethod" component={PaymentMethod} />
          <RootNav.Screen name="JobDetails" component={JobDetails} />
          <RootNav.Screen name="MyAccounts" component={MyAccounts} />
          <RootNav.Screen name="ChangePassword" component={ChangePassword} />
          <RootNav.Screen name="CreateNewHelp" component={CreateNewHelp} />
        </RootNav.Navigator>
      </NavigationContainer>
    );
  };

  return <AppNavigatorContainer />;
};

export const TabNavigation = () => {
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  // console.log(
  //   '🚀 ~ file: appNavigation.js:83 ~ TabNavigation ~ userRole:',
  //   userRole,
  // );
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => {
          let iconName;
          let color = Color.themeColor;
          let size = moderateScale(20, 0.3);
          let type = Ionicons;

          if (
            route.name === 'HomeScreen' ||
            route.name === 'NegotiatorHomeScreen'
          ) {
            iconName = focused ? 'home' : 'home-outline';
            color = focused
              ? userRole == 'Qbid Member'
                ? Color.blue
                : userRole == 'Qbid Negotiator'
                ? Color.themeColor
                : Color.black
              : Color.themeLightGray;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          } else if (route.name === 'ChatScreen') {
            iconName = focused
              ? 'ios-chatbubble-ellipses-sharp'
              : 'ios-chatbubble-ellipses-outline';
            color = focused
              ? userRole == 'Qbid Member'
                ? Color.blue
                : userRole == 'Qbid Negotiator'
                ? Color.themeColor
                : Color.black
              : Color.themeLightGray;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          } else if (route.name === 'NotificationScreen') {
            type = FontAwesome;
            iconName = focused ? 'bell' : 'bell-o';

            color = focused
              ? userRole == 'Qbid Member'
                ? Color.blue
                : userRole == 'Qbid Negotiator'
                ? Color.themeColor
                : Color.black
              : Color.themeLightGray;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          } else if (route.name === 'CreateNew') {
            type = AntDesign;
            iconName = focused ? 'Plus' : 'Plus';

            color = focused
              ? userRole == 'Qbid Member'
                ? Color.blue
                : userRole == 'Qbid Negotiator'
                ? Color.themeColor
                : Color.black
              : Color.themeLightGray;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          } else {
            iconName = focused ? 'settings-outline' : 'settings-sharp';
            color = focused
              ? userRole == 'Qbid Member'
                ? Color.blue
                : userRole == 'Qbid Negotiator'
                ? Color.themeColor
                : Color.black
              : Color.themeLightGray;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          }
          return route.name == 'CreateNew' ? (
            <View
              style={{
                borderWidth: 5,
                borderColor: Color.lightGrey,
                height: moderateScale(60, 0.3),
                width: moderateScale(60, 0.3),
                borderRadius: moderateScale(30, 0.3),
                backgroundColor: Color.themeColor,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: moderateScale(-30, 0.3),
              }}>
              <Icon
                name={'plus'}
                as={type}
                color={Color.white}
                size={moderateScale(30, 0.3)}
              />
            </View>
          ) : (
            <Icon name={iconName} as={type} color={color} size={size} />
          );
        },
        tabBarShowLabel: false,
      })}>
      {userRole == 'Qbid Member' ? (
        <Tabs.Screen name={'HomeScreen'} component={HomeScreen} />
      ) : (
        <Tabs.Screen
          name={'NegotiatorHomeScreen'}
          component={NegotiatorHomeScreen}
        />
      )}
      <Tabs.Screen name={'NotificationScreen'} component={NotificationScreen} />
      {userRole == 'Qbid Member' && (
        <Tabs.Screen name={'CreateNew'} component={CreateNew} />
      )}
      <Tabs.Screen name={'ChatScreen'} component={ChatScreen} />
      <Tabs.Screen name={'Settings'} component={Settings} />
    </Tabs.Navigator>
  );
};

export default AppNavigator;
