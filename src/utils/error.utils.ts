import {toast} from './toast.utils';

export const handleError = (response: any, onSuccess: () => void) => {
  const errorCode = response?.data?.code;
  const message = response?.data?.message;
  if (errorCode === 0) {
    onSuccess();
  } else {
    toast.fail(message);
  }
};

