import { AggregateFunctions, ColumnDataType, ColumnModel, ColumnSortDirection } from '../../src';
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
        Aggregate: AggregateFunctions.NONE,
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
  10, 0, '');

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
      Aggregate: AggregateFunctions.NONE,
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
      Aggregate: AggregateFunctions.NONE,
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
10, 1, '');

const pageSize20Request = new GridRequest(
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
        Aggregate: AggregateFunctions.NONE,
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
  20, 0, '');

const desendingOrderIdRequest = new GridRequest(
    [
      new ColumnModel('OrderID',
        {
          DataType: ColumnDataType.NUMERIC,
          IsKey: true,
          Label: 'Order ID',
          SortDirection: ColumnSortDirection.ASCENDING,
          SortOrder: -1,
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
  10, 0, '');

export { desendingOrderIdRequest, microsoftSearchRequest, page2Request, pageSize20Request, simpleRequest };
