
import GridRequest from '../Models/GridRequest';
import GridResponse from '../Models/GridResponse';
import BaseDataSource from './BaseDataSource';
import IBaseDataSourceState from './IBaseDataSourceState';
import LocalDataSourceResponse from './LocalDataSourceResponse'

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
          const response = LocalDataSourceResponse.getResponse(request, source);
          resolve(new GridResponse({
            Aggregate: response.aggregate,
            FilteredRecordCount: response.FilteredRecordCount,
            Payload: response.data.map((row: any) => this.parsePayload(row, request.Columns)),
            TotalRecordCount: response.TotalRecordCount
          }));
        } catch (error) {
          reject(error);
        }
      });
    }
  };
};

export default withLocalDataSource;
