import {AuthRoutes} from '../constants';
import {
  BusinessDetails,
  ForgotPassword,
  Login,
  NewPassword,
  OnboardingScreen,
  ReSendOtp,
  SelectRoleScreen,
  UserSignUpScreen,
  VerificationOtp,
  PreviewBusinessDetails,
  UserLocationScreen,
} from '../screens';

export type AuthParamsList = {
  [AuthRoutes.OnBoarding]: undefined;
  [AuthRoutes.Login]: undefined;
  [AuthRoutes.SelectRole]: undefined;
  [AuthRoutes.BusinessDetails]: undefined;
  [AuthRoutes.ResendOtp]: undefined;
  [AuthRoutes.UserSignUpScreen]: undefined;
  [AuthRoutes.ForgotPassword]: undefined;
  [AuthRoutes.VerificationOtp]: undefined;
  [AuthRoutes.NewPassword]: undefined;
  [AuthRoutes.PreviewBusinessDetails]: undefined;
  [AuthRoutes.UserLocationScreen]: undefined;
};

type AuthStackScreenPropType = {
  name: AuthRoutes;
  component: React.FC;
  options?: any;
};

export const AuthStack: AuthStackScreenPropType[] = [
  {
    name: AuthRoutes.OnBoarding,
    component: OnboardingScreen,
  },
  {
    name: AuthRoutes.SelectRole,
    component: SelectRoleScreen,
  },
  {
    name: AuthRoutes.Login,
    component: Login,
  },
  {
    name: AuthRoutes.BusinessDetails,
    component: BusinessDetails,
  },
  {
    name: AuthRoutes.ResendOtp,
    component: ReSendOtp,
  },
  {
    name: AuthRoutes.UserSignUpScreen,
    component: UserSignUpScreen,
    options: {
      gestureEnabled: false, // Disable swipe gestures for this screen
    },
  },

  {
    name: AuthRoutes.ForgotPassword,
    component: ForgotPassword,
  },

  {
    name: AuthRoutes.VerificationOtp,
    component: VerificationOtp,
  },
  {
    name: AuthRoutes.NewPassword,
    component: NewPassword,
  },
  {
    name: AuthRoutes.PreviewBusinessDetails,
    component: PreviewBusinessDetails,
  },
  {
    name: AuthRoutes.UserLocationScreen,
    component: UserLocationScreen,
  },
];
