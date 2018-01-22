import Rx from 'Rx';
import Axios from 'axios';
import PropTypes from 'prop-types';

class RemoteDataSource {

  constructor(url, columns) {
    this.url = url;
    this.counter = 0;
    this.dataStream = new Rx.BehaviorSubject({ Payload: [] });
    this.columns = columns;
    this.errorMessage = '';
  }
  
  connect(rowsPerPage, page) {
    this._doRequest(rowsPerPage, page);
    return this.dataStream;
  }
  
  filter(rowsPerPage, page) {
    this._doRequest(rowsPerPage, page);
  }
  
  sort(rowsPerPage, page) {
    this._doRequest(rowsPerPage, page);
  }
  
  refresh(rowsPerPage, page) {
    this._doRequest(rowsPerPage, page);
  }

  handleError(error) {
    // TODO: Check what kind of error I'm receiving
    console.log(error);
  }

  handleValidateStructure(objectGiven) {
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
    const objectGivenKeys = Object.keys(objectGiven).sort();

    return JSON.stringify(expectedStructureKeys) === JSON.stringify(objectGivenKeys);
  }
  
  _doRequest(rowsPerPage, page) {
    const request = {
      'Count': this.counter++,
      'Columns': this.columns,
      'Skip': page * rowsPerPage,
      'Take': rowsPerPage,
      'Search': { 'Text': '', 'Operator': 'None' },
      'TimezoneOffset': 360
    };

    Axios.post(this.url, request).then(response => {
      if(response.data !== undefined) {
        if(this.handleValidateStructure(response.data)) {
          const data = response.data.Payload;
          const rows = data.map(row => {
            const obj = {};
          
            this.columns.forEach((column, key) => {
              obj[column.Name] = row[key] || row[column.Name];
            });
          
            return obj;
          });
      
          this.dataStream.onNext({ Payload: rows });
        }
      }
    }).catch(error => {
      this.handleError(error);
    });
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