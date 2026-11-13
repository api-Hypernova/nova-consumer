export type LangCode =
  | 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'uk' | 'sr' | 'sr-Latn' | 'he' | 'zh' | 'ja' | 'ko' | 'vi' | 'th';

export const LANGUAGES: {code: LangCode; name: string; short: string}[] = [
  {code: 'en', name: 'English', short: 'EN'},
  {code: 'es', name: 'Español', short: 'ES'},
  {code: 'fr', name: 'Français', short: 'FR'},
  {code: 'de', name: 'Deutsch', short: 'DE'},
  {code: 'it', name: 'Italiano', short: 'IT'},
  {code: 'pt', name: 'Português', short: 'PT'},
  {code: 'uk', name: 'Українська', short: 'UK'},
  {code: 'sr', name: 'Српски', short: 'СРП'},
  {code: 'sr-Latn', name: 'Srpski', short: 'SR'},
  {code: 'he', name: 'עברית', short: 'HE'},
  {code: 'zh', name: '中文', short: '中文'},
  {code: 'ja', name: '日本語', short: '日本語'},
  {code: 'ko', name: '한국어', short: '한국어'},
  {code: 'vi', name: 'Tiếng Việt', short: 'VI'},
  {code: 'th', name: 'ไทย', short: 'ไทย'},
];
export const isLang = (c: any): c is LangCode => LANGUAGES.some(l => l.code === c);

/** Languages written right to left: the whole layout is mirrored for these. */
export const RTL_LANGS: LangCode[] = ['he'];
export const isRtlLang = (c: LangCode) => RTL_LANGS.includes(c);
