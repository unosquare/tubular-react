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
  anchorEl?: HTMLElement;
  anchorPrint?: HTMLElement;
}

interface IProps extends WithStyles<typeof styles> {
  filteredRecordCount: number;
  onExport(condition: boolean): void;
}

class GridToolbar extends React.Component<IProps, IState> {

  public state = {
    anchorEl: null as HTMLElement,
    anchorPrint: null as HTMLElement
  };

  public handleMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
    this.setState({
      anchorEl: event.currentTarget
    });
  }

  public handleMenuClose = (): void => {
    this.setState({
      anchorEl: null as HTMLElement
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

  public exportCSV = (filtered: boolean, e: React.MouseEvent<HTMLElement>) => {
    const { onExport } = this.props;
    e.preventDefault();
    this.setState({
      anchorEl: null as HTMLElement
    });
    onExport(filtered);
  }

  public render() {
    const { classes, filteredRecordCount } = this.props;
    const { anchorEl, anchorPrint } = this.state;

    return (
      <GridConsumer>
        {({ state, actions }) =>
          <Toolbar>
            <div className={classes.spacer} />

            <IconButton disabled={filteredRecordCount === 0} onClick={this.handleMenuOpen}>
              <FileDownload />
            </IconButton>
            <IconButton disabled={filteredRecordCount === 0} onClick={this.handlePrintMenuOpen} >
              <Print />
            </IconButton>
            <FormControl className={classes.formControl}>
              <Input
                fullWidth={true}
                type='text'
                value={state.searchText}
                onChange={actions.TextSearchChange}
                startAdornment={
                  <InputAdornment position='end'>
                    <IconButton>
                      <Search />
                    </IconButton>
                  </InputAdornment>
                }
                endAdornment={
                  state.searchText !== '' &&
                  <InputAdornment position='end'>
                    <IconButton onClick={actions.ClearSearchText}>
                      <Close />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleMenuClose}>
              <MenuItem onClick={(e: any) => this.exportCSV(false, e)}> All rows</MenuItem>
              <MenuItem onClick={(e: any) => this.exportCSV(true, e)}> Current rows</MenuItem>
            </Menu>
            <Menu anchorEl={anchorPrint} open={Boolean(anchorPrint)} onClose={this.handlePrintMenuClose}>
              <MenuItem onClick={(e: any) => actions.GetGridResult(e)}> All rows</MenuItem>
              <MenuItem onClick={(e: any) => actions.GetGridResult(e)}> Current rows</MenuItem>
            </Menu>
          </Toolbar>}
      </GridConsumer>
    );
  }
}

export default withStyles(styles)(GridToolbar);
