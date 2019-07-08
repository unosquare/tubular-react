import Toolbar from '@material-ui/core/Toolbar';
import * as React from 'react';
import { useResolutionSwitch } from 'uno-react';
import { DataGridContext } from './DataGridContext';
import { ExportButton } from './ExportButton';
import { SearchTextInput } from './SearchTextInput';

const styles: any = {
  mobileSpacer: {
    flexShrink: '1',
  },
  spacer: {
    flex: '1 1 45%',
  },
};

const outerWidth = 800;
const timeout = 1000;

export const GridToolbar: React.FunctionComponent = ({ children }: any) => {
  const { toolbarOptions, gridName } = React.useContext(DataGridContext);
  const [isMobileResolution] = useResolutionSwitch(outerWidth, timeout);

  return (
    <Toolbar>
      <div style={isMobileResolution ? styles.mobileSpacer : styles.spacer} />
      {children}
      {toolbarOptions.exportButton && <ExportButton type='csv' gridName={gridName} />}
      {toolbarOptions.printButton && <ExportButton type='print' gridName={gridName} />}
      {toolbarOptions.searchText && <SearchTextInput />}
    </Toolbar>
  );
};
