import Toolbar from '@material-ui/core/Toolbar';
import * as React from 'react';
import { DataGridContext } from './DataGridContext';
import { ExportButton } from './ExportButton';
import { SearchTextInput } from './SearchTextInput';

const styles: any = {
  spacer: {
    flex: '1 1 50%',
  },
};

export const GridToolbar: React.FunctionComponent = ({ children }: any) => {
  const { toolbarOptions, gridName } = React.useContext(DataGridContext);

  return (
    <Toolbar>
      <div style={styles.spacer} />
      {children}
      {toolbarOptions.exportButton && <ExportButton type='csv' gridName={gridName} />}
      {toolbarOptions.printButton && <ExportButton type='print' gridName={gridName} />}
      {toolbarOptions.searchText && <SearchTextInput />}
    </Toolbar>
  );
};
