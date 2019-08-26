export const sortingGrid = `
import * as React from 'react';
import { DataGrid } from 'tubular-react';
import { ColumnDataType, ColumnModel } from 'tubular-common';


const columns = [
  new ColumnModel('OrderID',
      {
          DataType: ColumnDataType.NUMERIC,
          Label: 'ID',
          Sortable: true,
      }
  ),
  new ColumnModel('CustomerName',
    {
        Sortable:true,
    }
  ),
  new ColumnModel('ShippedDate',
      {
          DataType: ColumnDataType.DATE_TIME,
          Sortable: true,
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
      }
  )
];


export default () => (
      <DataGrid
          columns={columns}
          dataSource={'https://tubular.azurewebsites.net/api/orders/paged'}
          gridName='Grid'
      />
);`;
