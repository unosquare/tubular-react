import DateRangeIcon from 'material-ui-icons/DateRange';
import LeftArrowIcon from 'material-ui-icons/ChevronLeft';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
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

class DateInput extends React.Component {
  render(){
    return(
      <div style={{ padding: '13px 15px 6px 10px' }}>
        <MuiThemeProvider theme={muiTheme}>
          {
            this.props.columnType === 'datetime' || this.props.columnType === 'datetimeutc' ? 
              <DateTimePicker
                style={{ minWidth: '300px' }}
                value={this.props.value}
                onChange={this.props.handleDatePicker(this.props.mod)}
                leftArrowIcon={<LeftArrowIcon />}
                rightArrowIcon={<RightArrowIcon />}
                dateRangeIcon={<DateRangeIcon/>}
                timeIcon={<TimeIcon/>}
                format={'MMMM Do YYYY hh:mm a'}
              />
              : 
              <DatePicker
                style={{ minWidth: '300px' }}
                value={this.props.value}
                onChange={this.props.handleDatePicker(this.props.mod)}
                leftArrowIcon={<LeftArrowIcon />}
                rightArrowIcon={<RightArrowIcon />}
                format={'MMMM Do YYYY'}
              />
          }
        </MuiThemeProvider>
        <br />
      </div>
    );
  }
}

export default DateInput;