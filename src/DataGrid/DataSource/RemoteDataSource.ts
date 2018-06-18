import Axios from 'axios';
import GridRequest from '../Models/GridRequest';
import GridResponse from '../Models/GridResponse';
import BaseDataSource from './BaseDataSource';

export default class RemoteDataSource extends BaseDataSource {
  public getAllRecords(request: GridRequest): Promise<object> {
    return new Promise((resolve, reject) => {
      
      Axios.post(this.props.source, request).then((response) => {
        if (response.data === undefined || !this.isValidResponse(response.data)) {
          throw new Error('It\'s not a valid Tubular response object');
        }

        const rows = response.data.Payload.map((row: any) => {
          const obj: any = {};

          request.Columns.forEach((column: any, key: any) => {
            obj[column.Name] = row[key] || row[column.Name];
          });

          return obj;
        });

        resolve(new GridResponse({
          Aggregate: response.data.AggregationPayload,
          FilteredRecordCount: response.data.FilteredRecordCount,
          Payload: rows,
          TotalRecordCount: response.data.TotalRecordCount
        }));
      }).catch((error) => {
        reject(error);
      });
    });
  }

  public isValidResponse(response: object) {
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
    const responseKeys = Object.keys(response).sort();

    return JSON.stringify(expectedStructureKeys) === JSON.stringify(responseKeys);
  }
}
