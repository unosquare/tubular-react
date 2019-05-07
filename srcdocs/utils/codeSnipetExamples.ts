export const quickStart = `import React from 'react';
import ReactDOM from 'react-dom';

import { DataGridProvider, DataGridTable, ToolbarOptions, withRemoteDataSource } from 'tubular-react';
import { ColumnModel } from 'tubular-common';
import { IconButton, Tooltip } from '@material-ui/core';

const columns = [
    new ColumnModel('OrderID'),
    new ColumnModel('CustomerName'),
    new ColumnModel('ShipperCity')
];

const SampleGrid = withRemoteDataSource(
    () => {
        return (
          <DataGrid/>
        );
    },
    columns,
    'https://tubular.azurewebsites.net/api/orders/paged'
);

ReactDOM.render(<SampleGrid />, document.getElementById('root'));`;

export const basicFeatures = `import * as React from 'react';

import { DataGridProvider, DataGridTable, ToolbarOptions, withRemoteDataSource } from 'tubular-react';
import { AggregateFunctions, ColumnDataType, ColumnModel, ColumnSortDirection } from 'tubular-common';

//  First of all, you must define your columns model.
const columns = [
    new ColumnModel('OrderID',
        {
            DataType: ColumnDataType.NUMERIC,
            Filterable: true,
            IsKey: true,
            Label: 'ID',
            SortDirection: ColumnSortDirection.ASCENDING,
            SortOrder: 1,
            Sortable: true
        }
    ),
    new ColumnModel('CustomerName',
        {
            Aggregate: AggregateFunctions.COUNT,
            Filterable: true,
            Searchable: true,
            Sortable: true
        }
    ),
    new ColumnModel('ShippedDate',
        {
            DataType: ColumnDataType.DATE_TIME,
            Filterable: true,
            Sortable: true
        }
    ),
    new ColumnModel('ShipperCity'),
    new ColumnModel('Amount',
        {
            DataType: ColumnDataType.NUMERIC,
            Sortable: true
        }
    ),
    new ColumnModel('IsShipped',
        {
            DataType: ColumnDataType.BOOLEAN,
            Filterable: true,
            Sortable: true
        }
    )
];

const toolbarOptions = new ToolbarOptions();
toolbarOptions.advancePagination = false;
toolbarOptions.exportButton = false;
toolbarOptions.printButton = false;
toolbarOptions.searchText = false;

const MyComponent = () => (
    <div className='root'>
        <DataGrid gridName='BasicFeatures' toolbarOptions={toolbarOptions} />
    </div>
);

/*
 Use the component withRemoteDataSource to wrap your component
 and columns definition among the data obtained from the URL.

 withRemoteDataSource will set an initial context for your grid.
*/
export default withRemoteDataSource(MyComponent, columns, 'http://tubular.azurewebsites.net/api/orders/paged');`;

export const buttonFeatures = `import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Brightness7Rounded from '@material-ui/icons/Brightness7Rounded';
import Mood from '@material-ui/icons/Mood';

import { DataGridProvider, DataGridTable, ToolbarOptions, withRemoteDataSource } from 'tubular-react';

import { AggregateFunctions, ColumnDataType, ColumnModel, ColumnSortDirection } from 'tubular-common';

//  First of all, you must define your columns model.
const columns = [
    new ColumnModel('OrderID',
        {
            DataType: ColumnDataType.NUMERIC,
            Filterable: true,
            IsKey: true,
            Label: 'ID',
            SortDirection: ColumnSortDirection.ASCENDING,
            SortOrder: 1,
            Sortable: true
        }
    ),
    new ColumnModel('CustomerName',
        {
            Aggregate: AggregateFunctions.COUNT,
            Filterable: true,
            Searchable: true,
            Sortable: true
        }
    ),
    new ColumnModel('ShippedDate',
        {
            DataType: ColumnDataType.DATE_TIME,
            Filterable: true,
            Sortable: true
        }
    ),
    new ColumnModel('ShipperCity'),
    new ColumnModel('Amount',
        {
            DataType: ColumnDataType.NUMERIC,
            Sortable: true
        }
    ),
    new ColumnModel('IsShipped',
        {
            DataType: ColumnDataType.BOOLEAN,
            Filterable: true,
            Sortable: true
        }
    )
];
const MyComponent = () => {
  <DataGridProvider gridName='SampleButtons' toolbarOptions={new ToolbarOptions()}>
  <DataGridTable
    bodyRenderer={(row: any) => (
      <TableRow hover={true} key={row.OrderID}>
        <TableCell padding='default'>{row.OrderID}</TableCell>
        <TableCell padding='default'>{row.CustomerName}</TableCell>
        <TableCell padding='default'>
          {format(row.ShippedDate, 'MMMM Do YYYY, h:mm:ss a')}
        </TableCell>
        <TableCell padding='default'>{row.ShipperCity}</TableCell>
        <TableCell padding='default' align={'right'}>
          {row.Amount || 0}
        </TableCell>
        <TableCell padding='default'>
          {row.IsShipped ? <CheckBox /> : <CheckBoxOutlineBlank />}
        </TableCell>
      </TableRow>
    )}
    footerRenderer={(aggregates: any) => (
      <TableRow>
        <TableCell>Total: </TableCell>
        <TableCell>{aggregates && aggregates.CustomerName}</TableCell>
        <TableCell />
        <TableCell />
        <TableCell />
      </TableRow>
    )}
  />
  <IconButton color='default' onClick={() => alert('I can help you to add features to your datagrid.')}>
    <Mood />
  </IconButton>
  <IconButton color='default' onClick={() => alert('Happy codes, have a nice day')}>
    <Brightness7Rounded />
  </IconButton>
</DataGridProvider>
};

/*
 Use the component withRemoteDataSource to wrap your component
 and columns definition among the data obtained from the URL.

 withRemoteDataSource will set an initial context for your grid.
*/
export default withRemoteDataSource(MyComponent, columns, 'http://tubular.azurewebsites.net/api/orders/paged');`;

