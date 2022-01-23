import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { Children } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../../../assets/colors';
import Fonts from '../../../assets/Fonts';
import { scale, verticalScale, moderateScale } from '../../../utils/Scaling';

interface PostImageProps {
    children?: Element;
    image: string
    likes: number
    postImgStyle: object
    postImgStyleRadius: object
}
const PostImage = (props: PostImageProps) => {
    const { image, likes, postImgStyle, postImgStyleRadius, children } = props
    return (
        <>
            <ImageBackground source={image ? { uri: image } : require('../../../assets/images/noImg.png')} resizeMode='cover' imageStyle={postImgStyleRadius} style={postImgStyle} >
                {children}
            </ImageBackground>
            <View style={styles.likesFooter}>
                <TouchableOpacity activeOpacity={0.8} style={styles.likesButton} onPress={() => { }}>
                    <Entypo name='heart' style={styles.likesIcon} />
                </TouchableOpacity>
                <Text style={styles.likesTxt}>{`${likes}`}</Text>
            </View>
        </>
    );
};

export default React.memo(PostImage);

const styles = StyleSheet.create({
    likesFooter: {
        width: scale(390),
        paddingVertical: verticalScale(5),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    likesButton: {
        width: scale(40),
        height: verticalScale(40),
        justifyContent: 'center',
        alignItems: 'center'
    },
    likesIcon: {
        fontSize: moderateScale(28),
        color: colors.LIGHT_GRAY_COLOR
    },
    likesTxt: {
        fontSize: moderateScale(16),
        fontFamily: Fonts.REGULAR_FONT_EN,
        color: colors.LIGHT_GRAY_COLOR,
        marginTop: verticalScale(7)
    },

});
