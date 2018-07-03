import {
    GridList, GridListTile,
    GridListTileBar, IconButton,
    ListSubheader
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
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
        const toolbarOptions = new ToolbarOptions();
        return (
            <DataSourceContext.Consumer>
                {({ dataSource }) =>
                    <GridList cellHeight={180}>
                        <GridListTile key='Subheader' cols={2} style={{ height: 'auto' }}>
                            <ListSubheader component='table' >
                            <div >
                                <Paginator rowsPerPageOptions={toolbarOptions.rowsPerPageOptions} />
                            </div>
                            </ListSubheader>
                        </GridListTile>
                        {dataSource.data.map((dato) => (
                            <GridListTile key={dato.OrderID}>
                                <h4>{dato.CustomerName}</h4>
                                <span>{dato.ShippedDate}</span>
                                <GridListTileBar
                                    title={dato.Amount}
                                    subtitle={<span>In: {dato.ShipperCity}</span>}
                                    actionIcon={
                                        <IconButton>
                                            <InfoIcon />
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        ))}
                    </GridList>}
            </DataSourceContext.Consumer>
        );
    }
}

export default withRemoteDataSource(LocalGridList, columns, 'http://tubular.azurewebsites.net/api/orders/paged');
