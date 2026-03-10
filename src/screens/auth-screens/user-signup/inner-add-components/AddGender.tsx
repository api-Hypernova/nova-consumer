import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import * as Haptics from 'expo-haptics';
import {ComponentToRenderTypes} from '../UserSignupTypes';
import {BackHeader, MainContainer, Text} from '../../../../components';
import {FormBottomBtns} from '../../../../shared-ui';
import {SD} from '../../../../utils';
import {useTheme} from '../../../../hooks';

type AddGenderProps = ComponentToRenderTypes;

const selectGenderOption = [{name: 'Female'}, {name: 'Male'}, {name: 'Other'}];

export const AddGender: React.FC<AddGenderProps> = ({
  currentForm,
  onPressBack,
  onPressNext,
  isNextFormAvailable,
}) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleSelectGender = (roleName: string) => {
    if (selectedRole !== roleName) {
      setSelectedRole(roleName);

      // Trigger haptic feedback
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const SelectGender = ({
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
      <TouchableOpacity
        onPress={onSelect}
        activeOpacity={0.7}
        style={[
          styles.roleOption(AppTheme),
          // {borderColor: isSelected ? AppTheme.Primary : AppTheme.BorderColor},
          {
            backgroundColor: isSelected
              ? AppTheme.Primary
              : AppTheme.BackGroundColor,
          },
        ]}>
        <View style={styles.roleDetails}>
          <Text
            size={16}
            color={isSelected ? AppTheme.Base : AppTheme.Black}
            semiBold>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <MainContainer>
        <BackHeader
          heading="Choose your Gender"
          subheading="Choose the gender your physiology best aligns with."
          isSeekBar
          seekBarRatio={currentForm}
          backFunction={onPressBack}
        />
        <View style={{flex: 1, marginTop: SD.hp(90)}}>
          {selectGenderOption.map((item, index) => (
            <SelectGender
              key={index}
              item={item}
              isSelected={selectedRole === item.name}
              onSelect={() => handleSelectGender(item.name)}
            />
          ))}
        </View>
      </MainContainer>
      <FormBottomBtns
        onPressNext={onPressNext}
        isNextFormAvailable={isNextFormAvailable}
      />
    </>
  );
};

const styles = StyleSheet.create<any>({
  roleOption: (AppTheme: any) => ({
    height: SD.hp(60),
    borderRadius: SD.hp(30),
    paddingHorizontal: SD.wp(15),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginVertical: SD.hp(10),
    backgroundColor: AppTheme.BackGroundColor,
    borderColor: AppTheme.BorderColor,
  }),
  roleDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
  },
});
