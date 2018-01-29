import Button from 'material-ui/Button';
import CloseIcon from 'material-ui-icons/Close';
import DownloadIcon from 'material-ui-icons/FileDownload';
import { FormControl } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import PrintIcon from 'material-ui-icons/Print';
import PropTypes from 'prop-types';
import React from 'react';
import SearchIcon from 'material-ui-icons/Search';
import { Subject } from 'rx';
import Toolbar from 'material-ui/Toolbar';
import { withStyles } from 'material-ui/styles';
import Input, { InputAdornment } from 'material-ui/Input';
import Menu, { MenuItem } from 'material-ui/Menu';
import ButtonCSV from './ButtonCSV';

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
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      debounced: '',
      anchorEl: null
    };
    this.search = new Subject();
  }
  
  componentDidMount(){
    this.search.debounce(700).subscribe(() => {
      if(this.props.onSearchTextChange)
        this.props.onSearchTextChange(this.state.searchText);
    });
  }

  handleInputChange = event => {
    const searchText = event.target.value;
    this.setState({ searchText }, () => this.search.onNext());
  }

  clearSearchText = () => {
    this.setState({
      searchText: ''
    }, () => this.search.onNext());
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


  render(){
    const { classes, isPrintEnabled, isExportEnabled, allData, data } = this.props;
    const { searchText, anchorEl } = this.state;
    return(
      <Toolbar>
        <div className={classes.spacer}></div>
          <ButtonCSV data={allData} currentData={data} filename='data.csv'/>
        {
          isPrintEnabled && 
          <IconButton>
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
                  <SearchIcon/>
                </IconButton>
              </InputAdornment>
            }
            endAdornment={
              searchText !== '' &&
              <InputAdornment position='end'>
                <IconButton onClick={this.clearSearchText}>
                  <CloseIcon/>
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
  onSearchTextChange: PropTypes.func  
};

export default withStyles(styles)(GridToolbar);