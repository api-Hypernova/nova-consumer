import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  BackHeader,
  BottamButton,
  CardContainer,
  CustomImage,
  FormInputsComp,
  MainContainer,
  Modal,
  PrimaryButton,
  RoundIconComp,
  Text,
} from '../../../components';
import {Images, NavigationService} from '../../../config';
import {SD} from '../../../utils';
import navigationService from '../../../config/navigationService';
import {HomeRoutes} from '../../../constants';
import {useTheme} from '../../../hooks';
import {useRoute} from '@react-navigation/native';
import {Formik} from 'formik';

export const PaymentScreen = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const {AppTheme} = useTheme();
  const route = useRoute();
  const keyData = route.params?.key;
  console.log('keyData', keyData);

  const paymentMethods = [
    {
      id: '2',
      name: 'Master Card',
      icon: Images.masterCardIcon,
    },
    {id: '3', name: 'Visa Card', icon: Images.visaCardIcon},
  ];

  const renderPaymentMethod = ({item}) => (
    <CardContainer
      // activeOpacity={0.6}
      customStyles={styles.paymentOption}
      onPress={() => setSelectedMethod(item.id)}>
      <View style={styles.optionLeft}>
        <View style={styles.iconContainer}>
          <Image source={item.icon} style={styles.icon} />
        </View>
        <Text semiBold size={17}>
          {item.name}
        </Text>
      </View>
      {selectedMethod === item.id && (
        <Image source={Images.Check} style={styles.checkbox} />
      )}
    </CardContainer>
  );

  return (
    <>
      <MainContainer isFlatList>
        <BackHeader
          heading="Payment Method"
          subheading="Choose the payment method you use to purchase your preferred class"
        />

        <View style={styles.container}>
          <FlatList
            data={paymentMethods}
            renderItem={renderPaymentMethod}
            keyExtractor={item => item.id}
            style={styles.paymentList}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />

          <CardContainer
            customStyles={styles.addCardButton}
            onPress={() => setModalVisible(true)}>
            <Image source={Images.addPaymentIcon} style={styles.addIcon} />
            <Text semiBold size={17}>
              Add Payment Card
            </Text>
          </CardContainer>
          <View style={styles.existingPaymentView(keyData)}>
            <Text bold size={20}>
              Existing Payment
            </Text>

            <View style={styles.existingCardView(AppTheme)}>
              {/* <View style={styles.iconContainer}> */}
              <Image source={Images.masterCardIcon} style={styles.icon} />
              {/* </View> */}

              <View style={{marginRight: 100}}>
                <Text semiBold size={17}>
                  Master Card
                </Text>
                <Text medium size={16}>
                  **********0909
                </Text>
              </View>

              <RoundIconComp
                source={Images.pencil}
                customContainerStyle={{
                  borderWidth: 0,
                  width: SD.wp(25),
                  height: SD.hp(25),
                }}
              />
            </View>
          </View>
        </View>
      </MainContainer>

      {!keyData && (
        <BottamButton
          title={'Done'}
          onPress={() => {
            navigationService.navigate(HomeRoutes['BookingCompleteScreen']);
          }}
        />
      )}

      <Modal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        mainContainerStyle={{
          justifyContent: 'flex-end',
        }}
        modalStyles={{
          marginVertical: 0,
          height: '90%',
          width: '100%',
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: SD.hp(400),
            }}>
            <>
              <BackHeader
                heading="Add Card"
                subheading="Please add your card details to get started"
                backFunction={() => {
                  setModalVisible(false);
                }}
              />
              <View
                style={{
                  height: '100%',
                }}>
                <Formik
                  initialValues={{}}
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
                        keyboardType='numeric'
                        returnKeyType='done'
                        isCard
                        mainContainerStyles={{marginTop: 10}}
                      />
                      <View style={{flexDirection: 'row', marginTop: 10}}>
                        <FormInputsComp.FormikCustomInput
                          //   value={selectedService?.title}
                          label="Expiry Date"
                          name="Expiry Date"
                          placeholder="MM/YY"
                          keyboardType='numeric'
                          returnKeyType='done'
                          
                          //   containerStyle={{borderWidth:1,width:'98%'}}
                          mainContainerStyles={{width: '48%', marginRight: 8}}
                        />
                        <FormInputsComp.FormikCustomInput
                          //   value={selectedService?.title}
                          label="Security Code"
                          name="Security Code"
                          placeholder="CVC"
                          keyboardType='numeric'
                        returnKeyType='done'
                          //   containerStyle={{borderWidth:1,width:'98%'}}
                          mainContainerStyles={{width: '49%'}}
                        />
                      </View>
                    </>
                  )}
                </Formik>
              </View>
              <PrimaryButton
                onPress={() => {
                  setModalVisible(false);
                }}
                title="Save"
              />
            </>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create<any>({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: SD.hp(30),
  },
  backButton: {
    marginBottom: SD.hp(20),
    width: SD.wp(15),
    borderRadius: 50,
    padding: SD.hp(13),
    marginLeft: SD.wp(-5),
    backgroundColor: '#f0f0f0',
  },
  paymentList: {
    marginBottom: SD.hp(20),
    paddingRight: SD.wp(10),
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SD.hp(20),
    // borderWidth:1,
    borderBottomWidth: 0.3,
    borderBottomColor: '#E0E0E0',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#E0E0E0',
  },
  iconContainer: {
    padding: SD.hp(2),
    backgroundColor: '#f3f4f6',
    borderRadius: SD.wp(10),
    marginRight: SD.wp(20),
  },
  existingPaymentView: (fromProfile: boolean) => ({
    paddingBottom: fromProfile ? SD.hp(200) : SD.hp(100),
  }),
  existingCardView: (AppTheme: any) => ({
    flexDirection: 'row',
    backgroundColor: AppTheme.BgColor2,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SD.hp(15),
    paddingHorizontal: SD.wp(5),
    paddingVertical: SD.hp(25),
    borderRadius: SD.wp(10),
    paddingRight: SD.wp(10),
  }),
  icon: {
    width: SD.wp(35),
    height: SD.hp(35),
    resizeMode: 'contain',
  },
  addIcon: {
    width: SD.wp(45),
    height: SD.hp(45),
    marginRight: SD.wp(20),
    resizeMode: 'contain',
  },
  checkbox: {
    width: SD.wp(25),
    height: SD.hp(25),
    borderRadius: SD.wp(15),
    backgroundColor: '#126678',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SD.hp(10),
  },
  addCardButton: {
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: SD.hp(35),
  },
  nextButton: {
    marginTop: SD.hp(20),
    backgroundColor: '#126678',
    paddingVertical: SD.hp(19),
    alignItems: 'center',
    borderRadius: SD.wp(35),
    marginBottom: SD.hp(10),
  },
});
