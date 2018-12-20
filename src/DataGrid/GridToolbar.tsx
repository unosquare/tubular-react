import { IconButton, Menu, MenuItem, Toolbar } from '@material-ui/core';
import { CloudDownload, Print } from '@material-ui/icons';

import * as React from 'react';

import { DataSourceContext } from '../DataSource';
import { ToolbarOptions } from '../Models';
import { exportGrid } from './GridToolbarFunctions';

import SearchTextInput from './SearchTextInput';

interface IState {
  anchorExport?: HTMLElement;
  anchorPrint?: HTMLElement;
}

interface IProps {
  toolbarOptions: ToolbarOptions;
  gridName: string;
}

const styles: any = {
  spacer: {
    flex: '1 1 100%',
  },
};

class GridToolbar extends React.Component<IProps, IState> {
  public state = {
    anchorExport: null as HTMLElement,
    anchorPrint: null as HTMLElement,
  };

  public handleExportMenu = (event: React.MouseEvent<HTMLElement>): void => {
    this.setState({
      anchorExport: event ? event.currentTarget : null,
    });
  }

  public handlePrintMenu = (event: React.MouseEvent<HTMLElement>): void => {
    this.setState({
      anchorPrint: event ? event.currentTarget : null,
    });
  }

  public render() {
    const { toolbarOptions, gridName } = this.props;
    const { anchorExport, anchorPrint } = this.state;

    const partialExportCsv = (data: any, columns: any) => {
      exportGrid('csv', data, columns, gridName);
      this.handleExportMenu(null);
    };
    const partialPrint = (data: any, columns: any) => {
      exportGrid('print', data, columns, gridName);
      this.handlePrintMenu(null);
    };

    return (
      <DataSourceContext.Consumer>
        {({ state, actions }) =>
          <Toolbar>
            <div style={styles.spacer} />
            {this.props.children}
            {toolbarOptions.exportButton &&
              <IconButton disabled={state.filteredRecordCount === 0} onClick={this.handleExportMenu}>
                <CloudDownload />
              </IconButton>}
            {toolbarOptions.printButton &&
              <IconButton disabled={state.filteredRecordCount === 0} onClick={this.handlePrintMenu} >
                <Print />
              </IconButton>}
            {toolbarOptions.searchText &&
              <SearchTextInput />
            }
            {toolbarOptions.exportButton &&
              <Menu anchorEl={anchorExport} open={Boolean(anchorExport)} onClose={() => this.handleExportMenu(null)}>
                <MenuItem onClick={() => { actions.exportTo(false, partialExportCsv); }}> Current rows</MenuItem>
                <MenuItem onClick={() => { actions.exportTo(true, partialExportCsv); }}> All rows</MenuItem>
              </Menu>
            }
            {toolbarOptions.printButton &&
              <Menu anchorEl={anchorPrint} open={Boolean(anchorPrint)} onClose={() => this.handlePrintMenu(null)}>
                <MenuItem onClick={() => { actions.exportTo(false, partialPrint); }}> Current rows</MenuItem>
                <MenuItem onClick={() => { actions.exportTo(true, partialPrint); }}> All rows</MenuItem>
              </Menu>
            }
          </Toolbar>}
      </DataSourceContext.Consumer>
    );
  }
}

export default GridToolbar;
