import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableFooter, TableHead, TableRow } from 'material-ui/Table';
import { createShallow } from 'material-ui/test-utils';
import Typography from 'material-ui/Typography';
import * as React from 'react';
import Grid from '../src/Grid/Grid';
import GridHeader from '../src/Grid/GridHeader';
import Paginator from '../src/Grid/Paginator';
import RemoteDataSource from '../src/Grid/RemoteDataSource';
import { invalidColumnsSample, validColumnsSample } from './utils/columns';
import data from './utils/data';
import * as orders from './utils/orders';

const footerRenderer = (aggregates) => (
  <TableFooter>
    <TableRow>
      <TableCell>Total: </TableCell>
      <TableCell> {aggregates && aggregates.CustomerName} </TableCell>
      <TableCell> ~~~ </TableCell>
      <TableCell> ~~~ </TableCell>
    </TableRow>
  </TableFooter>
);

const bodyRenderer = (row, index) => (
  <TableRow hover={true} key={index}>
    <TableCell padding={'default'}>
      {row.OrderID}
    </TableCell>
    <TableCell padding={'default'}>
      {row.CustomerName}
    </TableCell>
    <TableCell padding={'default'}>
      {row.ShippedDate}
    </TableCell>
    <TableCell padding={'default'}>
      {row.ShipperCity}
    </TableCell>
  </TableRow>
);

Enzyme.configure({ adapter: new Adapter() });

