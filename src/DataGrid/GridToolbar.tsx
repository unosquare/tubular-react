import Toolbar from '@material-ui/core/Toolbar';
import * as React from 'react';
import { useResolutionSwitch } from 'uno-react';
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
const timeout = 400;

export const GridToolbar: React.FunctionComponent<any> = ({ toolbarOptions, gridName, grid }: any) => {
  const [isMobileResolution] = useResolutionSwitch(outerWidth, timeout);

  return (
    <Toolbar>
      <div style={isMobileResolution ? styles.mobileSpacer : styles.spacer} />
      {toolbarOptions.exportButton &&
        <ExportButton
          type='csv'
          gridName={gridName}
          exportTo={grid.api.exportTo}
          filteredRecordCount={grid.state.filteredRecordCount}
        />}
      {toolbarOptions.printButton &&
        <ExportButton
          type='print'
          gridName={gridName}
          exportTo={grid.api.exportTo}
          filteredRecordCount={grid.state.filteredRecordCount}
        />}
      {/* {toolbarOptions.searchText && <SearchTextInput />} */}
    </Toolbar>
  );
};
