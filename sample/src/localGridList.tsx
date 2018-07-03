import {
    createStyles, LinearProgress,
    Paper, Theme, Toolbar, WithStyles
} from '@material-ui/core';
import { Card, CardActions, CardContent } from '@material-ui/core';
import { GridList, GridListTile, Typography } from '@material-ui/core';
import { Button, FormControl, IconButton, Input, InputAdornment } from '@material-ui/core';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from '@material-ui/core';
import { Close, Search } from '@material-ui/icons';
import * as React from 'react';
import {
    AggregateFunctions,
    ColumnDataType,
    ColumnModel,
    ColumnSortDirection,
    DataSourceContext,
    Paginator,
    ToolbarOptions
} from '../../src';
import withRemoteDataSource from '../../src/DataGrid/DataSource/RemoteDataSource';

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
const styles = (theme: Theme) => createStyles(
    {
        progress: {
            height: theme.spacing.unit * 2
        },
        root: {
            marginTop: theme.spacing.unit * 3,
            overflowX: 'auto',
            width: '100%'
        }
    });
interface IProps extends WithStyles<typeof styles> {
    gridName?: string;
    toolbarOptions?: ToolbarOptions;
    bodyRenderer?(column: any, index: number): any;
    footerRenderer?(aggregate: any): any;
}
class LocalGridList extends React.Component<IProps, any> {
    public state = {
        errorMessage: null as any
    };

    public componentWillReceiveProps(nextProps: any) {
        this.setState({ errorMessage: nextProps.error });
    }

    public render() {
        const { classes, toolbarOptions } = this.props;
        return (
            <DataSourceContext.Consumer>
                {({ dataSource, actions }) =>
                    <Paper >
                        <Toolbar>
                            <FormControl >
                                <Input
                                    fullWidth={true}
                                    type='text'
                                    value={dataSource.searchText}
                                    onChange={(e: any) => actions.updateSearchText(e.target.value)}
                                    startAdornment={
                                        <InputAdornment position='end'>
                                            <Search />
                                        </InputAdornment>
                                    }
                                    endAdornment={
                                        dataSource.searchText !== '' &&
                                        <InputAdornment position='end'>
                                            <IconButton onClick={() => actions.updateSearchText('')}>
                                                <Close />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Toolbar>
                        <div >{dataSource.isLoading && <LinearProgress />}</div>
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
                    </Paper>
                }
            </DataSourceContext.Consumer>
        );
    }
}

export default withRemoteDataSource(LocalGridList, columns, 'http://tubular.azurewebsites.net/api/orders/paged');
