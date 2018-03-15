import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableFooter, TableHead, TableRow } from 'material-ui/Table';
import { createShallow } from 'material-ui/test-utils';
import * as React from 'react';
import DataGrid from '../src';
import Paginator from '../src/DataGrid/Paginator';
import RemoteDataSource from '../src/DataGrid/RemoteDataSource';
import { simpleColumnsSample, validColumnsSample } from './utils/columns';
import { data, onlyMicrosoftExpected, page2Expected, simpleRecordsExpected } from './utils/data';
import { microsoftSearchRequest, page2Request, simpleRequest } from './utils/requests';

const footerRenderer = (aggregates) => (
  <TableRow>
    <TableCell>Total: </TableCell>
    <TableCell>{aggregates && aggregates.CustomerName}</TableCell>
    <TableCell />
    <TableCell />
    <TableCell />
  </TableRow>
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

describe('<DataGrid />', () => {
  let shallow;
  let grid;
  let dataSource;
  let mock;

  before(() => {
    mock = new MockAdapter(axios);
  });

  beforeEach(() => {
    mock.onPost().reply(200, {...simpleRecordsExpected});
    dataSource = new RemoteDataSource('url', validColumnsSample);
    shallow = createShallow({dive: true});

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

  describe('When rowsPerPageOptions is not defined and rowsPerPage is invalid', () => {
    it('should set an error Message, and open a Snackbar', () => {
      grid = (
        <DataGrid
          onError={(x: any) => x}
          gridName='Motorhead'
          rowsPerPage={15}
          dataSource={new RemoteDataSource('url', validColumnsSample)}
          bodyRenderer={bodyRenderer}
        />
      );

      const wrapper = shallow(grid);

      expect(wrapper.state().errorMessage).to.be.equal('The rowsPerPage value should be: 10,20,50,100');
      expect(wrapper.state().open).to.be.equal(true);
    });
  });

  describe('When rowsPerPageOptions is defined and rowsPerPage is invalid', () => {
    it('should set an error Message, and open a Snackbar', () => {
      grid = (
        <DataGrid
          onError={(x: any) => x}
          gridName='Motorhead'
          rowsPerPage={20}
          rowsPerPageOptions={[10, 25, 50]}
          dataSource={new RemoteDataSource('url', validColumnsSample)}
          bodyRenderer={bodyRenderer}
        />
      );

      const wrapper = shallow(grid);

      expect(wrapper.state().errorMessage).to.be.equal('The rowsPerPage value should be: 10,25,50');
      expect(wrapper.state().open).to.be.equal(true);
    });
  });

  describe('When footer has no rows', () => {
    it('should not render any row', () => {
      const wrapper = shallow(grid);
      const rowFooter = wrapper.find(Table).find(TableFooter).find(TableRow);

      expect(rowFooter).to.have.lengthOf(0);
    });
  });

  describe('When handlePager() is called', () => {
    let dataGrid;

    before( () => {
      mock.reset();
      mock.onPost('url', { ...simpleRequest }).reply(200, {
        ...simpleRecordsExpected
      });
      mock.onPost('url', { ...page2Request }).reply(200, {
        ...page2Expected
      });

      dataGrid = (
        <DataGrid
          onError={(x: any) => x}
          gridName='Motorhead'
          rowsPerPage={10}
          dataSource={new RemoteDataSource('url', simpleColumnsSample)}
        />
      );
    });

    it('Should refresh the DataGrid DataStream', (done) => {
      const wrapper = shallow(dataGrid);
      wrapper.instance().handlePager(10, 1);
      wrapper.state().dataSource.dataStream.skip(2).subscribe((r) => {
        wrapper.update();

        expect(wrapper.find(TableBody).find(TableRow)).to.have.lengthOf(10);
        expect(wrapper.state().data).to.deep.equal(page2Expected.Payload);
        done();
      });
    });
  });

  describe('When handleTextSearch() is called', () => {
    let dataGrid;

    before( () => {
      mock.reset();
      mock.onPost('url', { ...simpleRequest }).reply(200, {
        ...simpleRecordsExpected
      });
      mock.onPost('url', { ...microsoftSearchRequest }).reply(200, {
        ...onlyMicrosoftExpected
      });

      dataGrid = (
        <DataGrid
          onError={(x: any) => x}
          gridName='Motorhead'
          rowsPerPage={10}
          dataSource={new RemoteDataSource('url', simpleColumnsSample)}
        />
      );
    });

    it('Should refresh the DataStream with only records that match the search text', (done) => {
      const wrapper = shallow(dataGrid);

      wrapper.instance().handleTextSearch('Microsoft');
      wrapper.state().dataSource.dataStream.skip(2).subscribe((r) => {
        expect(r.Payload).to.deep.equal(onlyMicrosoftExpected.Payload);
        done();
      });
    });
  });

  describe('When exportTable() is called', () => {
    let dataGrid;

    before( () => {
      mock.reset();
      mock.onPost('url', { ...simpleRequest }).reply(200, {
        ...simpleRecordsExpected
      });

      dataGrid = (
        <DataGrid
          onError={(x: any) => x}
          gridName='Motorhead'
          rowsPerPage={10}
          dataSource={new RemoteDataSource('url', simpleColumnsSample)}
        />
      );
    });

    it('Should create a link element to download the csv', (done) => {
      const wrapper = shallow(dataGrid);

      wrapper.state().dataSource.dataStream.skip(1).subscribe((r) => {
        wrapper.instance().exportTable(false);

        setTimeout(() => {
          const csvFile = '\uFEFFOrder ID,Customer Name,Shipped Date,Shipper City,Amount\n' +
          '1,Microsoft,\"March 19th 2016, 7:00:00 pm\",\"Guadalajara, JAL, Mexico\",300\n' +
          '2,Microsoft,\"April 23rd 2016, 10:00:00 am\",\"Guadalajara, JAL, Mexico\",\n' +
          '3,Microsoft,\"December 22nd 2016, 8:00:00 am\",\"Guadalajara, JAL, Mexico\",300\n' +
          '4,Unosquare LLC,\"February 1st 2016, 6:00:00 pm\",\"Los Angeles, CA, USA\",\n' +
          '5,Microsoft,\"November 10th 2016, 6:00:00 pm\",\"Guadalajara, JAL, Mexico\",92\n' +
          '6,Unosquare LLC,\"November 6th 2016, 6:00:00 pm\",\"Los Angeles, CA, USA\",18\n' +
          '7,Unosquare LLC,\"November 11th 2016, 6:00:00 pm\",\"Leon, GTO, Mexico\",50\n' +
          '8,Unosquare LLC,\"November 8th 2016, 6:00:00 pm\",\"Portland, OR, USA\",9\n' +
          '9,Vesta,\"November 7th 2016, 6:00:00 pm\",\"Guadalajara, JAL, Mexico\",108\n' +
          '10,Unosquare LLC,\"November 5th 2016, 6:00:00 pm\",\"Portland, OR, USA\",15\n';

          const file = window.document.getElementById('download').getAttribute('href');

          expect(csvFile).to.be.equal(file);
          done();
        }, 0);
      });
    });
  });

  describe('When printTable() is called', () => {
    let dataGrid;

    before( () => {
      mock.reset();
      mock.onPost('url', { ...simpleRequest }).reply(200, {
        ...simpleRecordsExpected
      });

      dataGrid = (
        <DataGrid
          onError={(x: any) => x}
          gridName='Motorhead'
          rowsPerPage={10}
          dataSource={new RemoteDataSource('url', simpleColumnsSample)}
        />
      );
    });

    it('Should create a window with the data to print', (done) => {
      const wrapper = shallow(dataGrid);

      wrapper.state().dataSource.dataStream.skip(1).subscribe((r) => {
        wrapper.instance().printTable();

        setTimeout(() => {
          const csvFile = '<html>\n' +
          '<link rel="stylesheet" href="//cdn.jsdelivr.net/bootstrap/latest/css/bootstrap.min.css" />\n' +
          '<body onload="window.print();">\n' +
          '<h1>Motorhead</h1>\n' +
          '<table class="table table-bordered table-striped"><thead><tr><th>Order ID</th><th>Customer Name</th>' +
          '<th>Shipped Date</th><th>Shipper City</th><th>Amount</th></tr></thead><tbody><tr><td>1</td> ' +
          '<td>Microsoft</td> <td>March 19th 2016, 7:00:00 pm</td> <td>Guadalajara, JAL, Mexico</td> <td>300</td>' +
          '</tr> <tr><td>2</td> <td>Microsoft</td> <td>April 23rd 2016, 10:00:00 am</td> ' +
          '<td>Guadalajara, JAL, Mexico</td> <td>0</td></tr> <tr><td>3</td> <td>Microsoft</td> ' +
          '<td>December 22nd 2016, 8:00:00 am</td> <td>Guadalajara, JAL, Mexico</td> <td>300</td></tr> <tr><td>4' +
          '</td> <td>Unosquare LLC</td> <td>February 1st 2016, 6:00:00 pm</td> <td>Los Angeles, CA, USA</td> ' +
          '<td>0</td></tr> <tr><td>5</td> <td>Microsoft</td> <td>November 10th 2016, 6:00:00 pm</td> ' +
          '<td>Guadalajara, JAL, Mexico</td> <td>92</td></tr> <tr><td>6</td> <td>Unosquare LLC</td> ' +
          '<td>November 6th 2016, 6:00:00 pm</td> <td>Los Angeles, CA, USA</td> <td>18</td></tr> <tr><td>7</td> ' +
          '<td>Unosquare LLC</td> <td>November 11th 2016, 6:00:00 pm</td> <td>Leon, GTO, Mexico</td> <td>50</td>' +
          '</tr> <tr><td>8</td> <td>Unosquare LLC</td> <td>November 8th 2016, 6:00:00 pm</td> ' +
          '<td>Portland, OR, USA</td> <td>9</td></tr> <tr><td>9</td> <td>Vesta</td> ' +
          '<td>November 7th 2016, 6:00:00 pm</td> <td>Guadalajara, JAL, Mexico</td> <td>108</td></tr> <tr><td>10' +
          '</td> <td>Unosquare LLC</td> <td>November 5th 2016, 6:00:00 pm</td> <td>Portland, OR, USA</td> ' +
          '<td>15</td></tr></tbody></table>\n' +
          '</body>\n' +
          '</html>';

          expect(csvFile).to.be.equal(global.popupWindow);
          done();
        }, 0);
      });
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
