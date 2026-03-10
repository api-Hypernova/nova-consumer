import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {CardContainer} from '../card-container';
import Text from '../text';
import {useTheme} from '../../hooks';
import {SD} from '../../utils';
import App from '../../../App';

type TimeSlotSelector = {
  slots: {time: string}[];
  onSlotSelect?: (slot: string) => void;
  selectedStyle?: object;
  unselectedStyle?: object;
  condition?: (slot: {time: string}) => boolean;
};

export const TimeSlotSelector: React.FC<TimeSlotSelector> = ({
  slots,
  onSlotSelect,
  selectedStyle,
  unselectedStyle,
  condition,
}) => {
  const {AppTheme} = useTheme();
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSlotSelect = slot => {
    setSelectedSlot(slot);
    if (onSlotSelect) onSlotSelect(slot);
  };

  const filteredSlots = condition
    ? slots.filter(slot => condition(slot))
    : slots;

  const renderSlotItem = ({item}) => {
    const isSelected = selectedSlot === item.time;
    return (
      <CardContainer
        customStyles={[
          styles.slotItem(AppTheme),
          isSelected ? selectedStyle : unselectedStyle,
        ]}
        onPress={() => handleSlotSelect(item.time)}>
        <Text medium size={14} color={isSelected && AppTheme.Base}>
          {item.time}
        </Text>
      </CardContainer>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredSlots}
        renderItem={renderSlotItem}
        keyExtractor={item => item.time}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          width: '95%',
        }}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create<any>({
  container: {
    alignItems: 'center',
    // justifyContent:'space-between',
  },
  flatListContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SD.hp(12),
    // borderWidth: 1,
  },
  slotItem: (AppTheme: any) => ({
    margin: SD.hp(8),
    width: SD.wp(98),
    height: SD.hp(40),
    borderRadius: SD.hp(20),
    borderWidth: 1,
    borderColor: AppTheme.BorderColor,
    alignItems: 'center',
    justifyContent: 'center',
  }),
});
