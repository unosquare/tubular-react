import FirstPageIcon from 'material-ui-icons/FirstPage';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import LastPageIcon from 'material-ui-icons/LastPage';
import PropTypes from 'prop-types';
import React from 'react';
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

class TablePaginationActions extends React.Component {
  state = {
    pages: [0, 1, 2, 3, 4],
    activePage: 0
  }

  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);

    this.setCurrentPage(0);
  };
  
  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);

    this.setCurrentPage(this.props.page - 1);
  };
  
  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
    
    this.setCurrentPage(this.props.page + 1);
  };
  
  handleLastPageButtonClick = event => {
    const maxPage = Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1);

    this.props.onChangePage(
      event,
      maxPage
    );

    this.setCurrentPage(maxPage);
  };

  handlePageButtonClick = (event, page) => {
    this.props.onChangePage(
      event,
      page,
    );

    this.setCurrentPage(page);
  };

  setCurrentPage = page => {
    let array = [];
    const maxPage = Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1);
    
    if(page < 2){
      array = [ 0, 1, 2, 3, 4 ];
    }
    else if (page > maxPage - 2){
      array = [maxPage - 4, maxPage - 3, maxPage - 2, maxPage - 1, maxPage];
    }
    else{
      array = [ page - 2, page - 1, page, page + 1, page + 2 ];
    }

    this.setState({ pages: array, activePage: page });
  }

  componentWillReceiveProps = () => {
    this.setState({ activePage: this.props.page }, 
      this.setCurrentPage(this.props.page) );
  }

  render (){
    const { activePage, pages } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          className={classes.buttonStyle}
          onClick={this.handleFirstPageButtonClick}
          disabled={this.props.page === 0}
          aria-label='First Page'
        >
          <FirstPageIcon />
        </IconButton>

        <IconButton
          className={classes.buttonStyle}
          onClick={this.handleBackButtonClick}
          disabled={this.props.page === 0}
          aria-label='Previous Page'
        >
          <KeyboardArrowLeft />
        </IconButton>

        {
          pages.map((element, index) => ( this.props.count / this.props.rowsPerPage > index &&
            <IconButton
              className={classes.buttonStyle}
              key={index}
              onClick={event => this.handlePageButtonClick(event, pages[index])}
              aria-label={`Page${index + 1}`}
              style={ pages[index] === activePage ? 
                { fontSize: '18px', background: '#5999e8', color: 'white' } : 
                { fontSize: '18px' } } 
            >
              {pages[index] + 1}
            </IconButton>))
        }

        <IconButton
          className={classes.buttonStyle}
          onClick={this.handleNextButtonClick}
          disabled={this.props.page >= Math.ceil(this.props.count / this.props.rowsPerPage) - 1}
          aria-label='Next Page'
        >
          <KeyboardArrowRight />
        </IconButton>

        <IconButton
          className={classes.buttonStyle}
          onClick={this.handleLastPageButtonClick}
          disabled={this.props.page >= Math.ceil(this.props.count / this.props.rowsPerPage) - 1}
          aria-label='Last Page'
        >
          <LastPageIcon />
        </IconButton>
      </div>
    );
  }
}

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