import * as React from 'react';

import { Input, MenuItem, Select } from '@material-ui/core';
import { ColumnModel } from 'tubular-common';
import { DataSourceContext } from '../DataSource';

const dropdown = {
  marginLeft: '10%',
  width: '80%'
};

const OperatorsDropdown: React.SFC = () => {
  return (
    <DataSourceContext.Consumer>
      {({ state, actions }) => (
        <Select
          style={dropdown}
          value={
            !state.activeColumn.Filter.perartor ||
            state.activeColumn.Filter.Operator === ''
              ? 'None'
              : state.activeColumn.Filter.Operator
          }
          onChange={(e: any) =>
            actions.handleFilterChange({ Operator: e.target.value })
          }
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
};
export default OperatorsDropdown;
