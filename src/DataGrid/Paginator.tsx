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
      {({ dataSource, actions }) =>
        <TablePagination
          labelDisplayedRows={message(dataSource.totalRecordCount, dataSource.filteredRecordCount)}
          labelRowsPerPage={'Page size:'}
          count={dataSource.filteredRecordCount}
          rowsPerPage={dataSource.itemsPerPage}
          page={dataSource.page}
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
