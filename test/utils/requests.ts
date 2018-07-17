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
          SortDirection: ColumnSortDirection.DESCENDING,
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

const aggregateCountRequest = new GridRequest(
    [
      new ColumnModel('OrderID',
        {
          DataType: ColumnDataType.NUMERIC,
          IsKey: true,
          Label: 'Order ID',
          SortDirection: ColumnSortDirection.DESCENDING,
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
  10, 0, '');

const aggregateSumRequest = new GridRequest(
    [
      new ColumnModel('OrderID',
        {
          DataType: ColumnDataType.NUMERIC,
          IsKey: true,
          Label: 'Order ID',
          SortDirection: ColumnSortDirection.DESCENDING,
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
          Aggregate: AggregateFunctions.SUM,
          DataType: ColumnDataType.NUMERIC,
          Sortable: false
        }
      )
    ],
  10, 0, '');

const aggregateAverageRequest = new GridRequest(
    [
      new ColumnModel('OrderID',
        {
          DataType: ColumnDataType.NUMERIC,
          IsKey: true,
          Label: 'Order ID',
          SortDirection: ColumnSortDirection.DESCENDING,
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
          Aggregate: AggregateFunctions.AVERAGE,
          DataType: ColumnDataType.NUMERIC,
          Sortable: false
        }
      )
    ],
  10, 0, '');

const aggregateDistinctCountRequest = new GridRequest(
    [
      new ColumnModel('OrderID',
        {
          DataType: ColumnDataType.NUMERIC,
          IsKey: true,
          Label: 'Order ID',
          SortDirection: ColumnSortDirection.DESCENDING,
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
          Aggregate: AggregateFunctions.DISTINCT_COUNT,
          DataType: ColumnDataType.NUMERIC,
          Sortable: false
        }
      )
    ],
  10, 0, '');

const aggregateMaxRequest = new GridRequest(
    [
      new ColumnModel('OrderID',
        {
          DataType: ColumnDataType.NUMERIC,
          IsKey: true,
          Label: 'Order ID',
          SortDirection: ColumnSortDirection.DESCENDING,
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
          Aggregate: AggregateFunctions.MAX,
          DataType: ColumnDataType.NUMERIC,
          Sortable: false
        }
      )
    ],
  10, 0, '');

const aggregateMinRequest = new GridRequest(
    [
      new ColumnModel('OrderID',
        {
          DataType: ColumnDataType.NUMERIC,
          IsKey: true,
          Label: 'Order ID',
          SortDirection: ColumnSortDirection.DESCENDING,
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
          Aggregate: AggregateFunctions.MIN,
          DataType: ColumnDataType.NUMERIC,
          Sortable: false
        }
      )
    ],
  10, 0, '');

const pageMinus1Request = new GridRequest(
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
    -1, 0, '');

export { aggregateAverageRequest, aggregateCountRequest, aggregateDistinctCountRequest, aggregateMaxRequest,
  aggregateMinRequest, aggregateSumRequest,
  desendingOrderIdRequest, microsoftSearchRequest, pageMinus1Request, page2Request, pageSize20Request, simpleRequest };
