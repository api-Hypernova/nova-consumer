import React, {useState} from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import {
  BottamButton,
  CardContainer,
  CustomImage,
  HeadingContainer,
  MainContainer,
  Text,
} from '../../../components';
import {Images, NavigationService} from '../../../config';
import {useTheme} from '../../../hooks';
import styles from './styles';
import {SD} from '../../../utils';
import {AuthRoutes} from '../../../constants';

const selectRoleOption = [
  {
    name: 'Employee Profile',
    icon: Images.employeeProfile,
    onPress: () => {
      // navigationService.navigate(AuthRoutes['EmployeeDashboard']);
    },
  },
  {
    name: 'Vendor Profile',
    icon: Images.vendorProfile,
    onPress: () => {
      NavigationService.navigate(AuthRoutes['Login']);
    },
  },
];

const RoleOption = ({
  item = {},
  isSelected,
  onSelect,
}: {
  item: any;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  const {AppTheme} = useTheme();
  return (
    <CardContainer
      onPress={onSelect}
      activeOpacity={0.6}
      customStyles={[
        styles.roleOption(AppTheme),
        {borderColor: isSelected ? AppTheme.Primary : AppTheme.BorderColor},
      ]}>
      <View style={styles.roleDetails}>
        <CustomImage style={styles.roleIcon} source={item.icon} />
        <Text size={16} semiBold leftSpacing={15}>
          {item.name}
        </Text>
      </View>
      <View style={styles.arrowContainer}>
        <CustomImage source={Images.arrow} style={styles.arrowIcon} />
      </View>
    </CardContainer>
  );
};

export const SelectRoleScreen = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelect = (roleName: string) => {
    // Toggle role selection
    // setSelectedRole(prevRole => (prevRole === roleName ? null : roleName));
    if (selectedRole !== roleName) {
      setSelectedRole(roleName);
    }
  };

  const handleOnPress = () => {
    const selected = selectRoleOption.find(role => role.name === selectedRole);
    if (selected && selected.onPress) {
      selected.onPress(); // Perform the action of the selected role
    } else {
      Alert.alert('Please select a role first!');
    }
  };

  return (
    <>
      <MainContainer
        customeStyle={{
          paddingHorizontal: SD.wp(25),
        }}>
        <View
          style={{
            flex: 0.6,
            justifyContent: 'space-evenly',
            marginTop: SD.hp(10),
          }}>
          <HeadingContainer
            heading="Please Select Your Role"
            subheading="Select your specific roles"
          />
          <View>
            {selectRoleOption.map((item, index) => (
              <RoleOption
                key={index}
                item={item}
                isSelected={selectedRole === item.name}
                onSelect={() => handleRoleSelect(item.name)}
              />
            ))}
          </View>
        </View>
      </MainContainer>
      <BottamButton
        onPress={handleOnPress}
        title={'Next'}
        disabled={!selectedRole}
      />
    </>
  );
};
