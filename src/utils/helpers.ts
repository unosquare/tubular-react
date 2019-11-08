import Transformer, {
    GridRequest,
    GridResponse,
    ITubularHttpClient,
    parsePayload,
    TubularHttpClient,
} from 'tubular-common';

let id = 0;

export const tbId = () => {
    return `tbComponent_${id++}`;
};

export const getLocalDataSource = (source: any[]) =>
    (request: GridRequest): Promise<GridResponse> => {
        return new Promise((resolve, reject) => {
            try {
                resolve(Transformer.getResponse(request, source));
            } catch (error) {
                reject(error);
            }
        });
    };

export const getRemoteDataSource = (request: string | Request | ITubularHttpClient) =>
    async (gridRequest: GridRequest): Promise<GridResponse> => {
        const httpCast = request as ITubularHttpClient;
        const httpClient: ITubularHttpClient = httpCast.request
            ? httpCast
            : new TubularHttpClient(request);

        const data = await httpClient.fetch(gridRequest);
        if (!TubularHttpClient.isValidResponse(data)) {
            throw new Error('Server response is a invalid Tubular object');
        }

        data.Payload = data.Payload
            .map((row: any) => parsePayload(row, gridRequest.Columns));

        return data;
    };

export const generateOnRowClickProxy = (onRowClick) => {
    return (row: any) => (ev: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
        if (onRowClick) {
            onRowClick(row);
        }
    };
};
