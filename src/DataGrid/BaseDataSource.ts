import ColumnModel from './ColumnModel';
import * as Rx from 'rx';

export default abstract class BaseDataSource {

    public columns: ColumnModel[];
    protected static counter: number;

    constructor(columns: ColumnModel[]) {
        this.columns = columns;
        this.dataStream = new Rx.BehaviorSubject({ Payload: [] });
        BaseDataSource.counter = 0;
    }

    public dataStream: any;

    public retrieveData(rowsPerPage: number, page: number, searchText: string) {

        this.getAllRecords(rowsPerPage, page, searchText)
            .then((data) => {
                this.dataStream.onNext(data);
            })
            .catch((error) => {
                this.dataStream.onError(error);
            });

        return this.dataStream;
    }

    public abstract getAllRecords(rowsPerPage: number, page: number, searchText: string): Promise<object>;
}