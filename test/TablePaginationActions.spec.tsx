import { expect } from 'chai';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import IconButton from 'material-ui/IconButton';
import { createShallow } from 'material-ui/test-utils';
import * as React from 'react';
import * as sinon from 'sinon';
import TablePaginationActions from '../src/DataGrid/TablePaginationActions';
Enzyme.configure({ adapter: new Adapter() });

describe('TablePaginationActions', () => {
  const noop = () => {};

  let shallow;
  let mountedTablePaginationActions;
  let props;

  before(() => {
    shallow = createShallow({ dive: true });
  });

  const tablePaginationActions = () => {
    if (!mountedTablePaginationActions) {
      mountedTablePaginationActions = shallow(<TablePaginationActions {...props} />);
    }

    return mountedTablePaginationActions;
  };

  it('should render 9 \'<IconButton />\' when has 10 of 500 records to show by page', ()=> {
    const wrapper = shallow(
      <TablePaginationActions
        classes={}
        count={500}
        page={0}
        rowsPerPage={10}
        onChangePage={noop}
      />
    );

    expect(wrapper.find(IconButton)).to.have.lengthOf(9);
  });

  it('should have the disabled prop from \'First Page\' as true', () => {
    const wrapper = shallow(
      <TablePaginationActions
        classes={}
        count={500}
        page={0}
        rowsPerPage={10}
        onChangePage={noop}
      />
    );

    const firstPage = wrapper.find(IconButton).at(0);

    firstPage.simulate('click');
    expect(firstPage.props().disabled).to.be.true;
  });

  it('should have the disabled prop from \'First Page\' as false', () => {
    const wrapper = shallow(
      <TablePaginationActions
        classes={}
        count={500}
        page={2}
        rowsPerPage={10}
        onChangePage={noop}
      />
    );

    const firstPage = wrapper.find(IconButton).at(0);

    firstPage.simulate('click');
    expect(firstPage.props().disabled).to.be.false;
  });

  it('should have the disabled prop from \'Last Page\' as true', () => {
    const wrapper = shallow(
      <TablePaginationActions
        classes={}
        count={500}
        page={49}
        rowsPerPage={10}
        onChangePage={noop}
      />
    );

    const lastPage = wrapper.find(IconButton).at(8);

    lastPage.simulate('click');
    expect(lastPage.props().disabled).to.be.true;
  });

  it('should have the disabled prop from \'Last Page\' as false', () => {
    const wrapper = shallow(
      <TablePaginationActions
        classes={}
        count={500}
        page={47}
        rowsPerPage={10}
        onChangePage={noop}
      />
    );

    const lastPage = wrapper.find(IconButton).at(8);

    lastPage.simulate('click');
    expect(lastPage.props().disabled).to.be.false;
  });

  it('should have the disabled prop from \'Previous Page\' as false', () => {
    const wrapper = shallow(
      <TablePaginationActions
        classes={}
        count={500}
        page={49}
        rowsPerPage={10}
        onChangePage={noop}
      />
    );

    const previousPage = wrapper.find(IconButton).at(1);

    previousPage.simulate('click');
    expect(previousPage.props().disabled).to.be.false;
  });

  beforeEach( () => {
    props = {};
  });
});
