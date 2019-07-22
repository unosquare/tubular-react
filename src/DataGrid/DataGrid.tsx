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
import ToolbarOptions from '../Models/ToolbarOptions';
import { DataGridCard, DataGridTable, GridToolbar, Paginator } from './';

const useStyles = makeStyles({
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
  bodyRenderer?(row: any, index: number, columns: ColumnModel[]): void;
  footerRenderer?(aggregate: any): void;
  onRowClick?(ev: any): any;
}

const DataGrid: React.FunctionComponent<IProps> = (props) => {
  const {
    bodyRenderer,
    columns,
    footerRenderer,
    dataSource,
    toolbarOptions = props.toolbarOptions || new ToolbarOptions(),
    gridName,
    children,
    onRowClick,
    storage,
  } = props;

  const classes = useStyles({});
  const grid = useDataGrid(columns, { storage, gridName }, dataSource);
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
        <GridToolbar>
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
        {/* <Paginator /> */}
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
      {grid.state.isLoading && <FixedLinearProgress isLoading={grid.state.isLoading} />}
      <DataGridTable
        grid={grid}
        bodyRenderer={bodyRenderer}
        footerRenderer={footerRenderer}
        onRowClick={onRowClick}
        toolbarOptions={toolbarOptions}
        gridName={gridName}
        storage={storage}
      />
      {toolbarOptions.bottomPager && paginator}
    </Paper>
  );
};

export default DataGrid;
