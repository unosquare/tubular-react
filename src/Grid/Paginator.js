import PropTypes from 'prop-types';
import React from 'react';
import { TablePagination } from 'material-ui/Table';
import TablePaginationActions from './TablePaginationActions';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  spacer: {
    flex: 0
  },
  select: {
    border: '1px solid #c3c3c3',
    borderRadius: '5px'
  }
});

const Paginator = ({ handlePager, rowsPerPage, page, filteredRecordCount, classes, totalRecordCount }) => {
  const handleChangePage = (event, page) => {
    handlePager(rowsPerPage, page);
  };
    
  const handleChangeRowsPerPage = event => {
    handlePager(event.target.value, page);
  };

  const message = totalRecordCount === filteredRecordCount ?
    ({ from, to, count }) => `${from}-${to} of ${count}` : 
    filteredRecordCount === 0 ?  
      () => '0 records found' :
      ({ from, to, count }) => `${from} to ${to} of ${count} from ${totalRecordCount} records`;

  return(
    <TablePagination
      classes={{
        spacer: classes.spacer,
        select: classes.select
      }}
      labelDisplayedRows={message}
      labelRowsPerPage={'Page size:'}
      count={filteredRecordCount}
      rowsPerPage={rowsPerPage}
      page={page}
      rowsPerPageOptions={[10, 20, 50, 100]}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      Actions={TablePaginationActions}
    />
  );
};

Paginator.propTypes = {
  dataSource: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  refreshGrid: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

export default withStyles(styles)(Paginator);