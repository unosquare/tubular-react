export const nullStorageGrid = `
import * as React from 'react';
import { DataGrid, NullStorage, ToolbarOptions } from 'tubular-react';
import { ColumnDataType, ColumnModel } from 'tubular-common';


const columns = [
  new ColumnModel('OrderID',
      {
          DataType: ColumnDataType.NUMERIC,
          Label: 'ID',
      }
  ),
  new ColumnModel('CustomerName'),
  new ColumnModel('ShippedDate',
      {
          DataType: ColumnDataType.DATE_TIME,
      }
  ),
  new ColumnModel('ShipperCity'),
  new ColumnModel('Amount',
      {
          DataType: ColumnDataType.NUMERIC,
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
          dataSource='https://tubular.azurewebsites.net/api/orders/paged'
          gridName='Grid'
          storage={new NullStorage()}
          toolbarOptions={new ToolbarOptions()}
      />
);`;

export const localStorageGrid = `
import * as React from 'react';
import { DataGrid, LocalStorage, ToolbarOptions } from 'tubular-react';
import { ColumnDataType, ColumnModel } from 'tubular-common';


const columns = [
  new ColumnModel('OrderID',
      {
          DataType: ColumnDataType.NUMERIC,
          Label: 'ID',
      }
  ),
  new ColumnModel('CustomerName'),
  new ColumnModel('ShippedDate',
      {
          DataType: ColumnDataType.DATE_TIME,
      }
  ),
  new ColumnModel('ShipperCity'),
  new ColumnModel('Amount',
      {
          DataType: ColumnDataType.NUMERIC,
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
          dataSource='https://tubular.azurewebsites.net/api/orders/paged'
          gridName='Grid'
          storage={new LocalStorage()}
          toolbarOptions={new ToolbarOptions()}
      />
);`;
