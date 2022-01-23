import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import colors from '../../assets/colors';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsList, getPostsList, paginatePostsList, refreshPostsList } from '../../redux/actions/postsAction';
import { RootState } from '../../redux/Configrations';
import PostItem from './PostsComponents/PostItem';
import { scale, verticalScale } from '../../utils/Scaling';
import PostsUISkeleton from '../../components/SkeletonPlaceHolder/PostsUISkeleton';
import EmptyPage from '../../components/EmptyPage';

interface PostsScreenProps {
    navigation: any
}

const postsSelectorFunction = (state: RootState) => state.PostsReducer

const PostsScreen = (props: PostsScreenProps) => {
    const dispatch = useDispatch()
    const { navigation } = props
    const { posts, pageLoading, pagePaginate, pageRefresh, moreData, pageError } = useSelector(postsSelectorFunction)

    useEffect(() => {
        dispatch(fetchPostsList())
    }, [])

    const renderPostsSection = () => {

        return (
            <FlatList
                data={posts}
                keyExtractor={(_, idx) => idx.toString()}
                renderItem={({ item }) => <PostItem item={item} navigation={navigation} />}
                showsVerticalScrollIndicator={false}
                refreshing={pageRefresh}
                onRefresh={() => !pageLoading && dispatch(refreshPostsList())}
                onEndReached={() => !pagePaginate && moreData && dispatch(paginatePostsList())}
                onEndReachedThreshold={0.1}
                ListFooterComponent={() => renderFooter()}
                ListEmptyComponent={() =>
                    <View style={styles.Emptycontainer}>
                        <EmptyPage loading={pageLoading} error={pageError} onReload={getPostsList} text={"No Posts Exist !.."} />
                    </View>
                }
                ItemSeparatorComponent={() => <View style={styles.seperator} />} />
        )
    }

    const renderFooter = () => {
        return pagePaginate ? <ActivityIndicator size={'small'} color={colors.BLACK_COLOR} /> : <></>
    }

    return (
        <View style={styles.container}>
            <Header headerTitle={'Discover'} />
            {pageLoading && !pageError ? <PostsUISkeleton /> : renderPostsSection()}
        </View>
    );
};

export default PostsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE_COLOR
    },
    Emptycontainer: {
        marginVertical: verticalScale(320)
    },
    seperator: {
        width: scale(380),
        height: verticalScale(2),
        alignSelf: 'center',
        backgroundColor: colors.SHADOW_COLOR
    }
});
