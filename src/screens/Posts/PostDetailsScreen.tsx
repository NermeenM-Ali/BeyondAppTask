import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { IPost } from './PostsComponents/PostItem';
import PostImage from './PostsComponents/PostImage';
import { moderateScale, scale, verticalScale } from '../../utils/Scaling';
import TransparentHeader from '../../components/TransparentHeader';
import TagItem from './PostsComponents/TagItem';
import Fonts from '../../assets/Fonts';
import PostOwnerItem from './PostsComponents/PostOwnerItem';
import colors from '../../assets/colors';

interface PostDetailsScreenProps {
    navigation: any
    route: {
        params: {
            item: IPost,
        }
    }
}

const PostDetailsScreen = (props: PostDetailsScreenProps) => {
    const { navigation, route } = props
    const { image, likes, tags, text, owner, publishDate } = route.params.item

    const renderTagsSection = () => {
        return (
            <View>
                <FlatList
                    horizontal
                    data={tags}
                    keyExtractor={(_, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    style={{ flexGrow: 1 }}
                    renderItem={({ item, index }) => <TagItem item={item} />} />
            </View>
        )
    }

    const renderPostInfoSection = () => {
        return (
            <View style={styles.postInfoContainer}>
                <PostOwnerItem owner={owner} publishDate={publishDate} />
                <Text style={styles.postText}>{text}</Text>
                {renderTagsSection()}
            </View>
        )
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <PostImage
                image={image}
                likes={likes}
                postImgStyle={styles.postImg}
                postImgStyleRadius={styles.postImgStyleWithRadius}>
                <TransparentHeader navigation={navigation} />
            </PostImage>
            {renderPostInfoSection()}
        </ScrollView>
    );
};

export default PostDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE_COLOR
    },
    postImg: {
        width: '100%',
        height: undefined,
        alignSelf: 'center',
        aspectRatio: 0.8,
    },
    postImgStyleWithRadius: {
        borderBottomLeftRadius: moderateScale(0),
        borderBottomRightRadius: moderateScale(0)
    },
    postInfoContainer: {
        width: scale(390),
        alignSelf: 'center',
        paddingVertical: verticalScale(10),
        borderRadius: moderateScale(5)
    },
    postText: {
        maxWidth: scale(360),
        fontSize: moderateScale(16),
        fontFamily: Fonts.REGULAR_FONT_EN,
        marginVertical: verticalScale(10),
        marginLeft: scale(5)
    }
});

