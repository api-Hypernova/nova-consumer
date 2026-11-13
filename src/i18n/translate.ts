import {DICT} from './dictionary';
import type {LangCode} from './languages';

const DIGITS = /\d+/g;
const HAS_LETTER = /[A-Za-z]/;

/** Test helper: if a collector function is installed (window.__I18N_SINK), every distinct text that passes through is reported to it. */
const reported = new Set<string>();
function collect(norm: string) {
  const sink = (globalThis as any).__I18N_SINK;
  if (sink && !reported.has(norm)) {
    reported.add(norm);
    try {
      sink(norm);
    } catch (e) {}
  }
}

/** Translate one piece of text. Unknown text (names, typed messages, anything not in the dictionary) is returned unchanged. */
export function translate(text: string, lang: LangCode): string {
  if (typeof text !== 'string' || !HAS_LETTER.test(text)) return text;
  const lead = text.match(/^\s*/)![0];
  const trail = text.match(/\s*$/)![0];
  const core = text.trim().replace(/\s+/g, ' ');
  const digits = core.match(DIGITS) || [];
  const norm = core.replace(DIGITS, '#');
  collect(norm);
  if (lang === 'en') return text;
  const hit = DICT[lang]?.[norm];
  if (!hit) return text;
  let i = 0;
  return lead + hit.replace(/#/g, () => digits[i++] ?? '#') + trail;
}
