import Toolbar from '@material-ui/core/Toolbar';
import * as React from 'react';
import { ITbTableInstance } from 'tubular-react-common';
import { useResolutionSwitch, useToggle } from 'uno-react';
import { SearchTextInput } from '../Filtering/SearchTextInput';
import { ExportButton } from './ExportButton';
import { ToolbarOptions } from './ToolbarOptions';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TuneIcon from '@material-ui/icons/Tune';
import { FeaturesDrawer } from '../DataGrid/FeaturesDrawer';
import { ColumnModel, CompareOperators, columnHasFilter } from 'tubular-common';

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

    const applyFilters = (columns: ColumnModel[]): ColumnModel[] => {
        columns.forEach((fColumn) => {
            const column = columns.find((c: ColumnModel) => c.name === fColumn.name);

            if (columnHasFilter(fColumn)) {
                column.filterText = fColumn.filterText;
                column.filterOperator = fColumn.filterOperator;
                column.filterArgument = fColumn.filterArgument;

                if (
                    column.filterOperator === CompareOperators.Between &&
                    (!column.filterArgument || !column.filterArgument[0])
                ) {
                    column.filterOperator = CompareOperators.Gte;
                    column.filterArgument = null;
                }
            } else {
                column.filterText = null;
                column.filterOperator = CompareOperators.None;
                column.filterArgument = null;
            }
        });

        return columns;
    };

    const onApplyFeatures = (columns: ColumnModel[]) => {
        const newColumns = applyFilters(columns);
        tbTableInstance.api.setColumns(newColumns);
    };

    const [isPanelOpen, togglePanel] = useToggle(false);
    const enableFeaturesDrawer = tbTableInstance.state.columns.find((c) => c.filterable);

    return (
        <>
            <Toolbar data-testid="grid-toolbar">
                {toolbarOptions.title && <h2>{toolbarOptions.title}</h2>}
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

                {enableFeaturesDrawer && (
                    <Tooltip title="Grid features">
                        <IconButton aria-label="Grid features" onClick={togglePanel}>
                            <TuneIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Toolbar>
            {enableFeaturesDrawer && isPanelOpen && (
                <FeaturesDrawer
                    togglePanel={togglePanel}
                    columns={tbTableInstance.state.columns}
                    onApplyFeatures={onApplyFeatures}
                />
            )}
        </>
    );
};
