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
  },
  paper: {
    
  }
});

class GridToolbar extends React.Component {
  state = {
    searchText: '',
    anchorEl: null
  }


  handleInputChange = event => {
    this.setState({
      searchText: event.target.value
    }, () => {
      if(this.props.onSearchTextChange)
        this.props.onSearchTextChange(this.state.searchText);
    });
  }

  clearSearchText = () => {
    this.setState({
      searchText: ''
    });
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
    const { classes, isPrintEnabled, isExportEnabled } = this.props;
    const { searchText, anchorEl } = this.state;
    return(
      <Toolbar>
        <div className={classes.spacer}></div>
        {
          isExportEnabled && 
          <Button
            raised
            color='accent'
            className={classes.button}
            onClick={this.handleMenuOpen}
          >
            <DownloadIcon/>
            Export csv
          </Button>
        }
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
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleMenuClose}>All rows</MenuItem>
          <MenuItem onClick={this.handleMenuClose}>Current rows</MenuItem>
        </Menu>
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