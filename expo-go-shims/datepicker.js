// EXPO GO DEMO ONLY (active when NOVA_EXPO_GO=1, see ../metro.config.js).
// Expo Go does not contain react-native-date-picker; this stand-in has the same props the app uses
// (modal, open, date, mode, theme, onConfirm, onCancel) on top of @react-native-community/datetimepicker.
import React, { useEffect, useRef, useState } from 'react';
import { Modal, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

export default function DatePicker({
  modal, open, date, mode = 'date', theme = 'light', minimumDate, maximumDate,
  onConfirm, onCancel, onDateChange, title, confirmText = 'Confirm', cancelText = 'Cancel',
}) {
  const [temp, setTemp] = useState(date || new Date());
  const wasOpen = useRef(false);

  useEffect(() => {
    if (open && !wasOpen.current) {
      const start = date || new Date();
      setTemp(start);
      if (Platform.OS === 'android') {
        const show = (m, value, done) =>
          DateTimePickerAndroid.open({
            value, mode: m, minimumDate, maximumDate,
            onChange: (e, d) => (e.type === 'set' && d ? done(d) : onCancel && onCancel()),
          });
        if (mode === 'datetime') {
          show('date', start, (d1) => show('time', d1, (d2) => onConfirm && onConfirm(d2)));
        } else {
          show(mode === 'time' ? 'time' : 'date', start, (d) => onConfirm && onConfirm(d));
        }
      }
    }
    wasOpen.current = !!open;
  }, [open]);

  if (Platform.OS === 'android') return null;
  if (!modal) {
    return (
      <DateTimePicker value={date || new Date()} mode={mode} display="spinner" themeVariant={theme}
        minimumDate={minimumDate} maximumDate={maximumDate}
        onChange={(e, d) => d && onDateChange && onDateChange(d)} />
    );
  }
  const dark = theme === 'dark';
  const fg = dark ? '#fff' : '#111';
  return (
    <Modal visible={!!open} transparent animationType="slide" onRequestClose={onCancel}>
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.35)' }}>
          <TouchableWithoutFeedback>
            <View style={{ backgroundColor: dark ? '#1c1c1e' : '#fff', paddingBottom: 28, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
                <TouchableOpacity onPress={onCancel}><Text style={{ color: fg, fontSize: 16 }}>{cancelText}</Text></TouchableOpacity>
                {!!title && <Text style={{ color: fg, fontSize: 16, fontWeight: '600' }}>{title}</Text>}
                <TouchableOpacity onPress={() => onConfirm && onConfirm(temp)}><Text style={{ color: '#2563eb', fontSize: 16, fontWeight: '600' }}>{confirmText}</Text></TouchableOpacity>
              </View>
              <DateTimePicker value={temp} mode={mode} display="spinner" themeVariant={theme}
                minimumDate={minimumDate} maximumDate={maximumDate}
                onChange={(e, d) => d && setTemp(d)} style={{ alignSelf: 'center' }} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
