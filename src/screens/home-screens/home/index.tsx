import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {CustomTabBar} from '../../../shared-ui';
import {CalendarScreen} from './Calender';
import {HomeScreen} from './HomeScreen';
import {ProfileScreen} from './ProfileScreen';
import {Images} from '../../../config';
import {Favorites} from './Favorites';

const Tab = createBottomTabNavigator();

const tabIcons = {
  Home: Images.homeFilled,
  Calendar: Images.calendarFilled,
  Favorites: Images.favoritesFilled,
  Profile: Images.profileFilled,
};

export const HomeTabar = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <CustomTabBar {...props} icons={tabIcons} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
