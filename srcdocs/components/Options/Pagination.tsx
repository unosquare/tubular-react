import { ToolbarOptions } from '../../../src/Toolbar/ToolbarOptions';

export const AdvancedPagination = new ToolbarOptions({
    advancePagination: true,
    bottomPager: false,
    exportButton: false,
    printButton: false,
    searchText: false,
    topPager: true,
});

export const BasicPagination = new ToolbarOptions({
    advancePagination: false,
    bottomPager: true,
    exportButton: false,
    printButton: false,
    searchText: false,
    topPager: true,
});
