import { TablePagination } from '@material-ui/core';
import TablePaginationActions from './TablePaginationActions';

import * as React from 'react';
import { DataSourceConsumer } from './DataSource/BaseDataSource';

interface IProps {
  rowsPerPageOptions?: number[];
}

const message = (totalRecordCount: any, filteredRecordCount: any) => ({ from, to, count }: any) =>
  totalRecordCount === filteredRecordCount ?
    `${from}-${to} of ${count}` :
    filteredRecordCount === 0 ?
      '0 records found' :
      `${from} to ${to} of ${count} from ${totalRecordCount} records`;

const Paginator: React.SFC<IProps> = ({ rowsPerPageOptions }) => {
  return (
    <DataSourceConsumer>
      {({ totalRecordCount, filteredRecordCount, itemsPerPage, page, actions }) =>
        <TablePagination
          labelDisplayedRows={message(totalRecordCount, filteredRecordCount)}
          labelRowsPerPage={'Page size:'}
          count={filteredRecordCount}
          rowsPerPage={itemsPerPage}
          page={page}
          rowsPerPageOptions={rowsPerPageOptions}
          onChangePage={(e, p) => actions.updatePage(p)}
          onChangeRowsPerPage={(e: any) => actions.updateItemPerPage(Number(e.target.value), )}
          ActionsComponent={TablePaginationActions}
        />
      }
    </DataSourceConsumer>
  );
};

export default Paginator;
