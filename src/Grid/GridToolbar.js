import CloseIcon from 'material-ui-icons/Close';
import { FormControl } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import PrintIcon from 'material-ui-icons/Print';
import PropTypes from 'prop-types';
import React from 'react';
import SearchIcon from 'material-ui-icons/Search';
import Toolbar from 'material-ui/Toolbar';
import { withStyles } from 'material-ui/styles';
import Input, { InputAdornment } from 'material-ui/Input';


const styles = theme => ({
  spacer: {
    flex: '1 1 100%'
  },
  searchField: {
 
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 250
  }
});

class GridToolbar extends React.Component {
  state = {
    searchText: ''
  }

  handleInputChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  }

  clearSearchText = () => {
    this.setState({
      searchText: ''
    });
  }

  render(){
    const { classes, isPrintEnabled } = this.props;
    const { searchText } = this.state;
    return(
      <Toolbar>
        <div className={classes.spacer}></div>
        {
          isPrintEnabled && 
          <IconButton>
            <PrintIcon/>
          </IconButton>
        }
        <FormControl className={classes.formControl}>
          <Input
            fullWidth
            className={classes.searchField}
            type='text'
            value={this.state.searchText}
            onChange={this.handleInputChange('searchText')}
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
  isPrintEnabled: PropTypes.bool.isRequired
};

export default withStyles(styles)(GridToolbar);