import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import colors from '../../assets/colors';
import { verticalScale, scale, moderateScale } from '../../utils/Scaling';

const PostUISkeleton = () => {
    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.contentCOntainer}>
            <SkeletonPlaceholder direction='left' highlightColor={colors.SKELETON_LIGHT_GRAY}>
                <View style={styles.container}>
                    <View style={styles.infoContainer}>
                        <View style={styles.userImg} />
                        <View style={styles.userDataContainer}>
                            <View style={styles.postOwnerName} />
                            <View style={styles.postTime} />
                        </View>
                    </View>
                    <View style={styles.postImg} />
                </View>

            </SkeletonPlaceholder>
            <SkeletonPlaceholder direction='left' highlightColor={colors.SKELETON_LIGHT_GRAY} >
                <View style={styles.container}>
                    <View style={styles.infoContainer}>
                        <View style={styles.userImg} />
                        <View style={styles.userDataContainer}>
                            <View style={styles.postOwnerName} />
                            <View style={styles.postTime} />
                        </View>
                    </View>
                    <View style={styles.postImg} />
                </View>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder direction='left' highlightColor={colors.SKELETON_LIGHT_GRAY} >
                <View style={styles.container}>
                    <View style={styles.infoContainer}>
                        <View style={styles.userImg} />
                        <View style={styles.userDataContainer}>
                            <View style={styles.postOwnerName} />
                            <View style={styles.postTime} />
                        </View>
                    </View>
                    <View style={styles.postImg} />
                </View>
            </SkeletonPlaceholder>
        </ScrollView>
    )
}

export default React.memo(PostUISkeleton)


const styles = StyleSheet.create({
    container: {
        marginTop: verticalScale(30),
        alignSelf: 'center'
    },
    contentCOntainer: {
        alignSelf: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: verticalScale(10)
    },
    userImg: {
        width: scale(60),
        height: scale(60),
        borderRadius: scale(60) / 2,
    },
    userDataContainer: {
        marginLeft: scale(20)
    },
    postOwnerName: {
        width: scale(180),
        height: verticalScale(15),
        borderRadius: moderateScale(4)
    },
    postTime: {
        marginTop: verticalScale(6),
        width: scale(100),
        height: verticalScale(15),
        borderRadius: moderateScale(4)
    },
    postTextContainer: {
        marginVertical: verticalScale(10)
    },
    postImg: {
        width: scale(380),
        height: verticalScale(250),
        marginTop: verticalScale(5),
        borderRadius: moderateScale(10),

    }
})