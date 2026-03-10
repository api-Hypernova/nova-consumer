import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {BackHeader, MainContainer} from '../../../components';
import {AddFormComponentMap} from './UserSignupTypes';
import {AddBusinessDataEnums, AuthRoutes} from '../../../constants';
import {
  AddBusinessAddress,
  AddGender,
  AddPhoneNumber,
  AddBusinessNameAndEmail,
  AddBusinessOwnerProfilePic,
  AddContactDetails,
  AddPassword,
  AddServicesDetails,
  AddStaffDetails,
  AddVerifyAccount,
} from './inner-add-components';
import {addBusinessDataFlow} from '../../../models';
import {NavigationService} from '../../../config';
import navigationService from '../../../config/navigationService';
import {setAuthentication} from '../../../redux/reducers';
import {useDispatch} from 'react-redux';

const addFormComponentMap: AddFormComponentMap = {
  [AddBusinessDataEnums.AddBusinessNameAndEmail]: AddBusinessNameAndEmail,
  [AddBusinessDataEnums.AddVerifyAccount]: AddVerifyAccount,
  [AddBusinessDataEnums.AddPassword]: AddPassword,
  [AddBusinessDataEnums.AddGender]: AddGender,
  [AddBusinessDataEnums.AddPhoneNumber]: AddPhoneNumber,
  [AddBusinessDataEnums.AddBusinessOwnerProfilePic]: AddBusinessOwnerProfilePic,
};

export const UserSignUpScreen = ({}) => {
  const dispatch = useDispatch();

  const [currentForm, setCurrentForm] = useState<AddBusinessDataEnums>(
    AddBusinessDataEnums.AddBusinessNameAndEmail,
  );
  const [formData, setFormData] = useState<any>({});

  const ComponentToRender = addFormComponentMap[currentForm];

  const availableNextForm = currentForm
    ? addBusinessDataFlow[currentForm]?.nextForm
    : null;
  const availablePrevForm = currentForm
    ? addBusinessDataFlow[currentForm]?.prevForm
    : null;

  return (
    <View style={{flex: 1}}>
      {ComponentToRender ? (
        <ComponentToRender
          currentForm={currentForm}
          isNextFormAvailable={Boolean(availableNextForm)}
          onPressNext={body => {
            // console.log('->>>>>>>>body->>>>', {body});
            // Store form data
            setFormData((prev: any) => ({...prev, ...body}));
            
            if (availableNextForm) {
              setCurrentForm(availableNextForm);
            } else {
              dispatch(setAuthentication(true));

              // NavigationService.navigate(AuthRoutes['UserLocationScreen']);
              // Alert.alert('Are you sure?', 'You want to submit', [
              //   {text: 'Ok', onPress: () => {}},
              //   {text: 'Cancel', onPress: () => {}},
              // ]);
            }
          }}
          isPrevFormAvailable={Boolean(availablePrevForm)}
          onPressBack={() => {
            if (availablePrevForm) {
              setCurrentForm(availablePrevForm);
            } else {
              NavigationService.goBack();
              // dispatch(setReset());
            }
          }}
          ftFormData={formData}
        />
      ) : (
        <>
          <BackHeader /> <Text>No Form Found</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
