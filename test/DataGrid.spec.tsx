import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableFooter, TableHead, TableRow } from 'material-ui/Table';
import { createMount, createShallow } from 'material-ui/test-utils';
import Typography from 'material-ui/Typography';
import * as React from 'react';
import DataGrid from '../src';
import GridHeader from '../src/DataGrid/GridHeader';
import Paginator from '../src/DataGrid/Paginator';
import RemoteDataSource from '../src/DataGrid/RemoteDataSource';
import { validColumnsSample } from './utils/columns';
import { data, simpleRecordsExpected } from './utils/data';
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
const mock = new MockAdapter(Axios);
mock.onPost().reply(200, {...simpleRecordsExpected});

describe('<DataGrid />', () => {
  let shallow;
  let grid;
  let mount;
  let dataSource;
  beforeEach(() => {
    dataSource = new RemoteDataSource('url', validColumnsSample);
    shallow = createShallow({dive: true});
    mount = createMount();
    grid = (
      <DataGrid
        onError={(x: any) => x}
        gridName='Motorhead'
        rowsPerPage={10}
        showTopPager={true}
        dataSource={dataSource}
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

  describe('When data is retrieved', () => {
    it('should render all rows', () => {
      const wrapper = shallow(grid);
      wrapper.setState({ data });
      expect(wrapper.find(TableBody).find(TableRow)).to.have.lengthOf(11);
    });
  });

  describe('When custom body is not defined', () => {
    it('should render the default body', () => {
      const wrapper = shallow(grid);

      const body = wrapper.find(Table).find(TableBody);
      expect(body).to.have.lengthOf(1);
    });
  });

  describe('When custom body is defined', () => {
    it('should render the custom body', () => {
      grid = (
        <DataGrid
          onError={(x: any) => x}
          gridName='Motorhead'
          rowsPerPage={10}
          dataSource={new RemoteDataSource('url', validColumnsSample)}
          bodyRenderer={bodyRenderer}
        />
      );

      const wrapper = shallow(grid);
      const body = wrapper.find(Table).find(TableBody);

      expect(body).to.have.lengthOf(1);
    });
  });

  describe('When footer has no rows', () => {
    it('should not render any row', () => {
      const wrapper = shallow(grid);
      const rowFooter = wrapper.find(Table).find(TableFooter).find(TableRow);

      expect(rowFooter).to.have.lengthOf(0);
    });
  });

  describe('When footer has n rows', () => {
    it('should render the row with the aggregate operation', () => {
      grid = (
        <DataGrid
          onError={(x: any) => x}
          gridName='Motorhead'
          rowsPerPage={10}
          dataSource={new RemoteDataSource('url', validColumnsSample)}
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
        <DataGrid
          onError={(x: any) => x}
          gridName='Motorhead'
          rowsPerPage={10}
          dataSource={new RemoteDataSource('url', validColumnsSample)}
          showBottomPager={true}
        />
      );

      const wrapper = shallow(grid);
      const rowFooter = wrapper.find(Table).find(TableFooter).find(TableRow);

      expect(rowFooter).to.have.lengthOf(1);
    });

    it('should render the rows with the aggregate operation and the bottom pager', () => {
      grid = (
        <DataGrid
          onError={(x: any) => x}
          gridName='Motorhead'
          rowsPerPage={10}
          dataSource={new RemoteDataSource('url', validColumnsSample)}
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

    it('should have a paginator', () => {
      grid = (
        <DataGrid
          onError={(x: any) => x}
          gridName='Motorhead'
          rowsPerPage={10}
          dataSource={new RemoteDataSource('url', validColumnsSample)}
          showBottomPager={true}
        />
      );

      const wrapper = shallow(grid);
      const rowFooter = wrapper.find(Table).find(TableFooter).find(TableRow).find(Paginator);

      expect(rowFooter).to.have.lengthOf(1);
    });
  });

  describe('When <TableHead /> has showTopPager property set as true', () => {

    it('Should have a paginator', () => {
      grid = (
        <DataGrid
          onError={(x: any) => x}
          gridName='Motorhead'
          rowsPerPage={10}
          dataSource={new RemoteDataSource('url', validColumnsSample)}
          showTopPager={true}
        />
      );

      const wrapper = shallow(grid);
      const rowHeader = wrapper.find(Table).find(TableHead).find(TableRow).find(Paginator);

      expect(rowHeader).to.have.lengthOf(1);
    });
  });
});
