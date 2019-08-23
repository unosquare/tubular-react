export const dialogGrid = `
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
import React from 'react';
import { DataGrid, useGridRefresh, ToolbarOptions } from 'tubular-react';
import { useToggle } from 'uno-react';

const columns = [
  new ColumnModel('OrderID',
      {
          DataType: ColumnDataType.NUMERIC,
          Label: 'ID',
      }
  ),
  new ColumnModel('CustomerName',
    {
    }
  ),
  new ColumnModel('ShippedDate',
      {
          DataType: ColumnDataType.DATE_TIME,
      }
  ),
  new ColumnModel('ShipperCity'),
  new ColumnModel('Amount',
      {
          DataType: ColumnDataType.NUMERIC,
      }
  ),
  new ColumnModel('IsShipped',
      {
          DataType: ColumnDataType.BOOLEAN,
      }
  )
];

const Dialog = ({ onClose, open, forceRefresh }) => {
  const onCloseDialog = () => {
      forceRefresh(); //Using this we control when the grid reloads, avoiding unnecesary renders
      onClose();
  };

  return (
      <Dialog maxWidth='sm' open={open} onClose={onClose}>
        <DialogTitle>
          New Row
        </DialogTitle>
        <DialogContent>
          <Typography>
            Here you can add a new row!
          </Typography>
            <DialogActions>
              <Button
                onClick={onClose}
                color='secondary'
              >
                Cancel
                </Button>
              <Button
                onClick={onCloseDialog}
                color='primary'
              >
                Add
                </Button>
            </DialogActions>
        </DialogContent>
      </Dialog>
  );
};

export default () => {
    const [openDialog, toggleDialog] = useToggle(false);
    const [refresh, forceRefresh] = useGridRefresh();

    const toolbarButton = new ToolbarOptions({
        customItems: (
                <IconButton onClick={toggleDialog}>
                    <Add/>
                </IconButton>
        )
    });

    return (
        <React.Fragment>
            <DataGrid
                columns={columns}
                dataSource={'https://tubular.azurewebsites.net/api/orders/paged'}
                gridName='Grid'
                deps={[refresh]}
                toolbarOptions={toolbarButton}
            />
            <Dialog
                open={openDialog}
                forceRefresh={forceRefresh}
                onClose={toggleDialog}
            />
        </React.Fragment>
    );
};`;
