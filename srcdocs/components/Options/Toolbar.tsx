import { ToolbarOptions } from '../../../src/Toolbar/ToolbarOptions';

export const PrintButton = new ToolbarOptions({
    advancePagination: false,
    bottomPager: false,
    exportButton: false,
    printButton: true,
    searchText: false,
    topPager: false,
});

export const ExportButton = new ToolbarOptions({
    advancePagination: false,
    bottomPager: false,
    exportButton: true,
    printButton: false,
    searchText: false,
    topPager: false,
});

export const SearchText = new ToolbarOptions({
    advancePagination: false,
    bottomPager: false,
    exportButton: false,
    printButton: false,
    searchText: true,
    topPager: false,
});