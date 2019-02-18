import * as React from 'react';
import { render } from 'react-dom';

import './bootstrap';

import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import Main from './main';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
});

render(<ThemeProvider theme={theme}><Main /></ThemeProvider>, document.getElementById('root'));
