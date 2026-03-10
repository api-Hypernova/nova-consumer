// components/Dropdown.js
import React, {useState} from 'react';
import {View, StyleSheet, FlatList, ViewProps} from 'react-native';
import {useTheme} from '../../hooks';
import {SD} from '../../utils';
import {useField} from 'formik';
import {Modal} from '../modal';
import Text from '../text';
import {CustomTouchable} from '../custom-touchable';
import {CustomImage} from '../custom-image';
import {Images} from '../../config';
import {EmptyState} from '../empty-state';
import {CardContainer} from '../card-container';

export type DropdownItemPropsBase = {
  id: number;
  label: string;
};

export type DropdownItemProps<T = {}> = DropdownItemPropsBase & T;

type FormikDropdownProps<T = {}> = {
  data: DropdownItemProps<T>[];
  placeholder: string;
  name: string;
  label: string;
  onValueChange?: (value: DropdownItemProps<any>) => void;
  disabled?: boolean;
  mainContainerStyles?: ViewProps['style'];
  customDropdownStyle?: ViewProps['style'];
};

export const FormikDropdown: React.FC<FormikDropdownProps> = ({
  data,
  placeholder,
  name,
  label,
  onValueChange,
  disabled = false,
  mainContainerStyles,
  customDropdownStyle,
}) => {
  const {AppTheme} = useTheme();
  const [field, meta, helpers] = useField<{label: string; id: string | number}>(
    name,
  );
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSelect = (item: DropdownItemProps) => {
    helpers.setValue({label: item.label, id: item.id}); // Set only the label as the value
    onValueChange && onValueChange(item);
    setModalVisible(false);
  };

  return (
    <CardContainer
      disabled
      animationType="opacity"
      customStyles={[styles.container, mainContainerStyles]}>
      <Text size={16} bold secondaryColor bottomSpacing={10}>
        {label}
      </Text>
      <CardContainer
        // disabled={disabled}
        customStyles={[
          styles.dropdown,
          {
            backgroundColor: AppTheme.Base,
            borderColor: AppTheme.BorderColor,
            borderWidth: 1,
          },
          disabled && {
            backgroundColor: AppTheme.HomeCardColorBlue,
          },
          customDropdownStyle,
        ]}
        onPress={() => setModalVisible(true)}>
        <Text medium size={16}>
          {field.value?.label || placeholder}
        </Text>
        <CustomImage
          source={Images.arrow}
          style={{
            width: SD.hp(15),
            height: SD.hp(15),
            transform: [{rotate: '90deg'}],
          }}
        />
      </CardContainer>

      <Modal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        mainContainerStyle={{
          justifyContent: 'flex-end',
        }}
        modalStyles={{
          height: '50%',
          // height: data?.length > 5 ? '50%' : '20%',
          width: '97%',
          margin: 0,
        }}>
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          style={{width: '100%', height: '100%'}}
          // showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState customStyle={{marginTop: SD.hp(0)}} />
          }
          renderItem={({item}) => (
            <CustomTouchable
              style={[styles.item, {borderColor: AppTheme.InActiveTabBar}]}
              onPress={() => handleSelect(item)}>
              <Text medium color={AppTheme.Primary}>
                {item.label}
              </Text>
            </CustomTouchable>
          )}
        />
      </Modal>

      {meta.touched && meta.error && (
        <Text size={10} topSpacing={10} color={AppTheme.ErrorTextColor}>
          {meta.error}
        </Text>
      )}
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SD.hp(10),
    borderRadius: SD.hp(10),
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: SD.hp(56),
    borderRadius: SD.hp(30),
    paddingHorizontal: SD.hp(20),
    width: '100%',
  },
  item: {
    padding: SD.hp(8),
    width: '100%',
    borderBottomWidth: 1,
  },
});
