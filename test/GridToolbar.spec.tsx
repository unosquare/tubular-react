import { expect } from 'chai';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import DownloadIcon from 'material-ui-icons/FileDownload';
import PrintIcon from 'material-ui-icons/Print';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Input from 'material-ui/Input';
import { createMount, createShallow } from 'material-ui/test-utils';
import Toolbar from 'material-ui/Toolbar';
import * as React from 'react';
import GridToolbar from '../src/Grid/GridToolbar';

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
    if (!mountedToolbar) {
      mountedToolbar = shallow(<GridToolbar {...props} />);
    }
    return mountedToolbar;
  };

  it('should render a Toolbar', () => {
    expect(toolbar().find(Toolbar)).to.have.lengthOf(1);
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
