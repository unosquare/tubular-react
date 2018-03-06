import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { assert, expect } from 'chai';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import Table, { TableBody, TableCell, TableFooter, TableHead, TableRow } from 'material-ui/Table';
import { createMount, createShallow } from 'material-ui/test-utils';
import * as React from 'react';
import GridHeader from '../src/DataGrid/GridHeader';
import LocalDataSource from '../src/DataGrid/LocalDataSource';
import RemoteDataSource from '../src/DataGrid/RemoteDataSource';
import { validColumnsSample } from './utils/columns';
import { data, simpleRecordsExpected } from './utils/data';

Enzyme.configure({ adapter: new Adapter() });
const mock = new MockAdapter(Axios);
mock.onPost().reply(200, {...simpleRecordsExpected});

describe('<GridHeader />', () => {
  let shallow;
  let mount;
  let gridHeader;
  let props;
  let dataSource;

  beforeEach(() => {
    dataSource = new RemoteDataSource('url', validColumnsSample);
    shallow = createShallow({ dive: true });
    mount = createMount();
    gridHeader = (
      <GridHeader
        dataSource={dataSource}
        gridName='Tubular-React'
        page={0}
        rowsPerPage={10}
        refreshGrid={() => { return; }}
      />
    );
  });

  it('should render a row', () => {
    const wrapper = shallow(gridHeader).find(TableRow);
    expect(wrapper).to.have.lengthOf(1);
  });

  it('should render n columns', () => {
    const wrapper = shallow(gridHeader).find(TableRow).find(TableCell);
    expect(wrapper).to.have.lengthOf(5);
  });

  it('should render a dialog', () => {
    const wrapper = shallow(gridHeader).find(Dialog);
    expect(wrapper).to.have.lengthOf(1);
  });

  beforeEach( () => {
    props = {

    };
  });
});
