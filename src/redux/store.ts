import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {rootReducer} from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
  // whitelist: ['auth', 'dropdownData'],
  //   whitelist: ["theme", "auth",],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = (getDefaultMiddleware: any) =>
  getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  });

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
});

export const persistor = persistStore(store);
