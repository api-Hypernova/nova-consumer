/**
 * NOVA User App - Expo Version
 * @format
 */

import React, {useCallback, useEffect, useState} from 'react';
import {StatusBar, useColorScheme, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import {MainStack} from './src/stacks/MainStack';
import {NavigationService} from './src/config';
import {useTheme} from './src/hooks';
import ENFonts from './src/styles/fonts';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function App(): React.JSX.Element {
  const [appIsReady, setAppIsReady] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';
  const {AppTheme} = useTheme();

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts
        await Font.loadAsync({
          'Gilroy-Bold': require('./src/assets/fonts/Gilroy-Bold.ttf'),
          'Gilroy-SemiBold': require('./src/assets/fonts/Gilroy-SemiBold.ttf'),
          'Gilroy-Regular': require('./src/assets/fonts/Gilroy-Regular.ttf'),
          'Gilroy-Medium': require('./src/assets/fonts/Gilroy-Medium.ttf'),
          'Gilroy-Light': require('./src/assets/fonts/Gilroy-Light.ttf'),
        });
      } catch (e) {
        console.warn('Error loading fonts:', e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{flex: 1}} onLayout={onLayoutRootView}>
      <NavigationContainer
        ref={(ref: any) => NavigationService.setTopLevelNavigator(ref)}
        theme={{
          dark: false,
          colors: {
            background: AppTheme.Base,
            primary: AppTheme.Base,
            card: AppTheme.Base,
            text: AppTheme.Base,
            border: AppTheme.Base,
            notification: AppTheme.Base,
          },
          fonts: {
            regular: {
              fontFamily: ENFonts['Regular'],
              fontWeight: 'normal',
            },
            medium: {
              fontFamily: ENFonts['Medium'],
              fontWeight: 'normal',
            },
            bold: {
              fontFamily: ENFonts['Bold'],
              fontWeight: 'normal',
            },
            heavy: {
              fontFamily: ENFonts['Bold'],
              fontWeight: 'normal',
            },
          },
        }}>
        <PaperProvider>
          <StatusBar barStyle="light-content" />
          <MainStack />
        </PaperProvider>
      </NavigationContainer>
    </View>
  );
}

export default App;

