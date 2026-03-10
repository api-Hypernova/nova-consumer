import React, {useRef, useState} from 'react';
import {Image, StyleSheet, TextInput, View} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {
  BackHeader,
  BottamButton,
  CalendarManagementCard,
  CardContainer,
  FormInputsComp,
  MainContainer,
  Modal,
  PrimaryButton,
  Text,
} from '../../../components';
import {Images} from '../../../config';
import navigationService from '../../../config/navigationService';
import {HomeRoutes} from '../../../constants';
import {FloatedAddBtn} from '../../../shared-ui';
import {SD} from '../../../utils';
import {Formik} from 'formik';
import {useTheme} from '../../../hooks';

const initialStaffData = [
  {id: '1', name: 'Nathan Alexander', role: 'Senior Barber'},
  {id: '2', name: 'Jenny Winkles', role: 'Hair Stylist'},
  {id: '3', name: 'Sarah Burress', role: 'Makeup Artist'},
  {id: '4', name: 'Mike Thompson', role: 'Senior Barber'},
  {id: '5', name: 'Annabel Rohan', role: 'Hair Stylist'},
];

export const StaffManagement = () => {
  const {AppTheme} = useTheme();

  const staffEmail = useRef<TextInput>(null);

  const [activeRowId, setActiveRowId] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleRowOpen = (rowKey: string) => {
    setActiveRowId(rowKey);
  };

  const handleRowClose = (rowKey: string) => {
    if (activeRowId === rowKey) {
      setActiveRowId(null);
    }
  };

  const renderHiddenItem = () => (
    <CardContainer customStyles={styles.hiddenItemContainer} >
      <View style={styles.deleteView}>
        <Image
          source={Images.deleteIconWhite}
          style={{width: SD.wp(12), height: SD.hp(15), marginBottom: SD.hp(4)}}
        />
        <Text size={13} color="white" regular>
          Delete
        </Text>
      </View>
    </CardContainer>
  );

  const renderItem = ({item}: any) => {
    const isActive = activeRowId === item.id;
    return (
      <CalendarManagementCard
        onPress={() => {
          navigationService.navigate(HomeRoutes['StaffActivity']);
        }}
        containerCustomStyle={[
          styles.profileContainer,
          
          isActive && {backgroundColor: '#F8FAFC', paddingRight: SD.wp(25)},
        ]}
        title={item.name}
        subTitle={item.role}
        source={Images.profileImg}
        animationType= "opacity"
      />
    );
  };

  return (
    <>
      <MainContainer isFlatList>
        {/* <Text size={32} bold>
              Staff Management
          </Text> */}
        <BackHeader
          HeadingContainerProps={{
            isSubHeadig: false,
          }}
          heading="Staff Management"
        />
        <SwipeListView
          showsVerticalScrollIndicator={false}
          data={initialStaffData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-55}
          disableRightSwipe
          onRowOpen={handleRowOpen}
          onRowClose={handleRowClose}
          contentContainerStyle={{paddingBottom: SD.hp(300)}}
          style={styles.listContainer}
        

          
        />
        <FloatedAddBtn
          onPress={() => {
            setModalVisible(true);
            // navigationService.navigate(HomeRoutes['MessageListingScreen']);
          }}
          iconSize={20}
          customStyles={{marginRight: SD.wp(10), marginBottom: SD.hp(50)}}
        />
      </MainContainer>
      <Modal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        mainContainerStyle={{
          justifyContent: 'flex-end',
        }}
        modalStyles={{
          margin: 0,
          height: '70%',
          width: '100%',
        }}>
        <Formik
          initialValues={{
            staff_name: '',
            staff_email: '',
          }}
          // validationSchema={authSchema.addStaffSchema} // Un-commented to enable validation
          onSubmit={values => {
            console.log('Form Values:', values);

            // Submit logic here (e.g., API call)
            setModalVisible(false); // Close the modal after submission
          }}>
          {({handleChange, handleSubmit, values, errors, touched}) => (
            <View
              style={{
                paddingBottom: SD.hp(100),
              }}>
              <BackHeader
                heading="Staff Details"
                subheading="Add Details of your Staff Members"
                HeadingContainerProps={{
                  containerStyle: {
                    // borderWidth: 1,
                    marginBottom: SD.hp(50),
                    marginTop: SD.hp(20),
                  },
                }}
                backFunction={() => {
                  setModalVisible(false);
                }}
              />
              <FormInputsComp.FormikCustomInput
                label="Staff Name"
                name="staff_name"
                placeholder="Staff Name"
                onSubmitEditing={() => staffEmail.current?.focus()}
              />

              <FormInputsComp.FormikCustomInput
                label="Staff Email"
                name="staff_email"
                placeholder="Staff Email"
                inputRef={staffEmail}
                returnKeyType="done"
              />

              {/* Submit Button */}
              <PrimaryButton
                title="Add Staff"
                onPress={() => handleSubmit()}
                customStyles={{marginTop: SD.hp(30)}}
              />
            </View>
          )}
        </Formik>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    // marginTop: 20,
  },
  profileContainer: {
    backgroundColor: 'white',
    padding: 5,
    paddingVertical: 20,
    marginTop: 0,
    opacity:1
  },
  hiddenItemContainer: {
    backgroundColor: '#171717',
    alignItems: 'flex-end',
    paddingHorizontal: 2,
    height: 100,
  },
  deleteView: {
    marginTop: SD.hp(27),
    marginRight: SD.wp(8),
    alignItems: 'center',
  },
});
