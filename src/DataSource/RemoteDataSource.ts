import * as React from 'react';
import { GridRequest } from 'tubular-common';
import BaseDataSource from './BaseDataSource';
import IBaseDataSourceState from './IBaseDataSourceState';

const expectedStructureKeys = JSON.stringify([
  'Aggregate',
  'Counter',
  'CurrentPage',
  'FilteredRecordCount',
  'Payload',
  'TotalPages',
  'TotalRecordCount']);

const withRemoteDataSource = (WrappedComponent: any, columns: any, url: string, itemsPerPage = 10) => {
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

    public getAllRecords(request: GridRequest): Promise<object> {
     return fetch(url, {
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        method: 'POST'
      })
        .then((response) => response.json())
        .then((data) => {
          if (!this.isValidResponse(data)) {
            throw new Error('Server response is a invalid Tubular object');
          }

          data.Payload = data.Payload.map((row: any) => this.parsePayload(row, request.Columns));
          return data;
        });
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
