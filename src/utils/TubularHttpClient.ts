import { GridRequest } from 'tubular-common';
import ITubularHttpClient from './ITubularHttpClient';

const expectedStructureKeys = JSON.stringify([
    'AggregationPayload',
    'Counter',
    'CurrentPage',
    'FilteredRecordCount',
    'Payload',
    'TotalPages',
    'TotalRecordCount']);

export default class TubularHttpClient implements ITubularHttpClient {
    public static resolveRequest(request: string | Request | ITubularHttpClient): string | Request {
        const httpCast = request as ITubularHttpClient;

        if (httpCast.request) {
            return httpCast.request;
        }

        return request as Request || request as string;
    }

    public static getRequest(objRequest: string | Request, gridRequest: GridRequest) {
        if (typeof objRequest === 'string') {
            return new Request(objRequest,
                {
                    body: JSON.stringify(gridRequest),
                    headers: new Headers({ 'Content-Type': 'application/json;charset=utf-8' }),
                    method: 'POST'
                });
        }

        (objRequest as Request).headers.append('Content-Type', 'application/json;charset=utf-8');
        return new Request(objRequest.url,
            {
                body: JSON.stringify(gridRequest),
                headers: (objRequest as Request).headers,
                method: (objRequest as Request).method
            });
    }

    public static isValidResponse(data: any) {
        return data && expectedStructureKeys === JSON.stringify(Object.keys(data).sort());
    }

    public static parsePayload(row: any, c: any[]) {
        return c.reduce((obj: any, column: any, key: any) => {
            obj[column.Name] = row[key] || row[column.Name];

            return obj;
        }, {});
    }

    public request: string | Request;

    public constructor(request: string | Request | ITubularHttpClient) {
        this.request = TubularHttpClient.resolveRequest(request);
    }

    public fetch(gridRequest: GridRequest): Promise<any> {
        return fetch(TubularHttpClient.getRequest(this.request, gridRequest))
            .then((response) => response.json());
    }
}
