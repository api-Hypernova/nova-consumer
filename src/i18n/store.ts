import {useSyncExternalStore} from 'react';
import {I18nManager, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {reloadAppAsync} from 'expo';
import {isLang, isRtlLang, LangCode} from './languages';
import {applyCalendarLocale} from './calendarLocale';

const KEY = 'nova_language';
// When the app last restarted itself to change layout direction (guards against a restart loop).
const RELOAD_KEY = 'nova_rtl_reload_at';
let current: LangCode = 'en';
let switchingTo: LangCode | null = null;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach(l => l());

export const getLanguage = () => current;
/** The language the app is restarting into to mirror its layout (null when not restarting). */
export const getSwitchingTo = () => switchingTo;
export const subscribeLanguage = (cb: () => void) => {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};

/** Is the layout currently right to left? */
export const isLayoutRtl = () => (Platform.OS === 'web' ? isRtlLang(current) : I18nManager.isRTL);

/**
 * Point the layout direction at the language. Returns true when the native layout must restart to take it
 * (React Native fixes left/right when the app starts, so mirroring needs one restart). On the web it is instant.
 */
function applyDirection(code: LangCode): boolean {
  const rtl = isRtlLang(code);
  if (Platform.OS === 'web') {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = rtl ? 'rtl' : 'ltr';
      document.documentElement.lang = code;
    }
    return false;
  }
  if (I18nManager.isRTL === rtl) return false;
  I18nManager.allowRTL(rtl);
  I18nManager.forceRTL(rtl);
  return true;
}

async function restartForDirection(code: LangCode) {
  switchingTo = code;
  notify();
  try {
    await AsyncStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch (e) {}
  // a short moment so the "switching" card is seen, then restart the JavaScript (works in Expo Go)
  setTimeout(() => {
    reloadAppAsync('NOVA: language direction changed').catch(() => {
      switchingTo = null;
      notify();
    });
  }, 450);
}

/** Switch language: every text on screen re-renders at once. Switching to or from Hebrew also mirrors the layout (one quick restart). */
export function setLanguage(code: LangCode) {
  if (code === current) return;
  current = code;
  applyCalendarLocale(code);
  const needsRestart = applyDirection(code);
  notify();
  const saved = AsyncStorage.setItem(KEY, code).catch(() => {});
  if (needsRestart) saved.then(() => restartForDirection(code));
}

/** Restore the person's last choice when the app opens, and make sure the layout direction matches it. */
export async function loadLanguage() {
  let code: LangCode = 'en';
  try {
    const saved = await AsyncStorage.getItem(KEY);
    if (saved && isLang(saved)) code = saved;
  } catch (e) {}
  if (code !== current) {
    current = code;
    applyCalendarLocale(code);
    notify();
  }
  if (!applyDirection(code)) {
    AsyncStorage.removeItem(RELOAD_KEY).catch(() => {});
    return;
  }
  // The direction is wrong (e.g. Expo Go kept another app's setting). Restart once; never loop.
  let last = 0;
  try {
    last = Number(await AsyncStorage.getItem(RELOAD_KEY)) || 0;
  } catch (e) {}
  if (Date.now() - last > 20000) restartForDirection(code);
}

export const useLanguage = (): LangCode => useSyncExternalStore(subscribeLanguage, getLanguage, getLanguage);
export const useSwitchingTo = () => useSyncExternalStore(subscribeLanguage, getSwitchingTo, getSwitchingTo);
/** True while the layout is right to left (Hebrew). */
export const useIsRtl = () => {
  useLanguage();
  return isLayoutRtl();
};