describe('<Grid />', () => {
  let shallow;
  let axiosInstance;
  let mock;
  let grid;

  before(() => {
    shallow = createShallow({ dive: true });
    grid = (
      <Grid
        gridName='Motorhead'
        rowsPerPage={10}
        showTopPager={true}
        dataSource={new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample)}
      />
    );
  });

  const aggregate = { CustomerName: 500 };

  it('should render a Paper', () => {
    const wrapper = shallow(grid).find(Paper);
    expect(wrapper).to.have.lengthOf(1);
  });

  it('should render a Table', () => {
    const wrapper = shallow(grid).find(Table);
    expect(wrapper).to.have.lengthOf(1);
  });

  it('should have 1 rows at first', () => {
    const wrapper = shallow(grid).find(Table).find(TableBody);
    expect(wrapper).to.have.lengthOf(1);
  });

  it('should render n columns', () => {
    const gridHeader = (
      <GridHeader
        gridName='Motorhead'
        dataSource={new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample)}
        page={0}
        rowsPerPage={10}
        refreshGrid={null}
      />
    );

    const wrapper = shallow(gridHeader);
    wrapper.setState({ data });
    const cols = wrapper.find(TableRow).find(TableCell);

    expect(cols).to.have.lengthOf(5);
  });

  describe('When data is retrieved', () => {
    it('should render all rows', () => {
      const wrapper = shallow(grid);
      wrapper.setState({ data });
      expect(wrapper.find(TableBody).find(TableRow)).to.have.lengthOf(11);
    });
  });

  // Unit test for default/custom body
  describe('When custom body is not defined', () => {
    it('should render the default body', () => {
      const wrapper = shallow(grid);

      const body = wrapper.find(Table).find(TableBody);
      expect(body).to.have.lengthOf(1);
    });
  });

  describe('When custom body is defined', () => {
    it('should render the custom body', () => {
      mock.onPost('http://tubular.azurewebsites.net/api/orders/paged', { validColumnsSample }).reply(200, {
        orders
      });

      grid = (
        <Grid
          gridName='Motorhead'
          rowsPerPage={10}
          dataSource={new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample)}
          bodyRenderer={bodyRenderer}
        />
      );

      const wrapper = shallow(grid);
      const body = wrapper.find(Table).find(TableBody);

      expect(body).to.have.lengthOf(1);
    });
  });

  describe('When the column structure defined by the user is wrong', () => {
    it('should render a row in the body with the warning message', () => {
      mock.onPost('http://tubular.azurewebsites.net/api/orders/paged', { invalidColumnsSample });

      grid = (
        <Grid
          gridName='Motorhead'
          rowsPerPage={10}
          dataSource={new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', invalidColumnsSample)}
        />
      );

      const wrapper = shallow(grid);
      const rowBody = wrapper.find(Table).find(TableBody).find(TableRow).find(TableCell).find(Typography);

      expect(rowBody).to.have.lengthOf(1);
    });
  });

  // Unit tests for custom footer
  describe('When footer has no rows', () => {
    it('should not render any row', () => {
      mock.onPost('http://tubular.azurewebsites.net/api/orders/paged', { validColumnsSample }).reply(200, {
        orders
      });

      const wrapper = shallow(grid);
      const rowFooter = wrapper.find(Table).find(TableFooter).find(TableRow);

      expect(rowFooter).to.have.lengthOf(0);
    });
  });

  describe('When footer has n rows', () => {
    beforeEach(() => {
      mock.onPost('http://tubular.azurewebsites.net/api/orders/paged', { validColumnsSample }).reply(200, {
        orders
      });
    });

    it('should render the row with the aggregate operation', () => {
      grid = (
        <Grid
          gridName='Motorhead'
          rowsPerPage={10}
          dataSource={new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample)}
          footerRenderer={footerRenderer}
        />
      );

      const wrapper = shallow(grid);
      wrapper.setState({ aggregate });
      const rowFooter = wrapper.find(Table).find(TableFooter).find(TableRow);

      expect(rowFooter).to.have.lengthOf(1);
    });

    it('should render the row with the bottom pager', () => {
      grid = (
        <Grid
          gridName='Motorhead'
          rowsPerPage={10}
          dataSource={new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample)}
          showBottomPager={true}
        />
      );

      const wrapper = shallow(grid);
      const rowFooter = wrapper.find(Table).find(TableFooter).find(TableRow);

      expect(rowFooter).to.have.lengthOf(1);
    });

    it('should render the rows with the aggregate operation and the bottom pager', () => {
      grid = (
        <Grid
          gridName='Motorhead'
          rowsPerPage={10}
          dataSource={new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample)}
          showBottomPager={true}
          footerRenderer={footerRenderer}
        />
      );

      const wrapper = shallow(grid);
      wrapper.setState({ aggregate });
      const rowFooter = wrapper.find(Table).find(TableFooter).find(TableRow);

      expect(rowFooter).to.have.lengthOf(2);
    });
  });

  describe('When footer has showBottomPager property set as true', () => {
    beforeEach(() => {
      mock.onPost('http://tubular.azurewebsites.net/api/orders/paged', { validColumnsSample }).reply(200, {
        orders
      });
    });

    it('should have a paginator', () => {
      grid = (
        <Grid
          gridName='Motorhead'
          rowsPerPage={10}
          dataSource={new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample)}
          showBottomPager={true}
        />
      );

      const wrapper = shallow(grid);
      const rowFooter = wrapper.find(Table).find(TableFooter).find(TableRow).find(Paginator);

      expect(rowFooter).to.have.lengthOf(1);
    });
  });

  /** Unit test for top pager */
  describe('When <TableHead /> has showTopPager property set as true', () => {
    beforeEach(() => {
      mock.onPost('http://tubular.azurewebsites.net/api/orders/paged', { validColumnsSample }).reply(200, {
        orders
      });
    });

    it('Should have a paginator', () => {
      grid = (
        <Grid
          gridName='Motorhead'
          rowsPerPage={10}
          dataSource={new RemoteDataSource('http://tubular.azurewebsites.net/api/orders/paged', validColumnsSample)}
          showTopPager={true}
        />
      );

      const wrapper = shallow(grid);
      const rowHeader = wrapper.find(Table).find(TableHead).find(TableRow).find(Paginator);

      expect(rowHeader).to.have.lengthOf(1);
    });
  });

  beforeEach(() => {
    axiosInstance = Axios.create();
    mock = new MockAdapter(axiosInstance);
  });
});
