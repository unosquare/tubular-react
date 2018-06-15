import { FormControl, IconButton, Input, InputAdornment, Menu, MenuItem, Toolbar } from '@material-ui/core';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';

import { Close, FileDownload, Print, Search } from '@material-ui/icons';

import * as React from 'react';

import { GridConsumer } from './GridContext';

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
  filteredRecordCount: number;
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
    const { classes, filteredRecordCount, toolbarOptions } = this.props;
    const { anchorExport, anchorPrint } = this.state;

    return (
      <GridConsumer>
        {({ state, actions }) =>
          <Toolbar>
            <div className={classes.spacer} />
            {toolbarOptions.showExportButton &&
              <IconButton disabled={filteredRecordCount === 0} onClick={this.handleMenuOpen}>
                <FileDownload />
              </IconButton>}
            {toolbarOptions.showPrintButton &&
              <IconButton disabled={filteredRecordCount === 0} onClick={this.handlePrintMenuOpen} >
                <Print />
              </IconButton>}
            {toolbarOptions.showSearchText &&
              <FormControl className={classes.formControl}>
                <Input
                  fullWidth={true}
                  type='text'
                  value={state.searchText}
                  onChange={actions.textSearchChange}
                  startAdornment={
                    <InputAdornment position='end'>
                        <Search />
                    </InputAdornment>
                  }
                  endAdornment={
                    state.searchText !== '' &&
                    <InputAdornment position='end'>
                      <IconButton onClick={actions.clearSearchText}>
                        <Close />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            }
            {toolbarOptions.showExportButton &&
              <Menu anchorEl={anchorExport} open={Boolean(anchorExport)} onClose={this.handleMenuClose}>
                <MenuItem onClick={() => actions.exportCSV(false)}> Current rows</MenuItem>
                <MenuItem onClick={() => actions.exportCSV(true)}> All rows</MenuItem>
              </Menu>
            }
            {toolbarOptions.showPrintButton &&
              <Menu anchorEl={anchorPrint} open={Boolean(anchorPrint)}>
                <MenuItem onClick={() => actions.printDocumment(false)}>
                Current rows</MenuItem>
                <MenuItem onClick={() => actions.printDocumment(true)}> All rows</MenuItem>
              </Menu>
            }
          </Toolbar>}
      </GridConsumer>
    );
  }
}

export default withStyles(styles)(GridToolbar);
