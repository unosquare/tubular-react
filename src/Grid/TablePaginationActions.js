import * as PropTypes from 'prop-types';
import * as React from 'react';
import FirstPageIcon from 'material-ui-icons/FirstPage';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import LastPageIcon from 'material-ui-icons/LastPage';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing.unit * 2.5
  },
  buttonStyle: {
    height: '30px',
    width: '30px'
  }
});

const TablePaginationActions = ({ classes, count, page, rowsPerPage, onChangePage }) => {
  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };
  
  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };
  
  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };
  
  const handleLastPageButtonClick = event => {
    const maxPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);

    onChangePage(
      event,
      maxPage
    );
  };

  const handlePageButtonClick = (event, page) => {
    onChangePage(
      event,
      page,
    );
  };
  
  let pages = [];
  const maxPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);

  if(page < 3){
    pages = [ 0, 1, 2, 3, 4 ];
  }
  else if(maxPage === 3){
    pages = [ 0, 1, 2, 3];
  }
  else if (page > maxPage - 2){
    pages = [maxPage - 4, maxPage - 3, maxPage - 2, maxPage - 1, maxPage];
  }
  else{
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
              onClick={event => handlePageButtonClick(event, pages[index])}
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

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired
};
  
export default withStyles(styles, { withTheme: true })(
  TablePaginationActions,
);