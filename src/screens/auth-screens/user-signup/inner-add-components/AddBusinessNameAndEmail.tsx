import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  BackHeader,
  MainContainer,
  FormInputsComp,
} from '../../../../components';
import {Formik} from 'formik';
import {Images} from '../../../../config';
import {SD} from '../../../../utils';
import {FormBottomBtns} from '../../../../shared-ui';

type AddBusinessNameAndEmailProps = {
  currentForm: number;
  onPressBack: () => void;
  onPressNext: () => void;
  isNextFormAvailable: boolean;
};

export const AddBusinessNameAndEmail: React.FC<
  AddBusinessNameAndEmailProps
> = ({currentForm, onPressBack, onPressNext, isNextFormAvailable}) => {
  return (
    <Formik
      initialValues={{
        business_name: '',
      }}
      // validationSchema={authSchema.businessNameSchema}
      onSubmit={values => {
        console.log('Form Values:', values);
        onPressNext(); // Proceed to the next form
      }}>
      {({handleChange, handleSubmit, values, errors, touched}) => (
        <>
          <MainContainer>
            <BackHeader
              heading="Write your Name & Email Address"
              // subheading="Please mention your full business name to search."
              isSeekBar
              seekBarRatio={currentForm}
              backFunction={onPressBack}
            />
            <View style={styles.contentContainer}>
              <FormInputsComp.FormikCustomInput
                // label="Business Name"
                name="name"
                placeholder="Enter name"
                isIcon
                iconImage={Images.personIcon}
                mainContainerStyles={{marginVertical: SD.hp(20)}}
              />

              <FormInputsComp.FormikCustomInput
                // label="Business Name"

                isIcon
                iconImage={Images.mail}
                name="business_name"
                placeholder="Enter email"
              />
            </View>
          </MainContainer>
          <FormBottomBtns
            onPressNext={handleSubmit}
            isNextFormAvailable={isNextFormAvailable}
          />
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginTop: SD.hp(30),
  },
  errorText: {
    color: 'red',
    fontSize: SD.hp(14),
    marginTop: SD.hp(10),
  },
});
