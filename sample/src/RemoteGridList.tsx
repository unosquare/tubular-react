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
import { format } from 'date-fns';
import * as React from 'react';
import {
  DataSourceContext,
  IDataGridProps,
  IDataGridState,
  Paginator,
  TextSearchInput,
  withRemoteDataSource,
} from '../../src';
import CustomHttpClient from './CustomHttpClient';
import columns from './data/columns';

const styles: any = {
  progress: {
    height: '20px',
  },
  search: {
    margin: '15px 10px 10px 10px',
    textAlign: 'right',
  },
};

class RemoteGridList extends React.Component<IDataGridProps, IDataGridState> {

  public static getDerivedStateFromProps(
    props: IDataGridProps,
    state: IDataGridState,
  ) {
    if (props.error !== state.errorMessage) {
      return { errorMessage: props.error };
    }
    return null;
  }
  public state = {
    errorMessage: null as any,
  };

  public render() {
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
                      {state.data.map((dato) => (
                        <GridListTile key={dato.OrderID}>
                          <Card>
                            <CardContent>
                              <Typography
                                gutterBottom={true}
                                variant='h5'
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
          </Paper>
        )}
      </DataSourceContext.Consumer>
    );
  }
}

const httpClient = new CustomHttpClient(
  'https://tubular.azurewebsites.net/api/orders/paged',
);
export default withRemoteDataSource(RemoteGridList, columns, httpClient);
