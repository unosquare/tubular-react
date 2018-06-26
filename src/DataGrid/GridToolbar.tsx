import { FormControl, IconButton, Input, InputAdornment, Menu, MenuItem, Toolbar } from '@material-ui/core';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';

import { Close, FileDownload, Print, Search } from '@material-ui/icons';

import * as React from 'react';

import { exportGrid } from './GridToolbarFunctions';
import DataSourceContext from './DataSource/DataSourceContext';

const styles = (theme: Theme) => createStyles(
  {
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 250
    },
    spacer: {
      flex: '1 1 100%'
    }
  }
);

interface IState {
  anchorExport?: HTMLElement;
  anchorPrint?: HTMLElement;
}

interface IProps extends WithStyles<typeof styles> {
  toolbarOptions: any;
  gridName: string;
}

class GridToolbar extends React.Component<IProps, IState> {

  public state = {
    anchorExport: null as HTMLElement,
    anchorPrint: null as HTMLElement
  };

  public handleMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
    this.setState({
      anchorExport: event.currentTarget
    });
  }

  public handleMenuClose = (): void => {
    this.setState({
      anchorExport: null as HTMLElement
    });
  }

  public handlePrintMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
    this.setState({
      anchorPrint: event.currentTarget
    });
  }

  public handlePrintMenuClose = (): void => {
    this.setState({
      anchorPrint: null as HTMLElement
    });
  }

  public render() {
    const { classes, toolbarOptions, gridName } = this.props;
    const { anchorExport, anchorPrint } = this.state;
    const partialExportCsv = (data: any, columns: any) => {
      exportGrid('csv', data, columns, gridName);
      this.handleMenuClose();
    };
    const partialPrint = (data: any, columns: any) => {
      exportGrid('print', data, columns, gridName);
      this.handlePrintMenuClose();
    };

    return (
      <DataSourceContext.Consumer>
        {({ dataSource, actions }) =>
          <Toolbar>
            <div className={classes.spacer} />
            {toolbarOptions.exportButton &&
              <IconButton disabled={dataSource.filteredRecordCount === 0} onClick={this.handleMenuOpen}>
                <FileDownload />
              </IconButton>}
            {toolbarOptions.printButton &&
              <IconButton disabled={dataSource.filteredRecordCount === 0} onClick={this.handlePrintMenuOpen} >
                <Print />
              </IconButton>}
            {toolbarOptions.searchText &&
              <FormControl className={classes.formControl}>
                <Input
                  fullWidth={true}
                  type='text'
                  value={dataSource.searchText}
                  onChange={(e: any) => actions.updateSearchText(e.target.value)}
                  startAdornment={
                    <InputAdornment position='end'>
                      <Search />
                    </InputAdornment>
                  }
                  endAdornment={
                    dataSource.searchText !== '' &&
                    <InputAdornment position='end'>
                      <IconButton onClick={() => actions.updateSearchText('')}>
                        <Close />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            }
            {toolbarOptions.exportButton &&
              <Menu anchorEl={anchorExport} open={Boolean(anchorExport)} onClose={this.handleMenuClose}>
                <MenuItem onClick={() => { actions.export(false, partialExportCsv);  }}> Current rows</MenuItem>
                <MenuItem onClick={() => { actions.export(true, partialExportCsv); }}> All rows</MenuItem>
              </Menu>
            }
            {toolbarOptions.printButton &&
              <Menu anchorEl={anchorPrint} open={Boolean(anchorPrint)}  onClose={this.handlePrintMenuClose}>
              <MenuItem onClick={() => { actions.export(false, partialPrint); }}> Current rows</MenuItem>
              <MenuItem onClick={() => { actions.export(true, partialPrint); }}> All rows</MenuItem>
              </Menu>
            }
          </Toolbar>}
      </DataSourceContext.Consumer>
    );
  }
}

export default withStyles(styles)(GridToolbar);
