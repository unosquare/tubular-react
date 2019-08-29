import * as React from 'react';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { DataGrid, LocalStorage } from '../../src';
import { ToolbarOptions } from '../../src/Toolbar/ToolbarOptions';
import columns from './data/columns';
import localData from './data/localData';

const LocalDataGrid: React.FunctionComponent = () => {
  const [getErrorMessage, setErrorMessage] = React.useState(null as string);
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

  const toolbarOptions = new ToolbarOptions({
    customItems: <Button onClick={handleAddRow}>Add new row</Button>,
  });

  return (
    <div className='root'>
      {getErrorMessage && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          style={{ paddingTop: '10px' }}
          open={true}
          ContentProps={{ 'aria-describedby': 'message-id' }}
          message={<span id='message-id'>{getErrorMessage}</span>}
        />
      )}
      <DataGrid
        columns={columns}
        dataSource={data}
        gridName='LocalDataGrid'
        storage={new LocalStorage()}
        onError={setErrorMessage}
        toolbarOptions={toolbarOptions}
        onRowClick={rowClick}
      />
    </div>
  );
};

export default LocalDataGrid;
