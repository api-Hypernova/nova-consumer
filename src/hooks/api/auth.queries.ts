import {useMutation} from '@tanstack/react-query';
import {useDispatch} from 'react-redux';
import {AuthApis} from '../../api/auth';
import {LoginResponseType, UserModel} from '../../models';
import {setAuthentication, setToken, setUser} from '../../redux/reducers';



// export const userSignup = (callback: () => void) => {
//   return useMutation({
//     mutationFn: AuthApis.userSignup,
//     onSuccess: async (response: any) => {
//       const serverResponse = response?.data;
//       console.log('User signup response:', serverResponse);
//       if (response?.data?.status === true) {
//         // Call the passed callback function
//         if (callback) {
//           callback();
//         }
//       } else {
//         console.log(response?.data?.message);
//       }
//     },
//     onError: (error: any) => {
//       console.log(
//         error?.response?.data?.error ||
//           error?.response?.data?.message ||
//           error?.response?.data?.msg ||
//           error?.response?.error ||
//           'Something went wrong. Please try again later.',
//       );
//     },
//   });
// };
export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: AuthApis.userLogin,
    onSuccess: async (response: any) => {
      if (response?.data?.code == 0) {
        const serverResponse = response?.data as LoginResponseType;
        const token = serverResponse?.data?.token_api_user;
        console.log('response', serverResponse);

        dispatch(setToken(token));
        dispatch(setUser(serverResponse?.data as UserModel));
        dispatch(setAuthentication(true));
      } else {
        console.log(response?.data?.message);
      }
    },
    onError: (error: any) => {
      console.log(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          error?.response?.data?.msg ||
          error?.response?.error ||
          'Something went wrong. Please try again later.',
      );
    },
  });
};
