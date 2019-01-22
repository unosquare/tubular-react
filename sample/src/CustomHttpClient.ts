import { GridRequest } from 'tubular-common';
import ITubularHttpClient from '../../src/utils/ITubularHttpClient';
import TubularHttpClient from '../../src/utils/TubularHttpClient';

export default class CustomHttpClient implements ITubularHttpClient {
  public request: string | Request;

  public constructor(request: string | Request | ITubularHttpClient) {
    this.request = TubularHttpClient.resolveRequest(request);
  }

  public fetch(gridRequest: GridRequest): Promise<any> {
    return fetch(TubularHttpClient.getRequest(this.request, gridRequest))
      .then((response) => response.json())
      .then((data) => {
        // We simulate always one page
        data.TotalPages = 1;
        data.TotalRecordCount = 10;
        data.FilteredRecordCount = 10;
        return data;
      });
  }
}
