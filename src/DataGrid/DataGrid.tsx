import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import makeStyles from '@material-ui/styles/makeStyles';
import * as React from 'react';
import { ColumnModel, IDataGridStorage, ITubularHttpClient } from 'tubular-common';
import { FixedLinearProgress } from 'uno-material-ui';
import { useResolutionSwitch } from 'uno-react';
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

const outerWidth = 800;
const timeout = 400;

interface IProps {
  columns: ColumnModel[];
  dataSource: any[] | string | Request | ITubularHttpClient;
  deps?: any[];
  gridName: string;
  storage?: IDataGridStorage;
  toolbarOptions?: ToolbarOptions;
  bodyRenderer?(
    row: any,
    index: number,
    columns: ColumnModel[],
    onRowClickProxy: (row: any) => void,
  ): React.ReactNode;
  footerRenderer?(aggregate: any): React.ReactNode;
  onError?(err: any): void;
  onRowClick?(row: any): void;
}

export const DataGrid: React.FunctionComponent<IProps> = (props) => {
  const {
    bodyRenderer,
    columns,
    deps,
    footerRenderer,
    dataSource,
    toolbarOptions = props.toolbarOptions || new ToolbarOptions(),
    gridName,
    onError,
    onRowClick,
    storage,
  } = props;

  const classes = useStyles({});
  const gridConfig: Partial<IDataGridConfig> = {
    gridName,
    itemsPerPage: toolbarOptions.itemsPerPage,
    onError,
    storage,
  };

  const grid = useDataGrid(columns, gridConfig, dataSource, deps);
  const [isMobileResolution] = useResolutionSwitch(outerWidth, timeout);

  if (isMobileResolution) {
    toolbarOptions.SetMobileMode();

    return (
      <Paper className={classes.root}>
        <GridToolbar toolbarOptions={toolbarOptions} grid={grid} gridName={gridName} />
        <FixedLinearProgress isLoading={grid.state.isLoading} />
        <MobileDataGridTable
          grid={grid}
          onRowClick={onRowClick}
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
        bodyRenderer={bodyRenderer}
        footerRenderer={footerRenderer}
        onRowClick={onRowClick}
      />
      {toolbarOptions.bottomPager && paginator('bottom')}
    </Paper>
  );
};
