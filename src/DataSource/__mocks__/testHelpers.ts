import { AggregateFunctions, ColumnDataType, ColumnModel, ColumnSortDirection } from '../../Models';

const context = {
    actions: {
        exportTo: jest.fn(),
        setActiveColumn: jest.fn().mockReturnValue('CustomerName'),
        sortColumn: jest.fn().mockReturnValue('OrderID'),
        updatePage: jest.fn(),
        updateSearchText: jest.fn().mockReturnValue('search')
    },
    state: {
        aggregate: null,
        columns: [
            new ColumnModel('OrderID',
                {
                    DataType: ColumnDataType.NUMERIC,
                    Filtering: true,
                    IsKey: true,
                    Label: 'Order ID',
                    SortDirection: ColumnSortDirection.ASCENDING,
                    SortOrder: 1,
                    Sortable: true
                }
            ),
            new ColumnModel('CustomerName',
                {
                    Aggregate: AggregateFunctions.COUNT,
                    Filtering: true,
                    Searchable: true
                }
            ),
            new ColumnModel('ShippedDate',
                {
                    DataType: ColumnDataType.DATE_TIME,
                    Filtering: true
                }
            ),
            new ColumnModel('ShipperCity'),
            new ColumnModel('Amount',
                { DataType: ColumnDataType.NUMERIC }
            )
        ],
        data: [
            [1, 'Microsoft', '2016-03-19T19:00:00', 'Guadalajara, JAL, Mexico', 300],
            [2, 'Microsoft', '2016-04-23T10:00:00', 'Guadalajara, JAL, Mexico', 0],
            [3, 'Microsoft', '2016-12-22T08:00:00', 'Guadalajara, JAL, Mexico', 300],
            [4, 'Unosquare LLC', '2016-02-01T18:00:00', 'Los Angeles, CA, USA', 0],
            [5, 'Microsoft', '2016-11-10T18:00:00', 'Guadalajara, JAL, Mexico', 92],
            [6, 'Unosquare LLC', '2016-11-06T18:00:00', 'Los Angeles, CA, USA', 18],
            [7, 'Unosquare LLC', '2016-11-11T18:00:00', 'Leon, GTO, Mexico', 50],
            [8, 'Unosquare LLC', '2016-11-08T18:00:00', 'Portland, OR, USA', 9],
            [9, 'Vesta', '2016-11-07T18:00:00', 'Guadalajara, JAL, Mexico', 108],
            [10, 'Unosquare LLC', '2016-11-05T18:00:00', 'Portland, OR, USA', 15]
        ],
        filteredRecordCount: 10,
        isLoading: false,
        itemsPerPage: 10,
        page: 0,
        searchText: ''    }
};

export default context;
