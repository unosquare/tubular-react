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
        IsKey: true,
        Label: 'ID', }
    ),
    new ColumnModel( 'CustomerName',
      { Aggregate: AggregateFunctions.COUNT }
    ),
    new ColumnModel( 'ShippedDate',
      { DataType: ColumnDataType.DATE_TIME }
    ),
    new ColumnModel( 'ShipperCity' ),
    new ColumnModel( 'Amount',
      { DataType: ColumnDataType.NUMERIC }
    ),
    new ColumnModel( 'IsShipped',
      { DataType: ColumnDataType.BOOLEAN }
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
                bottomPager={true}
                searchText={false}
                topPager={true}
                gridName='Tubular-React'
            />
        );
    }
}

export default SamplePagination;
