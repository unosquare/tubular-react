import Axios from 'axios';
import GridRequest from '../Models/GridRequest';
import GridResponse from '../Models/GridResponse';
import BaseDataSource from './BaseDataSource';

export default class RemoteDataSource extends BaseDataSource {
  public getAllRecords(request: GridRequest): Promise<object> {
    return new Promise((resolve, reject) => {

      Axios.post(this.props.source, request).then((response) => {
        if (!this.isValidResponse(response.data)) {
          throw new Error('It\'s not a valid Tubular response object');
        }

        resolve(new GridResponse({
          Aggregate: response.data.AggregationPayload,
          FilteredRecordCount: response.data.FilteredRecordCount,
          Payload: response.data.Payload.map((row: any) => this.parsePayload(row, request.Columns)),
          TotalRecordCount: response.data.TotalRecordCount
        }));
      }).catch(reject);
    });
  }

  public isValidResponse(data: any) {
    if (!data) { return; }

    const expectedStructure: any = {
      AggregationPayload: null,
      Counter: null,
      CurrentPage: null,
      FilteredRecordCount: null,
      Payload: null,
      TotalPages: null,
      TotalRecordCount: null
    };

    const expectedStructureKeys = Object.keys(expectedStructure).sort();
    const responseKeys = Object.keys(data).sort();

    return JSON.stringify(expectedStructureKeys) === JSON.stringify(responseKeys);
  }
}
