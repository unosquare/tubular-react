import Input from 'material-ui/Input';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ChangeEvent } from 'react';

interface IProps {
  activeFilter: string;
  disabled: boolean;
  label: string;
  mod: string;
  value: string;
  handleApply(): void;
  handleTextFieldChange(event: any, mod: string): void;
}

const TextInput: React.SFC<IProps> =
  ({ activeFilter, disabled, handleApply, handleTextFieldChange, label, mod, value }) => {

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleTextFieldChange(event.target.value, mod);
  };

  return(
    <div style={{ padding: '15px 20px 5px 20px' }}>
      <Input
        disabled={disabled}
        style={{ width: '100%' }}
        id={activeFilter}
        placeholder={label}
        value={value}
        onKeyUp={(e) => e.key === 'Enter' && handleApply()}
        onChange={handleInputChange}
      />
      <br />
    </div>
  );
};

export default TextInput;
