import GridList from '@material-ui/core/GridList';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import makeStyles from '@material-ui/styles/makeStyles';
import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import { FixedLinearProgress } from 'uno-material-ui';
import { useResolutionSwitch } from 'uno-react';
import { IDataGridStorage } from '../DataGridInterfaces';
import useDataGrid from '../Hooks/useDataGrid';
import { Paginator } from '../Pagination';
import { GridToolbar } from '../Toolbar/GridToolbar';
import { ToolbarOptions } from '../Toolbar/ToolbarOptions';
import { DataGridCard, DataGridTable } from './';

const useStyles = makeStyles({
  linearProgress: {
    height: '30px',
    marginTop: '-10px',
    position: 'absolute',
    width: '100%',
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
  dataSource: any;
  gridName: string;
  storage?: IDataGridStorage;
  toolbarOptions?: ToolbarOptions;
  bodyRenderer?(row: any, index: number, columns: ColumnModel[]): React.ReactNode;
  footerRenderer?(aggregate: any): React.ReactNode;
  onError?(err: any): void;
  onRowClick?(ev: any): any;
}

export const DataGrid: React.FunctionComponent<IProps> = (props) => {
  const {
    bodyRenderer,
    columns,
    footerRenderer,
    dataSource,
    toolbarOptions = props.toolbarOptions || new ToolbarOptions(),
    gridName,
    children,
    onError,
    onRowClick,
    storage,
  } = props;

  const classes = useStyles({});
  const grid = useDataGrid(columns, { storage, gridName, onError }, dataSource);
  const [isMobileResolution] = useResolutionSwitch(outerWidth, timeout);

  if (isMobileResolution) {
    toolbarOptions.advancePagination = false;
    toolbarOptions.bottomPager = false;
    toolbarOptions.exportButton = false;
    toolbarOptions.printButton = false;
    toolbarOptions.rowsPerPageOptions = [5, 10];
    toolbarOptions.topPager = false;

    return (
      <Paper className={classes.root}>
        <GridToolbar toolbarOptions={toolbarOptions} grid={grid} gridName={gridName}>
          {children}
        </GridToolbar>
        <FixedLinearProgress isLoading={grid.state.isLoading} />
        <GridList
          cellHeight='auto'
          cols={1}
        >
          {
            grid.state.data.map((row: any, index: any) =>
              (
                <DataGridCard
                  columns={grid.state.columns}
                  item={row}
                  onClickCallback={onRowClick}
                  key={index}
                />
              ))
          }
        </GridList>
        <Paginator grid={grid} />
      </Paper>
    );
  }

  const paginator = (
    <Table>
      <TableHead>
        <TableRow>
          <Paginator grid={grid} />
        </TableRow>
      </TableHead>
    </Table>
  );

  return (
    <Paper style={{ overflowX: 'auto', width: '100%' }}>
      <GridToolbar gridName={gridName} toolbarOptions={toolbarOptions} grid={grid} />
      {toolbarOptions.topPager && paginator}
      <div className={classes.linearProgress}>
        <FixedLinearProgress isLoading={grid.state.isLoading} />
      </div>
      <DataGridTable
        grid={grid}
        bodyRenderer={bodyRenderer}
        footerRenderer={footerRenderer}
        onRowClick={onRowClick}
      />
      {toolbarOptions.bottomPager && paginator}
    </Paper>
  );
};
