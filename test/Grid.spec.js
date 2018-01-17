import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import Grid from '../src/Grid/Grid';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import sinon from 'sinon';
import Enzyme, { mount, shallow } from 'enzyme';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

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

  beforeEach(() => {
    props = {
      data: [],
      columns: columns
    };
  });
});
