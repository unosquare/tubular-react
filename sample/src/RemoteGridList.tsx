import {
    LinearProgress,
    Paper, Toolbar
} from '@material-ui/core';
import { Card, CardActions, CardContent } from '@material-ui/core';
import { GridList, GridListTile, Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from '@material-ui/core';
import * as React from 'react';
import {
    AggregateFunctions,
    ColumnDataType,
    ColumnModel,
    ColumnSortDirection,
    DataSourceContext,
    Paginator,
    TextSearchInput,
    withRemoteDataSource
} from '../../src';

const styles: any  = {
    progress: {
        height: '20px'
    },
    search: {
        margin: '15px 10px 10px 10px',
        textAlign: 'right'
    }
};

const columns = [
    new ColumnModel('OrderID',
        {
            DataType: ColumnDataType.NUMERIC,
            Filtering: true,
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
            Filtering: true,
            Searchable: true,
            Sortable: true
        }
    ),
    new ColumnModel('ShippedDate',
        {
            DataType: ColumnDataType.DATE_TIME,
            Filtering: true,
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
            Filtering: true,
            Sortable: true
        }
    )
];
class RemoteGridList extends React.Component<any, any> {
    public state = {
        errorMessage: null as any
    };

    public componentWillReceiveProps(nextProps: any) {
        this.setState({ errorMessage: nextProps.error });
    }

    public render() {
        return (
            <DataSourceContext.Consumer>
                {({ state }) =>
                    <Paper >
                        <div style={styles.search}>
                        <TextSearchInput />
                        </div>
                        <div style={styles.progress} >{state.isLoading && <LinearProgress />}</div>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <Paginator />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <GridList cellHeight={180} cols={4}>
                                            {state.data.map((dato) => (
                                                <GridListTile key={dato.OrderID}>
                                                    <Card>
                                                        <CardContent>
                                                            <Typography
                                                                gutterBottom={true}
                                                                variant='headline'
                                                                component='h2'
                                                            >
                                                                {dato.CustomerName}
                                                            </Typography>
                                                            <Typography component='p'>
                                                                {dato.ShippedDate}
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
                    </Paper>}
            </DataSourceContext.Consumer>
        );
    }
}

export default withRemoteDataSource(RemoteGridList, columns, 'http://tubular.azurewebsites.net/api/orders/paged');
