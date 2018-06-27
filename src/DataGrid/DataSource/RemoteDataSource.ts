import * as React from 'react';
import Axios from 'axios';
import GridRequest from '../Models/GridRequest';
import GridResponse from '../Models/GridResponse';
import BaseDataSource from './BaseDataSource';
import IBaseDataSourceState from "./IBaseDataSourceState";

const expectedStructureKeys = JSON.stringify(Object.keys({
  AggregationPayload: null,
  Counter: null,
  CurrentPage: null,
  FilteredRecordCount: null,
  Payload: null,
  TotalPages: null,
  TotalRecordCount: null
}).sort());

const withRemoteDataSource = (WrappedComponent: any, columns: any, url: string, itemsPerPage = 10) => {
  return class extends BaseDataSource {
    public setInitialState(value: any): IBaseDataSourceState {
      return {
        ...value,
        columns: columns,
        itemsPerPage: itemsPerPage
      }
    }

    public getWrappedComponent(): any {
      return WrappedComponent;
    }

    public getAllRecords(request: GridRequest): Promise<object> {
      return Axios.post(url, request)
        .then((response) => {
          if (!this.isValidResponse(response.data)) {
            throw new Error('Server response is a invalid Tubular object');
          }

          return new GridResponse({
            Aggregate: response.data.AggregationPayload,
            FilteredRecordCount: response.data.FilteredRecordCount,
            Payload: response.data.Payload.map((row: any) => this.parsePayload(row, request.Columns)),
            TotalRecordCount: response.data.TotalRecordCount
          });
        });
    }

    public isValidResponse(data: any) {
      return data && expectedStructureKeys === JSON.stringify(Object.keys(data).sort());
    }
  }
}

export default withRemoteDataSource;
