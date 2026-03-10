import React from 'react';
import {
  BackHeader,
  BottamButton,
  CustomInput,
  FormInputsComp,
  MainContainer,
  Text,
} from '../../../components';
import {FormikCustomInput} from '../../../components/formik-inputs/formik-custom-input';
import {Formik} from 'formik';
import {View} from 'react-native';
import navigationService from '../../../config/navigationService';
import {HomeRoutes} from '../../../constants';

export const AddCard = () => {
    return (
  <>
    <MainContainer>
      <BackHeader
        heading="Add Card"
        subheading="Please add your card details to get started"
      />
      <Formik
        initialValues={
          {
            // : selectedService?.title || '',
            // location: selectedService?.location || '',
            // add_pricing: selectedService?.price || '',
          }
        }
        onSubmit={values => {
          console.log('Form Submitted:', values);
        }}>
        {({handleChange, handleSubmit, values, errors, touched}) => (
          <>
            <FormInputsComp.FormikCustomInput
              //   value={selectedService?.title}
              label="Card numbers"
              name="Card numbers"
              placeholder="Enter your card number"
              isCard
              mainContainerStyles={{marginTop:10}}
            />
            <View style={{flexDirection: 'row',marginTop:10}}>
              <FormInputsComp.FormikCustomInput
                //   value={selectedService?.title}
                label="Expiry Date"
                name="Expiry Date"
                placeholder="MM/YY"
                //   containerStyle={{borderWidth:1,width:'98%'}}
                mainContainerStyles={{width: '48%', marginRight: 8}}
              />
              <FormInputsComp.FormikCustomInput
                //   value={selectedService?.title}
                label="Security Code"
                name="Security Code"
                placeholder="CVC"
                //   containerStyle={{borderWidth:1,width:'98%'}}
                mainContainerStyles={{width: '49%'}}
              />
            </View>
          </>
        )}
      </Formik>
    </MainContainer>
    <BottamButton
      title="Save"
      onPress={() => {
        navigationService.navigate(HomeRoutes['PaymentScreen'], { buttonText: 'Done' });

      }}
    />
  </>
  )
};
