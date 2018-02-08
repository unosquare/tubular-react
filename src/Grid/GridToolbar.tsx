import * as PropTypes from 'prop-types';
import * as React from 'react';
import CloseIcon from 'material-ui-icons/Close';
import DownloadIcon from 'material-ui-icons/FileDownload';
import { FormControl } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import PrintIcon from 'material-ui-icons/Print';
import SearchIcon from 'material-ui-icons/Search';
import Toolbar from 'material-ui/Toolbar';
import { StyleRules, Theme } from 'material-ui/styles';
import { WithStyles, Button, withStyles } from 'material-ui';
import Input, { InputAdornment } from 'material-ui/Input';
import Menu, { MenuItem } from 'material-ui/Menu';
import { MouseEvent } from 'react';

const styleClasses  = {
  formControl:'',
  spacer:'',
  button:''
};

const styles = (theme: Theme): StyleRules<keyof typeof styleClasses> => (
  { 
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 250
    },
    spacer: {
      flex: '1 1 100%'
    },
    button: {
      minWidth: 150
    },
  }
);

interface State {  
  anchorEl?: HTMLElement,
  searchText: string,
}

interface Props {
  gridName: string,
  onSearchTextChange(text: string): void,
  onPrint(): void,
  onExport(condition:boolean):void
  isExportEnabled: boolean,
  isPrintEnabled: boolean,
  filteredRecordCount: number
}

class GridToolbar extends React.Component <Props & WithStyles<keyof typeof styleClasses>,State> {
  static defaultProps= {
    onSearchTextChange: (x:any):any => x
  }
  state = {
    searchText: '',
    anchorEl: null as HTMLElement
  };

  componentDidMount() {
    const searchText = localStorage.getItem(`tubular.${this.props.gridName}_searchText`);

    if (searchText) {
      this.setState({
        searchText
      });
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
    const searchText = event.target.value;
    this.setState({ searchText }, () => this.props.onSearchTextChange(searchText));
  }

  clearSearchText = ():void => {
    this.setState({
      searchText: ''
    }, () => this.props.onSearchTextChange(this.state.searchText));
  }

  handleMenuOpen = (event: React.MouseEvent<HTMLElement>):void => {
    this.setState({
      anchorEl: event.currentTarget
    });
  }

  handleMenuClose = ():void => {
    this.setState({
      anchorEl: null as HTMLElement
    });
  }
  
  exportCSV = (filtered: boolean, e:React.MouseEvent<HTMLElement>) => {
    const { onExport } = this.props;
    e.preventDefault();
    this.setState({
      anchorEl: null as HTMLElement
    });
    onExport(filtered);
  }

  render(){
    const { classes, isPrintEnabled, isExportEnabled, onPrint, filteredRecordCount } = this.props;
    const { searchText, anchorEl } = this.state;
    return(
      <Toolbar>
        <div className={classes.spacer}></div>
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
            fullWidth
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
          <MenuItem onClick={e => this.exportCSV(false, e)}> All rows</MenuItem>
          <MenuItem onClick={e => this.exportCSV(true, e)}> Current rows</MenuItem>
        </Menu>
      </Toolbar>
    );
  }
}

export default withStyles(styles)(GridToolbar);
