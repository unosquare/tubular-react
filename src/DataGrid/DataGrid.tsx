import GridList from '@material-ui/core/GridList';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/styles/makeStyles';
import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import { FixedLinearProgress } from 'uno-material-ui';
import { useResolutionSwitch } from 'uno-react';
import { IDataGridStorage } from '../DataGridInterfaces';
import useDataGrid from '../Hooks/useDataGrid';
import ToolbarOptions from '../Models/ToolbarOptions';
import { DataGridCard, DataGridTable, GridToolbar } from './';

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
  toolbarOptions: any;
  bodyRenderer?(row: any, index: number, columns: ColumnModel[]): void;
  footerRenderer?(aggregate: any): void;
  onRowClick?(ev: any): any;

}

const DataGrid: React.FunctionComponent<IProps> = ({
  bodyRenderer,
  columns,
  footerRenderer,
  dataSource,
  toolbarOptions,
  gridName,
  children,
  onRowClick,
  storage,
}) => {
  const classes = useStyles({});
  const grid = useDataGrid(columns, {}, dataSource);
  const [isMobileResolution] = useResolutionSwitch(outerWidth, timeout);

  if (isMobileResolution) {
    const toolbarGridOptions = new ToolbarOptions({
      advancePagination: false,
      bottomPager: false,
      exportButton: false,
      printButton: false,
      rowsPerPageOptions: [5, 10],
      topPager: false,
    });

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

  return (
    <Paper style={{ overflowX: 'auto', width: '100%' }}>
      <FixedLinearProgress isLoading={grid.state.isLoading} />
      <DataGridTable
        grid={grid}
        bodyRenderer={bodyRenderer}
        footerRenderer={footerRenderer}
        onRowClick={onRowClick}
        toolbarOptions={toolbarOptions}
        gridName={gridName}
        storage={storage}
      />
    </Paper>
  );
};

export default DataGrid;
