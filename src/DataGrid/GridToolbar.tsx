import Toolbar from '@material-ui/core/Toolbar';
import * as React from 'react';
import { useResolutionSwitch } from 'uno-react';
import IBaseDataSourceState from '../DataSource/IBaseDataSourceState';
import { IDataGridApi } from '../Hooks/useDataGrid';
import { ToolbarOptions } from '../Models';
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

interface IProps {
  toolbarOptions: ToolbarOptions;
  gridName: string;
  grid: { api: IDataGridApi, state: IBaseDataSourceState };
}

export const GridToolbar: React.FunctionComponent<IProps> = ({ toolbarOptions, gridName, grid }: any) => {
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
      {toolbarOptions.searchText &&
        <SearchTextInput searchText={grid.state.searchText} updateSearchText={grid.api.updateSearchText} />}
    </Toolbar>
  );
};
