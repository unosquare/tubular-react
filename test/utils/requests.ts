import { AggregateFunctions, ColumnDataType, ColumnSortDirection, } from '../../src/DataGrid/';
import ColumnModel from '../../src/DataGrid/ColumnModel';
import GridRequest from '../../src/DataGrid/GridRequest';

const simpleRequest = new GridRequest({
    Columns: [
        new ColumnModel( 'OrderID',
          { DataType: ColumnDataType.NUMERIC,
            IsKey: true,
            Label: 'Order ID',
            SortDirection: ColumnSortDirection.ASCENDING,
            SortOrder: 1,
            Sortable: true }
        ),
        new ColumnModel( 'CustomerName',
          { Aggregate: AggregateFunctions.COUNT,
            Searchable: true,
            Sortable: false }
        ),
        new ColumnModel( 'ShippedDate',
          { DataType: ColumnDataType.DATE_TIME,
            Filtering: true,
            Sortable: false }
        ),
        new ColumnModel( 'ShipperCity' ),
        new ColumnModel( 'Amount',
          { DataType: ColumnDataType.NUMERIC,
            Sortable: false }
        )
      ],
    Count: 0,
    Search: { Text: '', Operator: 'Auto' },
    Skip: 0,
    Take: 10,
    TimezoneOffset: 360
  });

const page2Request = new GridRequest({
  Columns: [
      new ColumnModel( 'OrderID',
        { DataType: ColumnDataType.NUMERIC,
          IsKey: true,
          Label: 'Order ID',
          SortDirection: ColumnSortDirection.ASCENDING,
          SortOrder: 1,
          Sortable: true }
      ),
      new ColumnModel( 'CustomerName',
        { Aggregate: AggregateFunctions.COUNT,
          Searchable: true,
          Sortable: false }
      ),
      new ColumnModel( 'ShippedDate',
        { DataType: ColumnDataType.DATE_TIME,
          Filtering: true,
          Sortable: false }
      ),
      new ColumnModel( 'ShipperCity' ),
      new ColumnModel( 'Amount',
        { DataType: ColumnDataType.NUMERIC,
          Sortable: false }
      )
    ],
  Count: 1,
  Search: { Text: '', Operator: 'Auto' },
  Skip: 10,
  Take: 10,
  TimezoneOffset: 360
});

export { page2Request, simpleRequest };