export const quickStart = `import React from 'react';
import ReactDOM from 'react-dom';

import DataGrid, { withRemoteDataSource } from 'tubular-react';
import { ColumnModel } from 'tubular-common';
import { IconButton, Tooltip } from '@material-ui/core';
import { Brightness7Rounded } from '@material-ui/icons';

const columns = [
    new ColumnModel('OrderID'),
    new ColumnModel('CustomerName'),
    new ColumnModel('ShipperCity')
];

const SampleGrid = withRemoteDataSource(
    () => {
        return <DataGrid />;
    },
    columns,
    'https://tubular.azurewebsites.net/api/orders/paged'
);

ReactDOM.render(<SampleGrid />, document.getElementById('root'));`;

export const basicFeatures = `import * as React from 'react';

import DataGrid, {
    withRemoteDataSource } from 'tubular-react';

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
        return (
            <div className='root'>
                <DataGrid
                    gridName='Tubular-React'
                >
                <IconButton color='default' />
                  <Brightness7Rounded
                    onClick={() => alert('Happy codes, have a nice day')}
                  />
                  </IconButton>
                </DataGrid>
            </div>
        );
};

/*
 Use the component withRemoteDataSource to wrap your component
 and columns definition among the data obtained from the URL.

 withRemoteDataSource will set an initial context for your grid.
*/
export default withRemoteDataSource(MyComponent, columns, 'http://tubular.azurewebsites.net/api/orders/paged');`;

export const simpleFeatures = `import React from "react";
import { Snackbar, TableCell, TableRow } from "@material-ui/core";
import { CheckBox, CheckBoxOutlineBlank } from "@material-ui/icons";
import { format } from "date-fns";
import DataGrid, { ToolbarOptions, withRemoteDataSource } from "tubular-react";

import {
  AggregateFunctions,
  ColumnDataType,
  ColumnModel,
  ColumnSortDirection
} from "tubular-common";

const columns = [
  new ColumnModel("OrderID", {
    DataType: ColumnDataType.NUMERIC,
    Filterable: true,
    IsKey: true,
    Label: "ID",
    SortDirection: ColumnSortDirection.ASCENDING,
    SortOrder: 1,
    Sortable: true
  }),
  new ColumnModel("CustomerName", {
    Aggregate: AggregateFunctions.COUNT,
    Filterable: true,
    Searchable: true,
    Sortable: true
  }),
  new ColumnModel("ShippedDate", {
    DataType: ColumnDataType.DATE_TIME,
    Filterable: true,
    Sortable: true
  }),
  new ColumnModel("ShipperCity"),
  new ColumnModel("Amount", {
    DataType: ColumnDataType.NUMERIC,
    Sortable: true
  }),
  new ColumnModel("IsShipped", {
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
      <div className="root">
        {errorMessage && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            style={{ paddingTop: "10px" }}
            open={true}
            ContentProps={{ "aria-describedby": "message-id" }}
            message={<span id="message-id">{errorMessage}</span>}
          />
        )}
        <DataGrid
          gridName="Tubular-React"
          bodyRenderer={(row: any, index: number, columns: ColumnModel[]) => (
            <TableRow hover={true} key={index}>
              <TableCell padding="default">{row.OrderID}</TableCell>
              <TableCell padding="default">{row.CustomerName}</TableCell>
              <TableCell padding="default">
                {format(row.ShippedDate, "MMMM Do YYYY, h:mm:ss a")}
              </TableCell>
              <TableCell padding="default">{row.ShipperCity}</TableCell>
              <TableCell padding="default" numeric={true}>
                {row.Amount || 0}
              </TableCell>
              <TableCell padding="default">
                {row.IsShipped ? <CheckBox /> : <CheckBoxOutlineBlank />}
              </TableCell>
            </TableRow>
          )}
          toolbarOptions={new ToolbarOptions()}
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
      </div>
    );
  }
}

export default withRemoteDataSource(
  SampleFeatures,
  columns,
  "https://tubular.azurewebsites.net/api/orders/paged"
);`;

export const gridList = `import React from "react";
import ReactDOM from "react-dom";
import { LinearProgress, Paper } from "@material-ui/core";
import { Card, CardActions, CardContent } from "@material-ui/core";
import { GridList, GridListTile, Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow
} from "@material-ui/core";
import { format } from "date-fns";
import {
  DataSourceContext,
  Paginator,
  TextSearchInput,
  withRemoteDataSource,
  IDataGridState,
  IDataGridProps
} from "tubular-react";
import {
  AggregateFunctions,
  ColumnDataType,
  ColumnModel,
  ColumnSortDirection
} from "tubular-common";

const columns = [
  new ColumnModel("OrderID", {
    DataType: ColumnDataType.NUMERIC,
    Filterable: true,
    IsKey: true,
    Label: "ID",
    SortDirection: ColumnSortDirection.ASCENDING,
    SortOrder: 1,
    Sortable: true
  }),
  new ColumnModel("CustomerName", {
    Aggregate: AggregateFunctions.COUNT,
    Filterable: true,
    Searchable: true,
    Sortable: true
  }),
  new ColumnModel("ShippedDate", {
    DataType: ColumnDataType.DATE_TIME,
    Filterable: true,
    Sortable: true
  }),
  new ColumnModel("ShipperCity"),
  new ColumnModel("Amount", {
    DataType: ColumnDataType.NUMERIC,
    Sortable: true
  }),
  new ColumnModel("IsShipped", {
    DataType: ColumnDataType.BOOLEAN,
    Filterable: true,
    Sortable: true
  })
];

const styles: any = {
  progress: {
    height: "20px"
  },
  search: {
    margin: "15px 10px 10px 10px",
    textAlign: "right"
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
          <Paper>
            <div style={styles.search}>
              <TextSearchInput />
            </div>
            <div style={styles.progress}>
              {state.isLoading && <LinearProgress />}
            </div>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <GridList cellHeight={180} cols={5}>
                      {state.data.map(item => (
                        <GridListTile key={item.OrderID}>
                          <Card>
                            <CardContent>
                              <Typography
                                gutterBottom={true}
                                variant="headline"
                                component="h2"
                              >
                                {item.OrderID} - {item.CustomerName}
                              </Typography>
                              <Typography component="p">
                                {item.ShipperCity}
                              </Typography>
                              <Typography component="p">
                                {format(item.ShippedDate, "MMM D YYYY")}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button size="small" color="primary">
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
                  <Paginator advancePagination={false} />
                </TableRow>
              </TableFooter>
            </Table>
          </Paper>
        )}
      </DataSourceContext.Consumer>
    );
  }
}

export default withRemoteDataSource(
  SampleGridList,
  columns,
  "https://tubular.azurewebsites.net/api/orders/paged"
);`;
