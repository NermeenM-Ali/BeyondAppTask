import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../assets/colors';
import Fonts from '../assets/Fonts';
import { moderateScale, scale, verticalScale } from '../utils/Scaling';

interface ReloadButtonProps {
    onPress: () => any
}
const ReloadButton = (props: ReloadButtonProps) => {
    const { onPress } = props
    return (
        <TouchableOpacity onPress={() => onPress()} style={styles.reloadBtn}  >
            <Text style={styles.reloadTxt} >{"Reload"}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    reloadBtn: {
        paddingVertical: verticalScale(7),
        paddingHorizontal: scale(30),
        marginTop: verticalScale(20),
        backgroundColor: colors.BLACK_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(4)
    },
    reloadTxt: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.BOLD_FONT_EN
    }
})
export default ReloadButton