import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Close from '@material-ui/icons/Close';
import Search from '@material-ui/icons/Search';

import * as React from 'react';

const styles: any = {
  formControl: {
    margin: '10px',
    width: 250,
  },
};

interface ISearchTextInput {
  searchText: string;
  updateSearchText: (value: string) => any;
}

export const SearchTextInput: React.FunctionComponent<any> = ({ searchText, updateSearchText }) => {
  const onChange = (e: any) => updateSearchText(e.target.value);
  const onClear = () => updateSearchText('');

  return (
    <FormControl style={styles.formControl}>
      <Input
        fullWidth={true}
        type='text'
        value={searchText}
        onChange={onChange}
        startAdornment={
          <InputAdornment position='end'>
            <Search />
          </InputAdornment>
        }
        endAdornment={
          searchText !== '' && (
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
