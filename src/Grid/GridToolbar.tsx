import { WithStyles, withStyles } from 'material-ui';
import CloseIcon from 'material-ui-icons/Close';
import DownloadIcon from 'material-ui-icons/FileDownload';
import PrintIcon from 'material-ui-icons/Print';
import SearchIcon from 'material-ui-icons/Search';
import { FormControl } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import Input, { InputAdornment } from 'material-ui/Input';
import Menu, { MenuItem } from 'material-ui/Menu';
import { StyleRules, Theme } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { MouseEvent } from 'react';

const styleClasses  = {
  button: '',
  formControl: '',
  spacer: '',
};

const styles = (theme: Theme): StyleRules<keyof typeof styleClasses> => (
  {
    button: {
      minWidth: 150
    },
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
  searchText: string;
}

interface IProps {
  gridName: string;
  isExportEnabled: boolean;
  isPrintEnabled: boolean;
  filteredRecordCount: number;
  onSearchTextChange(text: string): void;
  onPrint(): void;
  onExport(condition: boolean): void;
}

class GridToolbar extends React.Component <IProps & WithStyles<keyof typeof styleClasses>, IState> {
  public static defaultProps = {
    onSearchTextChange: (x: any): any => x
  };

  public state = {
    anchorEl: null as HTMLElement,
    searchText: '',
  };

  public componentDidMount() {
    const searchText = localStorage.getItem(`tubular.${this.props.gridName}_searchText`);

    if (searchText) {
      this.setState({
        searchText
      });
    }
  }

  public handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchText = event.target.value;
    this.setState({ searchText }, () => this.props.onSearchTextChange(searchText));
  }

  public clearSearchText = (): void => {
    this.setState({
      searchText: ''
    }, () => this.props.onSearchTextChange(this.state.searchText));
  }

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

  public exportCSV = (filtered: boolean, e: React.MouseEvent<HTMLElement>) => {
    const { onExport } = this.props;
    e.preventDefault();
    this.setState({
      anchorEl: null as HTMLElement
    });
    onExport(filtered);
  }

  public render() {
    const { classes, filteredRecordCount, isPrintEnabled, isExportEnabled, onPrint} = this.props;
    const { searchText, anchorEl } = this.state;
    return(
      <Toolbar>
        <div className={classes.spacer}/>
        {
          isExportEnabled &&
          <IconButton disabled={filteredRecordCount === 0} onClick={this.handleMenuOpen}>
            <DownloadIcon />
          </IconButton>
        }
        {
          isPrintEnabled &&
          <IconButton onClick={onPrint} disabled={filteredRecordCount === 0}>
            <PrintIcon/>
          </IconButton>
        }
        <FormControl className={classes.formControl}>
          <Input
            fullWidth={true}
            type='text'
            value={this.state.searchText}
            onChange={this.handleInputChange}
            startAdornment={
              <InputAdornment position='end'>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            endAdornment={
              searchText !== '' &&
              <InputAdornment position='end'>
                <IconButton onClick={this.clearSearchText}>
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Menu anchorEl={anchorEl}  open={Boolean(anchorEl)} onClose={this.handleMenuClose}>
          <MenuItem onClick={(e) => this.exportCSV(false, e)}> All rows</MenuItem>
          <MenuItem onClick={(e) => this.exportCSV(true, e)}> Current rows</MenuItem>
        </Menu>
      </Toolbar>
    );
  }
}

export default withStyles(styles)(GridToolbar);
