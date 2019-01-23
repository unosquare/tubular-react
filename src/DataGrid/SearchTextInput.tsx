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

const SearchTextInput: React.FunctionComponent = () => {
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
