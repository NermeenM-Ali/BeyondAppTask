import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import moment from 'moment';
import { IPostOwner } from './PostItem';
import colors from '../../../assets/colors';
import Fonts from '../../../assets/Fonts';
import { scale, moderateScale } from '../../../utils/Scaling';

interface PostOwnerItemProps {
    owner: IPostOwner
    publishDate: string
}
const PostOwnerItem = (props: PostOwnerItemProps) => {
    const { owner, publishDate } = props
    const { firstName, title, picture, lastName } = owner
    return (
        <View style={styles.imageWithNameContainer}>
            <Image source={picture ? { uri: picture } : require('../../../assets/images/noImg.png')} resizeMode='contain' style={styles.ownerImg} />
            <View style={styles.ownerNameContainer}>
                <Text style={styles.ownerNameTxt}>{`${title}.${firstName} ${lastName}`}</Text>
                <Text style={styles.publisedDateTxt}>{moment(publishDate).format('LL')}</Text>
            </View>
        </View>
    );
};

export default React.memo(PostOwnerItem);

const styles = StyleSheet.create({
    imageWithNameContainer: {
        flexDirection: 'row',
    },
    ownerImg: {
        width: scale(60),
        height: scale(60),
        borderRadius: scale(60) / 2,
    },
    ownerNameContainer: {
        justifyContent: 'center',
        paddingHorizontal: scale(15)
    },
    ownerNameTxt: {
        fontSize: moderateScale(16),
        fontFamily: Fonts.BOLD_FONT_EN
    },
    publisedDateTxt: {
        fontSize: moderateScale(12),
        fontFamily: Fonts.BOLD_FONT_EN,
        color: colors.DARK_GRAY
    },
});
