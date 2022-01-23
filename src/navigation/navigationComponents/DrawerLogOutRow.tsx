import React, { Component } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, I18nManager, Share, } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { verticalScale, scale, moderateScale } from '../../utils/Scaling'
import colors from '../../assets/colors'
import { switchLang } from '../../utils/LanguageUtils';
import drawerLogOutData from '../../data/drawerLogoutData';
import { connect } from 'react-redux';
import { CurrentUser } from '../../services/current-user.service';
import Fonts from '../../assets/Fonts';
import { clearUserData } from '../../redux/actions/EditProfileAction';
import { clearCarCallers } from '../../redux/actions/CallersAction';
import { ClearContactHistory } from '../../redux/actions/ContactHistoryAction';
import { ClearMyCars } from '../../redux/actions/MyCarsAction';
import { changeGovernorateProp } from '../../redux/actions/governrateAction';
import { changeCityProp } from '../../redux/actions/cityAction';
import { changeRegisterNavigationType, handleNavigation, RegisterNavigationTypes } from '../../redux/actions/HandleNavigationAction';


interface Props {
    navigation: any;
    item: {
        id: number,
        icon: any,
        isLogout: boolean,
        nameEn: string,
        nameAr: string,
        routeName?: string
    }
    index: number;
    clearUserData: any,
    clearCarCallers: any,
    ClearContactHistory: any,
    ClearMyCars: any,
    changeGovernorateProp: any,
    changeCityProp: any,
    changeRegisterNavigationType: any
    handleNavigation: any
}


class DrawerLogoutRow extends Component<Props> {
    currentUser = new CurrentUser()
    shareApp() {
        Share.share({
            message: 'app store link',
            url: 'app store link'
        }).then(({ action }: any) => {
            if (action === Share.sharedAction) { }
        });
    }

    handleNavigation = (idx: number, routeName: any) => {
        let { handleNavigation, navigation, changeCityProp, changeGovernorateProp, changeRegisterNavigationType, clearCarCallers, clearUserData, ClearMyCars, ClearContactHistory } = this.props
        if (idx == drawerLogOutData.length - 3) {
            switchLang()
        } else if (idx === drawerLogOutData.length - 2) {
            this.currentUser.logout()
            handleNavigation(false)
            clearUserData()
            clearCarCallers()
            ClearContactHistory()
            ClearMyCars()
            changeRegisterNavigationType(RegisterNavigationTypes.ANY)
            changeCityProp('selectedCityItem', null)
            changeGovernorateProp('selectedGovernorateItem', null)
            navigation.replace('LoginScreen')
            setTimeout(() => {
                navigation.closeDrawer()
            }, 10)
        } else {
            navigation.navigate(routeName)
        }
    }
    render() {
        let { item, index } = this.props
        const { icon, nameAr, nameEn, isLogout, routeName } = item
        return (
            <View style={{ flex: 1 }}>
                {
                    index !== drawerLogOutData.length - 1 ?
                        <TouchableOpacity activeOpacity={0.5} onPress={() => { this.handleNavigation(index, routeName) }}
                            style={styles.activeRowContainer}>
                            <View style={styles.iconContainer}>
                                <Icon name={icon} size={23} color={colors.BLACK_COLOR} style={{ alignSelf: 'center', transform: [{ rotateY: I18nManager.isRTL && isLogout ? '-360deg' : !I18nManager.isRTL && isLogout ? '-180deg' : '0deg' }] }} />
                            </View>
                            <Text style={styles.rowTxt}>
                                {I18nManager.isRTL ? nameAr : nameEn}
                            </Text>
                            {index == drawerLogOutData.length - 3 &&
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
    clearUserData,
    clearCarCallers,
    ClearContactHistory,
    ClearMyCars,
    changeGovernorateProp,
    changeCityProp,
    changeRegisterNavigationType,
    handleNavigation
}
export default connect(null, mapDispatchToProps)(DrawerLogoutRow)