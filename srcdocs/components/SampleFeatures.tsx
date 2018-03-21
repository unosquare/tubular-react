import * as React from 'react';
import DataGrid, {
    AggregateFunctions,
    ColumnDataType,
    ColumnModel,
    ColumnSortDirection,
    RemoteDataSource
} from '../../src/';

const columns = [
    new ColumnModel( 'OrderID',
      { DataType: ColumnDataType.NUMERIC,
        Filtering: true,
        IsKey: true,
        Label: 'ID',
        SortDirection: ColumnSortDirection.ASCENDING,
        SortOrder: 1,
        Sortable: true }
    ),
    new ColumnModel( 'CustomerName',
      { Aggregate: AggregateFunctions.COUNT,
        Filtering: true,
        Searchable: true,
        Sortable: true }
    ),
    new ColumnModel( 'ShippedDate',
      { DataType: ColumnDataType.DATE_TIME,
        Filtering: true,
        Sortable: true }
    ),
    new ColumnModel( 'ShipperCity' ),
    new ColumnModel( 'Amount',
      { DataType: ColumnDataType.NUMERIC,
        Sortable: true }
    ),
    new ColumnModel( 'IsShipped',
      { DataType: ColumnDataType.BOOLEAN,
        Filtering: true,
        Sortable: true }
    )
  ];

class SamplePagination extends React.Component {
    public state = {
        dataSource: new RemoteDataSource('https://tubular.azurewebsites.net/api/orders/paged', columns),
    };
    public render() {
        const { dataSource } = this.state;
        return (
            <DataGrid
                dataSource={dataSource}
                rowsPerPage={10}
                showBottomPager={true}
                showTopPager={true}
                gridName='table'
            />
        );
    }
}

export default SamplePagination;
