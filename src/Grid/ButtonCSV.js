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
import { buildURI, toCSV } from './ExportCSV';

const styles = theme => ({
  button: {
    minWidth: 150
  }
});

class ButtonCSV extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }
  buildURI() {
    return buildURI(...arguments);
  }
  /**
* In IE11 this method will trigger the file download
*/
  handleLegacy(evt, data, headers, separator, filename) {
    // If this browser is IE 11, it does not support the `download` attribute
    if (window.navigator.msSaveOrOpenBlob) {
      // Stop the click propagation
      evt.preventDefault()

      let blob = new Blob([toCSV(data, headers, separator)])
      window.navigator.msSaveBlob(blob, filename)
      return false
    }
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
    debugger;
  }

  render() {
    const { classes, data, currentData, headers, separator, filename, uFEFF, children, ...rest } = this.props;
    const { anchorEl } = this.state;
    return (
      <div>
      <Button
        raised
        color='accent'
        className={classes.button}
        onClick={this.handleMenuOpen}
      >
        <DownloadIcon />
        Export csv
        </Button>
      <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleMenuClose}
        >
          <a download={filename} {...rest}
            ref={link => (this.link = link)}
            href={this.buildURI(data, uFEFF, headers, separator, filename)}
            onClick={evt => this.handleLegacy(evt, data, headers, separator, filename)}>
            <MenuItem onClick={this.handleMenuClose}> All rows</MenuItem>
          </a>
          <a download={filename} {...rest}
            ref={link => (this.link = link)}
            href={this.buildURI(currentData, uFEFF, headers, separator)}
            onClick={evt => this.handleLegacy(evt, currentData, headers, separator, filename)}>
            <MenuItem onClick={this.handleMenuClose}> Current rows</MenuItem>
          </a>
        </Menu>
        </div>
    );
  }
}
ButtonCSV.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonCSV);