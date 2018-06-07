import { deepPurple } from '@material-ui/core/colors';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import createPalette from '@material-ui/core/styles/createPalette';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import { ChevronLeft, ChevronRight, DateRange, Schedule } from '@material-ui/icons';

import { DatePicker, DateTimePicker } from 'material-ui-pickers';

import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ColumnDataType } from './Column';

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
  handleDatePicker(event: any, name: string): void;
}

const DateInput: React.SFC<IProps> = ({ columnType, disabled, value, mod, handleDatePicker }) => (
  <div style={{ padding: '15px 20px 5px 20px' }}>
    <MuiThemeProvider theme={muiTheme}>
      {
        columnType === ColumnDataType.DATE_TIME || columnType === ColumnDataType.DATE_TIME_UTC ?
          <DateTimePicker
            disabled={disabled}
            style={{ width: '100%' }}
            value={value}
            onChange={(event) => handleDatePicker(event, mod)}
            leftArrowIcon={<ChevronLeft />}
            rightArrowIcon={<ChevronRight />}
            dateRangeIcon={<DateRange/>}
            timeIcon={<Schedule/>}
            format={'MMMM Do YYYY hh:mm a'}
          />
          :
          <DatePicker
            disabled={disabled}
            style={{ width: '100%' }}
            value={value}
            onChange={(event) => handleDatePicker(event, mod)}
            leftArrowIcon={<ChevronLeft />}
            rightArrowIcon={<ChevronRight />}
            format={'MMMM Do YYYY'}
          />
      }
    </MuiThemeProvider>
    <br />
  </div>
);

export default DateInput;
