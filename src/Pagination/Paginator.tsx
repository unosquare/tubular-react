import makeStyles from '@material-ui/core/styles/makeStyles';
import TablePagination from '@material-ui/core/TablePagination';
import * as React from 'react';
import { useResolutionSwitch } from 'uno-react';
import { IDataGrid } from '../DataGridInterfaces/IDataGrid';
import { AdvancePaginationActions } from './AdvancePaginationActions';

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

const outerWidth = 800;
const timeout = 400;

const message = (totalRecordCount: number, filteredRecordCount: number) => ({
  from,
  to,
  count,
}: any) =>
  totalRecordCount === filteredRecordCount
    ? `${from}-${to} of ${count}`
    : filteredRecordCount === 0
      ? '0 records found'
      : `${from} to ${to} of ${count} from ${totalRecordCount} records`;

interface IPaginatorProps {
  grid: IDataGrid;
  rowsPerPageOptions: number[];
  advancePagination: boolean;
}

export const Paginator: React.FunctionComponent<IPaginatorProps> =
  ({ grid, rowsPerPageOptions, advancePagination }) => {
    const [isMobileResolution] = useResolutionSwitch(outerWidth, timeout);
    const classes = useStyles({});
    const { state, api } = grid;

    if (!state.itemsPerPage) {
      return null;
    }

    const newProps = {
      count: state.filteredRecordCount,
      labelDisplayedRows: message(
        state.totalRecordCount,
        state.filteredRecordCount,
      ),
      onChangePage: (e: any, page: number) => api.goToPage(page),
      onChangeRowsPerPage: (e: any) =>
        api.updateItemPerPage(Number(e.target.value)),
      page: state.filteredRecordCount > 0 ? state.page : 0,
      rowsPerPage: state.itemsPerPage,
      rowsPerPageOptions: rowsPerPageOptions || [10, 20, 50],
    } as any;

    newProps.ActionsComponent = () => (
      <AdvancePaginationActions
        count={newProps.count}
        isAdvanced={advancePagination}
        isLoading={newProps.isLoading}
        onChangePage={newProps.onChangePage}
        page={newProps.page}
        rowsPerPage={newProps.rowsPerPage}
      />
    );

    return (
      <TablePagination
        classes={{ caption: isMobileResolution && classes.caption, root: classes.root }}
        {...newProps}
      />
    );
  };
