import { ForgotPasswordBodyType, ResetPasswordBodyType, UserLoginBodyType, UserSignupBodyType ,VerifyOTPBodyType} from '../../models';
import httpService from '../https.service';
import Urls from './api.url';

// const login = (body: LoginBodyType) => {
//   return httpService().post(Urls.login, body);
// };
const userLogin = (body: UserLoginBodyType) => {
  return httpService().post(Urls.userLogin, body);
};

const userSignup = (body: UserSignupBodyType) => {
  return httpService().post(Urls.userSignup, body);
};
const forgotPassword = (body: ForgotPasswordBodyType) => {
  return httpService().post(Urls.forgotPassword, body);
};
const resetPassword = (body: ResetPasswordBodyType) => {
  return httpService().post(Urls.resetPassword, body);
};
const verifyOTP = (body: VerifyOTPBodyType) => {
  return httpService().post(Urls.verifyOTP, body);
};

export const AuthApis = {
  userLogin,
  userSignup,
  forgotPassword,
  resetPassword,
  verifyOTP,
};
