import LeftArrowIcon from 'material-ui-icons/ChevronLeft';
import RightArrowIcon from 'material-ui-icons/ChevronRight';
import DateRangeIcon from 'material-ui-icons/DateRange';
import TimeIcon from 'material-ui-icons/Schedule';
import { DatePicker, DateTimePicker } from 'material-ui-pickers';
import { deepPurple } from 'material-ui/colors';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import createPalette from 'material-ui/styles/createPalette';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as PropTypes from 'prop-types';
import * as React from 'react';

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
  handleDatePicker(mod: string): any;
}

const DateInput: React.SFC<IProps> = ({ columnType, disabled, value, mod, handleDatePicker }) => (
  <div style={{ padding: '15px 20px 5px 20px' }}>
    <MuiThemeProvider theme={muiTheme}>
      {
        columnType === 'datetime' || columnType === 'datetimeutc' ?
          <DateTimePicker
            disabled={disabled}
            style={{ width: '100%' }}
            value={value}
            onChange={handleDatePicker(mod)}
            leftArrowIcon={<LeftArrowIcon />}
            rightArrowIcon={<RightArrowIcon />}
            dateRangeIcon={<DateRangeIcon/>}
            timeIcon={<TimeIcon/>}
            format={'MMMM Do YYYY hh:mm a'}
          />
          :
          <DatePicker
            disabled={disabled}
            style={{ width: '100%' }}
            value={value}
            onChange={handleDatePicker(mod)}
            leftArrowIcon={<LeftArrowIcon />}
            rightArrowIcon={<RightArrowIcon />}
            format={'MMMM Do YYYY'}
          />
      }
    </MuiThemeProvider>
    <br />
  </div>
);

export default DateInput;
