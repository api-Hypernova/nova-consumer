import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';

type FormikCustomTimePickerProps = {
  placeholder?: string;
  onChange: (time: {hours: string; minutes: string}) => void;
};

export const FormikCustomTimePicker: React.FC<FormikCustomTimePickerProps> = ({
  placeholder = '00:00',
  onChange,
}) => {
  const [time, setTime] = useState({hours: '', minutes: ''});

  const handleInputChange = (text: string) => {
    const sanitized = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    let hours = sanitized.slice(0, 2);
    let minutes = sanitized.slice(2, 4);

    if (parseInt(hours) > 23) hours = '23'; // Limit hours to 23
    if (parseInt(minutes) > 59) minutes = '59'; // Limit minutes to 59

    setTime({hours, minutes});
    onChange({hours, minutes});
  };

  const formattedTime = `${time.hours.padEnd(2, '_')}:${time.minutes.padEnd(
    2,
    '_',
  )}`;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <MaskedView
        style={styles.maskedContainer}
        maskElement={
          <Text style={styles.placeholderText}>{formattedTime}</Text>
        }>
        <View style={styles.background}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder={placeholder}
            value={`${time.hours}${time.minutes}`}
            maxLength={4} // HHMM format
            onChangeText={handleInputChange}
          />
        </View>
      </MaskedView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    alignSelf: 'center',
    marginVertical: 20,
  },
  maskedContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black', // Mask color
    textAlign: 'center',
  },
  background: {
    backgroundColor: '#f0f0f0',
    height: '100%',
    justifyContent: 'center',
    borderRadius: 10,
  },
  input: {
    fontSize: 24,
    color: 'transparent', // Make input text invisible
    textAlign: 'center',
  },
});
