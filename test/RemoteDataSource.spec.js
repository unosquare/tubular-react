import Axios from 'axios';
import RemoteDataSource from '../src/Grid/RemoteDataSource';
import expect from 'expect.js';

describe('RemoteDateSource', () => {
  const columns = [
    {
      'Label': 'Order ID',
      'Name': 'OrderID',
      'Sortable': true,
      'SortOrder': 1,
      'SortDirection': 'Ascending',
      'IsKey': true,
      'Searchable': false,
      'Visible': true,
      'Filter': { 
        Argument: [],
        HasFilter: true,
        Name: 'OrderID',
        Operator: 'None',
        OptionsUrl: null,
        Text: null
      },
      'DataType': 'numeric',
      'Aggregate': 'None'
    },
    {
      'Label': 'Customer Name',
      'Name': 'CustomerName',
      'Sortable': true,
      'SortOrder': -1,
      'SortDirection': 'None',
      'IsKey': false,
      'Searchable': true,
      'Visible': true,
      'Filter': { 
        Argument: [],
        HasFilter: true,
        Name: 'CustomerName',
        Operator: 'None',
        OptionsUrl: null,
        Text: null
      },
      'DataType': 'string',
      'Aggregate': 'None'
    },
    {
      'Label': 'Shipped Date',
      'Name': 'ShippedDate',
      'Sortable': true,
      'SortOrder': -1,
      'SortDirection': 'None',
      'IsKey': false,
      'Searchable': false,
      'Visible': true,
      'Filter': { 
        Argument: [],
        HasFilter: true,
        Name: 'ShippedDate',
        Operator: 'None',
        OptionsUrl: null,
        Text: null
      },
      'DataType': 'datetime',
      'Aggregate': 'None'
    },
    {
      'Label': 'Shipper City',
      'Name': 'ShipperCity',
      'Sortable': true,
      'SortOrder': -1,
      'SortDirection': 'None',
      'IsKey': false,
      'Searchable': false,
      'Visible': true,
      'Filter': { 
        Argument: [],
        HasFilter: true,
        Name: 'ShipperCity',
        Operator: 'None',
        OptionsUrl: null,
        Text: null
      },
      'DataType': 'string',
      'Aggregate': 'None'
    }
  ];

  const expected = { 
    'payload': [ 
      { OrderID: 1,
        CustomerName: 'Microsoft',
        ShippedDate: '2016-03-19T19:00:00',
        ShipperCity: 'Guadalajara, JAL, Mexico' },
      { OrderID: 2,
        CustomerName: 'Microsoft',
        ShippedDate: '2016-04-23T10:00:00',
        ShipperCity: 'Guadalajara, JAL, Mexico' },
      { OrderID: 3,
        CustomerName: 'Microsoft',
        ShippedDate: '2016-12-22T08:00:00',
        ShipperCity: 'Guadalajara, JAL, Mexico' },
      { OrderID: 4,
        CustomerName: 'Unosquare LLC',
        ShippedDate: '2016-02-01T18:00:00',
        ShipperCity: 'Los Angeles, CA, USA' },
      { OrderID: 5,
        CustomerName: 'Microsoft',
        ShippedDate: '2016-11-10T18:00:00',
        ShipperCity: 'Guadalajara, JAL, Mexico' },
      { OrderID: 6,
        CustomerName: 'Unosquare LLC',
        ShippedDate: '2016-11-06T18:00:00',
        ShipperCity: 'Los Angeles, CA, USA' },
      { OrderID: 7,
        CustomerName: 'Unosquare LLC',
        ShippedDate: '2016-11-11T18:00:00',
        ShipperCity: 'Leon, GTO, Mexico' },
      { OrderID: 8,
        CustomerName: 'Unosquare LLC',
        ShippedDate: '2016-11-08T18:00:00',
        ShipperCity: 'Portland, OR, USA' },
      { OrderID: 9,
        CustomerName: 'Vesta',
        ShippedDate: '2016-11-07T18:00:00',
        ShipperCity: 'Guadalajara, JAL, Mexico' },
      { OrderID: 10,
        CustomerName: 'Unosquare LLC',
        ShippedDate: '2016-11-05T18:00:00',
        ShipperCity: 'Portland, OR, USA' } 
    ]
  };

  let expectedResponse;
  let dataSource;

  describe('When columns structure is valid', () => {
    beforeEach(() => {
      expectedResponse = expected;
      dataSource = 
        new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', columns);
    });

    it('should return 10 records', () => dataSource.getAllRecords(10, 0, '')
      .then(r => { 
        expect(JSON.stringify(r.payload)).to.be(JSON.stringify(expectedResponse.payload));
      }));
  });
});