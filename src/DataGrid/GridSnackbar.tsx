import { Snackbar } from '@material-ui/core';
import * as React from 'react';

interface IProps {
  errorMessage: string;
}

const GridSnackbar: React.SFC<IProps> = ({errorMessage}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={4000}
      style={{ paddingTop: '10px' }}
      open={true}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id='message-id'>{errorMessage}</span>}
    />
  );
};

export default GridSnackbar;
