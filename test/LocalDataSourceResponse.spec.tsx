import LocalDataSourceResponse from '../src/DataSource/LocalDataSourceResponse';
import GridRequest from '../src/Models/GridRequest';
import GridResponse from '../src/Models/GridResponse';
import { simpleColumnsSample } from './utils/columns';
import { localData } from './utils/localData';
import {
  aggregateAverageRequest, aggregateCountRequest, aggregateDistinctCountRequest, aggregateMaxRequest,
  aggregateMinRequest, aggregateSumRequest,
    desendingOrderIdRequest, microsoftSearchRequest, page2Request, pageMinus1Request,
    pageSize20Request, simpleRequest,
} from './utils/requests';
import {
  aggregateAverageResponse, aggregateCountResponse, aggregateDistinctCountResponse, aggregateMaxResponse,
  aggregateMinResponse, aggregateSumResponse,
    desendingOrderIdResponse, page2Response, pageMinus1Response,
    pageSize20Response, searcTexthMicrosoftResponse, simpleResponse
} from './utils/responses';

const cases = [
  ['simple', simpleRequest, simpleResponse],
  ['with Page 2', page2Request, page2Response],
  ['with PageSize 20', pageSize20Request, pageSize20Response],
  ['with SearchText Microsoft', microsoftSearchRequest, searcTexthMicrosoftResponse],
  ['with SortOrder Id Desending', desendingOrderIdRequest, desendingOrderIdResponse],
  ['with aggregate function COUNT', aggregateCountRequest, aggregateCountResponse],
  ['with aggregate function SUM', aggregateSumRequest, aggregateSumResponse],
  ['with aggregate function AVERAGE', aggregateAverageRequest, aggregateAverageResponse],
  ['with aggregate function DISTINCT_COUNT', aggregateDistinctCountRequest, aggregateDistinctCountResponse],
  ['with aggregate function MAX', aggregateMaxRequest, aggregateMaxResponse],
  ['with aggregate function MIN', aggregateMinRequest, aggregateMinResponse],
  ['with aggregate function MIN', aggregateMinRequest, aggregateMinResponse],
  ['with Page -1', pageMinus1Request, pageMinus1Response]
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
