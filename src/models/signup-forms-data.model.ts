import {AddBusinessDataEnums} from '../constants';
import {AddBusinessDataFlow} from '../screens/auth-screens/user-signup/UserSignupTypes';

export const addBusinessDataFlow: AddBusinessDataFlow = {
  [AddBusinessDataEnums.AddBusinessNameAndEmail]: {
    nextForm: AddBusinessDataEnums.AddPhoneNumber,
    prevForm: null,
  },

  [AddBusinessDataEnums.AddPhoneNumber]: {
    nextForm: AddBusinessDataEnums.AddVerifyAccount,
    prevForm: AddBusinessDataEnums.AddBusinessNameAndEmail,
  },

  [AddBusinessDataEnums.AddVerifyAccount]: {
    nextForm: AddBusinessDataEnums.AddPassword,
    prevForm: AddBusinessDataEnums.AddPhoneNumber,
  },

  [AddBusinessDataEnums.AddPassword]: {
    nextForm: AddBusinessDataEnums.AddGender,
    prevForm: AddBusinessDataEnums.AddVerifyAccount,
  },

  [AddBusinessDataEnums.AddGender]: {
    nextForm: AddBusinessDataEnums.AddBusinessOwnerProfilePic,
    prevForm: AddBusinessDataEnums.AddPassword,
  },
};
