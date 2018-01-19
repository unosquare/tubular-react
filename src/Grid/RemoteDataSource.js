import Rx from 'Rx';
import Axios from 'axios';


class RemoteDataSource {

    constructor(url) {
        this.url = url;
        this.counter = 0;
        this.dataStream = new Rx.BehaviorSubject({Payload: []});
    }

    connect(columns, rowsPerPage, page) {
        this._doRequest(columns, rowsPerPage, page);
        return this.dataStream;
    }

    filter(columns, rowsPerPage, page) {
        this._doRequest(columns, rowsPerPage, page);
    }

    sort(columns, rowsPerPage, page) {
        this._doRequest(columns, rowsPerPage, page);
    }

    refresh(columns, rowsPerPage, page) {
        this._doRequest(columns, rowsPerPage, page);
    }

    _doRequest(columns, rowsPerPage, page) {
        const request = {
            "Count": this.counter++,
            "Columns": columns,
            "Skip": page * rowsPerPage,
            "Take": rowsPerPage,
            "Search": { "Text": "", "Operator": "None" },
            "TimezoneOffset": 360
        };

        Axios.post(this.url, request).then(response => {
            const data = response.data.Payload;
            const rows = data.map(row => {
                const obj = {};

                columns.forEach((column, key) => {
                    obj[column.Name] = row[key] || row[column.Name];
                });

                return obj;
            });
            this.dataStream.onNext({ Payload: rows });
        });
    }
}

module.exports = RemoteDataSource;