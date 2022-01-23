import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import AboutAppScreen from "../screens/DrawerScreens/AboutAppScreen";
import HelpScreen from "../screens/DrawerScreens/HelpScreen";
import CarCallerDetails from "../screens/myCars/CarCallerDetails";
import CarModelsScreen from "../screens/myCars/CarModelsScreen";
import CarNestedTypesScreen from "../screens/myCars/CarNestedTypesScreen";
import CompleteSelectedCarDetails from "../screens/myCars/CompleteSelectedCarDetails";
import EditCarDetailsScreen from "../screens/myCars/EditCarDetailsScreen";
import MyCarsScreen from "../screens/myCars/myCarsScreen";
import SelectCarType from "../screens/myCars/SelectCarType";
import UploadCarImgsScreen from "../screens/myCars/UploadCarImgsScreen";
import PaymentOptionsScreen from "../screens/Payment/PaymentOptionsScreen";
import ServiceListSceen from '../screens/myCars/CarViewListScreen';
import DrawerContent from "./navigationComponents/DrawerContent";
import TabScreen from "./TabScreen";
import { useDispatch, useSelector } from "react-redux";
import { ClearEditedCarData, refreshMyCars } from "../redux/actions/MyCarsAction";
import ContactHistoryScreen from "../screens/ContactHistoryCycle/ContactHistoryScreen";
import { ClearCarImages } from "../redux/actions/CarCreatedDataAction";
import { refreshContactHistoryList } from "../redux/actions/ContactHistoryAction";
import { scale } from "../utils/Scaling";
import LogOutDrawerContent from "./navigationComponents/LogOutDrawerContent";
import { changetEditOtherProps } from "../redux/actions/EditProfileAction";
import CityListScreen from "../screens/auth/CityListScreen";
import GovernorateListScreen from "../screens/auth/GovernorateListScreen";
import CompleteSignUpScreen from "../screens/auth/CompleteSignUpScreen";
import OrdersHistoryScreen from "../screens/PrintingOrders/OrdersHistoryScreen";
import MyOrderScreen from "../screens/PrintingOrders/MyOrderScreen";
import { refreshOrdersList } from "../redux/actions/OrdersAction";
import ViewOrderDetailsScreen from "../screens/PrintingOrders/ViewOrderDetailsScreen";
import { getCarColorsData } from "../redux/actions/CarColorsAction";
import TermsAndConditionsScreen from "../screens/auth/TermsAndConditionsScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const myCarsStack = () => {
    const dispatch = useDispatch()
    const myCarsList = useSelector((state: any) => state.MyCarsReducer.myCarsList)
    const carColorsData = useSelector((state: any) => state.CarColorsReducer.carColorsData)
    return (
        <Stack.Navigator initialRouteName='MyCarsScreen' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MyCarsScreen" component={MyCarsScreen}
                listeners={{
                    focus: () => {
                        myCarsList.length && dispatch(refreshMyCars())
                        !carColorsData.length && dispatch(getCarColorsData())
                        dispatch(changetEditOtherProps('isForEditProfile', false))
                        dispatch(ClearCarImages())
                        dispatch(ClearEditedCarData())
                    },
                }} />
            <Stack.Screen name="SelectCarType" component={SelectCarType} />
            <Stack.Screen name="CarNestedTypesScreen" component={CarNestedTypesScreen} />
            <Stack.Screen name="CarCallerDetails" component={CarCallerDetails} />
            <Stack.Screen name="EditCarDetailsScreen" component={EditCarDetailsScreen} />
            <Stack.Screen name="CarModelsScreen" component={CarModelsScreen} />
            <Stack.Screen name='ServiceListSceen' component={ServiceListSceen} />
            <Stack.Screen name="UploadCarImgsScreen" component={UploadCarImgsScreen} />
            <Stack.Screen name="CompleteSelectedCarDetails" component={CompleteSelectedCarDetails} />
            <Stack.Screen name="PaymentOptionsScreen" component={PaymentOptionsScreen} />
            <Stack.Screen name="GovernorateListScreen" component={GovernorateListScreen} />
            <Stack.Screen name="CityListScreen" component={CityListScreen} />
            <Stack.Screen name='CompleteSignUpScreen' component={CompleteSignUpScreen} />
        </Stack.Navigator>
    )
}
// VoteScreen
const MissedCallsStack = () => {
    const dispatch = useDispatch()
    const contactHistoryList = useSelector((state: any) => state.ContactHistoryReducer.contactHistoryList)
    return (
        <Stack.Navigator initialRouteName='ContactHistoryScreen' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='ContactHistoryScreen' component={ContactHistoryScreen}
                listeners={{
                    focus: () => {
                        contactHistoryList.length && dispatch(refreshContactHistoryList())
                    },
                }} />
        </Stack.Navigator>
    )
}

const PrintingOrdersStack = () => {
    const dispatch = useDispatch()
    const ordersHistoryList = useSelector((state: any) => state.OrdersReducer.OrderHistoryList)
    return (
        <Stack.Navigator initialRouteName='ContactHistoryScreen' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='OrdersHistoryScreen' component={OrdersHistoryScreen}
                listeners={{
                    focus: () => {
                        ordersHistoryList.length && dispatch(refreshOrdersList())
                    },
                }} />
            <Stack.Screen name="MyOrderScreen" component={MyOrderScreen} />
            <Stack.Screen name="ViewOrderDetailsScreen" component={ViewOrderDetailsScreen} />
        </Stack.Navigator>
    )
}
export const SideMenu = () => {
    const dispatch = useDispatch()
    let currentUser = useSelector((state: any) => state.authReducer.isCurrentUserExist)
    return (
        <Drawer.Navigator initialRouteName="TabScreen" drawerStyle={{ width: scale(320) }} screenOptions={{ swipeEnabled: false }}
            drawerContent={(props: any) => currentUser ? <DrawerContent {...props} /> : <LogOutDrawerContent {...props} />}>
            <Drawer.Screen name="TabScreen" component={TabScreen} />
            <Drawer.Screen name="myCarsStack" component={myCarsStack} />
            <Drawer.Screen name="MissedCallsStack" component={MissedCallsStack} />
            <Drawer.Screen name='PrintingOrdersStack' component={PrintingOrdersStack} />
            <Drawer.Screen name="AboutAppScreen" component={AboutAppScreen} />
            <Drawer.Screen name="HelpScreen" component={HelpScreen} />
            <Drawer.Screen name='TermsAndConditionsScreen' component={TermsAndConditionsScreen} />
            <Drawer.Screen name="GovernorateListScreen" component={GovernorateListScreen} />
            <Drawer.Screen name="CityListScreen" component={CityListScreen} />
            <Drawer.Screen name='CompleteSignUpScreen' component={CompleteSignUpScreen} />
        </Drawer.Navigator>

    );
}


