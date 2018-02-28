import * as Rx from 'rx';
import ColumnModel from './ColumnModel';

export default abstract class BaseDataSource {

    protected static counter: number;

    public columns: ColumnModel[];
    public dataStream: any;

    constructor(columns: ColumnModel[]) {
        this.columns = columns;
        this.dataStream = new Rx.BehaviorSubject({ Payload: [] });
        BaseDataSource.counter = 0;
    }

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
