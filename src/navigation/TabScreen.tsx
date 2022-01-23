import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyTabBar from './navigationComponents/TabBarComponent';
import EmergencyScreen from '../screens/Emergency/EmergencyScreen';
import ElhakneyHomeScreen from '../screens/Home/ElhakneyHomeScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import SelectCarType from '../screens/myCars/SelectCarType';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeNavigationProps, changeRegisterNavigationType, handleNavigation, RegisterNavigationTypes } from '../redux/actions/HandleNavigationAction';
import CarViewListScreen from '../screens/myCars/CarViewListScreen';
import CarNestedTypesScreen from '../screens/myCars/CarNestedTypesScreen';
import { clearSelectedCarType } from '../redux/actions/CarTypesAction';
import AddPeopleNumbersScreen from '../screens/ElhaknySettings/AddPeopleNumbersScreen';
import { getUserDataToEdit } from '../redux/actions/EditProfileAction';
import { CheckcurrentUserStatus } from '../redux/actions/authAction';
import PrintQrCodeScreen from '../screens/PrintQRCode/PrintQrCodeScreen';
import OrdersHistoryScreen from '../screens/PrintingOrders/OrdersHistoryScreen';
import MyOrderScreen from '../screens/PrintingOrders/MyOrderScreen';
import { refreshOrdersList } from '../redux/actions/OrdersAction';
import ElhaknySettingsScreen from '../screens/ElhaknySettings/ElhaknySettingsScreen';
import ViewOrderDetailsScreen from '../screens/PrintingOrders/ViewOrderDetailsScreen';
import Strings from '../assets/strings';
import GovernorateListScreen from '../screens/auth/GovernorateListScreen';
import CityListScreen from '../screens/auth/CityListScreen';
import CompleteSignUpScreen from '../screens/auth/CompleteSignUpScreen';
import LoginScreen from '../screens/auth/LoginScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AtYourServiceStack = () => {
    const dispatch = useDispatch()

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="SelectCarType" component={SelectCarType}
                listeners={{
                    focus: () => {
                        dispatch(handleNavigation(false))
                    },
                }} />
            <Stack.Screen name="CarViewListScreen" component={CarViewListScreen}
                listeners={{
                    focus: () => dispatch(changeRegisterNavigationType(RegisterNavigationTypes.FOR_CAR_VIEW))
                }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name='CarNestedTypesScreen' component={CarNestedTypesScreen} />
            <Stack.Screen name="GovernorateListScreen" component={GovernorateListScreen} />
            <Stack.Screen name="CityListScreen" component={CityListScreen} />
            <Stack.Screen name='CompleteSignUpScreen' component={CompleteSignUpScreen} />
        </Stack.Navigator>
    )
}



const EmergencyStack = () => {
    const dispatch = useDispatch()
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="EmergencyScreen" component={EmergencyScreen}
                listeners={{
                    focus: () => {
                        dispatch(handleNavigation(false))
                    },
                }} />
        </Stack.Navigator>
    )
}


const ElhakneyHomeStack = () => {
    const dispatch = useDispatch()
    const ordersHistoryList = useSelector((state: any) => state.OrdersReducer.OrderHistoryList)
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ElhakneyHomeScreen" component={ElhakneyHomeScreen}
                listeners={{
                    focus: () => {
                        dispatch(handleNavigation(false))
                        dispatch(clearSelectedCarType())
                    },
                }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name='ElhaknySettingsScreen' component={ElhaknySettingsScreen} />
            <Stack.Screen name='AddPeopleNumbersScreen' component={AddPeopleNumbersScreen} />
            <Stack.Screen name='PrintQrCodeScreen' component={PrintQrCodeScreen}  //
                listeners={{
                    focus: () => {
                        dispatch(ChangeNavigationProps('orderFromDrawer', false))
                    },
                }} />
            <Stack.Screen name='OrdersHistoryScreen' component={OrdersHistoryScreen}
                listeners={{
                    focus: () => {
                        ordersHistoryList.length && dispatch(refreshOrdersList())
                    },
                }} />
            <Stack.Screen name="MyOrderScreen" component={MyOrderScreen} />
            <Stack.Screen name="ViewOrderDetailsScreen" component={ViewOrderDetailsScreen} />
            <Stack.Screen name="GovernorateListScreen" component={GovernorateListScreen} />
            <Stack.Screen name="CityListScreen" component={CityListScreen} />
            <Stack.Screen name='CompleteSignUpScreen' component={CompleteSignUpScreen} />
        </Stack.Navigator>
    )
}

const TabScreen = () => {
    const dispatch = useDispatch()
    return (
        <Tab.Navigator initialRouteName='ElhakneyHomeStack' tabBar={(props: any) => <MyTabBar {...props} />} >
            <Tab.Screen
                name="AtyourServiceStack"
                component={AtYourServiceStack}
                options={{ tabBarLabel: Strings.atYourServiceTab }} />
            <Tab.Screen
                name="ElhakneyHomeStack"
                component={ElhakneyHomeStack}
                options={{ tabBarLabel: Strings.elhaknyTab }}
                listeners={{
                    focus: () => {
                        dispatch(changeRegisterNavigationType(RegisterNavigationTypes.FOR_ELHAKNY_SETTINGS))
                        dispatch(CheckcurrentUserStatus())
                        dispatch(getUserDataToEdit())
                    }
                }} />
            <Tab.Screen
                name="EmergencyStack"
                component={EmergencyStack}
                options={{ tabBarLabel: Strings.emergencyTab }} />
        </Tab.Navigator>
    )
}

export default TabScreen;


