import Adapter from 'enzyme-adapter-react-16';
import Button from 'material-ui/Button';
import DownloadIcon from 'material-ui-icons/FileDownload';
import Enzyme from 'enzyme';
import GridToolbar from '../src/Grid/GridToolbar';
import IconButton from 'material-ui/IconButton';
import Input from 'material-ui/Input';
import PrintIcon from 'material-ui-icons/Print';
import PropTypes from 'prop-types';
import React from 'react';
import Toolbar from 'material-ui/Toolbar';
import { expect } from 'chai';
import { createMount, createShallow } from 'material-ui/test-utils';



Enzyme.configure({ adapter: new Adapter() });

describe('<GridToolbar/>', () => {
  let mount;
  let shallow;
  let mountedToolbar;
  let props;
  before(() => {
    mount = createMount();
    shallow = createShallow({ dive: true });
  });

  const toolbar = () => {
    if(!mountedToolbar){
      mountedToolbar = mount(<GridToolbar {...props} />);
    }
    return mountedToolbar;
  };

  it('should render a Toolbar', () => {
    expect(toolbar().find(Toolbar)).to.have.lengthOf(1);
  });

  describe('when isExportEnabled is true', () => {
    beforeEach(() => {
      props.isExportEnabled = true;    
    });
    it('should render a export button', () => {    
      const wrapper = shallow(<GridToolbar {...props}/>); 
      expect(wrapper.find(Button).find(DownloadIcon)).to.have.lengthOf(1);
    });

    describe('when export button is pressed', () => {         
      it('should update state anchorEl', () => {     
        const wrapper = shallow(<GridToolbar {...props}/>);          
        wrapper.find(Button).simulate('click', { currentTarget: 'element' });
        expect(wrapper.state().anchorEl).to.be.equal('element');
      });
    }); 
  });

  describe('when isPrintEnabled is true', () => {
    it('should render a print button', () => {
      props.isPrintEnabled = true;
      const wrapper = shallow(<GridToolbar {...props}/>);
      expect(wrapper.find(IconButton).find(PrintIcon)).to.have.lengthOf(1);
    });
  });

  describe('when input text changes', () => {
    it('should update state search text', () => {
      const wrapper = shallow(<GridToolbar {...props}/>);
      wrapper.find(Input).simulate('change', { target: { name: 'search', value: 'search' } });
      expect(wrapper.state().searchText).to.equal('search');
    });
  });

  beforeEach( () => {
    props = {

    };
  });
});
