import LocalDataSourceResponse from '../src/DataSource/LocalDataSourceResponse';
import GridRequest from '../src/Models/GridRequest';
import GridResponse from '../src/Models/GridResponse';
import { simpleColumnsSample } from './utils/columns';
import { localData } from './utils/localData';
import {
    desendingOrderIdRequest, microsoftSearchRequest, page2Request,
    pageSize20Request, simpleRequest,
} from './utils/requests';
import {
    desendingOrderIdResponse, page2Response,
    pageSize20Response, searcTexthMicrosoftResponse, simpleResponse
} from './utils/responses';

const cases = [
  ['simple', simpleRequest, simpleResponse],
  ['with Page 2', page2Request, page2Response],
  ['with PageSize 20', pageSize20Request, pageSize20Response],
  ['with SearchText Microsoft', microsoftSearchRequest, searcTexthMicrosoftResponse],
  /*['with SortOrder Id Desending', desendingOrderIdRequest, desendingOrderIdResponse],
  ['with Page -1', {}, {}],
  */// ... continue pls
];

describe('LocalDataSourceResponse', () => {
  test('Should return a grid response', () => {
    expect(
        LocalDataSourceResponse.getResponse(
            new GridRequest(simpleColumnsSample, -1, 0, ''),
            localData)).toBeInstanceOf(GridResponse);
  });

  test.each(cases)('Should return response %s', (id: any, request: GridRequest, response: GridResponse) => {
    expect(LocalDataSourceResponse.getResponse(request, localData)).toEqual(response);
  });
});
