import * as React from 'react';

import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { ColumnModel } from 'tubular-common';
import { DataSourceContext } from '../DataSource';

const dropdown = {
  marginLeft: '10%',
  width: '80%',
};

const onChange = (callback: any) => ({ target }: any) => callback({ Operator: target.value });
const getValue = (op: string) => !op || op === '' ? 'None' : op;

const OperatorsDropdown: React.FunctionComponent = () => (
  <DataSourceContext.Consumer>
    {({ state, actions }) => (
      <Select
        style={dropdown}
        value={getValue(state.activeColumn.Filter.Operator)}
        onChange={onChange(actions.handleFilterChange)}
        input={<Input name={state.activeColumn.Name} />}
      >
        {ColumnModel.getOperators(state.activeColumn).map((row: any) => (
          <MenuItem key={row.Value} value={row.Value}>
            {row.Title}
          </MenuItem>
        ))}
      </Select>
    )}
  </DataSourceContext.Consumer>
);

export default OperatorsDropdown;
