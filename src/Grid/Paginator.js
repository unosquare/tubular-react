import PropTypes from 'prop-types';
import React from 'react';
import { TablePagination } from 'material-ui/Table';
import TablePaginationActions from './TablePaginationActions';
import { withStyles } from 'material-ui/styles';

const Paginator = ({ handlePager, rowsPerPage, page, filteredRecordCount, totalRecordCount }) => {
  const handleChangePage = (event, page) => {
    handlePager(rowsPerPage, page);
  };
    
  const handleChangeRowsPerPage = event => {
    handlePager(event.target.value, page);
  };

  const message = ({ from, to, count }) => totalRecordCount === filteredRecordCount ?
    `${from}-${to} of ${count}` : 
    filteredRecordCount === 0 ?  
      '0 records found' :
      `${from} to ${to} of ${count} from ${totalRecordCount} records`;

  return(
    <TablePagination
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

export default Paginator;