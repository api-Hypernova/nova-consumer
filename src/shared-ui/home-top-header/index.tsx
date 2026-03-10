import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { CustomImage } from '../../components';
import { Images } from '../../config';

export const HomeTopHeader: React.FC = () => {
  return (
    <TouchableOpacity style={styles.container}>
    <View>
      <Text style={styles.title}>Top Rated</Text>
      <Text style={styles.subtitle}>Based on the activity you see</Text>
    </View>
    <CustomImage source={Images.arrowRight}  />
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
    },
    subtitle: {
      fontSize: 14,
      color: '#707070',
    },
  });
