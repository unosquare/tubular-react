export const exportButtonGrid = `
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
      bottomPager: false,
      exportButton: true,
      printButton: false,
      searchText: false,
      topPager: false,
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

export const printButtonGrid = `
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
      bottomPager: false,
      exportButton: false,
      printButton: true,
      searchText: false,
      topPager: false,
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

export const searchTextGrid = `
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
    {
        Searchable: true //This boolean defines which columns is the input going to filter.
    }
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
      bottomPager: false,
      exportButton: false,
      printButton: false,
      searchText: true,
      topPager: false,
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
