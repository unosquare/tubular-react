import { ITbListApi } from './ITbListApi';
import { ITbListState } from './ITbListState';

export interface ITbListInstance {
    state: ITbListState;
    api: ITbListApi;
}
