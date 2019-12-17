import { ReactNode } from 'react';

export class ToolbarOptions {
    public advancePagination = true;
    public bottomPager = true;
    public customItems: ReactNode;
    public exportButton = true;
    public printButton = true;
    public searchText = true;
    public topPager = true;
    public rowsPerPageOptions: number[] = [10, 20, 50, 100];
    public itemsPerPage = 10;

    constructor(options?: Partial<ToolbarOptions>) {
        Object.assign(this, options);
    }

    public SetMobileMode() {
        this.advancePagination = false;
        this.bottomPager = false;
        this.exportButton = false;
        this.printButton = false;
        this.rowsPerPageOptions = [5, 10];
        this.topPager = false;
    }
}
