export default class ToolbarOptions {
    public bottomPager: boolean;
    public exportButton: boolean;
    public printButton: boolean;
    public searchText: boolean;
    public topPager: boolean;

    constructor() {
       this.bottomPager = true;
       this.exportButton = true;
       this.printButton = true;
       this.searchText = true;
       this.topPager = true;
    }
}