export const simpleFeatures = `import React from 'react';
import { Snackbar, TableCell, TableRow } from '@material-ui/core';
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import format from 'date-fns/format';
import { DataGridProvider, DataGridTable, ToolbarOptions, withRemoteDataSource } from 'tubular-react';

import {
  AggregateFunctions,
  ColumnDataType,
  ColumnModel,
  ColumnSortDirection
} from 'tubular-common';

const columns = [
  new ColumnModel('OrderID', {
    DataType: ColumnDataType.NUMERIC,
    Filterable: true,
    IsKey: true,
    Label: 'ID',
    SortDirection: ColumnSortDirection.ASCENDING,
    SortOrder: 1,
    Sortable: true
  }),
  new ColumnModel('CustomerName', {
    Aggregate: AggregateFunctions.COUNT,
    Filterable: true,
    Searchable: true,
    Sortable: true
  }),
  new ColumnModel('ShippedDate', {
    DataType: ColumnDataType.DATE_TIME,
    Filterable: true,
    Sortable: true
  }),
  new ColumnModel('ShipperCity'),
  new ColumnModel('Amount', {
    DataType: ColumnDataType.NUMERIC,
    Sortable: true
  }),
  new ColumnModel('IsShipped', {
    DataType: ColumnDataType.BOOLEAN,
    Filterable: true,
    Sortable: true
  })
];

class SampleFeatures extends React.Component {
  state = {
    errorMessage: null
  };

  componentWillReceiveProps(nextProps: any) {
    this.setState({ errorMessage: nextProps.error });
  }

  render() {
    const { errorMessage } = this.state;

    return (
      <div className='root'>
        {errorMessage && (
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            style={{ paddingTop: '10px' }}
            open={true}
            ContentProps={{ 'aria-describedby': 'message-id' }}
            message={<span id='message-id'>{errorMessage}</span>}
          />
        )}
        <DataGridProvider gridName='SampleFeatures' toolbarOptions={new ToolbarOptions()}>
        <DataGridTable
            bodyRenderer={
                (row: any) =>
                    <TableRow hover={true} key={row.OrderID}>
                        <TableCell padding='default'>
                            {row.OrderID}
                        </TableCell>
                        <TableCell padding='default'>
                            {row.CustomerName}
                        </TableCell>
                        <TableCell padding='default'>
                            {format(row.ShippedDate, 'MMMM Do YYYY, h:mm:ss a')}
                        </TableCell>
                        <TableCell padding='default'>
                            {row.ShipperCity}
                        </TableCell>
                        <TableCell padding='default' align={'right'}>
                            {row.Amount || 0}
                        </TableCell>
                        <TableCell padding='default'>
                            {row.IsShipped ? <CheckBox />
                                : <CheckBoxOutlineBlank />}
                        </TableCell>
                    </TableRow>
            }
            footerRenderer={
                (aggregates: any) =>
                    <TableRow>
                        <TableCell>Total: </TableCell>
                        <TableCell>{aggregates && aggregates.CustomerName}</TableCell>
                        <TableCell />
                        <TableCell />
                        <TableCell />
                    </TableRow>
            }
        />
    </DataGridProvider>
    );
  }
}

export default withRemoteDataSource(
  SampleFeatures,
  columns,
  'https://tubular.azurewebsites.net/api/orders/paged'
);`;

