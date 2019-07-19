import { GridRequest } from "tubular-common";
import ITubularHttpClient from "../utils/ITubularHttpClient";
import TubularHttpClient from "../utils/TubularHttpClient";

const useRemoteDataSource = (request: string | Request | ITubularHttpClient) => {
    const getAllRecords = async (gridRequest: GridRequest) => {
        const httpCast = request as ITubularHttpClient;
        let httpClient: ITubularHttpClient;

        if (httpCast.request) {
            httpClient = httpCast;
        } else {
            httpClient = new TubularHttpClient(request);
        }

        const data = await httpClient.fetch(gridRequest);
        if (!TubularHttpClient.isValidResponse(data)) {
            throw new Error('Server response is a invalid Tubular object');
        }

        data.Payload = data.Payload.map((row: any) => TubularHttpClient.parsePayload(row, gridRequest.Columns));

        return data;
    };

    return [getAllRecords];
};

export default useRemoteDataSource;
