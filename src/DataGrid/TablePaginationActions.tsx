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
const TablePaginationActions: React.SFC<IProps> = ({ classes, count, page, rowsPerPage, onChangePage }) => {
  const pages: any[] = [];
  const maxPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);
  let fromPage = 0;
  let toPage = 0;
 
  if (maxPage < 6) {
    toPage = maxPage;
  } else if (page - 1 <= 0) {
    fromPage = 0;
    toPage = 5;
  } else if (page > maxPage - 2) {
    fromPage = maxPage - 5;
    toPage = maxPage;
  } else {
    fromPage = page - 2;
    toPage = page + 3;
  }

  for (let i = fromPage; i < toPage; i++) {
    pages.push(i);
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={(e) => onChangePage(e, 1)}
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

      {
        pages.map((index) => ( count / rowsPerPage > index &&
            <IconButton
              key={index}
              onClick={(e) => onChangePage(e, pages[index])}
              aria-label={`Page${index + 1}`}
              color={ pages[index] === page ?
                 'primary' :
                 'default' }
            >
              {pages[index] + 1}
            </IconButton>))
      }

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

export default withStyles(styles, { withTheme: true })(TablePaginationActions);
