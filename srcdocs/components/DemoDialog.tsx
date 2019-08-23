import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

export default ({ onClose, open, forceRefresh }) => {
    const onCloseDialog = () => {
        forceRefresh();
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
