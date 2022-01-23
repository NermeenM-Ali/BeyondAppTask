import { DrawerActions } from '@react-navigation/native'
import React, { Component } from 'react'
import { I18nManager, TouchableOpacity } from 'react-native'
import { FlatList, StyleSheet, View, Image, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import colors from '../../assets/colors'
import Fonts from '../../assets/Fonts'
import { BASE_IMG_URL, IUploadFolder } from '../../components/UploadFile'
import { changeCityProp } from '../../redux/actions/cityAction'
import { getUserDataToEdit } from '../../redux/actions/EditProfileAction'
import { changeGovernorateProp, getGovernrateData } from '../../redux/actions/governrateAction'
import { moderateScale, scale, verticalScale } from '../../utils/Scaling'
import drawerData from '../../data/drawerData'
import DrawerRow from './DrawerRow'
import DrawerFooter from './DrawerFooter'

interface DrawerContentProps {
    navigation: any
    governrateData: any,
    getUserDataToEdit: any
    userData: any
    getGovernrateData: any
    changeCityProp: any
    changeGovernorateProp: any
}


class DrawerContent extends Component<DrawerContentProps> {

    componentDidMount() {
        let { getGovernrateData, getUserDataToEdit } = this.props
        getUserDataToEdit()
        getGovernrateData(true)
    }
    renderUserSection() {
        let { navigation, userData, getUserDataToEdit, changeCityProp, changeGovernorateProp } = this.props
        return (
            <View style={styles.userSectionContainer}>
                <Image source={userData?.userImage ? { uri: `${BASE_IMG_URL}${IUploadFolder.userImage}/${userData?.userImage}` } : require('../../assets/images/noImg.png')} style={styles.userImage} />
                <View style={styles.userNameContainer}>
                    <Text numberOfLines={2} style={styles.userName}>{userData?.fullName}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8} style={styles.icon}
                    onPress={() => {
                        getUserDataToEdit()
                        changeCityProp('selectedCityItem', null)
                        changeGovernorateProp('selectedGovernorateItem', null)
                        userData?.id !== 0 && navigation.navigate('EditProfileScreen')
                        userData?.id !== 0 &&
                            navigation.dispatch(DrawerActions.closeDrawer())
                    }}>
                    <Ionicons name='settings-outline' size={25} style={{ position: 'absolute', right: 0 }} />
                </TouchableOpacity>
            </View>
        )
    }
    render() {
        let { navigation } = this.props

        return (
            <View style={styles.container}>
                {this.renderUserSection()}
                <FlatList
                    data={drawerData}
                    keyExtractor={(_, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => <DrawerRow item={item} index={index} navigation={navigation} />} />
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
        justifyContent: 'flex-start',
        paddingLeft: scale(20)

    },
    userImage: {
        width: scale(50),
        height: scale(50),
        borderRadius: scale(50) / 2
    },
    userNameContainer: {
        maxWidth: scale(210),
        marginHorizontal: scale(5),
        alignSelf: 'center',
        paddingHorizontal: scale(20)
    },
    userName: {
        fontSize: moderateScale(15),
        fontFamily: I18nManager.isRTL ? Fonts.BOLD_FONT_AR : Fonts.BOLD_FONT_EN,
        color: colors.TITLE_COLOR
    },
    icon: {
        width: scale(28),
        height: verticalScale(25),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        right: 0,
    },
})

const mapStateToProps = (state: any) => ({
    userData: state.EditProfileReducer?.user,
})


const mapDispatchToProps = {
    getUserDataToEdit,
    getGovernrateData,
    changeCityProp,
    changeGovernorateProp
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
