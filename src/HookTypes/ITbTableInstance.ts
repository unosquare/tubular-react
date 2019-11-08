import { ITbApi } from './ITbApi';
import { ITbState } from './ITbState';

export interface ITbTableInstance {
    api: ITbApi & {
        sortColumn: (columnName: string) => void;
    };

    state: ITbState;
}
