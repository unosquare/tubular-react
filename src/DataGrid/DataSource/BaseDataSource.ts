import GridRequest from '../Models/GridRequest';

import { BehaviorSubject } from 'rxjs';

export default abstract class BaseDataSource {
    public dataStream: any;

    constructor() {
        this.dataStream = new BehaviorSubject({ Payload: [] });
    }

    public retrieveData(request: GridRequest) {
        this.getAllRecords(request)
            .then((data) => {
                this.dataStream.next(data);
            })
            .catch((error) => {
                this.dataStream.error(error);
            });

        return this.dataStream;
    }

    public abstract getAllRecords(request: GridRequest): Promise<object>;
}
