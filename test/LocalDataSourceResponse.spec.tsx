import * as React from 'react';

import LocalDataSourceResponse from '../src/DataSource/LocalDataSourceResponse';
import GridRequest from '../src/Models/GridRequest';
import GridResponse from '../src/Models/GridResponse';
import { simpleColumnsSample } from './utils/columns';
import { localData } from './utils/localData';

describe('LocalDataSourceResponse', () => {
  test('Should return a grid response', () => {
    expect(
        LocalDataSourceResponse.getResponse(
            new GridRequest(simpleColumnsSample, -1, 0, ''),
            localData)).toBeInstanceOf(GridResponse);
  });
});
