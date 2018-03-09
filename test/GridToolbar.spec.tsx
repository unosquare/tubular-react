import { assert, expect } from 'chai';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import DownloadIcon from 'material-ui-icons/FileDownload';
import PrintIcon from 'material-ui-icons/Print';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Input from 'material-ui/Input';
import { createShallow } from 'material-ui/test-utils';
import Toolbar from 'material-ui/Toolbar';
import * as React from 'react';
import GridToolbar from '../src/DataGrid/GridToolbar';

Enzyme.configure({ adapter: new Adapter() });

describe('<GridToolbar/>', () => {
  let shallow;
  let mountedToolbar;
  let props;

  before(() => {
    shallow = createShallow({ dive: true });
  });

  const toolbar = () => {
    if (!mountedToolbar) {
      mountedToolbar = shallow(<GridToolbar {...props} />);
    }
    return mountedToolbar;
  };

  it('should render a Toolbar', () => {
    expect(toolbar().find(Toolbar)).to.have.lengthOf(1);
  });

  describe('isExportEnabled', () => {
    it('should render a export button when is set to true', () => {
      props.isExportEnabled = true;
      const wrapper = shallow(<GridToolbar {...props}/>);
      expect(wrapper.find(IconButton).find(DownloadIcon)).to.have.lengthOf(1);
    });

    it('should not render a export button when is set to false', () => {
      props.isExportEnabled = false;
      const wrapper = shallow(<GridToolbar {...props}/>);
      expect(wrapper.find(IconButton).find(DownloadIcon)).to.have.lengthOf(0);
    });
  });

  describe('isPrintEnabled', () => {
    it('should render a print button when is set to true', () => {
      props.isPrintEnabled = true;
      const wrapper = shallow(<GridToolbar {...props}/>);
      expect(wrapper.find(IconButton).find(PrintIcon)).to.have.lengthOf(1);
    });

    it('should not render a print button when is set to false', () => {
      props.isPrintEnabled = false;
      const wrapper = shallow(<GridToolbar {...props}/>);
      expect(wrapper.find(IconButton).find(PrintIcon)).to.have.lengthOf(0);
    });
  });

  describe('When input text changes', () => {
    it('should update state search text', () => {
      const wrapper = shallow(<GridToolbar {...props}/>);
      wrapper.find(Input).simulate('change', { target: { name: 'search', value: 'search' } });
      expect(wrapper.state().searchText).to.equal('search');
    });

    it('should update state of search text as \'\'', () => {
      const wrapper = shallow(<GridToolbar {...props}/>);
      wrapper.find(Input).simulate('change', { target: { name: 'search', value: '' } });
      wrapper.update();
      expect(wrapper.state().searchText).to.equal('');
    });
  });

  describe('When menu has been clicked', () => {
    it('should update the state of \'anchorEl\' as \'null\' when is closed', () => {
      props.isExportEnabled = true;
      const wrapper = shallow(<GridToolbar {...props}/>);
      wrapper.setState({ anchorEl: null as HTMLElement});
      wrapper.update();
      assert.isNull(wrapper.state().anchorEl);
    });

    it('should update the state of \'anchorEl\' with non \'null\' value', () => {
      props.isExportEnabled = true;
      const wrapper = shallow(<GridToolbar {...props}/>);
      wrapper.find(IconButton).simulate('click', { currentTarget: document.createElement('button') });
      wrapper.update();
      assert.isNotNull(wrapper.state().anchorEl);
    });
  });

  beforeEach( () => {
    props = {

    };
  });
});
