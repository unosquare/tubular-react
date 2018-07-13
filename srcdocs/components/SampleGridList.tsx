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
import columns from '../../sample/src/local/LocalColumnsFormat';
import {
    DataSourceContext,
    Paginator,
    TextSearchInput,
    withRemoteDataSource
} from '../../src';

const styles: any = {
    progress: {
        height: '20px'
    },
    search: {
        margin: '15px 10px 10px 10px',
        textAlign: 'right'
    }
};

class SampleGridList extends React.Component<any, any> {
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

export default withRemoteDataSource(SampleGridList, columns, 'https://tubular.azurewebsites.net/api/orders/paged');
