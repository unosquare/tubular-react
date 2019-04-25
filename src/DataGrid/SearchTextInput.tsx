import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Close from '@material-ui/icons/Close';
import Search from '@material-ui/icons/Search';

import * as React from 'react';

import { DataSourceContext } from '../DataSource';

const styles: any = {
  formControl: {
    margin: '10px',
    width: 250,
  },
};

export const SearchTextInput: React.FunctionComponent = () => {
  const { actions, state } = React.useContext(DataSourceContext);

  const onChange = (e: any) => actions.updateSearchText(e.target.value);
  const onClear = () => actions.updateSearchText('');

  return (
      <FormControl style={styles.formControl}>
        <Input
          fullWidth={true}
          type='text'
          value={state.searchText}
          onChange={onChange}
          startAdornment={
            <InputAdornment position='end'>
              <Search />
            </InputAdornment>
          }
          endAdornment={
            state.searchText !== '' && (
              <InputAdornment position='end'>
                <IconButton onClick={onClear}>
                  <Close />
                </IconButton>
              </InputAdornment>
            )
          }
        />
      </FormControl>
  );
};
