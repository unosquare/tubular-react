import { createShallow } from '@material-ui/core/test-utils';
import * as React from 'react';
import RemoteDataSource from '../src/DataGrid/DataSource/RemoteDataSource';
import ToolbarOptions from '../src/DataGrid/Models/ToolbarOptions';
import { validColumnsSample } from './utils/columns';

describe('RemoteDataSource', () => {
  let shallow;
  let remoteDataSource;
  let  toolbarOptions;

  beforeAll(() => {
    toolbarOptions = new ToolbarOptions();
    remoteDataSource = (
      <RemoteDataSource
        source='url'
        columns={validColumnsSample}
        itemsPerPage={toolbarOptions.itemsPerPage}
      />
    );
    shallow = createShallow({ dive: true });
  });
  test('Renders RemoteDataSource', () => {
      const component = shallow(remoteDataSource).inst;
      console.log('Entra a la prueba');
      console.log(component);
  });
});
