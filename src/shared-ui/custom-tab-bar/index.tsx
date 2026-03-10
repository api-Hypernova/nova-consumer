import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import {
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { CustomImage } from '../../components';
import { useTheme } from '../../hooks';
import { handleHaptictFeedback, SD } from '../../utils';
import App from '../../../App';

const {width} = Dimensions.get('window');

const Tab = createBottomTabNavigator();

const ICON_SIZE = SD.hp(20);
const CIRCLE_SIZE = SD.hp(50);

const AnimatedIcon = ({name, isFocused, icon}: any) => {
  const {AppTheme} = useTheme();
  const animatedStyle = useAnimatedStyle(() => {
    const scale = withSpring(isFocused ? 1.2 : 1, {
      damping: 10, // Reduces overshooting for smoothness
      stiffness: 200, // Makes the animation faster
    });
    const opacity = withSpring(isFocused ? 1 : 0.6, {
      damping: 15,
      stiffness: 180,
    });
    return {
      transform: [{scale}],
      opacity,
    };
  });

  return (
    <Animated.View style={[styles.iconContainer, animatedStyle]}>
      <CustomImage
        source={icon}
        resizeMode="contain"
        style={{
          height: ICON_SIZE,
          width: ICON_SIZE,
          tintColor: isFocused ? AppTheme.Primary : AppTheme.BorderColor,
        }}
      />
    </Animated.View>
  );
};

const TabButton = ({name, isFocused, onPress, source}: any) => {
  const {AppTheme} = useTheme();
  const animatedCircleStyle = useAnimatedStyle(() => {
    const scale = withSpring(isFocused ? 1 : 0, {
      damping: 10, // Keeps the scale transition quick but smooth
      stiffness: 250, // Faster response for the bounce effect
    });
    return {
      transform: [{scale}],
    };
  });

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.tabButton}>
        <Animated.View style={[styles.backgroundCircle,{
           backgroundColor: AppTheme.TabBarIconCircleColor,
        } ,animatedCircleStyle]} />
        <AnimatedIcon isFocused={isFocused} icon={source} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export const CustomTabBar: React.FC<any> = ({
  state,
  descriptors,
  navigation,
  icons,
}) => {
  const {AppTheme} = useTheme();
  return (
    <View
      style={[
        styles.tabBar,
        {backgroundColor: AppTheme.Base, borderTopColor: AppTheme.BorderBlackColor},
      ]}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          handleHaptictFeedback();
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TabButton
            key={index}
            source={icons[route.name]}
            isFocused={isFocused}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    height: SD.hp(90),
    // alignItems: 'center',
    elevation: 10,
    paddingTop: SD.hp(10),
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 5,
    height: 60,
  },
  backgroundCircle: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
   
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

