import * as PropTypes from 'prop-types';
import * as React from 'react';
import DateRangeIcon from 'material-ui-icons/DateRange';
import LeftArrowIcon from 'material-ui-icons/ChevronLeft';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RightArrowIcon from 'material-ui-icons/ChevronRight';
import TimeIcon from 'material-ui-icons/Schedule';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import createPalette from 'material-ui/styles/createPalette';
import { deepPurple } from 'material-ui/colors';
import { DatePicker, DateTimePicker } from 'material-ui-pickers';

const muiTheme = createMuiTheme({
  palette: createPalette({
    primary: deepPurple,
    type: 'light'
  })
});

const DateInput = ({ columnType, disabled, value, mod, handleDatePicker }) => (
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

DateInput.propTypes = {
  columnType: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  handleDatePicker: PropTypes.func.isRequired,
  mod: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default DateInput;