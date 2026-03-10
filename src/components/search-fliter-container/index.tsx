import {
  Keyboard,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {CustomInput} from '../custom-input';
import {SD} from '../../utils';
import {Images} from '../../config';
import ENFonts from '../../styles/fonts';
import {RoundIconComp} from '../round-icon-comp';
import {useTheme} from '../../hooks';

type SearchFliterContainerProps = {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  customContainerStyle?: StyleProp<ViewStyle>;
  customColor?: StyleProp<ViewStyle>;
  onFilterPress?: () => void;
  editable?: boolean;
  onInputPress?: () => void;
};

export const SearchFliterContainer: React.FC<SearchFliterContainerProps> = ({
  value,
  placeholder,
  onChangeText,
  customContainerStyle,
  customColor,
  onFilterPress,
  editable,
  onInputPress,
}) => {
  const {AppTheme} = useTheme();
  const handleFilterPress = () => {
    Keyboard.dismiss(); // Close the keyboard
    if (onFilterPress) {
      onFilterPress(); // Call the provided filter press function
    }
  };
  return (
    <View style={[styles.container, customContainerStyle]}>
      <CustomInput
      // onBlur={onInputPress}s
        editable={editable}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        isIcon
        iconImage={Images.search}
        customStyle={styles.inputCustomStyle}
        containerStyle={[
          styles.inputContainerStyle,
          {backgroundColor: AppTheme.Base},
        ]}
        {...(!editable && {onPress: onInputPress})}
      />

      <View style={[styles.filterIconContainer]}>
        <RoundIconComp
          onPress={handleFilterPress}
          customContainerStyle={[
            styles.roundIconCustomStyle,
            {borderColor: AppTheme.BorderColor},
            customColor,
          ]}
          source={Images.filterIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SD.hp(10),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  inputCustomStyle: {
    fontFamily: ENFonts['Medium'],
    fontSize: SD.customFontSize(12),
  },
  inputContainerStyle: {
    height: SD.hp(51),
    width: '80%',
  },
  filterIconContainer: {
    height: SD.hp(50),
    width: SD.wp(50),
    marginLeft: SD.wp(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SD.hp(50),
  },
  roundIconCustomStyle: {
    width: '100%',
    height: '100%',
    marginLeft: 0, // Removed redundant SD.wp(0)
  },
});
