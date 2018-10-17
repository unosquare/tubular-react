export const quickStart =
`import React from 'react';
import ReactDOM from 'react-dom';

import DataGrid, { withRemoteDataSource } from 'tubular-react';
import { ColumnModel } from 'tubular-common';

const columns = [
    new ColumnModel('OrderID'),
    new ColumnModel('CustomerName'),
    new ColumnModel('ShipperCity')
];

const SampleGrid = withRemoteDataSource(
    () => {
        return <DataGrid />;
    },
    columns,
    'https://tubular.azurewebsites.net/api/orders/paged'
);

ReactDOM.render(<SampleGrid />, document.getElementById('root'));`;