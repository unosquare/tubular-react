import * as React from 'react';

import { Input, MenuItem, Select } from '@material-ui/core';
import { ColumnModel } from 'tubular-common';
import { DataSourceContext } from '../DataSource';

const dropdown = {
  marginLeft: '10%',
  width: '80%',
};

const onChange = (callback: any) => (e: any) => callback({ Operator: e.target.value });
const getValue = (op: string) => !op || op === '' ? 'None' : op;

const OperatorsDropdown: React.SFC = () => (
  <DataSourceContext.Consumer>
    {({ state, actions }) => (
      <Select
        style={dropdown}
        value={getValue(state.activeColumn.Filter)}
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
