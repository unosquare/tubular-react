import { GridRequest } from 'tubular-common';
import ITubularHttpClient from './ITubularHttpClient';

export type FetchHandler = (request: string, gridRequest: GridRequest) => Promise<any>;

export default class ShallowHttpClient implements ITubularHttpClient {
    public request: string;
    public handler: FetchHandler;

    public constructor(url: string, handler: FetchHandler) {
        this.request = url;
        this.handler = handler;
    }

    public fetch(gridRequest: GridRequest): Promise<any> {
        return this.handler(this.request, gridRequest);
    }
}
