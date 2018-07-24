import * as React from 'react';
import { GridRequest } from 'tubular-common';
import BaseDataSource from './BaseDataSource';
import IBaseDataSourceState from './IBaseDataSourceState';

const expectedStructureKeys = JSON.stringify([
  'AggregationPayload',
  'Counter',
  'CurrentPage',
  'FilteredRecordCount',
  'Payload',
  'TotalPages',
  'TotalRecordCount']);

const withRemoteDataSource = (WrappedComponent: any, columns: any, request: string | Request, itemsPerPage = 10) => {
  return class extends BaseDataSource {
    public setInitialState(value: any): IBaseDataSourceState {
      return {
        ...value,
        columns,
        itemsPerPage
      };
    }

    public getWrappedComponent(): any {
      return WrappedComponent;
    }

    public getAllRecords(gridRequest: GridRequest): Promise<object> {
      return fetch(this.getRequest(request, gridRequest))
        .then((response) => response.json())
        .then((data) => {
          if (!this.isValidResponse(data)) {
            throw new Error('Server response is a invalid Tubular object');
          }

          data.Payload = data.Payload.map((row: any) => this.parsePayload(row, gridRequest.Columns));
          return data;
        });
    }

    public getRequest(objRequest: string | Request, gridRequest: GridRequest) {
      if (typeof objRequest === 'string') {
        return new Request(objRequest,
          {body: JSON.stringify(gridRequest),
          headers: new Headers({'Content-Type': 'application/json;charset=utf-8'}),
          method: 'POST'});
      }
      return objRequest;
    }

    public isValidResponse(data: any) {
      return data && expectedStructureKeys === JSON.stringify(Object.keys(data).sort());
    }

    public parsePayload(row: any, c: any[]) {
      return c.reduce((obj: any, column: any, key: any) => {
        obj[column.Name] = row[key] || row[column.Name];

        return obj;
      }, {});
    }
  };
};

export default withRemoteDataSource;
