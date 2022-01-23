import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
import colors from '../assets/colors';
import { moderateScale, scale, verticalScale } from '../utils/Scaling';
import Fonts from '../assets/Fonts';

interface TransparentHeaderProps {
    navigation: any
}
const TransparentHeader = (props: TransparentHeaderProps) => {
    const { navigation } = props
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backBtnContainer} activeOpacity={0.9} onPress={() => navigation.goBack()}>
                <Ionicons name='arrow-back' style={styles.arrowIcon} />
            </TouchableOpacity>
        </View>
    );
};

export default React.memo(TransparentHeader);

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
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
        width: 50,
        height: 50,
        borderRadius: 25,
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
