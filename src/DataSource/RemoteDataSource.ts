import { GridRequest, GridResponse } from 'tubular-common';
import { ITubularHttpClient, TubularHttpClient } from '../utils';
import BaseDataSource from './BaseDataSource';
import IBaseDataSourceState from './IBaseDataSourceState';

const withRemoteDataSource = (
  WrappedComponent: any,
  columns: any,
  request: string | Request | ITubularHttpClient) => {
  return class extends BaseDataSource {
    public setInitialState(value: any): IBaseDataSourceState {
      return {
        ...value,
        columns,
      };
    }

    public getWrappedComponent(): any {
      return WrappedComponent;
    }

    public async getAllRecords(gridRequest: GridRequest): Promise<GridResponse> {
      const httpCast = request as ITubularHttpClient;
      let httpClient: ITubularHttpClient;

      if (httpCast.request) {
        httpClient = httpCast;
      } else {
        httpClient = new TubularHttpClient(request);
      }

      const data = await httpClient.fetch(gridRequest);
      if (!TubularHttpClient.isValidResponse(data)) {
        throw new Error('Server response is a invalid Tubular object');
      }

      data.Payload = data.Payload.map((row: any) => TubularHttpClient.parsePayload(row, gridRequest.Columns));

      return data;
    }
  };
};

export default withRemoteDataSource;
