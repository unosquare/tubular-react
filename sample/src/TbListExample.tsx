import * as React from 'react';

import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { useTbList } from '../../src/Hooks/useTbList';
import { TbList } from '../../src/TbList/TbList';
import columns from './data/columns';
import localData from './data/localData';
import { LocalStorage } from 'tubular-common';

const MyListItem: React.FunctionComponent = ({ rowStyle, selectedIndex, onItemClick, row }: any) => {
  return (
    <ListItem
      button={true}
      selected={selectedIndex === 0}
      onClick={onItemClick}
      style={rowStyle}
    >
      <ListItemText primary={`${row.OrderID} - ${row.CustomerName}`} />
    </ListItem>
  );
};

const TbListExampleWrapper = () => {
  const tbList = useTbList(
    columns,
    'https://tubular.azurewebsites.net/api/orders/paged',
    { storage: new LocalStorage() },
  );

  return (<TbListExample tbList={tbList} />);
};

const TbListExample: React.FunctionComponent<any> = ({ tbList }) => {
  const [data, setData] = React.useState(localData);

  const rowClick = (row: any) => {
    console.log('You clicked on a row: ', row);
  };

  const handleAddRow = () => {
    setData([...data, {
      Amount: 150.00,
      CustomerName: 'Tiempo Development',
      OrderID: 23,
      ShippedDate: '2016-01-04T18:00:00',
      ShipperCity: 'Monterrey, NL, Mexico',
    }]);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [searchText, setSearchText] = React.useState(null);

  const handleChangeSearch = (event: any) => {
    setSearchText(event.target.value);
    tbList.api.search(event.target.value);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColumnSelect = (colName: string) => (event: any) => {
    sortEvent(colName);
    handleClose();
  };

  const sortEvent = (columnName) => {
    tbList.api.sortByColumn(columnName);
  };

  return (
    <div className='root' style={{ width: '100%', height: '100%' }}>
      <div>
        <Button aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick}>
          Sort by
        </Button>
        <div>
          <TextField
            id='outlined-basic'
            label='Search'
            margin='normal'
            variant='outlined'
            value={searchText || ''}
            onChange={handleChangeSearch}
          />
        </div>
        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          keepMounted={true}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleColumnSelect('OrderID')}>OrderID</MenuItem>
          <MenuItem onClick={handleColumnSelect('CustomerName')}>CustomerName</MenuItem>
          <MenuItem onClick={handleColumnSelect('ShipperCity')}>ShipperCity</MenuItem>
        </Menu>
      </div>
      <div style={{ width: '250px', height: '100%' }}>
        <TbList
          tbInstance={tbList}
          listItemComponent={MyListItem}
          onItemClick={rowClick}
        />
      </div>
    </div>
  );
};

export default TbListExampleWrapper;
