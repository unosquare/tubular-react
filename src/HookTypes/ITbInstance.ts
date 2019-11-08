import { ITbApi } from './ITbApi';
import { ITbState } from './ITbState';

export interface ITbInstance {
    api: ITbApi;
    state: ITbState;
}
