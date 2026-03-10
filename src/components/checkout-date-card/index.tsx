import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {SD} from '../../utils';
import Text from '../text';
import {useTheme} from '../../hooks';
import { CardContainer } from '../card-container';

type CheckoutDateCardProps = {
  data: any[];
  onDateSelect?: (date: any) => void;
  selectedStyle?: any;
  unselectedStyle?: any;
  containerStyle?: any;
};

export const CheckoutDateCard: React.FC<CheckoutDateCardProps> = ({
  data,
  onDateSelect,
  selectedStyle,
  unselectedStyle,
  containerStyle,
}) => {
  const {AppTheme} = useTheme();
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = date => {
    setSelectedDate(date);
    if (onDateSelect) onDateSelect(date);
  };

  const renderDateItem = ({item}) => {
    const isSelected = selectedDate === item.date;
    return (
      <CardContainer
        customStyles={[styles.dateItem, isSelected ? selectedStyle : unselectedStyle]}
        onPress={() => handleDateSelect(item.date)}>
        <Text
          medium
          color={isSelected ? AppTheme.Base : AppTheme.Black}
          size={14}>
          {item.day}
        </Text>
        <Text
          color={isSelected ? AppTheme.Base : AppTheme.Black}
          topSpacing={5}
          medium
          size={18}>
          {item.date}
        </Text>
      </CardContainer>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        data={data}
        renderItem={renderDateItem}
        keyExtractor={item => item.date.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SD.wp(5),
    // padding: SD.hp(10),
    width: SD.wp(55),
    height: SD.hp(70),
    borderRadius: SD.hp(15),
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
