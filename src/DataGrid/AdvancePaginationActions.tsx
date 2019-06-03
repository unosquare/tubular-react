import IconButton from '@material-ui/core/IconButton';
import FirstPage from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPage from '@material-ui/icons/LastPage';
import makeStyles from '@material-ui/styles/makeStyles';
import * as React from 'react';

const useStyles = makeStyles(({ spacing }: any) => ({
  root: {
    flexShrink: 0,
    marginLeft: spacing(2.5),
  },
}));

interface IProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage(event: React.MouseEvent<HTMLElement>, page: number): void;
}

const getPages = (currentPage: any, totalRows: any, rowsPerPage: any) => {
  const pages = [];

  // Default page limits
  const totalPages = Math.ceil(totalRows / rowsPerPage);
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
  for (let num = startPage; num <= endPage; num++) {
    pages.push(num - 1);
  }

  return pages;
};

const AdvancePaginationActions: React.FunctionComponent<IProps> = ({
  count,
  page,
  rowsPerPage,
  onChangePage,
}) => {
  const classes = useStyles();
  const pages = getPages(page, count, rowsPerPage);
  const lastPage = Math.ceil(count / rowsPerPage) - 1;
  const gotoPage = (value: number) => (e: any) => onChangePage(e, value);

  const gotoFirstPage = gotoPage(0);
  const gotoPrevPage = gotoPage(page - 1);
  const gotoNextPage = gotoPage(page + 1);
  const gotoLastPage = gotoPage(Math.max(0, lastPage));

  const canNotBack = page === 0;
  const canNotFwd = page === lastPage;

  return (
    <div className={classes.root}>
      <IconButton
        onClick={gotoFirstPage}
        disabled={canNotBack}
        aria-label='First Page'
      >
        <FirstPage />
      </IconButton>

      <IconButton
        onClick={gotoPrevPage}
        disabled={canNotBack}
        aria-label='Previous Page'
      >
        <KeyboardArrowLeft />
      </IconButton>

      {pages.map((value) => (
        <IconButton
          key={value}
          onClick={gotoPage(value)}
          disabled={value >= Math.ceil(count / rowsPerPage)}
          aria-label={`Page ${value + 1}`}
          color={value === page ? 'primary' : 'default'}
        >
          {value + 1}
        </IconButton>
      ))}

      <IconButton
        onClick={gotoNextPage}
        disabled={canNotFwd}
        aria-label='Next Page'
      >
        <KeyboardArrowRight />
      </IconButton>

      <IconButton
        onClick={gotoLastPage}
        disabled={canNotFwd}
        aria-label='Last Page'
      >
        <LastPage />
      </IconButton>
    </div>
  );
};

export default AdvancePaginationActions;
