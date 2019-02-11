import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
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

const GridToolbar: React.FunctionComponent<IProps> = ({ toolbarOptions, gridName, children }) => {
  const { actions, state } = React.useContext(DataSourceContext);

  const [anchorExport, setAnchorExport] = React.useState(null);
  const [anchorPrint, setAnchorPrint] = React.useState(null);

  const handleExportMenu = (event: React.MouseEvent<HTMLElement>): void =>
    setAnchorExport(event ? event.currentTarget : null);

  const handlePrintMenu = (event: React.MouseEvent<HTMLElement>): void =>
    setAnchorPrint(event ? event.currentTarget : null);

  const closeExport = () => setAnchorExport(null);
  const closePrint = () => setAnchorPrint(null);

  const partialExport = (type: string) => (data: any, columns: any) => {
    exportGrid(type, data, columns, gridName);
    closeExport();
    closePrint();
  };

  const exportCurrentCsv = () => actions.exportTo(false, partialExport('csv'));
  const exportAllCsv = () => actions.exportTo(true, partialExport('csv'));

  const printCurrent = () => actions.exportTo(false, partialExport('print'));
  const printAll = () => actions.exportTo(true, partialExport('print'));

  return (
    <Toolbar>
      <div style={styles.spacer} />
      {children}
      {toolbarOptions.exportButton &&
        <IconButton
          disabled={state.filteredRecordCount === 0}
          onClick={handleExportMenu}
        >
          <CloudDownload />
        </IconButton>}
      {toolbarOptions.printButton &&
        <IconButton
          disabled={state.filteredRecordCount === 0}
          onClick={handlePrintMenu}
        >
          <Print />
        </IconButton>}
      {toolbarOptions.searchText &&
        <SearchTextInput />
      }
      {toolbarOptions.exportButton &&
        <Menu
          anchorEl={anchorExport}
          open={Boolean(anchorExport)}
          onClose={closeExport}
        >
          <MenuItem onClick={exportCurrentCsv}>
            Current rows
          </MenuItem>
          <MenuItem onClick={exportAllCsv}>
            All rows
          </MenuItem>
        </Menu>
      }
      {toolbarOptions.printButton &&
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
      }
    </Toolbar>
  );
};

export default GridToolbar;
