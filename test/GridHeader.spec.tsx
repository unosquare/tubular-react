import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { assert, expect } from 'chai';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import Table, { TableCell, TableHead, TableRow } from 'material-ui/Table';
import { createMount, createShallow } from 'material-ui/test-utils';
import * as React from 'react';
import * as sinon from 'sinon';
import { ColumnDataType, CompareOperators } from '../src/DataGrid/Column';
import GridHeader from '../src/DataGrid/GridHeader';
import LocalDataSource from '../src/DataGrid/LocalDataSource';
import RemoteDataSource from '../src/DataGrid/RemoteDataSource';
import { amountFilterColumnsSample, isShippedFilterColumnsSample, validColumnsSample } from './utils/columns';
import { simpleRecordsExpected } from './utils/data';
import localData from './utils/localData';

Enzyme.configure({ adapter: new Adapter() });
const mock = new MockAdapter(Axios);
mock.onPost().reply(200, {...simpleRecordsExpected});

describe('<GridHeader />', () => {
  let shallow;
  let mount;
  let gridHeader;
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

  afterEach(() => {
    mount.cleanUp();
    window.localStorage.removeItem('tubular.Tubular-React');
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

  it('should trigger \'componentWillUnmount()\' one time', () => {
    sinon.spy(GridHeader.prototype, 'componentWillUnmount');
    const wrapper = mount(
      <Table>
        <TableHead>
          <GridHeader
            dataSource={new LocalDataSource(localData, validColumnsSample)}
            gridName={'Tubular-React'}
            page={0}
            refreshGrid={() => { return; }}
            rowsPerPage={10}
          />
        </TableHead>
      </Table>
    );

    wrapper.unmount();
    expect(GridHeader.prototype.componentWillUnmount.calledOnce).to.equal(true);
  });

  it('should trigger \'componentDidMount()\' one time and update the dataSource with the localStorage values', () => {
    sinon.spy(GridHeader.prototype, 'componentDidMount');
    const gridHeaderDataSource = new RemoteDataSource('url', amountFilterColumnsSample);
    const localStorage = new RemoteDataSource('url', amountFilterColumnsSample);

    localStorage.columns[4].Filter.Text = 2;
    localStorage.columns[4].Filter.HasFilter = true;
    localStorage.columns[4].Filter.Operator = 'Between';
    localStorage.columns[4].Filter.Argument = [10];
    window.localStorage.setItem('tubular.Tubular-React', JSON.stringify(localStorage.columns));

    const gridHeader2 = (
      <GridHeader
        dataSource={gridHeaderDataSource}
        gridName='Tubular-React'
        page={0}
        rowsPerPage={10}
        refreshGrid={() => { return; }}
      />
    );

    const wrapper = shallow(gridHeader2);

    expect(wrapper.instance().props.dataSource.columns[4].Filter.Text).to.equal(2);
    expect(wrapper.instance().props.dataSource.columns[4].Filter.HasFilter).to.equal(true);
    expect(wrapper.instance().props.dataSource.columns[4].Filter.Operator).to.equal('Between');
    expect(GridHeader.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  describe('When filter dialog has been clicked', () => {
    it('should update the state of \'open\' to \'false\' when is closed', () => {
      const wrapper = shallow(gridHeader);
      wrapper.setState({ open: false });
      wrapper.update();

      assert.isFalse(wrapper.state().open);
    });

    it('should update the state of \'open\' to \'true\' when is open', () => {
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

  describe('handleApply()', () => {
    it('Should change the filter values of the Amount column', () => {
      const gridHeaderDataSource = new RemoteDataSource('url', amountFilterColumnsSample);

      const gridHeader2 = (
        <GridHeader
          dataSource={gridHeaderDataSource}
          gridName='Tubular-React'
          page={0}
          rowsPerPage={10}
          refreshGrid={() => { return; }}
        />
      );

      const wrapper = shallow(gridHeader2);
      wrapper.setState({
        activeFilter: CompareOperators.BETWEEN,
        activeFilterColumn: 'Amount',
        columnType: ColumnDataType.NUMERIC,
        firstFilterValue: 4,
        secondFilterValue: 15
      });

      wrapper.instance().handleApply();

      expect(wrapper.instance().props.dataSource.columns[4].Filter.Text).to.equal(4);
      expect(wrapper.instance().props.dataSource.columns[4].Filter.Argument).deep.equal([15]);
      expect(wrapper.instance().props.dataSource.columns[4].Filter.HasFilter).to.equal(true);
      expect(wrapper.instance().props.dataSource.columns[4].Filter.Operator).to.equal('Between');
    });

    it('Should change the filter values of the IsShipped column', () => {
      const gridHeaderDataSource = new RemoteDataSource('url', isShippedFilterColumnsSample);

      const gridHeader2 = (
        <GridHeader
          dataSource={gridHeaderDataSource}
          gridName='Tubular-React'
          page={0}
          rowsPerPage={10}
          refreshGrid={() => { return; }}
        />
      );

      const wrapper = shallow(gridHeader2);
      wrapper.setState({
        activeFilter: CompareOperators.EQUALS,
        activeFilterColumn: 'IsShipped',
        columnType: ColumnDataType.BOOLEAN,
        firstFilterValue: 'true',
        secondFilterValue: ''
      });

      wrapper.instance().handleApply();

      expect(wrapper.instance().props.dataSource.columns[5].Filter.Text).to.equal(true);
      expect(wrapper.instance().props.dataSource.columns[5].Filter.HasFilter).to.equal(true);
      expect(wrapper.instance().props.dataSource.columns[5].Filter.Operator).to.equal('Equals');
    });
  });

  describe('sortHandler()', () => {
    it('Should change the SortDirection value of the CustomerName column', () => {
      const gridHeaderDataSource = new RemoteDataSource('url', amountFilterColumnsSample);

      const gridHeader2 = (
        <GridHeader
          dataSource={gridHeaderDataSource}
          gridName='Tubular-React'
          page={0}
          rowsPerPage={10}
          refreshGrid={() => { return; }}
        />
      );

      const wrapper = shallow(gridHeader2);

      expect(wrapper.instance().props.dataSource.columns[1].SortDirection).to.equal('None');
      wrapper.instance().sortHandler('CustomerName');
      expect(wrapper.instance().props.dataSource.columns[1].SortDirection).to.equal('Ascending');
      wrapper.instance().sortHandler('CustomerName');
      expect(wrapper.instance().props.dataSource.columns[1].SortDirection).to.equal('Descending');
    });
  });

  describe('handleKeyDown()', () => {
    it('should update the state of \'sorting\' to ', () => {
      const wrapper = shallow(gridHeader);

      wrapper.setState({
        sorting: 'Single'
      });

      wrapper.instance().handleKeyDown({ key: 'Control' });
      wrapper.update();

      expect(wrapper.state().sorting).to.equal('Multiple');
    });
  });

  describe('handleKeyUp()', () => {
    it('should update the state of \'sorting\' to ', () => {
      const wrapper = shallow(gridHeader);

      wrapper.setState({
        sorting: 'Multiple'
      });

      wrapper.instance().handleKeyUp({ key: 'Control' });
      wrapper.update();

      expect(wrapper.state().sorting).to.equal('Single');
    });
  });

  describe('handleChange()', () => {
    it('should update the state of \'activeFilter\' to \'Contains\'', () => {
      const wrapper = shallow(gridHeader);

      wrapper.setState({
        activeFilter: 'None',
        activeFilterColumn: 'CustomerName',
        columnType: 'string',
        firstFilterValue: '',
        open: true,
        secondFilterValue: ''
      });

      expect(wrapper.state().activeFilter).to.be.equal('None');

      wrapper.instance().handleChange('Contains');
      wrapper.update();

      expect(wrapper.state().activeFilter).to.be.equal('Contains');
    });
  });

  describe('handleTextFieldChange()', () => {
    it('should update the state of \'firstFilterValue\' to \'4\'', () => {
      const wrapper = shallow(gridHeader);

      wrapper.setState({
        activeFilter: 'Equals',
        activeFilterColumn: 'OrderID',
        columnType: 'numeric',
        firstFilterValue: '',
        open: true,
        secondFilterValue: ''
      });

      wrapper.instance().handleTextFieldChange('4');
      wrapper.update();

      expect(wrapper.state().firstFilterValue).to.be.equal('4');
    });
  });

  describe('handleSecondTextFieldChange()', () => {
    it('should update the state of \'secondFilterValue\' to \'4\'', () => {
      const wrapper = shallow(gridHeader);

      wrapper.setState({
        activeFilter: 'Equals',
        activeFilterColumn: 'OrderID',
        columnType: 'numeric',
        firstFilterValue: '',
        open: true,
        secondFilterValue: ''
      });

      wrapper.instance().handleSecondTextFieldChange('4');
      wrapper.update();

      expect(wrapper.state().secondFilterValue).to.be.equal('4');
    });
  });

  describe('handleDatePicker()', () => {
    it('should update the state of \'firstFilterValue\' and \'firstFilterValue\'' +
      'to \'2018-25-07T15:40:30-06:00\'', () => {
      const wrapper = shallow(gridHeader);

      wrapper.setState({
        activeFilter: 'Equals',
        activeFilterColumn: 'ShippedDate',
        columnType: 'datetime',
        firstFilterValue: '',
        open: true,
        secondFilterValue: ''
      });

      wrapper.instance().handleDatePicker({format: () => ('2018-25-07T15:40:30-06:00')}, 'Value');
      wrapper.instance().handleDatePicker({format: () => ('2018-25-07T15:40:30-06:00')}, 'Value2');
      wrapper.update();

      expect(wrapper.state().firstFilterValue).to.be.equal('2018-25-07T15:40:30-06:00');
      expect(wrapper.state().firstFilterValue).to.be.equal('2018-25-07T15:40:30-06:00');
    });
  });
});
