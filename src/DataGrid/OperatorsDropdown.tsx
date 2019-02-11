import * as React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { ColumnModel } from 'tubular-common';
import { DataSourceContext } from '../DataSource';

const dropdown = {
  marginLeft: '10%',
  width: '80%',
};

const getValue = (op: string) => !op || op === '' ? 'None' : op;

const OperatorsDropdown: React.FunctionComponent = () => {
  const { actions, state } = React.useContext(DataSourceContext);
  const onChange = ({ target }: any) => actions.handleFilterChange({ Operator: target.value });

  return (
    <TextField
      style={dropdown}
      select={true}
      value={getValue(state.activeColumn.Filter.Operator)}
      onChange={onChange}
      label='Operator'
    >
      {ColumnModel
        .getOperators(state.activeColumn)
        .map((row: any) => (
          <MenuItem key={row.Value} value={row.Value}>
            {row.Title}
          </MenuItem>
        ))}
    </TextField>
  );
};

export default OperatorsDropdown;
