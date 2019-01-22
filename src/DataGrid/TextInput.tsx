import Input from '@material-ui/core/Input';
import * as React from 'react';

interface IProps {
  activeFilter: string;
  disabled: boolean;
  label: string;
  value: string;
  handleApply(): void;
  handleTextFieldChange(event: any): void;
}

const TextInput: React.SFC<IProps> =
  ({ activeFilter, disabled, handleApply, handleTextFieldChange, label, value }) => {

    const handleOnChange = (e: any) => handleTextFieldChange(e.target.value);
    const handleOnKeyUp = (e: any) => e.key === 'Enter' && handleApply();

    return (
      <div style={{ padding: '15px 20px 5px 20px' }}>
        <Input
          disabled={disabled}
          style={{ width: '100%' }}
          id={activeFilter}
          placeholder={label}
          value={value}
          onKeyUp={handleOnKeyUp}
          onChange={handleOnChange}
        />
        <br />
      </div>
    );
  };

export default TextInput;
