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
import { IDataGridConfig } from '../DataGridInterfaces/IDataGridConfig';
import useDataGrid from '../Hooks/useDataGrid';
import { Paginator } from '../Pagination';
import { GridToolbar } from '../Toolbar/GridToolbar';
import { ToolbarOptions } from '../Toolbar/ToolbarOptions';
import ITubularHttpClient from '../utils/ITubularHttpClient';
import { DataGridCard, DataGridTable } from './';

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
  gridName: string;
  storage?: IDataGridStorage;
  toolbarOptions?: ToolbarOptions;
  bodyRenderer?(row: object, index: number, columns: ColumnModel[]): React.ReactNode;
  footerRenderer?(aggregate: any): React.ReactNode;
  onError?(err: any): void;
  onRowClick?(ev: React.MouseEvent<HTMLTableRowElement, MouseEvent>): any;
}

export const DataGrid: React.FunctionComponent<IProps> = (props) => {
  const {
    bodyRenderer,
    columns,
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

  const grid = useDataGrid(columns, gridConfig, dataSource);
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
        <GridToolbar toolbarOptions={toolbarOptions} grid={grid} gridName={gridName} />
        <FixedLinearProgress isLoading={grid.state.isLoading} />
        <GridList
          cellHeight='auto'
          cols={1}
        >
          {
            grid.state.data.map((row: any, index: number) =>
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
    <Paper style={{ overflowX: 'auto', width: '100%' }}>
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
