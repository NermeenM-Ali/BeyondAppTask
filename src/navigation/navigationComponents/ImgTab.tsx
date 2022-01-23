import React from 'react';
import { StyleSheet, View } from "react-native"
import IonIcon from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import colors from '../../assets/colors';
import { verticalScale } from '../../utils/Scaling';


const ImgTab = ({ tabName }: any) => {
  return (
    <View style={styles.container}>
      {
        tabName === "AtyourServiceStack" ?
          <IonIcon name="ios-car" size={25} color={colors.WHITE_COLOR} style={{ alignSelf: 'center' }} />
          :
          tabName === "EmergencyStack" ?
            <IonIcon name="ios-list-outline" size={23} color={colors.WHITE_COLOR} style={{ alignSelf: 'center' }} />
            :
            tabName === "ElhakneyHomeStack" ?
              <FontAwesome5 name="hands-helping" size={23} color={colors.WHITE_COLOR} style={{ alignSelf: 'center' }} />
              : null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(5),
    alignSelf: "center",
  }
})

export default React.memo(ImgTab);

