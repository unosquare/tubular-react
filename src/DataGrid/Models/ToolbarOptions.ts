export default class ToolbarOptions {
    public bottomPager: boolean;
    public exportButton: boolean;
    public printButton: boolean;
    public searchText: boolean;
    public topPager: boolean;
    public rowsPerPageOptions: number [];
    public itemsPerPage: number;

    constructor(options?: any) {
       // TODO: Apply options
       this.bottomPager = true;
       this.exportButton = true;
       this.printButton = true;
       this.searchText = true;
       this.topPager = true;
       this.rowsPerPageOptions = [10, 20, 50, 100];
       this.itemsPerPage = 10;
    }
}
