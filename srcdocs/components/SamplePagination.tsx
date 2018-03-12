import * as React from 'react';
import DataGrid, {
    AggregateFunctions,
    ColumnDataType,
    ColumnModel,
    ColumnSortDirection,
    RemoteDataSource
} from '../../src/';

const columns = [
    new ColumnModel('OrderID',
        {
            DataType: ColumnDataType.NUMERIC,
            IsKey: true,
            Label: 'ID',
            SortDirection: ColumnSortDirection.ASCENDING,
            SortOrder: 1
        }
    ),
    new ColumnModel('CustomerName',
        { Aggregate: AggregateFunctions.COUNT }
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
