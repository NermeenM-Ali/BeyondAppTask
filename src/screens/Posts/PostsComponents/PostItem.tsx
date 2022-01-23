import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo'
import colors from '../../../assets/colors';
import { moderateScale, scale, verticalScale } from '../../../utils/Scaling';
import PostImage from './PostImage';
import PostOwnerItem from './PostOwnerItem';

export interface IPost {
    id: string,
    image: string,
    likes: 17,
    tags: string[],
    text: string,
    publishDate: string,
    owner: IPostOwner
}

export interface IPostOwner {
    id: string,
    title: string,
    firstName: string,
    lastName: string,
    picture: string
}

interface PostItemProps {
    item: IPost
    navigation: any
}
const PostItem = (props: PostItemProps) => {
    const { item, navigation } = props
    const { owner, publishDate, image, likes } = item
    const renderPostHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <PostOwnerItem owner={owner} publishDate={publishDate} />
                <TouchableOpacity activeOpacity={0.8} style={styles.dotsButton} onPress={() => { }}>
                    <Entypo name='dots-three-vertical' style={styles.dotsIcon} />
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <TouchableOpacity activeOpacity={0.8} style={styles.container} onPress={() => navigation.navigate('PostDetailsScreen', { item })}>
            {renderPostHeader()}
            <PostImage
                likes={likes}
                image={image}
                postImgStyle={styles.postImage}
                postImgStyleRadius={styles.imgStylewithRadius} />
        </TouchableOpacity>
    );
};

export default PostItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE_COLOR,
        width: scale(390),
        alignSelf: 'center',
        marginVertical: verticalScale(10)
    },
    headerContainer: {
        paddingVertical: verticalScale(10),
        backgroundColor: colors.WHITE_COLOR,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    dotsButton: {
        width: scale(40),
        height: verticalScale(40),
        justifyContent: 'center',
        alignItems: 'center',
    },
    dotsIcon: {
        fontSize: moderateScale(18),
        color: colors.DARK_GRAY
    },
    postImage: {
        height: undefined,
        alignSelf: 'center',
        aspectRatio: 1.5,
        width: '100%',
    },
    imgStylewithRadius: {
        borderRadius: moderateScale(10),
        overflow: 'hidden'
    }
});
