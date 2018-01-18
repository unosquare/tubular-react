import Adapter from 'enzyme-adapter-react-16';
import { assert, expect } from 'chai';
import Grid from '../src/Grid/Grid';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import sinon, { spy } from 'sinon';
import Enzyme, { mount, shallow } from 'enzyme';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Axios from 'axios';

Enzyme.configure({ adapter: new Adapter() });

describe('<Grid />', () => {
  let mountedGrid;
  let props;

  const columns = [{
    key: 'key',
    label: 'col',
    sortable: true
  }];

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

  it('should have 1 column', () => {
    const columns = grid().find(TableHead).find(TableRow).find(TableCell);
    expect(columns).to.have.lengthOf(1);
  });

  it('should have 0 rows', () => {
    const rows = grid().find(TableBody).find(TableRow);
    expect(rows).to.have.lengthOf(0);
  });

  it('calls componentWillMount() lifecycle method', () => {
    const componentWillMountSpy = spy(Grid.prototype, 'componentWillMount');
    const wrapper = mount(<Grid { ...props } />);

    assert.ok(Grid.prototype.componentWillMount.calledOnce);

    componentWillMountSpy.restore();
  });

  beforeEach(() => {
    props = {
      data: [],
      columns: columns,
      serverUrl: 'https://jsonplaceholder.typicode.com/users'
    };
  });
});