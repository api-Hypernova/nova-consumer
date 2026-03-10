import {Formik} from 'formik';
import React, {useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  CalendarCard,
  CustomImage,
  FormInputsComp,
  Modal,
  RequestCard,
  ResultCard,
  SecondaryButton,
  Text,
} from '../../../components';
import {Images} from '../../../config';
import {useTheme} from '../../../hooks';
import {Fonts} from '../../../styles';
import {SD} from '../../../utils';

const dataArray = [
  {
    id: '1',
    source: Images.checkIN,
    status: 'Check In',
    info: '4:00 PM',
    backgroundColor: '#f4f8f0',
  },
  {
    id: '2',
    source: Images.checkOut,
    status: 'Check Out',
    info: '2:00 AM',
    backgroundColor: '#fef4f5',
  },
  {
    id: '3',
    source: Images.calendar,
    status: 'Appointment',
    info: '20',
    backgroundColor: '#f1f7fc',
  },
  {
    id: '4',
    source: Images.wallet,
    status: 'Total Amount',
    info: '$220',
    backgroundColor: '#eef6ff',
  },
];

export const CalendarDetailsScreen = () => {
  const {AppTheme} = useTheme();
  const [selected, setSelected] = useState<string>('');
  const specialDate = '2024-12-17';

  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to handle the date selection
  const handleDateSelect = (date: string) => {
    setSelected(date); // Update the selected date
  };

  const renderItem = ({item}: any) => (
    <ResultCard
      cardContainerStyle={{
        backgroundColor: item.backgroundColor,
      }}
      source={item.source}
      status={item.status}
      info={item.info}
    />
  );

  return (
    <>
      <CalendarCard
        specialDate={specialDate}
        selected={selected} // Pass the selected date here
        onDateSelect={handleDateSelect}
      />
      <View
        style={{
          flex: 1,
          borderTopWidth: 0.5,
          borderColor: AppTheme.BorderColor,
          marginTop: SD.hp(30),
          paddingHorizontal: SD.hp(20),
        }}>
        <View style={{marginTop: SD.hp(20)}}>
          <Text size={16} semiBold style={styles.resultHeader}>
            Result
          </Text>
          {selected === specialDate ? (
            <RequestCard
              title="Sarah Burress"
              subTitle="has requested time off"
              onPress={() => {
                setIsModalVisible(true);
              }}
            />
          ) : (
            <FlatList
              scrollEnabled={false}
              data={dataArray}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              numColumns={2}
              columnWrapperStyle={styles.row}
              contentContainerStyle={styles.gridContainer}
            />
          )}
        </View>
      </View>

      <Modal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        mainContainerStyle={{}}
        modalStyles={styles.modalStyles}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.headerContainer(AppTheme)}>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(false);
              }}>
              <CustomImage style={styles.crossIcon} source={Images.crossIcon} />
            </TouchableOpacity>

            <Text semiBold size={15}>
              {'Time Off Request'}
            </Text>
          </View>

          {/* Profile Section */}

          <View style={styles.profileSection}>
            <View>
              <CustomImage
                source={Images.Ellipse2}
                style={styles.profileImage}
              />

              <View style={styles.textContainer}>
                <Text size={19} bold>
                  {'Sarah Burress'}
                </Text>
                <Text
                  medium
                  size={15}
                  topSpacing={5}
                  color={AppTheme.SecondaryGrayTextColor}>
                  {'Make up Artist'}
                </Text>
              </View>
            </View>

            <View
              style={{
                marginTop: SD.hp(30),
              }}>
              <Formik
                initialValues={{date: '', time: ''}}
                // validationSchema={validationSchema}
                onSubmit={values => {
                  console.log(values);
                }}>
                {({handleSubmit}) => (
                  <>
                    <FormInputsComp.FormikCustomInput
                      editable={false}
                      name="date"
                      label="Date"
                      placeholder="17 - Oct - 2024"
                      mainContainerStyles={{
                        marginTop: SD.hp(10),
                      }}
                      containerStyle={styles.containerStyle}
                      customStyle={styles.textInput(AppTheme)}
                      placeholderTextColor={AppTheme.PrimaryTextColor}
                    />

                    <FormInputsComp.FormikCustomInput
                      editable={false}
                      name="time"
                      label="Time Duration"
                      placeholder="10.30 - 11:30"
                      mainContainerStyles={{
                        marginTop: SD.hp(10),
                      }}
                      containerStyle={styles.containerStyle}
                      customStyle={styles.textInput(AppTheme)}
                      placeholderTextColor={AppTheme.PrimaryTextColor}
                    />

                    <View
                      style={{
                        // borderWidth: 1,
                        marginTop: SD.hp(10),
                      }}>
                      <Text size={16} bold secondaryColor bottomSpacing={15}>
                        {'Reason'}
                      </Text>

                      <View style={styles.textConatinerStyles(AppTheme)}>
                        <Text
                          size={12}
                          secondaryColor
                          medium
                          letterSpacing={0.5}>
                          {
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                          }
                        </Text>
                      </View>
                    </View>
                  </>
                )}
              </Formik>
              ;
            </View>
          </View>
          <View
            style={[
              styles.footer,
              {borderTopColor: AppTheme.BorderBlackColor},
            ]}>
            <SecondaryButton
              onPress={() => {
                setIsModalVisible(false);
              }}
              customStyles={styles.button}
              title="Accept"
            />

            <SecondaryButton
              onPress={() => {
                setIsModalVisible(false);
              }}
              customStyles={styles.button}
              isSecondary
              title="Decline"
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create<any>({
  resultHeader: {
    marginBottom: SD.hp(10),
  },
  gridContainer: {
    paddingTop: SD.hp(20),
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: SD.hp(15),
  },

  modalStyles: {
    height: '80%',
    width: '90%',
    borderWidth: 1,
    paddingHorizontal: SD.wp(0),
    paddingVertical: SD.hp(0),
  },
  modalContainer: {
    height: '100%',
    borderRadius: SD.wp(20),
    paddingVertical: SD.hp(10),
  },
  headerContainer: (AppTheme: any) => ({
    paddingHorizontal: SD.wp(15),
    marginTop: SD.hp(10),
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: SD.hp(15),
    borderBottomWidth: 1,
    borderColor: AppTheme.BorderColor,
  }),
  crossIcon: {
    width: SD.wp(32),
    height: SD.hp(32),
    marginRight: SD.wp(60),
  },
  profileSection: {
    marginTop: SD.hp(15),
    paddingHorizontal: SD.wp(20),
    flex: 1,
    // borderWidth: 1,
  },
  profileImage: {
    width: SD.wp(65), // Adjust as needed
    height: SD.hp(65), // Adjust as needed
    borderRadius: SD.wp(16), // Example for a circular image
  },
  textContainer: {
    marginTop: SD.hp(10), // Adjust spacing as needed
  },
  footer: {
    borderTopWidth: 1,
    paddingHorizontal: SD.wp(20),
    paddingTop: SD.hp(10),
    // height: SD.hp(60),
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth: 1,
  },
  button: {
    width: '48%',
    borderRadius: SD.hp(30),
  },
  textInput: (AppTheme: any) => ({
    fontSize: SD.customFontSize(14),
    fontFamily: Fonts['Medium'],
  }),
  containerStyle: {
    borderRadius: SD.wp(10),
    height: SD.hp(50),
  },
  textConatinerStyles: (AppTheme: any) => ({
    height: SD.hp(84),
    paddingHorizontal: SD.wp(15),
    paddingVertical: SD.hp(12),
    backgroundColor: AppTheme.BgColor2,
    borderRadius: SD.hp(10),
    borderColor: AppTheme.BorderColor,
    borderWidth: 1,
  }),
});
