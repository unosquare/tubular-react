import makeStyles from '@material-ui/core/styles/makeStyles';
import TablePagination, { TablePaginationBaseProps } from '@material-ui/core/TablePagination';
import * as React from 'react';
import { DataSourceContext } from '../DataSource';
import AdvancePaginationActions from './AdvancePaginationActions';
import { DataGridContext } from './DataGridContext';

const useStyles = makeStyles({
  caption: {
    flexShrink: 1,
    height: '55px',
  },
  root: {
    height: '75px',
    maxWidth: '95%',
  },
});

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

export const Paginator: React.FunctionComponent<TablePaginationBaseProps> = (props) => {
  const { actions, state } = React.useContext(DataSourceContext);
  const { toolbarOptions } = React.useContext(DataGridContext);
  const classes = useStyles({});

  if (!state.itemsPerPage) {
    return null;
  }

  const newProps = {
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
    rowsPerPageOptions: toolbarOptions.rowsPerPageOptions || [10, 20, 50],
    ...props,
  } as any;

  if (toolbarOptions.advancePagination) {
    newProps.ActionsComponent = AdvancePaginationActions;
  }

  return (<TablePagination classes={{caption: classes.caption, root: classes.root }} {...newProps} /> );
};
