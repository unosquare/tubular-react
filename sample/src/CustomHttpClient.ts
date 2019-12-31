import { GridRequest, TubularHttpClientAbstract, TubularHttpClient } from 'tubular-common';

export default class CustomHttpClient implements TubularHttpClientAbstract {
    public request: string | Request;

    public constructor(request: string | Request | TubularHttpClientAbstract) {
        this.request = TubularHttpClient.resolveRequest(request);
    }

    public async fetch(gridRequest: GridRequest): Promise<{}> {
        const response = await fetch(TubularHttpClient.getRequest(this.request, gridRequest));
        const data = await response.json();
        data.payload = data.Payload;
        delete data.Payload;
        data.payload = data.counter;
        delete data.counter;
        data.payload = data.CurrentPage;
        delete data.currentPage;
        // We simulate always one page
        data.totalPages = 1;
        data.totalRecordCount = 10;
        data.filteredRecordCount = 10;

        return data;
    }
}
