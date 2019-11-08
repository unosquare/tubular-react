import { ITbState } from './ITbState';

export interface ITbListInternalState {
    hasNextPage: boolean;
    items: any[];
}

export interface ITbListState extends ITbState {
    infiniteLoaderRef: React.RefObject<null>;
    list: ITbListInternalState;
}
