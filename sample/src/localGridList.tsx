import {
    GridList, GridListTile,
    Typography, Button,
    TableCell,
    TableBody
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import InfoIcon from '@material-ui/icons/Info';
import * as React from 'react';
import {
    AggregateFunctions,
    ColumnDataType,
    ColumnModel,
    ColumnSortDirection,
    DataSourceContext,
    Paginator
} from '../../src';
import withRemoteDataSource from '../../src/DataGrid/DataSource/RemoteDataSource';
import { Table, TableHead, TableRow } from '@material-ui/core';

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

class LocalGridList extends React.Component<any, any> {
    public state = {
        errorMessage: null as any
    };

    public componentWillReceiveProps(nextProps: any) {
        this.setState({ errorMessage: nextProps.error });
    }

    public render() {
        return (
            <DataSourceContext.Consumer>
                {({ dataSource }) =>
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
                                        {dataSource.data.map((dato) => (
                                            <GridListTile key={dato.OrderID}>
                                                <Card>
                                                    <CardContent>
                                                        <Typography gutterBottom variant="headline" component="h2">
                                                            {dato.CustomerName}
                                                        </Typography>
                                                        <Typography component="p">
                                                            {dato.ShippedDate}
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
                    </Table>
                }
            </DataSourceContext.Consumer>
        );
    }
}

export default withRemoteDataSource(LocalGridList, columns, 'http://tubular.azurewebsites.net/api/orders/paged');
