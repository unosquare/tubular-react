export default class ToolbarOptions {
    public advancePagination: boolean;
    public bottomPager: boolean;
    public exportButton: boolean;
    public printButton: boolean;
    public searchText: boolean;
    public topPager: boolean;
    public rowsPerPageOptions: number[];
    public itemsPerPage: number;
    public exportButtonToolTip: string;
    public printButtonToolTip: string;

    constructor(options?: any) {
        this.advancePagination = options && 'advancePagination' in options ? options.advancePagination : true;
        this.bottomPager = options && 'bottomPager' in options ? options.bottomPager : true;
        this.exportButton = options && 'exportButton' in options ? options.exportButton : true;
        this.printButton = options && 'printButton' in options ? options.printButton : true;
        this.searchText = options && 'searchText' in options ? options.searchText : true;
        this.topPager = options && 'topPager' in options ? options.topPager : true;
        this.rowsPerPageOptions = options && 'rowsPerPageOptions' in options
            ? options.rowsPerPageOptions
            : [10, 20, 50, 100];
        this.itemsPerPage = options && 'itemsPerPage' in options ? options.itemsPerPage : 10;
    }
}
