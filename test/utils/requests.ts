import { AggregateFunctions, ColumnDataType, ColumnSortDirection,ColumnModel } from '../../src';
import GridRequest from '../../src/Models/GridRequest';

const simpleRequest = new GridRequest(
  [
    new ColumnModel('OrderID',
      {
        DataType: ColumnDataType.NUMERIC,
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
        Searchable: true,
        Sortable: false
      }
    ),
    new ColumnModel('ShippedDate',
      {
        DataType: ColumnDataType.DATE_TIME,
        Filtering: true,
        Sortable: false
      }
    ),
    new ColumnModel('ShipperCity'),
    new ColumnModel('Amount',
      {
        DataType: ColumnDataType.NUMERIC,
        Sortable: false
      }
    )
  ],
  0, 10);

const microsoftSearchRequest = new GridRequest([
  new ColumnModel('OrderID',
    {
      DataType: ColumnDataType.NUMERIC,
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
      Searchable: true,
      Sortable: false
    }
  ),
  new ColumnModel('ShippedDate',
    {
      DataType: ColumnDataType.DATE_TIME,
      Filtering: true,
      Sortable: false
    }
  ),
  new ColumnModel('ShipperCity'),
  new ColumnModel('Amount',
    {
      DataType: ColumnDataType.NUMERIC,
      Sortable: false
    }
  )
],
  10, 0, 'Microsoft');

const page2Request = new GridRequest([
  new ColumnModel('OrderID',
    {
      DataType: ColumnDataType.NUMERIC,
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
      Searchable: true,
      Sortable: false
    }
  ),
  new ColumnModel('ShippedDate',
    {
      DataType: ColumnDataType.DATE_TIME,
      Filtering: true,
      Sortable: false
    }
  ),
  new ColumnModel('ShipperCity'),
  new ColumnModel('Amount',
    {
      DataType: ColumnDataType.NUMERIC,
      Sortable: false
    }
  )
], 10, 1);

export { microsoftSearchRequest, page2Request, simpleRequest };
