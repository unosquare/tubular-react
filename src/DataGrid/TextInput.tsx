import Input from 'material-ui/Input';
import * as React from 'react';

interface IProps {
  activeFilter: string;
  disabled: boolean;
  label: string;
  mod: string;
  value: string;
  handleApply(): void;
  handleTextFieldChange(event: any): void;
}

const TextInput: React.SFC<IProps> =
  ({ activeFilter, disabled, handleApply, handleTextFieldChange, label, mod, value }) => {

  return(
    <div style={{ padding: '15px 20px 5px 20px' }}>
      <Input
        disabled={disabled}
        style={{ width: '100%' }}
        id={activeFilter}
        placeholder={label}
        value={value}
        onKeyUp={(e) => e.key === 'Enter' && handleApply()}
        onChange={(event) => handleTextFieldChange(event.target.value)}
      />
      <br />
    </div>
  );
};

export default TextInput;
