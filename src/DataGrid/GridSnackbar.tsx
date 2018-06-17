import { Snackbar } from '@material-ui/core';
import * as React from 'react';

const GridSnackbar: React.SFC = () => {
      return (
    <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={4000}
        style={{ paddingTop: '10px' }}
        open={true}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id='message-id'>{this.state.errorMessage}</span>}
      />);
    };

    export default GridSnackbar;