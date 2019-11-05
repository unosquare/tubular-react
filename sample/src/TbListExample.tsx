import * as React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { LocalStorage } from 'tubular-common';
import { TbList } from '../../src/TbList/TbList';
import columns from './data/columns';
import localData from './data/localData';

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

const TbListExample: React.FunctionComponent = () => {
  const [data, setData] = React.useState(localData);

  const rowClick = (row: any) => {
    console.log("You clicked on a row: ", row);
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

  return (
    <div className='root' style={{ width: '250px', height: '100%' }}>
      <TbList
        columns={columns}
        dataSource='https://tubular.azurewebsites.net/api/orders/paged'
        gridName='LocalTbList'
        storage={new LocalStorage()}
        listItemComponent={MyListItem}
        onItemClick={rowClick}
      />
    </div>
  );
};

export default TbListExample;
