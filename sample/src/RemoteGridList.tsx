import {
    LinearProgress,
    Paper
} from '@material-ui/core';
import { Card, CardActions, CardContent } from '@material-ui/core';
import { GridList, GridListTile, Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Table, TableBody, TableCell, TableFooter, TableRow } from '@material-ui/core';
import { format } from 'date-fns';
import * as React from 'react';
import {
    DataSourceContext,
    Paginator,
    TextSearchInput,
    withRemoteDataSource,
    IDataGridProps, 
    IDataGridState
} from '../../src';
import CustomHttpClient from './CustomHttpClient';
import columns from './data/columns';


const styles: any = {
    progress: {
        height: '20px'
    },
    search: {
        margin: '15px 10px 10px 10px',
        textAlign: 'right'
    }
};

class RemoteGridList extends React.Component<IDataGridProps, IDataGridState> {
    public state = {
        errorMessage: null as any
    };

    public componentWillReceiveProps(nextProps: IDataGridProps) {
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
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <GridList cellHeight={180} cols={5}>
                                            {state.data.map((dato) => (
                                                <GridListTile key={dato.OrderID}>
                                                    <Card>
                                                        <CardContent>
                                                            <Typography
                                                                gutterBottom={true}
                                                                variant='headline'
                                                                component='h2'
                                                            >
                                                                {dato.OrderID} - {dato.CustomerName}
                                                            </Typography>
                                                            <Typography component='p'>
                                                                {dato.ShipperCity}
                                                            </Typography>
                                                            <Typography component='p'>
                                                                {format(dato.ShippedDate, 'MMM D YYYY')}
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
                                    <Paginator advancePagination={false} />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </Paper>}
            </DataSourceContext.Consumer>
        );
    }
}

const httpClient = new CustomHttpClient('https://tubular.azurewebsites.net/api/orders/paged');
export default withRemoteDataSource(RemoteGridList, columns, httpClient);
