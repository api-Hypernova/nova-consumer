import React from 'react';
import {Text as RNText, TextInput as RNTextInput, TextInputProps, TextProps} from 'react-native';
import {useLanguage} from './store';
import {translate} from './translate';
import type {LangCode} from './languages';

function tChildren(children: React.ReactNode, lang: LangCode): React.ReactNode {
  if (typeof children === 'string') return translate(children, lang);
  if (Array.isArray(children)) return children.map(c => (typeof c === 'string' ? translate(c, lang) : c));
  return children;
}

/** Drop-in replacement for React Native's Text: translates its text for the chosen language. */
export const TText = React.forwardRef<RNText, TextProps>(({children, ...rest}, ref) => {
  const lang = useLanguage();
  return (
    <RNText ref={ref} {...rest}>
      {tChildren(children, lang)}
    </RNText>
  );
});
TText.displayName = 'TText';

/** Drop-in replacement for TextInput: translates the placeholder. */
export const TTextInput = React.forwardRef<RNTextInput, TextInputProps>((props, ref) => {
  const lang = useLanguage();
  const placeholder = typeof props.placeholder === 'string' ? translate(props.placeholder, lang) : props.placeholder;
  return <RNTextInput ref={ref} {...props} placeholder={placeholder} />;
});
TTextInput.displayName = 'TTextInput';

/** For text that is not drawn by Text (alerts, accessibility labels, library props): const t = useT(); t('Hello'). */
export function useT() {
  const lang = useLanguage();
  return React.useCallback((s: string) => translate(s, lang), [lang]);
}

// Types: files that used `useRef<TextInput>()` keep compiling when they import TTextInput as TextInput.
export type TTextInput = RNTextInput;
export type TText = RNText;
