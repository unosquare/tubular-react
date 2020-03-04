import Toolbar from '@material-ui/core/Toolbar';
import * as React from 'react';
import { ITbTableInstance } from 'tubular-react-common';
import { useResolutionSwitch } from 'uno-react';
import { SearchTextInput } from '../Filtering/SearchTextInput';
import { ExportButton } from './ExportButton';
import { ToolbarOptions } from './ToolbarOptions';

const mobileSpacer: React.CSSProperties = { flexShrink: 1 };
const spacer: React.CSSProperties = { flex: '1 0' };

const outerWidth = 800;
const timeout = 400;

export interface GridToolbarProps {
    toolbarOptions: ToolbarOptions;
    gridName: string;
    tbTableInstance: ITbTableInstance;
}

export const GridToolbar: React.FunctionComponent<GridToolbarProps> = ({
    toolbarOptions,
    gridName,
    tbTableInstance,
}: GridToolbarProps) => {
    const [isMobileResolution] = useResolutionSwitch(outerWidth, timeout);

    return (
        <Toolbar data-testid="grid-toolbar">
            {toolbarOptions.title && (
                <h2>{toolbarOptions.title}</h2>
            )}
            <div style={isMobileResolution ? mobileSpacer : spacer} />
            {toolbarOptions.customItems}
            {toolbarOptions.exportButton && (
                <ExportButton
                    type="csv"
                    gridName={gridName}
                    exportTo={tbTableInstance.api.exportTo}
                    filteredRecordCount={tbTableInstance.state.filteredRecordCount}
                    data-testid="export-button-csv"
                />
            )}
            {toolbarOptions.printButton && (
                <ExportButton
                    type="print"
                    gridName={gridName}
                    exportTo={tbTableInstance.api.exportTo}
                    filteredRecordCount={tbTableInstance.state.filteredRecordCount}
                    data-testid="export-button-print"
                />
            )}
            {toolbarOptions.searchText && (
                <SearchTextInput
                    searchText={tbTableInstance.state.searchText}
                    updateSearchText={tbTableInstance.api.updateSearchText}
                    data-testid="search-text-input"
                />
            )}
        </Toolbar>
    );
};
