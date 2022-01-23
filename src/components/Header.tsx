import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
import colors from '../assets/colors';
import { moderateScale, scale, verticalScale } from '../utils/Scaling';
import Fonts from '../assets/Fonts';

interface HeaderProps {
    headerTitle: string,
    hasBackIcon?: boolean,
    hastitle?: boolean
}
const Header = (props: HeaderProps) => {
    const { headerTitle, hastitle = true, hasBackIcon = false } = props
    return (
        <View style={styles.container}>
            {
                hasBackIcon && (
                    <TouchableOpacity style={styles.backBtnContainer}>
                        <Ionicons name='arrow-back' style={styles.arrowIcon} />
                    </TouchableOpacity>
                )
            }
            {hastitle && (<Text style={styles.headerTxt}>{headerTitle}</Text>)}
            <View style={styles.imageContainer}>
                <Image source={require('../assets/images/noImg.png')} style={styles.img} resizeMode='contain' />
            </View>
        </View>
    );
};

export default React.memo(Header);

const styles = StyleSheet.create({
    container: {
        height: verticalScale(80),
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: scale(10),
    },
    headerTxt: {
        fontSize: moderateScale(30),
        fontFamily: Fonts.BOLD_FONT_EN,
        marginHorizontal: scale(10)
    },
    backBtnContainer: {
        width: scale(40),
        height: verticalScale(40),
        borderRadius: moderateScale(5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    arrowIcon: {
        fontSize: moderateScale(28),
        color: colors.SHADOW_COLOR
    },
    imageContainer: {
        width: scale(60),
        height: scale(60),
        borderRadius: scale(60) / 2,
        borderWidth: scale(1.5),
        borderColor: colors.SHADOW_COLOR,
        marginRight: scale(10),
        overflow: 'hidden'
    },
    img: {
        width: '100%',
        height: '100%',
    }
});
