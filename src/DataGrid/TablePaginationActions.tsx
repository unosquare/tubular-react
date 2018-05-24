import IconButton from '@material-ui/core/IconButton';
import { StyleRules, Theme, withStyles } from '@material-ui/core/styles';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import * as React from 'react';

const styleClasses  = {
  buttonStyle: '',
  root: '',
};

const styles = (theme: Theme): StyleRules<keyof typeof styleClasses> => (
  {
    buttonStyle: {
      height: '30px',
      width: '30px'
    },
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing.unit * 2.5
    }
  }
);
interface IProps {
  classes: any;
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage(event: React.MouseEvent<HTMLElement>, page: number): void;
}
const TablePaginationActions: React.SFC<IProps> = ({ classes, count, page, rowsPerPage, onChangePage }) => {
  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const $maxPage: number = Math.max(0, Math.ceil(count / rowsPerPage) - 1);

    onChangePage(
      event,
      $maxPage
    );
  };

  const handlePageButtonClick = (event: React.MouseEvent<HTMLElement>, Page: number) => {
    onChangePage(
      event,
      Page,
    );
  };

  let pages: any[] = [];
  const maxPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);

  if (page < 3) {
    pages = [ 0, 1, 2, 3, 4 ];
  } else if (maxPage === 3) {
    pages = [ 0, 1, 2, 3];
  } else if (page > maxPage - 2) {
    pages = [maxPage - 4, maxPage - 3, maxPage - 2, maxPage - 1, maxPage];
  } else {
    pages = [ page - 2, page - 1, page, page + 1, page + 2 ];
  }

  return (
    <div className={classes.root}>
      <IconButton
        className={classes.buttonStyle}
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='First Page'
      >
        <FirstPageIcon />
      </IconButton>

      <IconButton
        className={classes.buttonStyle}
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='Previous Page'
      >
        <KeyboardArrowLeft />
      </IconButton>

      {
        pages.map((element, index) => ( count / rowsPerPage > index &&
            <IconButton
              className={classes.buttonStyle}
              key={index}
              onClick={(event) => handlePageButtonClick(event, pages[index])}
              aria-label={`Page${index + 1}`}
              style={ pages[index] === page ?
                { fontSize: '18px', background: '#158cba', color: 'white' } :
                { fontSize: '18px' } }
            >
              {pages[index] + 1}
            </IconButton>))
      }

      <IconButton
        className={classes.buttonStyle}
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='Next Page'
      >
        <KeyboardArrowRight />
      </IconButton>

      <IconButton
        className={classes.buttonStyle}
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='Last Page'
      >
        <LastPageIcon />
      </IconButton>

    </div>
  );
};

export default withStyles(styles, { withTheme: true })(
  TablePaginationActions,
);
