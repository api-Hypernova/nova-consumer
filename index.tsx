/**
 * NOVA User App - Entry Point
 * @format
 */

import React from 'react';
import {registerRootComponent} from 'expo';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {persistor, store} from './src/redux';
import QueryProvider from './src/queryClient';
import App from './App';

function AppWrapper() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{flex: 1}}>
            <QueryProvider>
              <App />
            </QueryProvider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => AppWrapper);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(AppWrapper);

