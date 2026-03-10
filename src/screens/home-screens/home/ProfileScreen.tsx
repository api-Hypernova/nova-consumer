import React, {useState, useRef} from 'react';
import {Animated, FlatList, Image, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  CalenderProfile,
  CardContainer,
  CustomTouchable,
  MainContainer,
  Modal,
  PrimaryButton,
  Text,
} from '../../../components';
import {Images} from '../../../config';
import {useTheme} from '../../../hooks';
import {logout} from '../../../redux/reducers';
import navigationService from '../../../config/navigationService';
import {HomeRoutes} from '../../../constants';
import {handleHaptictFeedback, SD} from '../../../utils';

export const ProfileScreen = ({}) => {
  const dispatch = useDispatch();
  const {AppTheme} = useTheme();

  const [switchStates, setSwitchStates] = useState({
    pushNotifications: true,
    bookingNotifications: true,
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  // Ref for animation values
  const animationValues = useRef({
    pushNotifications: new Animated.Value(
      switchStates.pushNotifications ? 1 : 0,
    ),
    bookingNotifications: new Animated.Value(
      switchStates.bookingNotifications ? 1 : 0,
    ),
  }).current;

  const toggleSwitch = key => {
    const currentValue = switchStates[key];
    const newValue = !currentValue;

    setSwitchStates(prev => ({
      ...prev,
      [key]: newValue,
    }));

    // Animate the switch transition
    Animated.timing(animationValues[key], {
      toValue: newValue ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const settingsData = [
    {id: 'header-1', type: 'header', title: 'Customization'},
    {
      id: '1',
      type: 'item',
      title: 'Personal details',
      onPress: () => {
        navigationService.navigate('UpdateProfile');
      },
    },
    {
      id: '2',
      type: 'item',
      title: 'Payments',
      subText: 'Payment methods, Transaction history',
      onPress: () => {
        navigationService.navigate(HomeRoutes['PaymentScreen'], {
          key: 'fromProfile',
        });
      },
    },
    {id: 'header-2', type: 'header', title: 'Preferences'},
    {
      id: '3',
      type: 'switch',
      title: 'Push Notifications',
      value: switchStates.pushNotifications,
      key: 'pushNotifications',
    },
    {
      id: '4',
      type: 'switch',
      title: 'Booking Notifications',
      subText: 'View your past notifications',
      value: switchStates.bookingNotifications,
      key: 'bookingNotifications',
    },
    {id: 'header-3', type: 'header', title: 'Legal'},
    {
      id: '5',
      type: 'item',
      title: 'Terms and Conditions',
      onPress: () => {
        navigationService.navigate(HomeRoutes['LegalInfo'], {
          heading: 'Terms and Conditions',
        });
      },
    },
    {
      id: '6',
      type: 'item',
      title: 'Privacy Policy',
      onPress: () => {
        navigationService.navigate(HomeRoutes['LegalInfo'], {
          heading: 'Privacy Policy',
        });
      },
    },
    {
      id: '7',
      type: 'item',
      title: 'Delete Account',
      onPress: () => {
        setModalVisible(true);
      },
    },
  ];

  const renderItem = ({item}) => {
    switch (item.type) {
      case 'header':
        return (
          <Text size={21} bold style={styles.sectionHeader}>
            {item.title}
          </Text>
        );
      case 'item':
        return (
          <CustomTouchable
            onPress={() => {
              handleHaptictFeedback();
              item.onPress && item.onPress();
            }}
            style={styles.preferenceItem}>
            <View>
              <Text size={17} bold>
                {item.title}
              </Text>
              {item.subText && (
                <Text
                  size={14}
                  medium
                  color={AppTheme.SecondaryGrayTextColor}
                  style={styles.subText}>
                  {item.subText}
                </Text>
              )}
            </View>
            <Image source={Images.arrow} style={styles.arrowIcon} />
          </CustomTouchable>
        );
      case 'switch':
        return (
          <View style={styles.preferenceItem}>
            <View>
              <Text size={17} bold>
                {item.title}
              </Text>
              {item.subText && (
                <Text
                  size={14}
                  medium
                  color={AppTheme.SecondaryGrayTextColor}
                  style={styles.subText}>
                  {item.subText}
                </Text>
              )}
            </View>
            <CustomTouchable
              style={[
                styles.switchContainer,
                {
                  backgroundColor: switchStates[item.key]
                    ? AppTheme.Primary
                    : '#c4c4c4',
                },
              ]}
              onPress={() => {
                handleHaptictFeedback();
                toggleSwitch(item.key);
              }}
              activeOpacity={0.8}>
              <Animated.View
                style={[
                  styles.circle,
                  {
                    transform: [
                      {
                        translateX: animationValues[item.key].interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 20], // Adjust based on your switch size
                        }),
                      },
                    ],
                  },
                ]}
              />
            </CustomTouchable>
          </View>
        );
      default:
        return null;
    }
  };

  const handleOnClose = () => {
    setModalVisible(false);
  };

  return (
    <>
      <MainContainer isFlatList>
        <View
          style={{
            marginTop: SD.hp(32),
          }}>
          <Text size={32} bold>
            Settings
          </Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <>
                <CalenderProfile
                  title={'Arthur Warren'}
                  subTitle={'johndoe@gmail.com'}
                  containerCustomStyle={{marginTop: 20}}
                  // onProfilePress={handleProfilePress}
                />
              </>
            }
            style={{height: '100%'}}
            contentContainerStyle={{height: '100%'}}
            data={settingsData}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            ListFooterComponent={
              <>
                <CardContainer
                  customStyles={styles.logoutButton}
                  onPress={
                    () => setLogoutModalVisible(true)
                    // dispatch(logout())
                  }>
                  <Text size={17} bold style={styles.logoutText}>
                    Log Out
                  </Text>
                </CardContainer>
              </>
            }
          />
        </View>
      </MainContainer>

      <Modal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        modalStyles={{
          height: '25%',
          width: '85%',
          justifyContent: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text centered bold size={22}>
            Are you sure
          </Text>
          <Text topSpacing={10} centered>
            You want to Delete this account ?
          </Text>
          <View style={styles.btnContStyle}>
            <PrimaryButton
              title="Yes"
              customStyles={styles.btnStyles}
              color={AppTheme.SecondaryGrayTextColor}
              onPress={() => {
                setModalVisible(false);
                dispatch(logout());
              }}
            />

            <PrimaryButton
              title="No"
              customStyles={styles.btnStyles}
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={isLogoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        modalStyles={{
          height: '25%',
          width: '85%',
          // borderWidth: 1,
          justifyContent: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text centered bold size={22}>
            Are you sure
          </Text>
          <Text topSpacing={10} centered>
            You want to Logout ?
          </Text>
          <View style={styles.btnContStyle}>
            <PrimaryButton
              title="Yes"
              customStyles={styles.btnStyles}
              color={AppTheme.SecondaryGrayTextColor}
              onPress={() => {
                setLogoutModalVisible(false);
                dispatch(logout());
              }}
            />

            <PrimaryButton
              title="No"
              customStyles={styles.btnStyles}
              onPress={() => {
                setLogoutModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    marginTop: SD.hp(15),
    paddingVertical: SD.hp(15),
    // marginBottom: SD,
    borderTopWidth: 0.3,
    borderTopColor: '#E0E0E0',
    // borderWidth:1,
  },
  switchContainer: {
    width: 50,
    height: 30,
    borderRadius: 20,
    padding: 3,
    justifyContent: 'center',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  subText: {
    marginTop: 5,
  },
  arrowIcon: {
    width: SD.hp(25),
    height: SD.hp(25),
    // borderWidth:1
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingVertical: SD.hp(10),
    paddingBottom: SD.hp(15),
    // paddingTop: SD.hp(10),
    width: '100%',
    // borderWidth:1,
  },
  logoutButton: {
    borderTopWidth: 0.4,
    borderTopColor: '#E0E0E0',
    paddingTop: SD.hp(0),
    // borderWidth:1
  },
  logoutText: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 0,
    marginVertical: SD.hp(15),
    paddingLeft: 0,
    width: '18%',
    // borderWidth:1
  },
  btnContStyle: {
    // borderWidth:1,
    width: '65%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SD.hp(15),
  },
  btnStyles: {
    width: '45%',
    height: SD.hp(40),
    marginVertical: SD.wp(5),
  },
});
