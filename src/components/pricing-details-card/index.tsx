import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useTheme} from '../../hooks';
import {SD} from '../../utils';
import Text from '../text';

const pricingData = [
  // {id: '1', label: 'Payment Status', value: 'Accepted', isHighlight: true},
  // {id: '2', label: 'Payment Method', value: 'Card', isHighlight: true},
  {id: '3', label: 'Platform Fees', value: '-$120', isHighlight: false},
  {id: '4', label: 'VAT', value: '-$40', isHighlight: false},
];

const totalAmount = '$120';

// Render Item Function
type PricingDetailsCardProps = {
  isCompleted?: boolean;
};

export const PricingDetailsCard: React.FC<PricingDetailsCardProps> = ({
  isCompleted,
}) => {
  const {AppTheme} = useTheme();

  const renderItem = ({item}) => (
    <View style={styles.row}>
      <Text medium size={14}>
        {item.label}
      </Text>
      <View
        style={[
          styles.valueContainer,
          item.isHighlight && styles.highlightContainer,
        ]}>
        <Text medium size={12}>
          {item.value}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Text bold size={18} style={styles.header}>
        Pricing
      </Text> */}
      <FlatList
        data={pricingData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.footer}>
        <Text bold size={19}>
          {isCompleted ? 'Payment Received' : 'Amount Payable'}
        </Text>
        <Text bold size={19}>
          {totalAmount}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: SD.hp(20),
    marginBottom: SD.wp(20),
  },
  header: {
    marginBottom: SD.hp(20),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SD.hp(15),
  },

  valueContainer: {
    paddingVertical: SD.hp(5),
    paddingHorizontal: SD.wp(10),
    borderRadius: SD.hp(10),
  },
  highlightContainer: {
    backgroundColor: '#F5F5F5',
    // borderWidth:1,
    width: SD.wp(80),
    alignItems: 'center',
    borderRadius: SD.hp(20),
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: SD.hp(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
