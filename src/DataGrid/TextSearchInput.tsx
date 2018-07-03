import { FormControl, IconButton, Input, InputAdornment } from '@material-ui/core';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';

import { Close, Search } from '@material-ui/icons';

import * as React from 'react';

import { DataSourceContext } from '../DataSource';

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
  anchorExport?: HTMLElement;
  anchorPrint?: HTMLElement;
}

interface IProps extends WithStyles<typeof styles> {
  gridName?: string;
}

class SearchTextInput extends React.Component<IProps, IState> {

  public render() {
    const { classes } = this.props;
    return (
      <DataSourceContext.Consumer>
        {({ state, actions }) =>
          <FormControl className={classes.formControl}>
                <Input
                  fullWidth={true}
                  type='text'
                  value={state.searchText}
                  onChange={(e: any) => actions.updateSearchText(e.target.value)}
                  startAdornment={
                    <InputAdornment position='end'>
                      <Search />
                    </InputAdornment>
                  }
                  endAdornment={
                    state.searchText !== '' &&
                    <InputAdornment position='end'>
                      <IconButton onClick={() => actions.updateSearchText('')}>
                        <Close />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>}
            </DataSourceContext.Consumer>
    );
  }
}

export default withStyles(styles)(SearchTextInput);
