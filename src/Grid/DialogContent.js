import Button from 'material-ui/Button';
import DialogInput from './DialogInput.js';
import React from 'react';
import moment from 'moment';

class DialogContent extends React.Component {
  render(){
    let firstValue = '';
    let secondValue = '';
    
    switch (this.props.columnType){
    case 'datetime':
    case 'date':
    case 'datetimeutc':
      firstValue = this.props.value === undefined ? moment().format() : this.props.value;
      secondValue = this.props.value2 === undefined ? moment().format() : this.props.value2;
      break;
    case 'boolean':
      firstValue = this.props.value === undefined ? '' : this.props.value;
      break;
    default:
      firstValue = this.props.value === undefined ? '' : this.props.value;
      secondValue = this.props.value2 === undefined ? '' : this.props.value2;
    }

    return (
      <div >
        <DialogInput
          value={firstValue} 
          mod={'Value'}
          label={'Value'} 
          classes={this.props.classes} 
          columnType={this.props.columnType}
          activeFilter={this.props.activeFilter} 
          handleDatePicker={this.props.handleDatePicker}
          handleBooleanDropDown={this.props.handleBooleanDropDown}
          handleTextFieldChange={this.props.handleTextFieldChange} 
        />
        
        {this.props.operator === 'Between' && 
          <DialogInput
            value={secondValue} 
            mod={'Value2'}
            label={'Value 2'} 
            classes={this.props.classes} 
            columnType={this.props.columnType}
            activeFilter={this.props.activeFilter} 
            handleDatePicker={this.props.handleDatePicker}
            handleBooleanDropDown={this.props.handleBooleanDropDown}
            handleTextFieldChange={this.props.handleTextFieldChange} 
          />}
        
        <div style={{ padding: '20px 10px 15px 10px', textAlign: 'center' }}>
          <Button className={this.props.classes.applyButton} onClick={() => this.props.handleApply()}>Apply</Button>
          <Button className={this.props.classes.clearButton} onClick={() => this.props.handleClear()}>Clear</Button>
        </div>
      </div>
    );
  }
}

export default DialogContent;