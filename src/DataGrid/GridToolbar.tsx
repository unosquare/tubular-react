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
import * as React from 'react';

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
  anchorPrint?: HTMLElement;
  searchText: string;
}

interface IProps {
  gridName: string;
  isExportEnabled: boolean;
  isPrintEnabled: boolean;
  filteredRecordCount: number;
  showSearchText?: boolean;
  onSearchTextChange(text: string): void;
  onPrint(condition: boolean): void;
  onExport(condition: boolean): void;
}

class GridToolbar extends React.Component <IProps & WithStyles<keyof typeof styleClasses>, IState> {
  public static defaultProps = {
    onSearchTextChange: (x: any): any => x
  };

  public state = {
    anchorEl: null as HTMLElement,
    anchorPrint: null as HTMLElement,
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

  public printTable = (filtered: boolean, e: React.MouseEvent<HTMLElement>) => {
    const { onPrint } = this.props;
    e.preventDefault();
    this.setState({
      anchorPrint: null as HTMLElement
    });
    onPrint(filtered);
  }

  public render() {
    const { classes, filteredRecordCount, isPrintEnabled, isExportEnabled, onPrint, showSearchText} = this.props;
    const { searchText, anchorEl, anchorPrint } = this.state;

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
          <IconButton disabled={filteredRecordCount === 0} onClick={this.handlePrintMenuOpen} >
            <PrintIcon/>
          </IconButton>
        }
        { showSearchText &&
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
        }
        {isExportEnabled && <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleMenuClose}>
          <MenuItem onClick={(e) => this.exportCSV(false, e)}> All rows</MenuItem>
          <MenuItem onClick={(e) => this.exportCSV(true, e)}> Current rows</MenuItem>
        </Menu>}
        {isPrintEnabled && <Menu anchorEl={anchorPrint} open={Boolean(anchorPrint)} onClose={this.handlePrintMenuClose}>
          <MenuItem onClick={(e) => this.printTable(false, e)}> All rows</MenuItem>
          <MenuItem onClick={(e) => this.printTable(true, e)}> Current rows</MenuItem>
        </Menu>}
      </Toolbar>
    );
  }
}

export default withStyles(styles)(GridToolbar);
