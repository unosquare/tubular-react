import { ReactNode } from 'react';

export class ToolbarOptions {
    public advancePagination: boolean = true;
    public bottomPager: boolean = true;
    public customItems: ReactNode;
    public exportButton: boolean = true;
    public printButton: boolean = true;
    public searchText: boolean = true;
    public topPager: boolean = true;
    public rowsPerPageOptions: number[] = [10, 20, 50, 100];
    public itemsPerPage: number = 10;

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
