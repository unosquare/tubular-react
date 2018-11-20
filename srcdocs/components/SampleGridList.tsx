import { LinearProgress, Paper } from '@material-ui/core';
import { Card, CardActions, CardContent } from '@material-ui/core';
import { GridList, GridListTile, Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow
} from '@material-ui/core';
import { format } from 'date-fns';
import * as React from 'react';

import columns from '../utils/columns';

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

  public static getDerivedStateFromProps(props, state) {
    if (props.error !== state.errorMessage) {
      return {
        errorMessage: props.error
      };
    }

    return null;
  }
  public state = {
    errorMessage: null as any
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
  'https://tubular.azurewebsites.net/api/orders/paged'
);
