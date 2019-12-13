import Toolbar from '@material-ui/core/Toolbar';
import * as React from 'react';
import { useResolutionSwitch } from 'uno-react';
import { SearchTextInput } from '../Filtering/SearchTextInput';
import { ExportButton } from './ExportButton';
import { ToolbarOptions } from './ToolbarOptions';
import { ITbTableInstance } from 'tubular-react-common/types/ITbTableInstance';

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
  tbTableInstance: ITbTableInstance;
}

export const GridToolbar: React.FunctionComponent<IProps> = ({ toolbarOptions, gridName, tbTableInstance }) => {
  const [isMobileResolution] = useResolutionSwitch(outerWidth, timeout);

  return (
    <Toolbar data-testid='grid-toolbar'>
      <div style={isMobileResolution ? styles.mobileSpacer : styles.spacer} />
      {toolbarOptions.customItems && toolbarOptions.customItems}
      {toolbarOptions.exportButton && (
        <ExportButton
          type='csv'
          gridName={gridName}
          exportTo={tbTableInstance.api.exportTo}
          filteredRecordCount={tbTableInstance.state.filteredRecordCount}
          data-testid='export-button-csv'
        />
      )}
      {toolbarOptions.printButton && (
        <ExportButton
          type='print'
          gridName={gridName}
          exportTo={tbTableInstance.api.exportTo}
          filteredRecordCount={tbTableInstance.state.filteredRecordCount}
          data-testid='export-button-print'
        />
      )}
      {toolbarOptions.searchText && (
        <SearchTextInput
          searchText={tbTableInstance.state.searchText}
          updateSearchText={tbTableInstance.api.updateSearchText}
          data-testid='search-text-input'
        />
      )}
    </Toolbar>
  );
};
