import React, { PureComponent } from 'react'
import { I18nManager, TouchableOpacity } from 'react-native'
import { FlatList, StyleSheet, View, Image, Text } from 'react-native'
import Fonts from '../../assets/Fonts'
import { moderateScale, scale, verticalScale } from '../../utils/Scaling'
import drawerLogOutData from '../../data/drawerLogoutData'
import DrawerLogOutRow from './DrawerLogOutRow'
import DrawerFooter from './DrawerFooter'

interface DrawerContentProps {
    navigation: any
}

export default class LogOutDrawerContent extends PureComponent<DrawerContentProps> {
    renderUserSection() {
        return (
            <TouchableOpacity activeOpacity={0.8} style={styles.userSectionContainer}>
                <Image source={require('../../assets/images/noImg.png')} style={styles.userImage} />
                <View style={styles.userNameContainer}>
                    <Text numberOfLines={2} style={styles.userName}>{'No user yet..'}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        let { navigation } = this.props
        return (
            <View style={styles.container}>
                {this.renderUserSection()}
                <FlatList
                    data={drawerLogOutData}
                    keyExtractor={(_, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => <DrawerLogOutRow item={item} index={index} navigation={navigation} />} />
                <DrawerFooter navigation={navigation} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userSectionContainer: {
        height: verticalScale(100),
        maxWidth: scale(300),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(20),
    },
    userImage: {
        width: scale(50),
        height: scale(50),
        borderRadius: scale(50) / 2
    },
    userNameContainer: {
        marginHorizontal: scale(10),
        width: scale(200)
    },
    userName: {
        fontSize: moderateScale(16),
        fontFamily: I18nManager.isRTL ? Fonts.BOLD_FONT_AR : Fonts.BOLD_FONT_EN,
        color: '#DEDEDE'
    }
})


