import Adapter from 'enzyme-adapter-react-16';
import Axios from 'axios';
import bodyRenderer from './utils/bodyRenderer.js';
import columnStructure from './utils/columnStructure.js';
import data from './utils/data.js';
import Enzyme from 'enzyme';
import fakeColumnStructure from './utils/fakeColumnStructure.js';
import footerRenderer from './utils/footerRenderer.js';
import Grid from '../src/Grid/Grid';
import MockAdapter from 'axios-mock-adapter';
import orders from './utils/orders.json';
import Paginator from '../src/Grid/Paginator';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import RemoteDataSource from '../src/Grid/RemoteDataSource';
import { expect } from 'chai';
import Typography from 'material-ui/Typography';
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

  const aggregate = { CustomerName: 500 };

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
      
  it('should have 1 rows at first', () => {
    const rows = grid().find(TableBody).find(TableRow);
    expect(rows).to.have.lengthOf(1);
  });

  describe('when data is retrieved', () => {
    it('should render all rows', () => {
      const wrapper = shallow(<Grid { ...props } />);
      wrapper.setState({ data });
      expect(wrapper.find(TableRow)).to.have.lengthOf(11);
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
      mock.onPost('http://tubular.azurewebsites.net/api/orders/paged', { columnStructure }).reply(200, {
        orders
      });

      const grid = <Grid 
        dataSource = { new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', columnStructure) }
        bodyRenderer = { bodyRenderer }
        columns = { columnStructure } />;

      const wrapper = shallow(grid);
      const body = wrapper.find(Table).find(TableBody);

      expect(body).to.have.lengthOf(1);
    });
  });

  describe('When the column structure defined by the user is wrong', () => {
    it('should render a row in the body with the warning message', () => {
      mock.onPost('http://tubular.azurewebsites.net/api/orders/paged', { fakeColumnStructure });

      const grid = <Grid 
        dataSource = { new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', fakeColumnStructure) }
        columns = { fakeColumnStructure } />;

      const wrapper = shallow(grid);
      const rowBody = wrapper.find(Table).find(TableBody).find(TableRow).find(TableCell).find(Typography);

      expect(rowBody).to.have.lengthOf(1);
    });
  });

  /** Unit tests for custom footer */
  describe('When footer has no rows', () => {
    it('should not render any row', () => {
      mock.onPost('http://tubular.azurewebsites.net/api/orders/paged', { columnStructure }).reply(200, {
        orders
      });
    
      const grid = <Grid dataSource = { new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', columnStructure) }
        columns = { columnStructure }
      />;

      const wrapper = shallow(grid);
      const rowFooter = wrapper.find(Table).find(TableFooter).find(TableRow);

      expect(rowFooter).to.have.lengthOf(0);
    });
  });

  describe('When footer has n rows', () => {
    beforeEach(() => {
      mock.onPost('http://tubular.azurewebsites.net/api/orders/paged', { columnStructure }).reply(200, {
        orders
      });
    });

    it('should render the row with the aggregate operation', () => {
      const grid = <Grid dataSource = { new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', columnStructure) }
        columns = { columnStructure }
        footerRenderer = { footerRenderer }
      />;

      const wrapper = shallow(grid);
      wrapper.setState({ aggregate });
      const rowFooter = wrapper.find(Table).find(TableFooter).find(TableRow);

      expect(rowFooter).to.have.lengthOf(1);
    });

    it('should render the row with the bottom pager', () => {
      const grid = <Grid dataSource = { new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', columnStructure) }
        columns = { columnStructure }
        showBottomPager = { true }
      />;

      const wrapper = shallow(grid);
      const rowFooter = wrapper.find(Table).find(TableFooter).find(TableRow);

      expect(rowFooter).to.have.lengthOf(1);
    });

    it('should render the rows with the aggregate operation and the bottom pager', () => {
      const grid = <Grid dataSource = { new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', columnStructure) }
        columns = { columnStructure }
        showBottomPager = { true }
        footerRenderer = { footerRenderer }
      />;

      const wrapper = shallow(grid);
      wrapper.setState({ aggregate });
      const rowFooter = wrapper.find(Table).find(TableFooter).find(TableRow);

      expect(rowFooter).to.have.lengthOf(2);
    });
  });

  describe('When footer has showBottomPager property set as true', () => {
    beforeEach(() => {
      mock.onPost('http://tubular.azurewebsites.net/api/orders/paged', { columnStructure }).reply(200, {
        orders
      });
    });

    it('should have a paginator', () => {
      const grid = <Grid dataSource = { new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', columnStructure) }
        columns = { columnStructure }
        showBottomPager = { true }
      />;

      const wrapper = shallow(grid);
      const rowFooter = wrapper.find(Table).find(TableFooter).find(TableRow).find(Paginator);

      expect(rowFooter).to.have.lengthOf(1);
    });
  });

  /** Unit test for top pager */
  describe('When <TableHead /> has showTopPager property set as true', () => {
    beforeEach(() => {
      mock.onPost('http://tubular.azurewebsites.net/api/orders/paged', { columnStructure }).reply(200, {
        orders
      });
    });

    it('Should have a paginator', () => {
      const grid = <Grid dataSource = { new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', columnStructure) }
        columns = { columnStructure }
        showTopPager = { true }
      />;

      const wrapper = shallow(grid);
      const rowHeader = wrapper.find(Table).find(TableHead).find(TableRow).find(Paginator);

      expect(rowHeader).to.have.lengthOf(1);
    });
  });

  beforeEach(() => {
    props = {
      dataSource: new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', columnStructure)
    };
    axiosInstance = Axios.create();
    mock = new MockAdapter(axiosInstance);
  });
});