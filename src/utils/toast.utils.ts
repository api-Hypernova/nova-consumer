import {
  ToastPosition,
  toast as toasts,
} from '@backpackapp-io/react-native-toast';

import {ThemeColors} from '../styles';

// function success(message: string) {
//   Snackbar.show({
//     text: message || 'Success',
//     duration: Snackbar.LENGTH_LONG,
//     backgroundColor: '#00AC28',
//   });
// }

// function fail(message: string) {
//   Snackbar.show({
//     text: message || 'Error',
//     duration: Snackbar.LENGTH_LONG,
//     backgroundColor: ThemeColors.Red,
//   });
// }

// function info(message: string) {
//   Snackbar.show({
//     text: message || 'Info',
//     duration: Snackbar.LENGTH_LONG,
//     backgroundColor: ThemeColors.Primary,
//   });
// }

function success(message: string) {
  toasts.success(message || 'Something Went Wrong', {
    duration: 2000,
    position: ToastPosition.TOP,
    animationType: 'spring',
    styles: {
      text: {
        fontSize: 14,
        fontWeight: 'bold',
      },
    },
  });
}

function fail(message: string) {
  toasts.error(message || 'Something Went Wrong', {
    duration: 2000,
    position: ToastPosition.TOP,
    animationType: 'spring',
    styles: {
      text: {
        fontSize: 14,
        fontWeight: 'bold',
      },
    },
  });
}

function info(message: string) {
  toasts.success(message || 'Something Went Wrong', {
    duration: 2000,
    position: ToastPosition.TOP,
    animationType: 'spring',
    styles: {
      indicator: {
        backgroundColor: ThemeColors.Primary,
      },
      text: {
        fontSize: 14,
        fontWeight: 'bold',
      },
    },
  });
}

export const toast = {
  success,
  fail,
  info,
};
