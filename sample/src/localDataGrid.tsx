import * as React from 'react';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { DataGrid, LocalStorage } from '../../src';
import useGridRefresh from '../../src/Hooks/useGridRefresh';
import { ToolbarOptions } from '../../src/Toolbar/ToolbarOptions';
import columns from './data/columns';
import localData from './data/localData';

const LocalDataGrid: React.FunctionComponent = () => {
  const [getErrorMessage, setErrorMessage] = React.useState(null as string);
  const toolbarOptions = new ToolbarOptions({
    customItems: <Button>Whatever</Button>,
  });
  const [data, setData] = React.useState(localData);
  const [refresh, forceRefresh] = useGridRefresh();

  const rowClick = (row) => {
    console.log("You clicked on a row: ", row);
  };

  const forceGridRefresh = () => {
    forceRefresh();
  };

  const handleAddRow = () => {
    setData([...data, {
      OrderID: 23,
      CustomerName: 'Tiempo Development',
      ShippedDate: '2016-01-04T18:00:00',
      ShipperCity: 'Monterrey, NL, Mexico',
      Amount: 150.00,
    }]);
  };

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
      <button onClick={handleAddRow}>Add new row</button>
      <button onClick={forceGridRefresh}>Force refresh</button>
      <DataGrid
        columns={columns}
        dataSource={data}
        deps={[refresh]}
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
