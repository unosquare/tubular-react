import GridList from '@material-ui/core/GridList';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/styles/makeStyles';
import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import { FixedLinearProgress } from 'uno-material-ui';
import { useResolutionSwitch } from 'uno-react';

import { IDataGridStorage } from '../DataGridInterfaces';
import { DataSourceContext } from '../DataSource';
import ToolbarOptions from '../Models/ToolbarOptions';
import {  DataGridCard, DataGridTable, GridToolbar } from './';
import { DataGridProvider, IDataGridContext } from './DataGridContext';
import { Paginator } from './Paginator';

const useStyles = makeStyles((theme: any) => ({
  mobileSpacer: {
    flexShrink: '1',
  },
  root: {
    overflowX: 'auto',
    width: '100%',
  },
}));

const outerWidth = 800;
const timeout = 1000;

interface IProps extends IDataGridContext {
  storage?: IDataGridStorage;

  bodyRenderer?(row: any, index: number, columns: ColumnModel[]): void;
  footerRenderer?(aggregate: any): void;
  onRowClick?(ev: any): any;
}

const DataGrid: React.FunctionComponent<IProps> = (props, {
  bodyRenderer,
  footerRenderer,
  toolbarOptions,
  gridName,
  children,
  onRowClick,
  storage,
}) => {
  const classes = useStyles(props);
  const { state } = React.useContext(DataSourceContext);
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
      <DataGridProvider
        toolbarOptions={toolbarGridOptions}
        gridName={gridName}
        storage={storage}
      >
        <Paper className={classes.root}>
          <GridToolbar>
            {children}
          </GridToolbar>
          <FixedLinearProgress isLoading={state.isLoading} />
          <GridList
            cellHeight='auto'
            cols={1}
            className={classes.mobileGrid}
          >
            {
              state.data.map((row: any, index: any) =>
                (
                  <DataGridCard
                    columns={state.columns}
                    item={row}
                    onClickCallback={onRowClick}
                    key={index}
                  />
                ))
            }
          </GridList>
          <div className={classes.mobileSpacer}>
          <Paginator />
          </div>
        </Paper>
      </DataGridProvider>
    );
  }

  return (
    <DataGridProvider
      toolbarOptions={toolbarOptions}
      gridName={gridName}
      storage={storage}
    >
      <Paper className={classes.root}>
        <GridToolbar>
          {children}
        </GridToolbar>
        <FixedLinearProgress isLoading={state.isLoading} />
        <DataGridTable
          bodyRenderer={bodyRenderer}
          footerRenderer={footerRenderer}
          onRowClick={onRowClick}
        />
      </Paper>
    </DataGridProvider>
  );
};

export default DataGrid;
