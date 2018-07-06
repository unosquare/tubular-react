import IconButton from '@material-ui/core/IconButton';
import { createShallow } from '@material-ui/core/test-utils';
import * as React from 'react';
import * as sinon from 'sinon';
import AdvancePaginationActions from '../src/DataGrid/AdvancePaginationActions';
jest.mock('../src/DataSource/DataSourceContext');

describe('TablePaginationActions', () => {
  const noop = () => { return ; };

  let shallow;
  let mountedTablePaginationActions;
  let props;

  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  const tablePaginationActions = () => {
    if (!mountedTablePaginationActions) {
      mountedTablePaginationActions = shallow(<AdvancePaginationActions {...props} />);
    }

    return mountedTablePaginationActions;
  };

  test('should render 9 \'<IconButton />\' when has 10 of 500 records to show by page', () => {
    const wrapper = shallow(
      <AdvancePaginationActions
        classes={{}}
        count={500}
        page={0}
        rowsPerPage={10}
        onChangePage={noop}
      />
    );

    expect(wrapper.find(IconButton)).toHaveLength(9);
  });

  test('should have the disabled prop from \'First Page\' as true', () => {
    const wrapper = shallow(
      <AdvancePaginationActions
        classes={{}}
        count={500}
        page={0}
        rowsPerPage={10}
        onChangePage={noop}
      />
    );

    const firstPage = wrapper.find(IconButton).at(0);

    firstPage.simulate('click');
    expect(firstPage.props().disabled).toBe(true);
  });

  test('should have the disabled prop from \'First Page\' as false', () => {
    const wrapper = shallow(
      <AdvancePaginationActions
        classes={{}}
        count={500}
        page={2}
        rowsPerPage={10}
        onChangePage={noop}
      />
    );

    const firstPage = wrapper.find(IconButton).at(0);

    firstPage.simulate('click');
    expect(firstPage.props().disabled).toBe(false);
  });

  test('should have the disabled prop from \'Last Page\' as true', () => {
    const wrapper = shallow(
      <AdvancePaginationActions
        classes={{}}
        count={500}
        page={49}
        rowsPerPage={10}
        onChangePage={noop}
      />
    );

    const lastPage = wrapper.find(IconButton).at(8);

    lastPage.simulate('click');
    expect(lastPage.props().disabled).toBe(true);
  });

  test('should have the disabled prop from \'Last Page\' as false', () => {
    const wrapper = shallow(
      <AdvancePaginationActions
        classes={{}}
        count={500}
        page={47}
        rowsPerPage={10}
        onChangePage={noop}
      />
    );

    const lastPage = wrapper.find(IconButton).at(8);

    lastPage.simulate('click');
    expect(lastPage.props().disabled).toBe(false);
  });

  test('should have the disabled prop from \'Previous Page\' as false', () => {
    const wrapper = shallow(
      <AdvancePaginationActions
        classes={{}}
        count={500}
        page={49}
        rowsPerPage={10}
        onChangePage={noop}
      />
    );

    const previousPage = wrapper.find(IconButton).at(1);

    previousPage.simulate('click');
    expect(previousPage.props().disabled).toBe(false);
  });

  test('should have the disabled prop from \'Previous Page\' as true', () => {
    const wrapper = shallow(
      <AdvancePaginationActions
        classes={{}}
        count={500}
        page={0}
        rowsPerPage={10}
        onChangePage={noop}
      />
    );

    const previousPage = wrapper.find(IconButton).at(1);

    previousPage.simulate('click');
    expect(previousPage.props().disabled).toBe(true);
  });

  test('should have the disable prop from \'Next Page\' as true', () => {
    const wrapper = shallow(
      <AdvancePaginationActions
        classes={{}}
        count={500}
        page={49}
        rowsPerPage={10}
        onChangePage={noop}
      />
    );

    const nextPage = wrapper.find(IconButton).at(7);

    nextPage.simulate('click');
    expect(nextPage.props().disabled).toBe(true);
  });

  test('should have the disable prop from \'Next Page\' as false', () => {
    const wrapper = shallow(
      <AdvancePaginationActions
        classes={{}}
        count={500}
        page={34}
        rowsPerPage={10}
        onChangePage={noop}
      />
    );

    const nextPage = wrapper.find(IconButton).at(7);

    nextPage.simulate('click');
    expect(nextPage.props().disabled).toBe(false);
  });

  test('should trigger the onClick event when \'Page#\' is clicked', () => {
    const handleClickStub = sinon.spy();
    const wrapper = shallow(
      <AdvancePaginationActions
        classes={{}}
        count={500}
        page={33}
        rowsPerPage={10}
        onChangePage={handleClickStub}
      />
    );

    const page = wrapper.find(IconButton).at(4);
    page.simulate('click');
    expect(handleClickStub.calledOnce).toBe(true);
  });

  beforeEach( () => {
    props = {};
  });
});