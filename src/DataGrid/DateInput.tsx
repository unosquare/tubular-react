import { deepPurple } from '@material-ui/core/colors';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import createPalette from '@material-ui/core/styles/createPalette';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import LeftArrowIcon from '@material-ui/icons/ChevronLeft';
import RightArrowIcon from '@material-ui/icons/ChevronRight';
import DateRangeIcon from '@material-ui/icons/DateRange';
import TimeIcon from '@material-ui/icons/Schedule';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ColumnDataType } from './Column';
import * as moment from 'moment';

const muiTheme = createMuiTheme({
  palette: createPalette({
    primary: deepPurple,
    type: 'light'
  })
});

interface IProps {
  columnType: string;
  disabled: boolean;
  mod: string;
  value: string; 
} 

const DateInput: React.SFC<IProps> = ({ columnType, disabled, value, mod, }) => (
  <div style={{ padding: '15px 20px 5px 20px' }}>
    <MuiThemeProvider theme={muiTheme}>
      {               
        columnType === ColumnDataType.DATE_TIME || columnType === ColumnDataType.DATE_TIME_UTC ?
          <TextField
          id="datetime-local"
          type="datetime-local"
          defaultValue= "2016-05-24T10:30"
          InputLabelProps={{
            shrink: true,
          }}
          />
          :
          <TextField
            id="date"
            type="date"
            defaultValue="2016-05-24"
            InputLabelProps={{
              shrink: true,
            }}
          />
      }
    </MuiThemeProvider>
    <br />
  </div>
);

export default DateInput;
