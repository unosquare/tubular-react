import Axios from 'axios';
import PropTypes from 'prop-types';
import Rx from 'rx';

class RemoteDataSource {
  constructor(url, columns) {
    this.url = url;
    this.counter = 0;
    this.dataStream = new Rx.BehaviorSubject({ payload: [] });
    this.columns = columns;
  }

  connect(rowsPerPage, page, searchText) {
    this._updateDataStream(rowsPerPage, page, searchText);
    return this.dataStream;
  }

  filter(rowsPerPage, page) {
    this._updateDataStream(rowsPerPage, page);
  }
  
  sort(rowsPerPage, page) {
    this._updateDataStream(rowsPerPage, page);
  }

  search(rowsPerPage, page, searchText) {
    this._updateDataStream(rowsPerPage, page, searchText);
  }

  refresh(rowsPerPage, page, searchText) {
    this._updateDataStream(rowsPerPage, page, searchText);
  }

  getAllRecords = (rowsPerPage, page, searchText) => new Promise((resolve, reject) => {
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
      const rows = data.map(row => {
        const obj = {};
        
        this.columns.forEach((column, key) => {
          obj[column.Name] = row[key] || row[column.Name];
        });
        
        return obj;
      });
    
      resolve({ 
        payload: rows,
        filteredRecordCount: response.data.FilteredRecordCount,
        totalRecordCount: response.data.TotalRecordCount,
        aggregate: response.data.AggregationPayload 
      });
    }).catch(error => {
      reject(error);
    });
  })

  handleError(error) {
    if(error.status === 404) {
      throw 'Keys were not found';
    }
    else if(error.status === 500) {
      throw 'Internal server error';
    }
  }

  isValidResponse(response) {
    const expectedStructure = {
      'Counter': null,
      'Payload': null,
      'TotalRecordCount': null, 
      'FilteredRecordCount': null,
      'TotalPages': null,
      'CurrentPage': null,
      'AggregationPayload': null
    };

    const expectedStructureKeys = Object.keys(expectedStructure).sort();
    const responseKeys = Object.keys(response).sort();

    return JSON.stringify(expectedStructureKeys) === JSON.stringify(responseKeys);
  }
    
  _updateDataStream(rowsPerPage, page, searchText) {
    this.getAllRecords(rowsPerPage, page, searchText)
      .then( data => {
        this.dataStream.onNext(data);
      })
      .catch( error => {
        this.handleError(error);
      }) ;
  }
}

RemoteDataSource.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Label: PropTypes.string.isRequired,
      Sortable: PropTypes.bool,
      SortOrder: PropTypes.number,
      SortDirection: PropTypes.oneOf(['None', 'Asc', 'Desc']).isRequired,
      Searchable: PropTypes.bool.isRequired,
      Visible: PropTypes.bool.isRequired,
      IsKey: PropTypes.bool.isRequired,
      DataType: PropTypes.oneOf(['date', 'datetime', 'datetimeutc', 'numeric', 'boolean', 'string']).isRequired,
      Filter: PropTypes.any
    })).isRequired
};

module.exports = RemoteDataSource;