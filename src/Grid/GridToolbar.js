import * as PropTypes from 'prop-types';
import * as React from 'react';
import CloseIcon from 'material-ui-icons/Close';
import DownloadIcon from 'material-ui-icons/FileDownload';
import { FormControl } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import PrintIcon from 'material-ui-icons/Print';
import SearchIcon from 'material-ui-icons/Search';
import Toolbar from 'material-ui/Toolbar';
import { withStyles } from 'material-ui/styles';
import Input, { InputAdornment } from 'material-ui/Input';
import Menu, { MenuItem } from 'material-ui/Menu';

const styles = theme => ({
  spacer: {
    flex: '1 1 100%'
  },
  searchField: {

  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 250
  },
  button: {
    minWidth: 150
  }
});

class GridToolbar extends React.Component {
  state = {
    searchText: '',
    debounced: '',
    anchorEl: null
  };

  componentDidMount() {
    const searchText = localStorage.getItem(`tubular.${this.props.gridName}_searchText`);

    if (searchText) {
      this.setState({
        searchText
      });
    }
  }

  handleInputChange = event => {
    const searchText = event.target.value;
    this.setState({ searchText }, () => this.props.onSearchTextChange(searchText));
  }

  clearSearchText = () => {
    this.setState({
      searchText: ''
    }, () => this.props.onSearchTextChange(this.state.searchText));
  }

  handleMenuOpen = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  }

  handleMenuClose = () => {
    this.setState({
      anchorEl: null
    });
  }
  
  exportCSV = (filtered, e) => {
    const { onExport } = this.props;
    e.preventDefault();
    this.setState({
      anchorEl: null
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
            margin='none'
            fullWidth
            className={classes.searchField}
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
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleMenuClose}>
          <MenuItem onClick={e => this.exportCSV(false, e)}> All rows</MenuItem>
          <MenuItem onClick={e => this.exportCSV(true, e)}> Current rows</MenuItem>
        </Menu>
      </Toolbar>
    );
  }
}

GridToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  isExportEnabled: PropTypes.bool,
  isPrintEnabled: PropTypes.bool,
  onSearchTextChange: PropTypes.func.isRequired
};

GridToolbar.defaultProps = {
  onSearchTextChange: x => x
};

export default withStyles(styles)(GridToolbar);
