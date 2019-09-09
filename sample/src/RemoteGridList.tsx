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
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import * as React from 'react';
import { LocalStorage, Paginator, SearchTextInput } from '../../src';
import useDataGrid from '../../src/Hooks/useDataGrid';
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

const httpClient = new CustomHttpClient(
  'https://tubular.azurewebsites.net/api/orders/paged',
);

const RemoteGridList: React.FunctionComponent = () => {
  const [getErrorMessage, setErrorMessage] = React.useState(null as string);
  const grid = useDataGrid(columns, { storage: new LocalStorage(), gridName: 'RemoteGridList' }, httpClient);

  return (
    <Paper>
      <div style={styles.search}>
        <SearchTextInput searchText={grid.state.searchText} updateSearchText={grid.api.updateSearchText} />
      </div>
      <div style={styles.progress}>
        {grid.state.isLoading && <LinearProgress />}
      </div>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <GridList cellHeight={180} cols={5}>
                {grid.state.data && grid.state.data.map((row) => (
                  <GridListTile key={row.OrderID}>
                    <Card>
                      <CardContent>
                        <Typography
                          gutterBottom={true}
                          variant='h5'
                          component='h2'
                        >
                          {row.OrderID} - {row.CustomerName}
                        </Typography>
                        <Typography component='p'>
                          {row.ShipperCity}
                        </Typography>
                        <Typography component='p'>
                          {format(parseISO(row.ShippedDate), 'M/d/yyyy h:mm a')}
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
            <Paginator grid={grid} />
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>
  );
};

export default RemoteGridList;
