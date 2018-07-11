import * as React from 'react';

import { TableCell, TableRow } from '@material-ui/core';
import { CheckBox, CheckBoxOutlineBlank } from '@material-ui/icons';
import { format } from 'date-fns';
import DataGrid, {
    AggregateFunctions, ColumnDataType, ColumnModel, ColumnSortDirection, withRemoteDataSource } from '../../src';

//  First, at all, you must define your columns model.
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
class BasicFeatures extends React.Component {
    public render() {
        return (
            <div className='root'>
                <DataGrid
                    gridName='Tubular-React'
                />
            </div>
        );
    }
}

/*
 Use the component withRemoteDataSource to wrap your component
 and columns definition among the data obtained from the URL.

 withRemoteDataSource will set an initial context for your grid.
*/
export default withRemoteDataSource(BasicFeatures, columns, 'http://tubular.azurewebsites.net/api/orders/paged');
