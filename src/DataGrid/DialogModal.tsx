import { Dialog, DialogTitle } from '@material-ui/core';
import { StyleRules, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import DialogContent from './DialogContent';
import DialogDropdown from './DialogDropdown';
import * as React from 'react';

interface IProps {
  activeColumn:any;
  handleChange(value: any): void;
  handleApply(): void;
  handleClear(): void; 
  handleTextFieldChange(event: any): void;
  handleSecondTextFieldChange(event: any): void;
  handleClose(): void;
}
const tite={ minWidth: '300px', background: '#ececec', padding: '15px 20px 15px 20px' } 

const DialogModal: React.SFC<IProps> = ({activeColumn, handleChange, handleClose, handleApply, handleClear, handleTextFieldChange, handleSecondTextFieldChange }) => {
    if(activeColumn==null) return null;
        
    return (
        <Dialog open={activeColumn != null} onClose={handleClose} >
            <DialogTitle
                style={tite}
            >{'Filter'}
            </DialogTitle>
            <DialogDropdown
                activeColumn={activeColumn}
                handleChange={handleChange}
            />
            <DialogContent
                activeColumn={activeColumn}
                handleTextFieldChange={handleTextFieldChange}
                handleSecondTextFieldChange={handleSecondTextFieldChange}
                handleApply={handleApply}
                handleClear={handleClear}
            />
        </Dialog>
      );
  };
  
  
  export default DialogModal;
  

