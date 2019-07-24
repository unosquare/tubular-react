import { CompareOperators } from 'tubular-common';

export interface IFilterWrapper {
    Argument: string[];
    HasFilter: boolean;
    Operator: CompareOperators;
    Text: string;
}
