import { GridRequest } from 'tubular-common';
import ITubularHttpClient from '../../src/utils/ITubularHttpClient';
import TubularHttpClient from '../../src/utils/TubularHttpClient';

export default class CustomHttpClient implements ITubularHttpClient {
  public request: string | Request;

  public constructor(request: string | Request | ITubularHttpClient) {
    this.request = TubularHttpClient.resolveRequest(request);
  }

  public async fetch(gridRequest: GridRequest): Promise<any> {
    const response = await fetch(TubularHttpClient.getRequest(this.request, gridRequest));
    const data = await response.json();
    // We simulate always one page
    data.TotalPages = 1;
    data.TotalRecordCount = 10;
    data.FilteredRecordCount = 10;
    return data;
  }
}
