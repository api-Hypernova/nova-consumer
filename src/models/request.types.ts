// export type LoginBodyType = {
//   username?: string;
//   password?: string;
//   token_fcm: string;
// };

// export type PendingTaskBodyType = {
//   id_user: number;
// };
export type ForgotPasswordBodyType = {
  email: string;
};

export type UserSignupBodyType = {
  email: string;
  name?: string;
  phone: string;
  password: string;
  confirmPassword: string;
  gender: string;
  countryCode: {
    country: string;
    countryCode: string;
  };
};
export type UserLoginBodyType = {
  email: string;
  password: string;
};
export type ResetPasswordBodyType = {
  email: string;
  token: string;
  password: string;
  confirmPassword: string;
};
export type VerifyOTPBodyType = {
  email: string;
  token: string;
};
