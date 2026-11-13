import React, {useState} from 'react';
import {ActivityIndicator, Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {LANGUAGES} from './languages';
import {setLanguage, useLanguage, useSwitchingTo} from './store';

/** The quick language select: a small globe button in the top-right corner of every screen, opening a list of languages. */
export const LanguagePicker = () => {
  const insets = useSafeAreaInsets();
  const lang = useLanguage();
  const switchingTo = useSwitchingTo();
  const {height} = useWindowDimensions();
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];
  const top = Math.max(insets.top, Platform.OS === 'web' ? 47 : 0) + 6;
  // the list scrolls when the phone is too short for every language
  const listMax = Math.max(220, height - (top + 40) - Math.max(insets.bottom, 12) - 60);
  const target = switchingTo ? LANGUAGES.find(l => l.code === switchingTo) : null;

  return (
    <>
      <TouchableOpacity
        testID="language-button"
        accessibilityRole="button"
        accessibilityLabel="Language"
        activeOpacity={0.8}
        onPress={() => setOpen(true)}
        style={[styles.button, {top}]}>
        <Text style={styles.globe}>🌐</Text>
        <Text style={styles.code}>{current.short}</Text>
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View style={styles.backdrop}>
            <TouchableWithoutFeedback>
              <View style={[styles.sheet, {marginTop: top + 40}]} testID="language-sheet">
                <Text style={styles.title}>🌐  Language · Idioma · Langue</Text>
                <ScrollView style={{maxHeight: listMax}} bounces={false} testID="language-list">
                {LANGUAGES.map(l => {
                  const active = l.code === lang;
                  return (
                    <TouchableOpacity
                      key={l.code}
                      testID={`language-option-${l.code}`}
                      accessibilityRole="button"
                      accessibilityState={{selected: active}}
                      onPress={() => {
                        setLanguage(l.code);
                        setOpen(false);
                      }}
                      style={[styles.row, active && styles.rowActive]}>
                      <Text style={[styles.name, active && styles.nameActive]}>{l.name}</Text>
                      {active && <Text style={styles.check}>✓</Text>}
                    </TouchableOpacity>
                  );
                })}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Switching to or from Hebrew mirrors the whole layout: the app restarts once, this card covers the moment. */}
      <Modal visible={!!target} transparent animationType="fade">
        <View style={styles.switchBackdrop} testID="language-switching">
          <View style={styles.switchCard}>
            <ActivityIndicator color="#111113" />
            <Text style={styles.switchText}>🌐  {target?.name}</Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    end: 14,
    zIndex: 9999,
    elevation: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.14)',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
  },
  globe: {fontSize: 14, marginRight: 5},
  code: {fontSize: 12, fontWeight: '700', color: '#111113', letterSpacing: 0.4},
  backdrop: {flex: 1, backgroundColor: 'rgba(0,0,0,0.30)', alignItems: 'flex-end', paddingHorizontal: 14},
  sheet: {width: 250, backgroundColor: '#FFFFFF', borderRadius: 16, paddingVertical: 8, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 18, shadowOffset: {width: 0, height: 8}, elevation: 24},
  title: {fontSize: 12, color: '#6B7280', paddingHorizontal: 16, paddingVertical: 10},
  row: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12},
  rowActive: {backgroundColor: '#F3F4F6'},
  name: {fontSize: 16, color: '#111113'},
  nameActive: {fontWeight: '700'},
  check: {fontSize: 16, color: '#111113', fontWeight: '700'},
  switchBackdrop: {flex: 1, backgroundColor: 'rgba(255,255,255,0.92)', alignItems: 'center', justifyContent: 'center'},
  switchCard: {flexDirection: 'row', alignItems: 'center', paddingHorizontal: 22, paddingVertical: 16, borderRadius: 16, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: 'rgba(0,0,0,0.10)'},
  switchText: {fontSize: 16, color: '#111113', fontWeight: '600', marginStart: 12},
});
