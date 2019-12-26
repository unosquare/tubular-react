import * as React from 'react';
import { render } from 'react-dom';

import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import responsiveFontSizes from '@material-ui/core/styles/responsiveFontSizes';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import Main from './main';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

render(
    <ThemeProvider theme={theme}>
        <Main />
    </ThemeProvider>,
    document.getElementById('root'),
);
