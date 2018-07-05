import { IconButton } from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles,  } from '@material-ui/core/styles';

import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@material-ui/icons';

import * as React from 'react';

const styles = (theme: Theme) => createStyles(
  {
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing.unit * 2.5
    }
  }
);
interface IProps extends WithStyles<typeof styles> {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage(event: React.MouseEvent<HTMLElement>, page: number): void;
}

const BasicPagination: React.SFC<IProps> = ({ classes, count, page, rowsPerPage, onChangePage }) => {
  return (
    <div className={classes.root}>
      <IconButton
        onClick={(e) => onChangePage(e, 0)}
        disabled={page === 0}
        aria-label='First Page'
      >
        <FirstPage />
      </IconButton>

      <IconButton
        onClick={(e) => onChangePage(e, page - 1)}
        disabled={page === 0}
        aria-label='Previous Page'
      >
        <KeyboardArrowLeft />
      </IconButton>

      <IconButton
        onClick={(e) => onChangePage(e, page + 1)}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='Next Page'
      >
        <KeyboardArrowRight />
      </IconButton>

      <IconButton
        onClick={(e) => onChangePage(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1))}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='Last Page'
      >
        <LastPage />
      </IconButton>

    </div>
  );
};

export default withStyles(styles, { withTheme: true })(BasicPagination);
