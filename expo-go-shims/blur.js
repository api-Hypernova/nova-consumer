// EXPO GO DEMO ONLY (active when NOVA_EXPO_GO=1, see ../metro.config.js).
// Expo Go does not contain @react-native-community/blur; this stand-in uses expo-blur, which it does.
import React from 'react';
import { BlurView as ExpoBlurView } from 'expo-blur';

export const BlurView = ({ blurType = 'dark', blurAmount = 10, style, children }) => (
  <ExpoBlurView tint={blurType === 'dark' ? 'dark' : 'light'} intensity={Math.max(1, Math.min(100, blurAmount))} style={style}>
    {children}
  </ExpoBlurView>
);
export const VibrancyView = BlurView;
export default BlurView;
