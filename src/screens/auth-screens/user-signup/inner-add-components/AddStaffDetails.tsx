import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {ComponentToRenderTypes} from '../UserSignupTypes';
import {
  BackHeader,
  BottamButton,
  CardContainer,
  FormInputsComp,
  HorizantalCard,
  HorizontalCard,
  MainContainer,
  Modal,
  PrimaryButton,
  ResultsHeader,
} from '../../../../components';
import {FormBottomBtns} from '../../../../shared-ui';
import {Formik, FormikHelpers, FormikValues} from 'formik';
import {Images} from '../../../../config';
import {SD} from '../../../../utils';
import {useTheme} from '../../../../hooks';
import authSchema from '../../../../formik-schma/authSchema';

type AddStaffDetailsProps = ComponentToRenderTypes;

const StaffListing = [
  {
    id: '1',
    title: 'Jack Salon',
    subtitle: 'saskiropokova@mail.com',
  },
  {
    id: '2',
    title: 'Luxe Hair Studio',
    subtitle: 'saskiropokova@mail.com',
  },
];

export const AddStaffDetails: React.FC<AddStaffDetailsProps> = ({
  currentForm,
  onPressBack,
  onPressNext,
  isNextFormAvailable,
}) => {
  const {AppTheme} = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);

  const staffEmail = useRef<TextInput>(null);

  const renderItem = ({item}) => (
    <HorizontalCard title={item.title} subTitle={item.subtitle} />
  );

  return (
    <>
      <MainContainer>
        <BackHeader
          heading="Add Staff"
          subheading="Add Details of your Staff Members "
          isSeekBar
          seekBarRatio={currentForm}
          backFunction={onPressBack}
        />

        <View style={{flex: 1, marginTop: SD.hp(30)}}>
          <ResultsHeader
            isIcon
            title="Added Staff Member"
            buttonTitle="Add another"
            buttonCustomStyle={{
              backgroundColor: AppTheme.BgColor2,
            }}
            onPress={() => {
              setModalVisible(true);
              console.log('Add another');
            }}
          />

          <View
            style={{
              marginTop: SD.hp(20),
            }}>
            <FlatList
              contentContainerStyle={{paddingBottom: SD.hp(100)}}
              showsVerticalScrollIndicator={false}
              data={StaffListing}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </MainContainer>

      <FormBottomBtns
        onPressNext={onPressNext}
        isNextFormAvailable={isNextFormAvailable}
      />

      <Modal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        mainContainerStyle={{
          justifyContent: 'flex-end',
        }}
        modalStyles={{
          margin: 0,
          height: '93%',
          width: '100%',
        }}>
        <BackHeader
          heading="Staff Details"
          subheading="Add Details of your Staff Members"
          backFunction={() => {
            setModalVisible(false);
          }}
        />

        <Formik
          initialValues={{
            staff_name: '',
            staff_email: '',
          }}
          validationSchema={authSchema.addStaffSchema} // Un-commented to enable validation
          onSubmit={values => {
            console.log('Form Values:', values);
            // Submit logic here (e.g., API call)
            // setModalVisible(false); // Close the modal after submission
          }}>
          {({handleChange, handleSubmit, values, errors, touched}) => (
            <View
              style={{
                paddingBottom: SD.hp(100),
              }}>
              <FormInputsComp.FormikCustomInput
                label="Staff Name"
                name="staff_name"
                placeholder="Staff Name"
                onSubmitEditing={() => staffEmail.current?.focus()}
                // value={values.staff_name}
                // onChangeText={handleChange('staff_name')}
              />

              <FormInputsComp.FormikCustomInput
                label="Staff Email"
                name="staff_email"
                placeholder="Staff Email"
                inputRef={staffEmail}
                returnKeyType="done"
                // value={values.staff_email}
                // onChangeText={handleChange('staff_email')}
              />

              {/* Submit Button */}
              {/* <BottamButton
                    custombuttonContainerStyle={{
                      borderWidth:1,
                      borderColor:AppTheme.BorderColor,
                      bottom: SD.hp(0),
                      paddingHorizontal: SD.hp(0),
                    }}
                    title={'Add'}
                    onPress={() => {
                      handleSubmit();
                      setModalVisible(false);
                    }}
                  /> */}
            </View>
          )}
        </Formik>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({});
