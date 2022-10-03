import React from 'react';
import {
  ThemeProvider, createMuiTheme,
} from '@material-ui/core/styles';

import {
  StylesProvider, StylesOptions,
} from '@material-ui/styles/';
import { themeDictionary } from '@styles';
import { chainConfig } from '@configs';

/**
 * Theme mocker to handle custom keys
 */
const MockTheme = ({ children }: {children: React.ReactNode}) => {
  const generateClassName: StylesOptions['generateClassName'] = (
    rule,
    sheet,
  ): string => `${sheet!.options.classNamePrefix}-${rule.key}`;

  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={createMuiTheme(themeDictionary[chainConfig.style.default])}>
        {children}
      </ThemeProvider>
    </StylesProvider>
  );
};

export default MockTheme;
