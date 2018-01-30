import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import Enzyme from 'enzyme';
import Grid from '../src/Grid/Grid';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import RemoteDataSource from '../src/Grid/RemoteDataSource';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { createMount, createShallow } from 'material-ui/test-utils';


Enzyme.configure({ adapter: new Adapter() });

describe('<Grid />', () => {
  let mountedGrid;
  let props;
  let mount;
  let shallow;
   
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
  
  describe('When custom body is defined', () => {
    it('should render the custom body', () => {
      const body = grid().find(Table).find(TableBody);
      expect(body).to.have.lengthOf(1);
    });
  });

  describe('When custom body is defined', () => {
    beforeEach(() => {
      props.bodyRenderer = null;
    });

    it('should render the custom body', () => {
      const body = grid().find(Table).find(TableBody);
      expect(body).to.have.lengthOf(1);
    });
  });

  beforeEach(() => {
    props = {
      dataSource: new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', columns, bodyRenderer)
    };
  });
});