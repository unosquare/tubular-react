import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
} from '@material-ui/core';

import { Close, Search } from '@material-ui/icons';

import * as React from 'react';

import { DataSourceContext } from '../DataSource';

const styles: any = {
  formControl: {
    margin: '10px',
    width: 250,
  },
};

const SearchTextInput: React.SFC = () => {
  const onChange = (callback: any) => (e: any) => callback(e.target.value);
  const onClear = (callback: any) => () => callback('');

  return (
    <DataSourceContext.Consumer>
      {({ state, actions }) => (
        <FormControl style={styles.formControl}>
          <Input
            fullWidth={true}
            type='text'
            value={state.searchText}
            onChange={onChange(actions.updateSearchText)}
            startAdornment={
              <InputAdornment position='end'>
                <Search />
              </InputAdornment>
            }
            endAdornment={
              state.searchText !== '' && (
                <InputAdornment position='end'>
                  <IconButton onClick={onClear(actions.updateSearchText)}>
                    <Close />
                  </IconButton>
                </InputAdornment>
              )
            }
          />
        </FormControl>
      )}
    </DataSourceContext.Consumer>
  );
};

export default SearchTextInput;
