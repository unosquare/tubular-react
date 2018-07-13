import GridRequest from '../Models/GridRequest';
import BaseDataSource from './BaseDataSource';
import IBaseDataSourceState from './IBaseDataSourceState';
import LocalDataSourceResponse from './LocalDataSourceResponse';

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
          resolve(LocalDataSourceResponse.getResponse(request, source));
          reject('Invalid Response');
      });
    }
  };
};

export default withLocalDataSource;
