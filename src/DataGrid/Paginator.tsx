import { TablePagination } from '@material-ui/core';
import TablePaginationActions from './TablePaginationActions';

import * as React from 'react';
import { GridConsumer } from './GridContext';

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
    <GridConsumer>
      {({ state, actions }) =>
        <TablePagination
          labelDisplayedRows={message(state.totalRecordCount, state.filteredRecordCount)}
          labelRowsPerPage={'Page size:'}
          count={state.filteredRecordCount}
          rowsPerPage={state.itemsPerPage}
          page={state.page}
          rowsPerPageOptions={rowsPerPageOptions}
          onChangePage={(e, p) => actions.updatePage(p)}
          onChangeRowsPerPage={(e: any) => actions.updateItemPerPage(Number(e.target.value), )}
          ActionsComponent={TablePaginationActions}
        />
      }
    </GridConsumer>
  );
};

export default Paginator;
