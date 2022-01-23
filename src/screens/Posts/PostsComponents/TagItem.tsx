import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../../../assets/colors'
import Fonts from '../../../assets/Fonts'
import { moderateScale, scale, verticalScale } from '../../../utils/Scaling'

interface TagItemProps {
    item: string,
}

const TagItem = (props: TagItemProps) => {
    const { item } = props

    return (
        <View style={styles.container}>
            <Text style={styles.genreName}>{`# ${item}`}</Text>
        </View>
    )
}

export default React.memo(TagItem)

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: scale(15),
        paddingVertical: verticalScale(5),
        borderRadius: moderateScale(15),
        backgroundColor: colors.MID_GRAY,
        marginTop: verticalScale(7),
        marginLeft: scale(5)
    },
    genreName: {
        fontSize: moderateScale(14),
        color: colors.BLACK_COLOR,
        fontFamily: Fonts.REGULAR_FONT_EN
    }
})
