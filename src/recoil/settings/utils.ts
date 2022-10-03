import {
  themeDictionary,
} from '@styles';
import {
  chainConfig,
  themeList,
} from '@configs';
import {
  Theme,
} from './types';

// ================================
// CONSTANTS
// ================================

export const THEME_LIST = themeList as Theme[];

export const THEME_DICTIONARY = themeDictionary;

export const getThemeTemplate = (theme: Theme) => {
  if (THEME_DICTIONARY[theme]) {
    return THEME_DICTIONARY[theme];
  }

  const defaultTheme = chainConfig.style.default;
  return THEME_DICTIONARY[defaultTheme];
};

export const DATE_LIST = [
  'locale',
  'utc',
];

export const TX_LIST = [
  'compact',
  'detailed',
];