export const gridList = `import React from 'react';
import ReactDOM from 'react-dom';
import { Card, CardActions, CardContent } from '@material-ui/core';
import { GridList, GridListTile, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow
} from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import format from 'date-fns/format';
import import {
  DataSourceContext,
  DataGridProvider,
  ToolbarOptions,
  Paginator,
  SearchTextInput,
  withRemoteDataSource,
} from 'tubular-react';
import {
  AggregateFunctions,
  ColumnDataType,
  ColumnModel,
  ColumnSortDirection
} from 'tubular-common';

const columns = [
  new ColumnModel('OrderID', {
    DataType: ColumnDataType.NUMERIC,
    Filterable: true,
    IsKey: true,
    Label: 'ID',
    SortDirection: ColumnSortDirection.ASCENDING,
    SortOrder: 1,
    Sortable: true
  }),
  new ColumnModel('CustomerName', {
    Aggregate: AggregateFunctions.COUNT,
    Filterable: true,
    Searchable: true,
    Sortable: true
  }),
  new ColumnModel('ShippedDate', {
    DataType: ColumnDataType.DATE_TIME,
    Filterable: true,
    Sortable: true
  }),
  new ColumnModel('ShipperCity'),
  new ColumnModel('Amount', {
    DataType: ColumnDataType.NUMERIC,
    Sortable: true
  }),
  new ColumnModel('IsShipped', {
    DataType: ColumnDataType.BOOLEAN,
    Filterable: true,
    Sortable: true
  })
];

const styles: any = {
  progress: {
    height: '20px'
  },
  search: {
    margin: '15px 10px 10px 10px',
    textAlign: 'right'
  }
};

class SampleGridList extends React.Component<IDataGridProps, IDataGridState> {
  state = { errorMessage: null };


  static getDerivedStateFromProps(
    props: IDataGridProps,
    state: IDataGridState
  ) {
    if (props.error !== state.errorMessage) {
      return { errorMessage: props.error };
    }
    return null;
  }

  render() {
    return (
      <DataSourceContext.Consumer>
        {({ state }) => (
          <DataGridProvider gridName='SampleGridList' toolbarOptions={new ToolbarOptions()}>
            <Paper>
              <div style={styles.search}>
                <SearchTextInput />
              </div>
              <div style={styles.progress}>
                {state.isLoading && <LinearProgress />}
              </div>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <GridList cellHeight={180} cols={5}>
                        {state.data.map((item) => (
                          <GridListTile key={item.OrderID}>
                            <Card>
                              <CardContent>
                                <Typography
                                  gutterBottom={true}
                                  variant='h5'
                                  component='h2'
                                >
                                  {item.OrderID} - {item.CustomerName}
                                </Typography>
                                <Typography component='p'>
                                  {item.ShipperCity}
                                </Typography>
                                <Typography component='p'>
                                  {format(item.ShippedDate, 'MMM D YYYY')}
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Button size='small' color='primary'>
                                  Learn More
                              </Button>
                              </CardActions>
                            </Card>
                          </GridListTile>
                        ))}
                      </GridList>
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <Paginator />
                  </TableRow>
                </TableFooter>
              </Table>
            </Paper>
          </DataGridProvider>
        )}
      </DataSourceContext.Consumer>
    );
  }
}

export default withRemoteDataSource(
  SampleGridList,
  columns,
  'https://tubular.azurewebsites.net/api/orders/paged'
);`;

export const gridDialog = `import * as React from 'react';

import {
    DataGridWithRemoteDataSource,
    withRemoteDataSource } from 'tubular-react';

import { AggregateFunctions, ColumnDataType, ColumnModel, ColumnSortDirection } from 'tubular-common';

const columns = [
    new ColumnModel('OrderID',
        {
            DataType: ColumnDataType.NUMERIC,
            Filterable: true,
            IsKey: true,
            Label: 'ID',
            SortDirection: ColumnSortDirection.ASCENDING,
            SortOrder: 1,
            Sortable: true
        }
    ),
    new ColumnModel('CustomerName',
        {
            Aggregate: AggregateFunctions.COUNT,
            Filterable: true,
            Searchable: true,
            Sortable: true
        }
    ),
    new ColumnModel('ShippedDate',
        {
            DataType: ColumnDataType.DATE_TIME,
            Filterable: true,
            Sortable: true
        }
    ),
    new ColumnModel('ShipperCity'),
    new ColumnModel('Amount',
        {
            DataType: ColumnDataType.NUMERIC,
            Sortable: true
        }
    ),
    new ColumnModel('IsShipped',
        {
            DataType: ColumnDataType.BOOLEAN,
            Filterable: true,
            Sortable: true
        }
    )
];

//The Dialog
const RowDialog = ({ onClose, open, row }) => (
  <React.Fragment>
      <Dialog open={open} onClose={onClose}>
          {row ?
              <React.Fragment>
                  <DialogTitle>Customer: {row.CustomerName}</DialogTitle>
                  <DialogContent>This package comes from: {row.ShipperCity}</DialogContent>
              </React.Fragment>
              :
              <React.Fragment>
                  <DialogTitle>Add Entry</DialogTitle>
                  <DialogContent>Here you can add an entry!</DialogContent>
              </React.Fragment>
          }
      </Dialog>
  </React.Fragment>
);

const GridDialog = () => {
  const Grid = withRemoteDataSource(
      (prop: any) => (
          <DataGridWithRemoteDataSource
              openModalOnClick={true}
              addIcon={true}
              refresh={prop.refresh}
          >
              <RowDialog />
          </DataGridWithRemoteDataSource>
      ),
      columns,
      'https://tubular.azurewebsites.net/api/orders/paged');

  return (
    <Grid />
  );
};

export default GridDialog`;
