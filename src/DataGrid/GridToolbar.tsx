import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import CloudDownload from '@material-ui/icons/CloudDownload';
import Print from '@material-ui/icons/Print';

import * as React from 'react';

import { DataSourceContext } from '../DataSource';
import { ToolbarOptions } from '../Models';
import { exportGrid } from './GridToolbarFunctions';

import SearchTextInput from './SearchTextInput';

interface IProps {
  toolbarOptions: ToolbarOptions;
  gridName: string;
}

const styles: any = {
  spacer: {
    flex: '1 1 100%',
  },
};

export const ExportButton: React.FunctionComponent<any> = ({ type, gridName, toolTip }) => {
  const { actions, state } = React.useContext(DataSourceContext);
  const [anchorPrint, setAnchorPrint] = React.useState(null);

  const handlePrintMenu = (event: React.MouseEvent<HTMLElement>): void =>
    setAnchorPrint(event ? event.currentTarget : null);

  const closePrint = () => setAnchorPrint(null);

  const partialExport = (data: any, columns: any) => {
    exportGrid(type, data, columns, gridName);
    closePrint();
  };

  const printCurrent = () => actions.exportTo(false, partialExport);
  const printAll = () => actions.exportTo(true, partialExport);

  return (
    <React.Fragment>
      <IconButton
        disabled={state.filteredRecordCount === 0}
        onClick={handlePrintMenu}
      >
        {type === 'print' ?
          <Tooltip title={toolTip || 'Print'}>
            <Print />
          </Tooltip>
          :
          <Tooltip title={toolTip || 'Download'}>
            <CloudDownload />
          </Tooltip>
        }
      </IconButton>
      <Menu
        anchorEl={anchorPrint}
        open={Boolean(anchorPrint)}
        onClose={closePrint}
      >
        <MenuItem onClick={printCurrent}>
          Current rows
        </MenuItem>
        <MenuItem onClick={printAll}>
          All rows
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

const GridToolbar: React.FunctionComponent<IProps> = ({ toolbarOptions, gridName, children }) => (
  <Toolbar>
    <div style={styles.spacer} />
    {children}
    {toolbarOptions.exportButton && <ExportButton type='csv' gridName={gridName} />}
    {toolbarOptions.printButton && <ExportButton type='print' gridName={gridName} />}
    {toolbarOptions.searchText && <SearchTextInput />}
  </Toolbar>
);

export default GridToolbar;
