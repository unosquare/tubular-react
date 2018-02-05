import Button from 'material-ui/Button';
import CloseIcon from 'material-ui-icons/Close';
import DownloadIcon from 'material-ui-icons/FileDownload';
import { FormControl } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import PrintIcon from 'material-ui-icons/Print';
import PropTypes from 'prop-types';
import React from 'react';
import SearchIcon from 'material-ui-icons/Search';
import Toolbar from 'material-ui/Toolbar';
import { withStyles } from 'material-ui/styles';
import Input, { InputAdornment } from 'material-ui/Input';
import Menu, { MenuItem } from 'material-ui/Menu';
import { buildURI, toCSV } from './ExportCSV';

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
    anchorEl: null,
    data: [],
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

  buildURI() {
    const { dataSource, filteredRecordCount } = this.props;
    const { searchText, data } = this.state;
    
    dataSource.getAllRecords(filteredRecordCount, 0, searchText)
      .then(({ payload }) => {
        this.setState({ data: payload });
      });

    return buildURI(data);
  }

  render() {
    const { classes, isPrintEnabled, isExportEnabled, onPrint, headers, separator, uFEFF } = this.props;
    const { searchText, anchorEl, data } = this.state;
    return (
      <Toolbar>
        <div className={classes.spacer}></div>
        {
          isExportEnabled &&
          <a download={ 'data.csv' }
            ref={link => (this.link = link)}
            href={this.buildURI(data, uFEFF, headers, separator, 'data.csv' )}
          >
            <IconButton>
              <DownloadIcon />
            </IconButton>
          </a>
        }
        {
          isPrintEnabled &&
            <IconButton onClick={onPrint}>
              <PrintIcon />
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