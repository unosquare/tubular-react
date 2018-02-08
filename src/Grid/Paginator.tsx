import { TablePagination } from 'material-ui/Table';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import TablePaginationActions from './TablePaginationActions';

interface IProps {
  filteredRecordCount: number;
  page: number;
  rowsPerPage: number;
  totalRecordCount: number;
  handlePager(rowsPerPage: number, page: number): void;
}

const Paginator: React.SFC<IProps> = ({ handlePager, rowsPerPage, page, filteredRecordCount, totalRecordCount }) => {
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> , Page: number) => {
    handlePager(rowsPerPage, Page);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlePager(Number(event.target.value), page);
  };

  const message = ({ from, to, count }: any) => totalRecordCount === filteredRecordCount ?
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

export default Paginator;
