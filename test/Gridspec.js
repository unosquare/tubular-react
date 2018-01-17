import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import Grid from '../src/Grid/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import sinon from 'sinon';
import Enzyme, { mount, shallow } from 'enzyme';



Enzyme.configure({ adapter: new Adapter() });

describe('<Grid />', () => {
  let wrapper;

  before( () => {
    wrapper = shallow(<Grid/>);
  });
  
  it('should render a div', () => {
    const div = wrapper.find('div');
    expect(div).to.not.be.null;
  });
});
