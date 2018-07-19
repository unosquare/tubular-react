import * as React from 'React' // Keep it
import Transformer, { GridRequest } from 'tubular-common';
import BaseDataSource from './BaseDataSource';
import IBaseDataSourceState from './IBaseDataSourceState';

const withLocalDataSource = (WrappedComponent: any, columns: any, source: any, itemsPerPage = 10) => {
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
      return new Promise((resolve, reject) => {
        try {
          resolve(Transformer.getResponse(request, source));
        } catch (error) {
          reject(error);
        }
      });
    }
  };
};

export default withLocalDataSource;
