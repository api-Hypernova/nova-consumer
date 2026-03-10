import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {CustomImage} from '../custom-image';
import {Images} from '../../config';
import {SD} from '../../utils';
import {CardContainer} from '../card-container';
import {Modal} from '../modal';
import Text from '../text';
import {CustomTouchable} from '../custom-touchable';
import {useTheme} from '../../hooks';

type DropdownItemProps = {
  label: string;
  id: string | number;
};
type DropdownProps = {
  data: DropdownItemProps[];
  placeholder: string;
  onValueChange?: (value: DropdownItemProps) => void;
};

export const Dropdown: React.FC<DropdownProps> = ({
  data,
  placeholder,
  onValueChange,
}) => {
  const {AppTheme} = useTheme();
  const [selectedValue, setSelectedValue] = useState<null | DropdownItemProps>(
    null,
  );
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSelect = (item: any) => {
    setSelectedValue(item);
    setModalVisible(false);
    onValueChange && onValueChange(item);
  };

  return (
    <View style={styles.container}>
      <CardContainer
        showShadow={false}
        customStyles={styles.dropdown}
        onPress={() => setModalVisible(true)}>
        <Text>{selectedValue ? selectedValue.label : placeholder}</Text>
        <CustomImage
          source={Images.RightArrow}
          style={{
            width: SD.hp(20),
            height: SD.hp(20),
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
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <CustomTouchable
              style={[
                styles.item,
                {
                  borderColor: AppTheme.InActiveTabBar,
                },
              ]}
              onPress={() => handleSelect(item)}>
              <Text medium color={AppTheme.Primary}>
                {item.label}
              </Text>
            </CustomTouchable>
          )}
        />
      </Modal>
    </View>
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
    height: SD.hp(50),
    // borderWidth: 1,
    borderRadius: SD.hp(10),
    paddingHorizontal: SD.hp(20),
    width: '100%',
    backgroundColor: 'rgba(243, 248, 255, 0.6)',
  },
  item: {
    padding: SD.hp(8), //
    // borderWidth: 1,
    width: '100%',
    borderBottomWidth: 1,
  },
});
