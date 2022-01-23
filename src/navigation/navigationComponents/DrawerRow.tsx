import React, { PureComponent } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, I18nManager, } from 'react-native'
import Share from 'react-native-share'
import Icon from 'react-native-vector-icons/Ionicons';
import { verticalScale, scale, moderateScale } from '../../utils/Scaling'
import colors from '../../assets/colors'
import { switchLang } from '../../utils/LanguageUtils';
import drawerData from '../../data/drawerData';
import { connect } from 'react-redux';
import { ChangeNavigationProps, changeRegisterNavigationType, handleNavigation, RegisterNavigationTypes } from '../../redux/actions/HandleNavigationAction';
import { CurrentUser } from '../../services/current-user.service';
import { changetEditOtherProps, clearUserData } from '../../redux/actions/EditProfileAction';
import Fonts from '../../assets/Fonts';
import { clearCarCallers } from '../../redux/actions/CallersAction';
import { ClearContactHistory } from '../../redux/actions/ContactHistoryAction';
import { ClearMyCars } from '../../redux/actions/MyCarsAction';
import { changeCityProp } from '../../redux/actions/cityAction';
import { changeGovernorateProp } from '../../redux/actions/governrateAction';
import { base64Img } from '../../assets/images/base64AppImg';
import { changeQRProp } from '../../redux/actions/QrCodeAction';
import { ClearPrintingProuducts } from '../../redux/actions/ProductsAction';
import { clearOrdersList } from '../../redux/actions/OrdersAction';


interface Props {
    navigation: any;
    clearUserData: any
    handleNavigation: any
    changeRegisterNavigationType: any
    changetEditOtherProps: any
    item: {
        id: number,
        icon: any,
        isLogout: boolean,
        nameEn: string,
        nameAr: string,
        routeName?: string
    }
    index: number;
    clearCarCallers: any
    ClearContactHistory: any
    ClearMyCars: any
    changeCityProp: any
    changeGovernorateProp: any
    ChangeNavigationProps: any
    changeQRProp: any
    ClearPrintingProuducts: any
    clearOrdersList: any
}

class DrawerRow extends PureComponent<Props> {
    currentUser = new CurrentUser()
    shareApp() {
        Share.open({
            title: 'Elhakny',
            message: 'Download and use Elhakny application (store link)',
            url: `data:image/jpeg;base64,${base64Img}`,
        })
    }

    handleNavigation = (idx: number, routeName: any) => {
        let { navigation, handleNavigation, clearUserData, changeRegisterNavigationType, ChangeNavigationProps, ClearPrintingProuducts, changeQRProp,
            clearCarCallers, ClearContactHistory, ClearMyCars, changeCityProp, changeGovernorateProp, changetEditOtherProps, clearOrdersList } = this.props
        if (idx === 0) {
            handleNavigation(true)
            changetEditOtherProps('isForEditProfile', false)
            navigation.navigate(routeName, { screen: 'MyCarsScreen' })
        }
        else if (idx === 1) {
            navigation.navigate(routeName, { screen: 'MissedCallsScreen' })
        } else if (idx === 2) {
            ChangeNavigationProps('orderFromDrawer', true)
            navigation.navigate(routeName, { screen: 'OrdersHistoryScreen' })
        } else if (idx == drawerData.length - 3) {
            switchLang()
        } else if (idx === 5) {
            this.currentUser.logout()
            handleNavigation(false)
            clearUserData()
            clearCarCallers()
            ClearContactHistory()
            ClearMyCars()
            clearOrdersList()
            changeQRProp('qrCodeHash', "")
            ClearPrintingProuducts()
            changeRegisterNavigationType(RegisterNavigationTypes.ANY)
            changeCityProp('selectedCityItem', null)
            changeGovernorateProp('selectedGovernorateItem', null)
            navigation.replace('LoginScreen')
        }
        else {
            navigation.navigate(routeName)
        }
    }
    render() {
        let { item, index, } = this.props
        const { icon, nameAr, nameEn, isLogout, routeName } = item
        return (
            <View style={{ flex: 1 }}>
                {
                    index !== drawerData.length - 1 ?
                        <TouchableOpacity activeOpacity={0.5} onPress={() => { this.handleNavigation(index, routeName) }}
                            style={styles.activeRowContainer}>
                            <View style={styles.iconContainer}>
                                <Icon name={icon} size={23} color={colors.BLACK_COLOR} style={{ alignSelf: 'center', transform: [{ rotateY: I18nManager.isRTL && isLogout ? '-360deg' : !I18nManager.isRTL && isLogout ? '-180deg' : '0deg' }] }} />
                            </View>
                            <Text style={styles.rowTxt}>
                                {I18nManager.isRTL ? nameAr : nameEn}
                            </Text>
                            {index == drawerData.length - 3 &&
                                (<Text style={styles.langTxt}>
                                    {I18nManager.isRTL ? '(English)' : '(عربي)'}
                                </Text>)}
                        </TouchableOpacity> :
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.shareApp()}
                            style={styles.shareRowContainer}>
                            <View style={styles.iconContainer}>
                                <Icon name={icon} size={23} color={colors.MAIN_COLOR} style={{ alignSelf: 'center' }} />
                            </View>
                            <Text style={[styles.rowTxt, { color: colors.MAIN_COLOR }]}>
                                {I18nManager.isRTL ? nameAr : nameEn}
                            </Text>
                        </TouchableOpacity>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    activeRowContainer: {
        width: scale(320),
        height: verticalScale(50),
        marginVertical: verticalScale(5),
        flexDirection: 'row',
        alignItems: "center",
        paddingHorizontal: scale(5),
        borderBottomColor: colors.SHADOW_COLOR,
        borderBottomWidth: scale(1)
    },
    shareRowContainer: {
        width: scale(545),
        marginTop: verticalScale(70),
        flexDirection: 'row',
        alignItems: "center",
        paddingHorizontal: scale(5),
    },
    rowTxt: {
        fontFamily: I18nManager.isRTL ? Fonts.REGULAR_FONT_AR : Fonts.REGULAR_FONT_EN,
        fontSize: moderateScale(15)
    },
    iconContainer: {
        paddingHorizontal: scale(20),
    },
    langTxt: {
        fontFamily: I18nManager.isRTL ? Fonts.REGULAR_FONT_AR : Fonts.REGULAR_FONT_EN,
        fontSize: moderateScale(14),
        right: I18nManager.isRTL ? scale(-105) : scale(-50),
        color: colors.MAIN_COLOR,
    }
})


const mapDispatchToProps = {
    handleNavigation,
    clearUserData,
    changeRegisterNavigationType,
    clearCarCallers,
    ClearContactHistory,
    ClearMyCars,
    changeGovernorateProp,
    changeCityProp,
    ChangeNavigationProps,
    changetEditOtherProps,
    changeQRProp,
    clearOrdersList,
    ClearPrintingProuducts,
}
export default connect(null, mapDispatchToProps)(DrawerRow)