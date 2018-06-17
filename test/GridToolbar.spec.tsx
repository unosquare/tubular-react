import { MenuItem } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import { createShallow } from '@material-ui/core/test-utils';
import Toolbar from '@material-ui/core/Toolbar';

import DownloadIcon from '@material-ui/icons/FileDownload';
import PrintIcon from '@material-ui/icons/Print';

import * as React from 'react';
import * as sinon from 'sinon';
import GridToolbar from '../src/DataGrid/GridToolbar';

describe('<GridToolbar/>', () => {
  let shallow;
  let mountedToolbar;
  let props;

  beforeEach(() => {
    shallow = createShallow({ dive: true });
  });

  afterEach(() => {
    window.localStorage.removeItem('tubular.Tubular-React_searchText');
  });

  const toolbar = () => {
    if (!mountedToolbar) {
      mountedToolbar = shallow(<GridToolbar {...props} />);
    }
    return mountedToolbar;
  };

  test('should render a Toolbar', () => {
    expect(toolbar().find(Toolbar)).toHaveLength(1);
  });

  test('should trigger \'componentDidMount()\' once time', () => {
    sinon.spy(GridToolbar.prototype, 'componentDidMount');
    window.localStorage.setItem('tubular.Tubular-React_searchText', 'micros');

    const wrapper = shallow(<GridToolbar {...props}/>);

    expect(wrapper.state().searchText).toEqual('micros');
    expect(GridToolbar.prototype.componentDidMount.calledOnce).toEqual(true);
  });

  describe('isExportEnabled', () => {
    test('should render a export button when is set to true', () => {
      props.isExportEnabled = true;
      const wrapper = shallow(<GridToolbar {...props}/>);
      expect(wrapper.find(IconButton).find(DownloadIcon)).toHaveLength(1);
    });

    test('should not render a export button when is set to false', () => {
      props.isExportEnabled = false;
      const wrapper = shallow(<GridToolbar {...props}/>);
      expect(wrapper.find(IconButton).find(DownloadIcon)).toHaveLength(0);
    });
  });

  describe('isPrintEnabled', () => {
    test('should render a print button when is set to true', () => {
      props.isPrintEnabled = true;
      const wrapper = shallow(<GridToolbar {...props}/>);
      expect(wrapper.find(IconButton).find(PrintIcon)).toHaveLength(1);
    });

    test('should not render a print button when is set to false', () => {
      props.isPrintEnabled = false;
      const wrapper = shallow(<GridToolbar {...props}/>);
      expect(wrapper.find(IconButton).find(PrintIcon)).toHaveLength(0);
    });
  });

  describe('When input text changes', () => {
    test('should update state search text', () => {
      props.searchText = true;
      const wrapper = shallow(<GridToolbar {...props}/>);

      wrapper.find(Input).simulate('change', { target: { name: 'search', value: 'search' } });
      expect(wrapper.state().searchText).toEqual('search');
    });

    test('should update state of search text as \'\'', () => {
      const wrapper = shallow(<GridToolbar {...props}/>);

      wrapper.setState({
        searchText: 'Wizeline'
      });

      wrapper.instance().clearSearchText();
      wrapper.update();

      expect(wrapper.state().searchText).toEqual('');
    });
  });

  describe('When menu has been clicked', () => {
    test('should update the state of \'anchorEl\' as \'null\' when is closed', () => {
      props.isExportEnabled = true;
      const wrapper = shallow(<GridToolbar {...props}/>);

      wrapper.setState({
        anchorEl: document.createElement('button')
      });
      wrapper.instance().handleMenuClose();
      wrapper.update();

      expect(wrapper.state().anchorEl).toBeNull();
    });

    test('should update the state of \'anchorPrint\' as \'null\' when is closed', () => {
      props.isPrintEnabled = true;

      const wrapper = shallow(<GridToolbar {...props}/>);

      wrapper.find(IconButton).simulate('click', { currentTarget: document.createElement('button') });
      expect(wrapper.state().anchorPrint).not.toBeNull();

      wrapper.instance().handlePrintMenuClose();
      expect(wrapper.state().anchorPrint).toBeNull();
    });

    test('should update the state of \'anchorEl\' with non \'null\' value', () => {
      props.isExportEnabled = true;
      const wrapper = shallow(<GridToolbar {...props}/>);
      wrapper.find(IconButton).simulate('click', { currentTarget: document.createElement('button') });
      wrapper.update();
      expect(wrapper.state().anchorEl).not.toBeNull();;
    });
  });

  describe('exportCSV()', () => {
    test('should update the state of \'anchorEl\' to \'null\'', () => {
      props.isExportEnabled = true;
      props.onExport = (filtered: boolean) => { return; };

      const wrapper = shallow(<GridToolbar {...props}/>);
      wrapper.setState({
        anchorEl: document.createElement('button')
      });

      expect(wrapper.state().anchorEl).not.toBeNull();;

      wrapper.instance().exportCSV(true, { preventDefault: () => { return; } });
      wrapper.update();

      expect(wrapper.state().anchorEl).toBeNull();;
    });

    test('Using simulate (\'All rows\'): should update the state of \'anchorEl\' to \'null\'', () => {
      props.isExportEnabled = true;
      props.onExport = (filtered: boolean) => { return; };

      // Setting the state before the change
      const wrapper = shallow(<GridToolbar {...props}/>);
      wrapper.setState({
        anchorEl: document.createElement('button')
      });

      expect(wrapper.state().anchorEl).not.toBeNull();;

      // Checking 'anchorEl' updated to 'null' when 'All rows' is clicked
      const exportIcon = wrapper.find(IconButton).simulate('click', { currentTarget: null });
      wrapper.update();

      const menuItems = wrapper.find(MenuItem);
      const menuItemAllCSV = menuItems.at(0).simulate('click', { preventDefault: () => { return; } });

      expect(wrapper.state().anchorEl).toBeNull();;
    });

    test('Using simulate (\'Current rows\'): should update the state of \'anchorEl\' to \'null\'', () => {
      props.isExportEnabled = true;
      props.onExport = (filtered: boolean) => { return; };

      // Setting the state before the change
      const wrapper = shallow(<GridToolbar {...props}/>);
      wrapper.setState({
        anchorEl: document.createElement('button')
      });
      expect(wrapper.state().anchorEl).not.toBeNull();

      // Checking 'anchorEl' updated to 'null' when 'Current rows' is clicked
      const exportIcon = wrapper.find(IconButton).simulate('click', { currentTarget: null });
      wrapper.update();

      const menuItems = wrapper.find(MenuItem);
      const menuItemAllCSV = menuItems.at(1).simulate('click', { preventDefault: () => { return; } });

      expect(wrapper.state().anchorEl).toBeNull();
    });
  });

  describe('printTable()', () => {
    test('should update the state of \'anchorPrint\' to \'null\'', () => {
      props.isPrintEnabled = true;
      props.onPrint = (filtered: boolean) => { return; };

      const wrapper = shallow(<GridToolbar {...props}/>);
      wrapper.setState({
        anchorPrint: document.createElement('button')
      });

      expect(wrapper.state().anchorPrint).not.toBeNull();

      wrapper.instance().printTable(true, { preventDefault: () => { return; } });
      wrapper.update();

      expect(wrapper.state().anchorPrint).toBeNull();
    });

    test('Using simulate (\'All rows\'): should update the state of \'anchorPrint\' to \'null\'', () => {
      props.isPrintEnabled = true;
      props.onPrint = (filtered: boolean) => { return; };

      const wrapper = shallow(<GridToolbar {...props}/>);
      wrapper.setState({
        anchorPrint: document.createElement('button')
      });
      expect(wrapper.state().anchorPrint).not.toBeNull();

      const printIcon = wrapper.find(IconButton).simulate('click', { currentTarget: null });
      wrapper.update();

      const menuItems = wrapper.find(MenuItem);
      const menuItemPrintAll = menuItems.at(0).simulate('click', { preventDefault: () => { return; } });

      expect(wrapper.state().anchorPrint).toBeNull();
    });

    test('Using simulate (\'Current rows\'): should update the state of \'anchorPrint\' to \'null\'', () => {
      props.isPrintEnabled = true;
      props.onPrint = (filtered: boolean) => { return; };

      const wrapper = shallow(<GridToolbar {...props}/>);
      wrapper.setState({
        anchorPrint: document.createElement('button')
      });
      expect(wrapper.state().anchorPrint).not.toBeNull();

      const printIcon = wrapper.find(IconButton).simulate('click', { currentTarget: null });
      wrapper.update();

      const menuItems = wrapper.find(MenuItem);
      const menuItemPrintAll = menuItems.at(1).simulate('click', { preventDefault: () => { return; } });

      expect(wrapper.state().anchorPrint).toBeNull();
    });
  });

  beforeEach( () => {
    props = {
      gridName: 'Tubular-React'
    };
  });
});