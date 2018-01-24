import Button from 'material-ui/Button';
import DialogInput from './DialogInput.js';
import React from 'react';
import moment from 'moment';

class DialogContent extends React.Component {
  render(){
    let value = '';
    let value2 = '';
    
    if(this.props.columnType === 'datetime' || this.props.columnType === 'date' || this.props.columnType === 'datetimeutc'){
      value = this.props.value === undefined ? moment().format() : this.props.value;
      value2 = this.props.value2 === undefined ? moment().format() : this.props.value2;
    }
    else if(this.props.columnType === 'boolean'){
      value = this.props.value === undefined ? '' : this.props.value;
    }
    else{
      value = this.props.value === undefined ? '' : this.props.value;
      value2 = this.props.value2 === undefined ? '' : this.props.value2;
    }

    return (
      <div >
        <DialogInput
          value={value} 
          mod={'Value'}
          label={'Value'} 
          classes={this.props.classes} 
          columnType={this.props.columnType}
          activeFilter={this.props.activeFilter} 
          handleDatePicker={this.props.handleDatePicker}
          handleBooleanDropDown={this.props.handleBooleanDropDown}
          handleTextFieldChange={this.props.handleTextFieldChange} 
        />
        
        {this.props.operator === 'Between' ? 
          <DialogInput
            value={value2} 
            mod={'Value2'}
            label={'Value 2'} 
            classes={this.props.classes} 
            columnType={this.props.columnType}
            activeFilter={this.props.activeFilter} 
            handleDatePicker={this.props.handleDatePicker}
            handleBooleanDropDown={this.props.handleBooleanDropDown}
            handleTextFieldChange={this.props.handleTextFieldChange} 
          />
          : 
          null}
        
        <div style={{ padding: '20px 10px 15px 10px', textAlign: 'center' }}>
          <Button className={this.props.classes.applyButton} onClick={() => this.props.handleApply()}>Apply</Button>
          <Button className={this.props.classes.clearButton} onClick={() => this.props.handleClear()}>Clear</Button>
        </div>
      </div>
    );
  }
}

export default DialogContent;