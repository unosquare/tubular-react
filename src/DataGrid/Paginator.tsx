import { TablePagination } from '@material-ui/core';
import * as React from 'react';
import TablePaginationActions from './TablePaginationActions';

import { DataSourceContext } from './DataSource/DataSourceContext';

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
    <DataSourceContext.Consumer>
      {({ dataSource, actions }) =>
        <TablePagination
          labelDisplayedRows={message(dataSource.totalRecordCount, dataSource.filteredRecordCount)}
          count={dataSource.filteredRecordCount}
          rowsPerPage={dataSource.itemsPerPage}
          page={dataSource.page}
          rowsPerPageOptions={rowsPerPageOptions || [10,20,50]}
          onChangePage={(e, p) => actions.updatePage(p)}
          onChangeRowsPerPage={(e: any) => actions.updateItemPerPage(Number(e.target.value), )}
          ActionsComponent={TablePaginationActions}
        />}
    </DataSourceContext.Consumer>
  );
};

export default Paginator;
