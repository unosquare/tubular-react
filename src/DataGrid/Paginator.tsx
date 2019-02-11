import TablePagination from '@material-ui/core/TablePagination';
import * as React from 'react';
import AdvancePaginationActions from './AdvancePaginationActions';

import { DataSourceContext } from '../DataSource';

interface IProps {
  rowsPerPageOptions?: number[];
  advancePagination?: boolean;
}

const message = (totalRecordCount: any, filteredRecordCount: any) => ({
  from,
  to,
  count,
}: any) =>
  totalRecordCount === filteredRecordCount
    ? `${from}-${to} of ${count}`
    : filteredRecordCount === 0
      ? '0 records found'
      : `${from} to ${to} of ${count} from ${totalRecordCount} records`;

const Paginator: React.FunctionComponent<IProps> = ({
  rowsPerPageOptions,
  advancePagination,
}) => {
  const { actions, state } = React.useContext(DataSourceContext);

  const props = {
    count: state.filteredRecordCount,
    labelDisplayedRows: message(
      state.totalRecordCount,
      state.filteredRecordCount,
    ),
    onChangePage: (e: any, p: any) => actions.updatePage(p),
    onChangeRowsPerPage: (e: any) =>
      actions.updateItemPerPage(Number(e.target.value)),
    page: state.page,
    rowsPerPage: state.itemsPerPage,
    rowsPerPageOptions: rowsPerPageOptions || [10, 20, 50],
  } as any;

  if (advancePagination) {
    props.ActionsComponent = AdvancePaginationActions;
  }

  return <TablePagination {...props} />;
};

export default Paginator;
