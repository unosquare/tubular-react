import * as React from 'react';
import Axios from 'axios';
import GridRequest from '../Models/GridRequest';
import GridResponse from '../Models/GridResponse';
import BaseDataSource from './BaseDataSource';
import IBaseDataSourceState from "./IBaseDataSourceState";

const expectedStructure: any = {
  AggregationPayload: null,
  Counter: null,
  CurrentPage: null,
  FilteredRecordCount: null,
  Payload: null,
  TotalPages: null,
  TotalRecordCount: null
};

const withRemoteDataSource = (WrappedComponent: any, columns: any, url: string, itemsPerPage = 10) => {
  return class extends BaseDataSource {
    setInitialState(value: any): IBaseDataSourceState {
      return {
        ...value,
        columns: columns,
        itemsPerPage: itemsPerPage
      }
    }

    getWrappedComponent(): any {
      return WrappedComponent;
    }

    public getAllRecords(request: GridRequest): Promise<object> {
      return Axios.post(url, request)
        .then((response) => {
          if (!this.isValidResponse(response.data)) {
            throw new Error('It\'s not a valid Tubular response object');
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
      if (!data) { return; }

      const expectedStructureKeys = Object.keys(expectedStructure).sort();
      const responseKeys = Object.keys(data).sort();

      return JSON.stringify(expectedStructureKeys) === JSON.stringify(responseKeys);
    }
  }
}

export default withRemoteDataSource;
