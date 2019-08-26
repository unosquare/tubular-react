import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import * as React from 'react';
import { ToolbarOptions } from '../../../src/Toolbar/ToolbarOptions';

export default (func) => new ToolbarOptions({
    advancePagination: false,
    bottomPager: false,
    customItems: (
        <IconButton onClick={func}>
            <Add />
        </IconButton>
    ),
    exportButton: false,
    printButton: false,
    searchText: false,
    topPager: false,
});
