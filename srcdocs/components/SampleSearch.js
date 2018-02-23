import DataGrid, {
    AggregateFunctions,
    ColumnDataType,
    ColumnModel,
    ColumnSortDirection,
    RemoteDataSource
} from 'tubular-react';
import React from 'react';

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
        {
            Aggregate: AggregateFunctions.COUNT,
            Searchable: true
        }
    )
];

class SamplePagination extends React.Component {
    state = {
        dataSource: new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', columns),
    };
    render() {
        const { dataSource } = this.state;
        return (
            <DataGrid
                dataSource={dataSource}
                rowsPerPage={10}
                gridName='table' 
            />
        )
    }
}

export default SamplePagination;