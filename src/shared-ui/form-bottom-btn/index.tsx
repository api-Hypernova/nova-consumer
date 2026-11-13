import {StyleSheet, View} from 'react-native';
import {TText as Text} from '../../i18n';
import React from 'react';
import {BottamButton} from '../../components';
import {SD} from '../../utils';

type FormBottomBtnsProps = {
  onPressNext: () => void;
  isNextFormAvailable: boolean;
};

export const FormBottomBtns: React.FC<FormBottomBtnsProps> = ({
  onPressNext,
  isNextFormAvailable,
}) => {
  return (
    <BottamButton
      title={Boolean(isNextFormAvailable) ? 'Next' : 'Done'}
      onPress={() => onPressNext()}
    />
  );
};

const styles = StyleSheet.create({});
