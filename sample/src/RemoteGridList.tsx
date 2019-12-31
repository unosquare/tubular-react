import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { formatDate, LocalStorage } from 'tubular-common';
import { Paginator, SearchTextInput } from '../../src';
import CustomHttpClient from './CustomHttpClient';
import columns from './data/columns';
import { useTbTable } from 'tubular-react-common';

const styles: any = {
    progress: {
        height: '20px',
    },
    search: {
        margin: '15px 10px 10px 10px',
        textAlign: 'right',
    },
};

const RemoteGridList: React.FunctionComponent = () => {
    const [getErrorMessage, setErrorMessage] = React.useState(null as string);

    const tbTableInstance = useTbTable(columns, 'https://tubular.azurewebsites.net/api/orders/paged', {
        storage: new LocalStorage(),
        componentName: 'RemoteGridList',
    });

    console.log(tbTableInstance);
    return (
        <Paper>
            <div style={styles.search}>
                <SearchTextInput
                    searchText={tbTableInstance.state.searchText}
                    updateSearchText={tbTableInstance.api.updateSearchText}
                />
            </div>
            <div style={styles.progress}>{tbTableInstance.state.isLoading && <LinearProgress />}</div>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <GridList cellHeight={180} cols={5}>
                                {tbTableInstance.state.data &&
                                    tbTableInstance.state.data.map(row => (
                                        <GridListTile key={row.OrderID}>
                                            <Card>
                                                <CardContent>
                                                    <Typography gutterBottom={true} variant="h5" component="h2">
                                                        {row.OrderID} - {row.CustomerName}
                                                    </Typography>
                                                    <Typography component="p">{row.ShipperCity}</Typography>
                                                    <Typography component="p">
                                                        {formatDate(row.ShippedDate, 'M/d/yyyy h:mm a')}
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
                        <Paginator tbTableInstance={tbTableInstance} />
                    </TableRow>
                </TableFooter>
            </Table>
        </Paper>
    );
};

export default RemoteGridList;
