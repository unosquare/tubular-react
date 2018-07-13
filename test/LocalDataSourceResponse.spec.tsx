import LocalDataSourceResponse from '../src/DataSource/LocalDataSourceResponse';
import GridRequest from '../src/Models/GridRequest';
import GridResponse from '../src/Models/GridResponse';
import { simpleColumnsSample } from './utils/columns';
import { localData } from './utils/localData';
import { simpleRequest } from './utils/requests';
import { simpleResponse } from './utils/responses';

const cases = [
  ['simple', simpleRequest, simpleResponse],
  ['with PageSize 20', {}, {}],
  ['with PageSize -1', {}, {}],
  ['with SearchText Microsoft', {}, {}],
  // ... continue pls
];

describe('LocalDataSourceResponse', () => {
  test('Should return a grid response', () => {
    expect(
        LocalDataSourceResponse.getResponse(
            new GridRequest(simpleColumnsSample, -1, 0, ''),
            localData)).toBeInstanceOf(GridResponse);
  });

  test.each(cases)('Should return response %s', (id : any, request : GridRequest, response : GridResponse) => {
    expect(LocalDataSourceResponse.getResponse(request, localData)).toEqual(response);
  });
});
