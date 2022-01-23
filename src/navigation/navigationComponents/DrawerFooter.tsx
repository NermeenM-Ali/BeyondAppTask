import React, { PureComponent } from 'react'
import { I18nManager, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Octicons from 'react-native-vector-icons/Octicons'
import { connect } from 'react-redux'
import colors from '../../assets/colors'
import Fonts from '../../assets/Fonts'
import Strings from '../../assets/strings'
import { handleNavigation } from '../../redux/actions/HandleNavigationAction'
import { moderateScale, scale, verticalScale } from '../../utils/Scaling'
interface DrawerFooterProps {
    navigation: any
    handleNavigation: any
}
class DrawerFooter extends PureComponent<DrawerFooterProps> {
    render() {
        let { navigation, handleNavigation } = this.props
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                handleNavigation(true)
                navigation.navigate('TermsAndConditionsScreen')
            }} style={styles.drawerFooter}>
                <View style={styles.iconContainer}>
                    <Octicons name={'book'} size={23} color={colors.TITLE_COLOR} style={{ alignSelf: 'center' }} />
                </View>
                <Text style={styles.rowTxt}>
                    {Strings.termsAndConditionsTxt}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    rowTxt: {
        fontFamily: I18nManager.isRTL ? Fonts.REGULAR_FONT_AR : Fonts.REGULAR_FONT_EN,
        fontSize: moderateScale(15),
        color: colors.TITLE_COLOR
    },
    iconContainer: {
        paddingHorizontal: scale(20),
    },
    drawerFooter: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: verticalScale(65),
        borderTopColor: colors.SHADOW_COLOR,
        borderTopWidth: scale(2),
        paddingTop: verticalScale(20)
    }
})

const mapDispatchToProps = {
    handleNavigation
}
export default connect(null, mapDispatchToProps)(DrawerFooter)