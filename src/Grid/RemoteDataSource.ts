import Axios from 'axios';
import * as Rx from 'rx';
class RemoteDataSource {
  columns: Array<any>;
  dataStream: any;
  url: string;
  counter: number;

  static defaultColumnValues ={
    Sortable: false,
    Searchable: false,
    Aggregate: 'None',
    DataType: 'string',
    IsKey: false,
    Visible: true
  }

  constructor(url : string, columns : Array<any>) {
    this.url = url;
    this.counter = 0;
    this.dataStream = new Rx.BehaviorSubject({ payload: [] });
    this.columns = this._normalizeColumns(columns);
  }

  connect(rowsPerPage: number, page: number, searchText: number) {
    this._updateDataStream(rowsPerPage, page, searchText);
    return this.dataStream;
  }

  refresh(rowsPerPage: number, page: number, searchText: number){
    this._updateDataStream(rowsPerPage, page, searchText);
  }

  _normalizeColumns= (columns: Array<any>) => 
    columns.map(column => {
      const obj = Object.assign({}, RemoteDataSource.defaultColumnValues, column);
      if(column.Filtering){
        obj.Filter = {
          Argument: [],
          HasFilter: false,
          Name: obj.Name,
          Operator: 'None',
          OptionsUrl: null,
          Text: null
        };
      }      
      delete obj.Filtering;
      return obj;
    });   

  getAllRecords = (rowsPerPage: number, page: number, searchText: number) => new Promise((resolve :Function, reject:Function) => {
    const request = {
      'Count': this.counter++,
      'Columns': this.columns,
      'Skip': page * rowsPerPage,
      'Take': rowsPerPage,
      'Search': { 'Text': searchText ? searchText : '', 'Operator': 'Auto' },
      'TimezoneOffset': 360
    };
  
    Axios.post(this.url, request).then(response => {
      if(response.data === undefined || !this.isValidResponse(response.data))
        throw 'It\'s not a valid Tubular response object';
        
      const data = response.data.Payload;
      const rows = data.map((row:any) => {
        const obj: any = {};
        
        this.columns.forEach((column: any, key: any) => {
          obj[column.Name] = row[key] || row[column.Name];
        });
        
        return obj;
      });
      
      resolve({ 
        payload: rows,
        filteredRecordCount: response.data.FilteredRecordCount,
        totalRecordCount: response.data.TotalRecordCount,
        aggregate: response.data.AggregationPayload,
        searchText: searchText,
        rowsPerPage: rowsPerPage
      });
    }).catch(error => {
      reject(error);
    });
  })

  handleError(error: any) {
    if(error.status === 404) {
      throw 'Keys were not found';
    }
    else if(error.status === 500) {
      throw 'Internal server error';
    }
  }

  isValidResponse(response: Object) {
    const expectedStructure : any = {
      Counter: null,
      Payload: null,
      TotalRecordCount: null, 
      FilteredRecordCount: null,
      TotalPages: null,
      CurrentPage: null,
      AggregationPayload: null
    };

    const expectedStructureKeys = Object.keys(expectedStructure).sort();
    const responseKeys = Object.keys(response).sort();

    return JSON.stringify(expectedStructureKeys) === JSON.stringify(responseKeys);
  }
    
  _updateDataStream(rowsPerPage: number, page: number, searchText: number) {
    this.getAllRecords(rowsPerPage, page, searchText)
      .then( data => {
        this.dataStream.onNext(data);
      })
      .catch( error => {
        this.handleError(error);
      }) ;
  }
}

module.exports = RemoteDataSource;