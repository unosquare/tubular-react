import Adapter from 'enzyme-adapter-react-16';
import Axios from 'axios';
import Enzyme from 'enzyme';
import Grid from '../src/Grid/Grid';
import MockAdapter from 'axios-mock-adapter';
import orders from './utils/orders.json';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import RemoteDataSource from '../src/Grid/RemoteDataSource';
import { expect } from 'chai';
import Table, { TableBody, TableCell, TableFooter, TableHead, TableRow } from 'material-ui/Table';
import { createMount, createShallow } from 'material-ui/test-utils';

Enzyme.configure({ adapter: new Adapter() });

describe('<Grid />', () => {
  let mountedGrid;
  let props;
  let mount;
  let shallow;

  let axiosInstance; 
  let mock;
   
  before(() => {
    mount = createMount();
    shallow = createShallow({ dive: true });
  });
  
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
  const data = [
    [1, 'Microsoft', '2016-03-19T19:00:00', 'Guadalajara, JAL, Mexico'], 
    [2, 'Microsoft', '2016-04-23T10:00:00', 'Guadalajara, JAL, Mexico'], 
    [3, 'Microsoft', '2016-12-22T08:00:00', 'Guadalajara, JAL, Mexico'], 
    [4, 'Unosquare LLC', '2016-02-01T18:00:00', 'Los Angeles, CA, USA'], 
    [5, 'Microsoft', '2016-11-10T18:00:00', 'Guadalajara, JAL, Mexico'], 
    [6, 'Unosquare LLC', '2016-11-06T18:00:00', 'Los Angeles, CA, USA'], 
    [7, 'Unosquare LLC', '2016-11-11T18:00:00', 'Leon, GTO, Mexico'], 
    [8, 'Unosquare LLC', '2016-11-08T18:00:00', 'Portland, OR, USA'], 
    [9, 'Vesta', '2016-11-07T18:00:00', 'Guadalajara, JAL, Mexico'], 
    [10, 'Unosquare LLC', '2016-11-05T18:00:00', 'Portland, OR, USA']
  ];

  const aggregate = { CustomerName: 500 };

  const bodyRenderer = (row, index) => 
    <TableRow hover key = { index }>
      <TableCell padding = { 'default' }>
        { row.OrderID}
      </TableCell>
      <TableCell padding = { 'default' }>
        { row.CustomerName}
      </TableCell>
      <TableCell padding = { 'default' }>
        { row.ShippedDate}
      </TableCell>
      <TableCell padding = { 'default' }>
        { row.ShipperCity}
      </TableCell>
    </TableRow>;

  const footerRenderer = aggregates => 
    <TableFooter>
      <TableRow>
        <TableCell>Total: </TableCell>
        <TableCell> { aggregates && aggregates.CustomerName } </TableCell>
        <TableCell> ~~~ </TableCell>
        <TableCell> ~~~ </TableCell>
      </TableRow>
    </TableFooter>;

  const grid = () => {
    if(!mountedGrid){
      mountedGrid = mount(<Grid {...props} />);
    }
    return mountedGrid;
  };
  
  it('should render a Paper', () => {
    const wrapper = grid().find(Paper);
    expect(wrapper).to.have.lengthOf(1);
  });

  it('should render a Table', () => {
    const wrapper = grid().find(Table);
    expect(wrapper).to.have.lengthOf(1);
  });


  it('should render n columns', () => {
    const columns = grid().find(TableHead).find(TableRow).find(TableCell);
    expect(columns).to.have.lengthOf(4);
  });
      
  it('should have 0 rows at first', () => {
    const rows = grid().find(TableBody).find(TableRow);
    expect(rows).to.have.lengthOf(0);
  });

  describe('when data is retrieved', () => {
    it('should render all rows', () => {
      const wrapper = shallow(<Grid { ...props } />);
      wrapper.setState({ data });
      expect(wrapper.find(TableRow)).to.have.lengthOf(10);
    });
  });
  
  /** Unit test for default/custom body */
  describe('When custom body is not defined', () => {
    it('should render the default body', () => {
      const body = grid().find(Table).find(TableBody);
      expect(body).to.have.lengthOf(1);
    });
  });

  describe('When custom body is defined', () => {
    it('should render the custom body', () => {
      mock.onPost('http://tubular.azurewebsites.net/api/orders/paged', { columns }).reply(200, {
        orders
      });

      const grid = <Grid 
        dataSource = { new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged') }
        bodyRenderer = { bodyRenderer }
        columns = { columns } />;

      const wrapper = shallow(grid);
      const body = wrapper.find(Table).find(TableBody);

      expect(body).to.have.lengthOf(1);
    });
  });

  /** Unit tests for custom footer */
  describe('When footer is not defined', () => {
    it('should not render nothing', () => {
      mock.onPost('http://tubular.azurewebsites.net/api/orders/paged', { columns }).reply(200);
    
      const grid = <Grid dataSource = { new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged') }
        columns = { columns } />;

      const wrapper = shallow(grid);
      const footer = wrapper.find(Table).find(TableFooter);

      expect(footer).to.not.have.lengthOf(1);
    });
  });

  describe('When footer is defined', () => {
    it('should render the custom footer', () => {
      mock.onPost('http://tubular.azurewebsites.net/api/orders/paged', { columns }).reply(200);

      const grid = <Grid dataSource = { new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged') }
        columns = { columns }
        footerRenderer = { footerRenderer }
      />;

      const wrapper = shallow(grid);
      wrapper.setState({ aggregate });
      const footer = wrapper.find(Table).find(TableFooter);

      expect(footer).to.have.lengthOf(1);
    });
  });

  beforeEach(() => {
    props = {
      dataSource: new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', columns)
    };
    axiosInstance = Axios.create();
    mock = new MockAdapter(axiosInstance);
  });
});