import React from 'react';
import { I18nManager, StyleSheet, Text } from "react-native"
import colors from '../../assets/colors';
import Fonts from '../../assets/Fonts';
import { moderateScale, scale, verticalScale } from '../../utils/Scaling';


const BottomLabel = ({ label }: any) => {
  return (
    <Text style={{ ...styles.txt }}>  {label} </Text>
  )
}

export default React.memo(BottomLabel);

const styles = StyleSheet.create({
  txt: {
    color: colors.WHITE_COLOR,
    fontSize: moderateScale(13),
    alignSelf: "center",
    textAlign: 'center',
    maxWidth: scale(125),
    fontFamily: I18nManager.isRTL ? Fonts.REGULAR_FONT_AR : Fonts.REGULAR_FONT_EN,
    paddingTop: verticalScale(5)
  }
})