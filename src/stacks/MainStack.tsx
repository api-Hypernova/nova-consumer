import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {AuthParamsList, AuthStack} from './AuthStack';
import {HomeParamList, HomeStack} from './HomeStack';
import {useTypedSelector} from '../hooks';
import {HomeRoutes} from '../constants';

type RootStackParamList = AuthParamsList & HomeParamList;

const Stack = createStackNavigator<RootStackParamList>();

export const MainStack = () => {
  const isSuccess = useTypedSelector(state => state.auth.success);
  const isAutenticated = useTypedSelector(state => state.auth.isAuthenticated);

  const AuthScreen = AuthStack?.map(stack => (
    <Stack.Screen
      key={stack.name}
      name={stack?.name}
      component={stack?.component}
      options={stack.options || {}}
    />
  ));

  const HomeScreen = HomeStack?.map(stack => (
    <Stack.Screen
      key={stack.name}
      name={stack?.name}
      component={stack?.component}
      options={stack.options || {}}
    />
  ));

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.DefaultTransition,
        // gestureEnabled: HomeRoutes.BookingCompleteScreen ? false : true,
      }}>
      {/* {isSuccess ? HomeScreen : AuthScreen} */}
      {isAutenticated ? HomeScreen : AuthScreen}
      {/* {AuthScreen} */}
      {/* {HomeScreen} */}
    </Stack.Navigator>
  );
};
