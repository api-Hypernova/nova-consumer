import axios from 'axios';
import { store } from '../redux';
import { setAuthentication } from '../redux/reducers';
import { API_TIMEOUT, BASE_PATH, BASE_URL } from './config';

const customAxios = (contentType = 'application/json') => {
  // console.log(`=>>>>>>>>>>>Base Url ${BASE_URL}${BASE_PATH}`);
  const instance = axios.create({
    baseURL: `${BASE_URL}${BASE_PATH}`,
    headers: {'Content-Type': contentType},
    timeout: API_TIMEOUT,
  });

  // Request interceptor
  instance.interceptors.request.use(
    async (config: any) => {
      const token = store.getState().auth.token;

      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }

      console.log('Request URL:', config.url);
      console.log('Request token:', token);

      return config;
    },
    error => {
      console.error('Request Error:', error, error?.response?.data);
      console.log(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          error?.response?.data?.msg ||
          error?.response?.error ||
          'Something went wrong. Please try again later.',
      );
      return;
      //   return Promise.reject(error);
    },
  );

  // Response interceptor
  instance.interceptors.response.use(
    response => {
      // console.log("Response Data:", response.data);
      // console.log('Response Data:', response.data);
      const status = response?.data?.code;
      if (status === 12) {
        store.dispatch(setAuthentication(false));
        console.log('Session Expired. Logging out...');
      }

      return response;
    },
    error => {
      console.error('Response Error:', error, error?.response?.data);
      const errorsTypes =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.response?.data?.msg ||
        error?.response?.error ||
        'Something went wrong. Please try again later.';
      // console.log(
      //   error?.response?.data?.error ||
      //     error?.response?.data?.message ||
      //     error?.response?.data?.msg ||
      //     error?.response?.error ||
      //     "Something went wrong. Please try again later."
      // );

      if (error.response) {
        const {status} = error.response;

        if (status === 401) {
          // Perform logout logic here
          console.log('Unauthorized. Logging out...');
          store.dispatch(setAuthentication(false));
          console.log('Session Expired. Logging out...');
        } else if (status === 404 || status === 400) {
          console.log('Resource not found', error?.response?.data?.error);
          console.log(errorsTypes);
        }
      } else {
        console.error('Error setting up the request:', error.message);
      }

      return;
      //   return Promise.reject(error);
    },
  );

  return instance;
};

export default customAxios;
