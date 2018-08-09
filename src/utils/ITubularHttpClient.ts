import { GridRequest } from 'tubular-common';

export default interface ITubularHttpClient {
    request: string | Request;

    fetch(gridRequest: GridRequest): Promise<any>;
}
