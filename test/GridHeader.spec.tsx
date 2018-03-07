import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { assert, expect } from 'chai';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import Table, { TableBody, TableCell, TableFooter, TableHead, TableRow } from 'material-ui/Table';
import { createMount, createShallow } from 'material-ui/test-utils';
import * as React from 'react';
import * as sinon from 'sinon';
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

  describe('When filter dialog has been clicked', () => {
    it('should update the state of \'open\' to false when is closed', () => {
      const wrapper = shallow(gridHeader);
      wrapper.setState({ open: false });
      wrapper.update();

      assert.isFalse(wrapper.state().open);
    });

    it('should update the state of \'open\' to true when is open', () => {
      const wrapper = shallow(gridHeader);
      const firstCell = wrapper.find(TableRow).find(TableCell);
      const firstIconButton = wrapper.find(TableRow).find(TableCell).find(IconButton).at(0);

      firstIconButton.simulate('blur');
      wrapper.setState({
        activeFilter: 'Equals',
        activeFilterColumn: 'OrderID',
        columnType: 'numeric',
        firstFilterValue: '6',
        open: true,
        secondFilterValue: ''
      });
      wrapper.update();

      assert.isTrue(wrapper.find(Dialog).props().open);
      expect(wrapper.state().activeFilter).to.be.equal('Equals');
      expect(wrapper.state().activeFilterColumn).to.be.equal('OrderID');
      expect(wrapper.state().columnType).to.be.equal('numeric');
      expect(wrapper.state().firstFilterValue).to.be.equal('6');
      assert.isEmpty(wrapper.state().secondFilterValue);
    });
  });

  describe('handleClear()', () => {
    it('should set the state props \'activeFilter\', \'firstFilterValue\' ' +
        'and \'secondFilterValue\' at its initial values', () => {
      const wrapper = shallow(gridHeader);

      wrapper.setState({
        columnType: 'datetime',
        firstFilterValue: '2018-03-06T15:40:30-06:00',
        secondFilterValue: '2018-03-06T15:40:30-06:00'
      });

      wrapper.instance().handleClear();

      expect(wrapper.state().activeFilter).to.be.equal('None');
      assert.isEmpty(wrapper.state().firstFilterValue);
      assert.isEmpty(wrapper.state().secondFilterValue);
    });
  });

  beforeEach( () => {
    props = {

    };
  });
});
