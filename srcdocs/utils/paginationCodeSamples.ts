export const advancedPaginationGrid = `
import * as React from 'react';
import { DataGrid } from 'tubular-react';
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

export default () => {
  const toolbarOptions = new ToolbarOptions({
      advancePagination: true,
      bottomPager: false,
      exportButton: false,
      printButton: false,
      searchText: false,
      topPager: true,
  });

  return (
      <DataGrid
          columns={columns}
          dataSource={'https://tubular.azurewebsites.net/api/orders/paged'}
          gridName='Grid'
          toolbarOptions={toolbarOptions}
      />
  );
};`;

export const basicPaginationGrid = `
import * as React from 'react';
import { DataGrid } from 'tubular-react';
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

export default () => {
  const toolbarOptions = new ToolbarOptions({
      advancePagination: false,
      bottomPager: true,
      exportButton: false,
      printButton: false,
      searchText: false,
      topPager: true,
  });

  return (
      <DataGrid
          columns={columns}
          dataSource={'https://tubular.azurewebsites.net/api/orders/paged'}
          gridName='Grid'
          toolbarOptions={toolbarOptions}
      />
  );
};`;
