import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import makeStyles from '@material-ui/styles/makeStyles';
import * as React from 'react';
import { ColumnModel, IDataGridStorage, ITubularHttpClient } from 'tubular-common';
import { FixedLinearProgress } from 'uno-material-ui';
import { useResolutionSwitch } from 'uno-react';
import { ITbRow, TbRow, TbRow } from '../BareBones/TbRow';
import { IDataGridConfig } from '../DataGridInterfaces/IDataGridConfig';
import useDataGrid from '../Hooks/useDataGrid';
import { Paginator } from '../Pagination';
import { GridToolbar } from '../Toolbar/GridToolbar';
import { ToolbarOptions } from '../Toolbar/ToolbarOptions';
import { DataGridTable } from './';
import { MobileDataGridTable } from './MobileDataGridTable';

const useStyles = makeStyles({
  linearProgress: {
    marginTop: '-10px',
  },
  root: {
    overflowX: 'auto',
    width: '100%',
  },
});

const timeout = 400;

interface IProps {
  columns: ColumnModel[];
  dataSource: any[] | string | Request | ITubularHttpClient;
  deps?: any[];
  gridName: string;
  storage?: IDataGridStorage;
  toolbarOptions?: ToolbarOptions;

  // ToDo: new ones:
  mobileBreakpointWidth?: number;
  rowComponent?: React.FunctionComponent<ITbRow>;
  rowMobileComponent?: React.FunctionComponent<ITbRow>;
  footerComponent?: React.FunctionComponent<any>;
  onError?(err: any): void;
  onRowClick?(row: any): void;
}

export const DataGrid: React.FunctionComponent<IProps> = (props) => {
  const {
    columns,
    dataSource,
    deps,
    footerComponent,
    gridName,
    mobileBreakpointWidth = props.mobileBreakpointWidth || 800,
    onError,
    onRowClick,
    rowComponent,
    rowMobileComponent,
    storage,
    toolbarOptions = props.toolbarOptions || new ToolbarOptions(),
  } = props;

  const classes = useStyles({});
  const gridConfig: Partial<IDataGridConfig> = {
    gridName,
    itemsPerPage: toolbarOptions.itemsPerPage,
    onError,
    storage,
  };

  const grid = useDataGrid(columns, gridConfig, dataSource, deps);
  const [isMobileResolution] = useResolutionSwitch(mobileBreakpointWidth, timeout);

  if (isMobileResolution) {
    toolbarOptions.SetMobileMode();

    return (
      <Paper className={classes.root}>
        <GridToolbar toolbarOptions={toolbarOptions} grid={grid} gridName={gridName} />
        <FixedLinearProgress isLoading={grid.state.isLoading} />
        <MobileDataGridTable
          grid={grid}
          onRowClick={onRowClick}
          rowComponent={rowMobileComponent}
        />
        <Paginator
          advancePagination={toolbarOptions.advancePagination}
          rowsPerPageOptions={toolbarOptions.rowsPerPageOptions}
          grid={grid}
        />
      </Paper>
    );
  }

  const paginator = (position: string) => (
    <Table data-testid={`${position}-paginator`}>
      <TableHead>
        <TableRow>
          <Paginator
            advancePagination={toolbarOptions.advancePagination}
            rowsPerPageOptions={toolbarOptions.rowsPerPageOptions}
            grid={grid}
          />
        </TableRow>
      </TableHead>
    </Table>
  );

  return (
    <Paper className={classes.root}>
      <GridToolbar gridName={gridName} toolbarOptions={toolbarOptions} grid={grid} />
      {toolbarOptions.topPager && paginator('top')}
      <div className={classes.linearProgress} data-testid='linear-progress'>
        <FixedLinearProgress isLoading={grid.state.isLoading} />
      </div>
      <DataGridTable
        grid={grid}
        rowComponent={rowComponent}
        footerComponent={footerComponent}
        onRowClick={onRowClick}
      />
      {toolbarOptions.bottomPager && paginator('bottom')}
    </Paper>
  );
};
