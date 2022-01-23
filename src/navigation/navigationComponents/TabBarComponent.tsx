import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import colors from '../../assets/colors';
import { handleNavigation } from '../../redux/actions/HandleNavigationAction';
import { verticalScale } from '../../utils/Scaling';
import BottomLabel from './BottomLabel';
import ImgTab from './ImgTab';


function MyTabBar({ state, descriptors, navigation }: any) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const dispatch = useDispatch();
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const TabIcon = () => options.tabBarIcon

        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            if (route.name === "InYourHelpScreen") {
              dispatch(handleNavigation(false))
              navigation.navigate(route.name);
            } else {
              navigation.navigate(route.name);
            }
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={index.toString()}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }} >
            <ImgTab tabName={route.name} index={state.index} />
            <BottomLabel label={label} focus={isFocused} />
          </TouchableOpacity>
        );
      })}
    </View>


  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.MAIN_COLOR,
    height: verticalScale(75),
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
export default React.memo(MyTabBar)

