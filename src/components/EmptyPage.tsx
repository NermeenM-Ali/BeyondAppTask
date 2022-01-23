import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import ReloadButton from './ReloadButton';
import { moderateScale, verticalScale } from '../utils/Scaling';
import colors from '../assets/colors';
import { useDispatch } from 'react-redux';
import Fonts from '../assets/Fonts';

const EmptyPage = (props: any) => {
    const dispatch = useDispatch()
    const { error, loading, text, onReload, center } = props
    return (
        <View style={styles.container} >
            {
                loading ?
                    <ActivityIndicator size='small' color={colors.BLACK_COLOR} /> :
                    error ?
                        <ReloadButton onPress={() => dispatch(onReload())} /> :
                        <View style={styles.container} >
                            {
                                text &&
                                <Text style={[styles.textStyle, { marginBottom: center ? verticalScale(200) : 0 }]} >{text}</Text>
                            }
                        </View>
            }
        </View>
    )
}

export default EmptyPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    textStyle: {
        color: colors.LIGHT_GRAY_COLOR,
        fontSize: moderateScale(15),
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: Fonts.BOLD_FONT_EN,
    },

})