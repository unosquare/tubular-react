import { IconButton } from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles, } from '@material-ui/core/styles';

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

const getPages = (currentPage: any, totalRows: any, itemsPerPage: any) => {
  const pages = [];

  // Default page limits
  const totalPages = Math.round(totalRows / itemsPerPage);
  let startPage = 1;
  let endPage = totalPages;
  const maxSize = 6;
  const isMaxSized = maxSize < totalPages;

  // recompute if maxSize
  if (isMaxSized) {
    // Current page is displayed in the middle of the visible ones
    startPage = Math.max(currentPage - Math.floor(maxSize / 2), 1);
    endPage = startPage + maxSize - 1;

    // Adjust if limit is exceeded
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = endPage - maxSize + 1;
    }
  }

  // Add page number links
  for (let num = startPage; num < endPage; num++) {
    pages.push(num - 1);
  }

  return pages;
};

const AdvancePaginationActions: React.SFC<IProps> = ({ classes, count, page, rowsPerPage, onChangePage }) => {
  const pages = getPages(page, count, rowsPerPage);
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

      {
        pages.map((value) => (
          <IconButton
            key={value}
            onClick={(e) => onChangePage(e, value)}
            disabled={value >= (Math.ceil(count / rowsPerPage))}
            aria-label={`Page ${value + 1}`}
            color={value === page ?
              'primary' :
              'default'}
          >
            {value + 1}
          </IconButton>))
      }

      <IconButton
        onClick={(e) => onChangePage(e, page + 1)}
        disabled={page === (Math.ceil(count / rowsPerPage) - 1)}
        aria-label='Next Page'
      >
        <KeyboardArrowRight />
      </IconButton>

      <IconButton
        onClick={(e) => onChangePage(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1))}
        disabled={page === (Math.ceil(count / rowsPerPage) - 1)}
        aria-label='Last Page'
      >
        <LastPage />
      </IconButton>

    </div>
  );
};

export default withStyles(styles, { withTheme: true })(AdvancePaginationActions);
