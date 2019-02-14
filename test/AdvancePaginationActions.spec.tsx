import IconButton from '@material-ui/core/IconButton';
import { createMount } from '@material-ui/core/test-utils';
import * as React from 'react';
import AdvancePaginationActions from '../src/DataGrid/AdvancePaginationActions';
import context from '../src/DataSource/__mocks__/testHelpers';
jest.mock('../src/DataSource/DataSourceContext');

describe('TablePaginationActions', () => {
  let mount: any;

  beforeEach(() => {
    jest.resetModules();

    mount = createMount();
  });

  test('should render 10 \'<IconButton />\' when has 10 of 500 records to show by page', () => {
    const wrapper = mount(
      <AdvancePaginationActions
        classes={{}}
        count={500}
        page={0}
        rowsPerPage={10}
        onChangePage={context.actions.updatePage}
      />,
    );

    expect(wrapper.find(IconButton)).toHaveLength(10);
  });

  test('should have the disabled prop from \'First Page\' as true', () => {
    const wrapper = mount(
      <AdvancePaginationActions
        classes={{}}
        count={500}
        page={0}
        rowsPerPage={10}
        onChangePage={context.actions.updatePage}
      />,
    );

    const firstPage = wrapper.find(IconButton).at(0);

    firstPage.simulate('click');
    expect(firstPage.props().disabled).toBe(true);
  });

  test('should have the disabled prop from \'First Page\' as false', () => {
    const wrapper = mount(
      <AdvancePaginationActions
        classes={{}}
        count={500}
        page={2}
        rowsPerPage={10}
        onChangePage={context.actions.updatePage}
      />,
    );

    const firstPage = wrapper.find(IconButton).at(0);

    firstPage.simulate('click');
    expect(firstPage.props().disabled).toBe(false);
  });

  test('should have the disabled prop from \'Last Page\' as true', () => {
    const wrapper = mount(
      <AdvancePaginationActions
        classes={{}}
        count={500}
        page={49}
        rowsPerPage={10}
        onChangePage={context.actions.updatePage}
      />,
    );

    const lastPage = wrapper.find(IconButton).at(8);

    lastPage.simulate('click');
    expect(lastPage.props().disabled).toBe(true);
  });

  test('should have the disabled prop from \'Last Page\' as false', () => {
    const wrapper = mount(
      <AdvancePaginationActions
        classes={{}}
        count={500}
        page={47}
        rowsPerPage={10}
        onChangePage={context.actions.updatePage}
      />,
    );

    const lastPage = wrapper.find(IconButton).at(8);

    lastPage.simulate('click');
    expect(lastPage.props().disabled).toBe(false);
  });

  test('should have the disabled prop from \'Previous Page\' as false', () => {
    const wrapper = mount(
      <AdvancePaginationActions
        classes={{}}
        count={500}
        page={49}
        rowsPerPage={10}
        onChangePage={context.actions.updatePage}
      />,
    );

    const previousPage = wrapper.find(IconButton).at(1);

    previousPage.simulate('click');
    expect(previousPage.props().disabled).toBe(false);
  });

  test('should have the disabled prop from \'Previous Page\' as true', () => {
    const wrapper = mount(
      <AdvancePaginationActions
        classes={{}}
        count={500}
        page={0}
        rowsPerPage={10}
        onChangePage={context.actions.updatePage}
      />,
    );

    const previousPage = wrapper.find(IconButton).at(1);

    previousPage.simulate('click');
    expect(previousPage.props().disabled).toBe(true);
  });

  test('should have the disable prop from \'Next Page\' as true', () => {
    const wrapper = mount(
      <AdvancePaginationActions
        classes={{}}
        count={500}
        page={49}
        rowsPerPage={10}
        onChangePage={context.actions.updatePage}
      />,
    );

    const nextPage = wrapper.find(IconButton).at(8);

    nextPage.simulate('click');
    expect(nextPage.props().disabled).toBe(true);
  });

  test('should have the disable prop from \'Next Page\' as false', () => {
    const wrapper = mount(
      <AdvancePaginationActions
        classes={{}}
        count={500}
        page={34}
        rowsPerPage={10}
        onChangePage={context.actions.updatePage}
      />,
    );

    const nextPage = wrapper.find(IconButton).at(7);

    nextPage.simulate('click');
    expect(nextPage.props().disabled).toBe(false);
  });

  test('should trigger the onClick event when \'Page#\' is clicked', () => {
    const wrapper = mount(
      <AdvancePaginationActions
        classes={{}}
        count={500}
        page={33}
        rowsPerPage={10}
        onChangePage={context.actions.updatePage}
      />,
    );

    const page = wrapper.find(IconButton).at(4);
    page.simulate('click');
    expect(context.actions.updatePage.mock.calls.length).toBeGreaterThan(0);
  });
});
