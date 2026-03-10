import {combineReducers} from '@reduxjs/toolkit';

import authSlice, {
  logout,
  setAuthentication,
  setToken,
  setUser,
  updateUser,
  handleNavigation
} from './auth.slice';

export const rootReducer = combineReducers({
  //   theme: themeSlice,
  auth: authSlice,
});

// export { setTheme };

export {logout, setAuthentication, setToken, setUser, updateUser, handleNavigation};
