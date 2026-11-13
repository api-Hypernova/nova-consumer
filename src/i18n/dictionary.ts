import type {LangCode} from './languages';
// One JSON file per language: { "English text": "translation" }. Numbers in a text are written as # so one entry covers every value.
export const DICT: Partial<Record<LangCode, Record<string, string>>> = {
  es: require('./dict/es.json'),
  fr: require('./dict/fr.json'),
  de: require('./dict/de.json'),
  it: require('./dict/it.json'),
  pt: require('./dict/pt.json'),
  uk: require('./dict/uk.json'),
  zh: require('./dict/zh.json'),
  ja: require('./dict/ja.json'),
  vi: require('./dict/vi.json'),
  th: require('./dict/th.json'),
  sr: require('./dict/sr.json'),
  'sr-Latn': require('./dict/sr-Latn.json'),
  he: require('./dict/he.json'),
  ko: require('./dict/ko.json'),
};
