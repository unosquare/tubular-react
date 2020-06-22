import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import makeStyles from '@material-ui/styles/makeStyles';
import * as React from 'react';
import { ColumnModel, DataGridStorage, TubularHttpClientAbstract, CompareOperators } from 'tubular-common';
import { useTbTable } from 'tubular-react-common';
import { useResolutionSwitch } from 'uno-react';
import { TbRowProps } from '../BareBones/TbRow';
import DetailComponet from '../DataGridInterfaces/DetailComponent';
import { Paginator } from '../Pagination';
import { GridToolbar } from '../Toolbar/GridToolbar';
import { ToolbarOptions } from '../Toolbar/ToolbarOptions';
import { DataGridTable } from './';
import { MobileDataGridTable } from './MobileDataGridTable';
import { ChipBar } from '../Filtering/ChipBar';
import { TbSelection } from '../utils/Selection';

const useStyles = makeStyles({
    linearProgress: {
        marginTop: '-10px',
        height: '20px',
    },
    root: {
        overflowX: 'auto',
        width: '100%',
    },
});

const timeout = 400;

export interface DataGridProps {
    columns: ColumnModel[];
    dataSource: any[] | string | Request | TubularHttpClientAbstract;
    deps?: any[];
    detailComponent?: React.ReactElement<DetailComponet>;
    gridName: string;
    storage?: DataGridStorage;
    toolbarOptions?: ToolbarOptions;

    // ToDo: new ones:
    mobileBreakpointWidth?: number;
    rowComponent?: React.FunctionComponent<TbRowProps>;
    rowMobileComponent?: React.FunctionComponent<TbRowProps>;
    footerComponent?: React.FunctionComponent<any>;
    onError?(err: string): void;
    onRowClick?(row: {}): void;
    rowSelectionEnabled?: boolean;
    onRowCheck?: any;
    onAllRowsCheck?: any;
}

export const DataGrid: React.FunctionComponent<DataGridProps> = (props: DataGridProps) => {
    const {
        columns,
        dataSource,
        deps,
        footerComponent,
        gridName,
        mobileBreakpointWidth = props.mobileBreakpointWidth || 800,
        onError,
        onRowClick,
        rowComponent,
        rowMobileComponent,
        storage,
        toolbarOptions = props.toolbarOptions || new ToolbarOptions(),
        detailComponent,
        rowSelectionEnabled,
    } = props;

    const classes = useStyles({});

    const tbTableInstance = useTbTable(columns, dataSource, {
        callbacks: { onError },
        componentName: gridName,
        deps,
        pagination: {
            itemsPerPage: toolbarOptions.itemsPerPage,
        },
        storage,
    });

    const [rowSelection, setRowSelection] = React.useState({} as any);
    const toggleRowSelection = (id: string) => setRowSelection({ ...rowSelection, [id]: !rowSelection[id] });
    const getSelectedCount = () => Object.keys(rowSelection).filter((k) => rowSelection[k]).length;
    const getUnSelectedCount = () => Object.keys(rowSelection).filter((k) => !rowSelection[k]).length;
    const isIndeterminateSelection = () =>
        Object.keys(rowSelection).length > 0 && getSelectedCount() > 0 && getUnSelectedCount() > 0;

    const toggleAllRowsSelection = () => {
        const unSelectedCount = Object.keys(rowSelection).filter((k) => !rowSelection[k]).length;

        // all rows are selected
        if (unSelectedCount === 0) {
            const newRowSelection: any = {};
            Object.keys(rowSelection).forEach((f) => (newRowSelection[f] = false));
            setRowSelection(newRowSelection);
            console.log(newRowSelection);
            return;
        }

        // Indeterminate | non-selected
        const newRowSelection: any = {};
        Object.keys(rowSelection).forEach((f) => (newRowSelection[f] = true));
        console.log(newRowSelection);
        setRowSelection(newRowSelection);
    };
    const selection: TbSelection = {
        rowSelection,
        toggleRowSelection,
        toggleAllRowsSelection,
        getSelectedCount,
        getUnSelectedCount,
        isIndeterminateSelection,
    };

    const [isMobileResolution] = useResolutionSwitch(mobileBreakpointWidth, timeout);

    React.useEffect(() => {
        if (rowSelectionEnabled) {
            const cols = tbTableInstance.state.columns;
            const keyColumn = cols.find((c) => c.isKey).name;
            const newSelection: any = { ...rowSelection };
            tbTableInstance.state.data.forEach((row: any) => {
                if (newSelection[row[keyColumn]] === undefined) {
                    newSelection[row[keyColumn]] = false;
                }
            });

            setRowSelection(newSelection);
        }
    }, [tbTableInstance.state.data]);

    if (isMobileResolution) {
        toolbarOptions.SetMobileMode();

        return (
            <Paper className={classes.root}>
                <GridToolbar toolbarOptions={toolbarOptions} tbTableInstance={tbTableInstance} gridName={gridName} />
                <div className={classes.linearProgress} data-testid="linear-progress">
                    {tbTableInstance.state.isLoading && <LinearProgress />}
                </div>
                <MobileDataGridTable
                    tbTableInstance={tbTableInstance}
                    onRowClick={onRowClick}
                    rowComponent={rowMobileComponent}
                />
                <Paginator
                    advancePagination={toolbarOptions.advancePagination}
                    rowsPerPageOptions={toolbarOptions.rowsPerPageOptions}
                    tbTableInstance={tbTableInstance}
                />
            </Paper>
        );
    }

    const paginator = (
        <Table data-testid="paginator">
            <TableHead>
                <TableRow>
                    <Paginator
                        advancePagination={toolbarOptions.advancePagination}
                        rowsPerPageOptions={toolbarOptions.rowsPerPageOptions}
                        tbTableInstance={tbTableInstance}
                    />
                </TableRow>
            </TableHead>
        </Table>
    );

    const applyOrResetFilter = (columnName: string, value?: string) => {
        const newColumns = tbTableInstance.state.columns.map((column) => {
            if (column.name === columnName) {
                return {
                    ...column,
                    filterText: value,
                    filterOperator: !!value ? CompareOperators.Equals : CompareOperators.None,
                    filterArgument: !!value ? [] : null,
                };
            }

            return column;
        });

        tbTableInstance.api.setColumns(newColumns);
    };

    return (
        <Paper className={classes.root}>
            <GridToolbar gridName={gridName} toolbarOptions={toolbarOptions} tbTableInstance={tbTableInstance} />
            <div className={classes.linearProgress} data-testid="linear-progress">
                {tbTableInstance.state.isLoading && <LinearProgress />}
            </div>
            <ChipBar columns={tbTableInstance.state.columns} onClearFilter={applyOrResetFilter} />
            <DataGridTable
                tbTableInstance={tbTableInstance}
                rowComponent={rowComponent}
                footerComponent={footerComponent}
                detailComponent={detailComponent || null}
                onRowClick={onRowClick}
                rowSelectionEnabled={rowSelectionEnabled}
                selection={selection}
            />
            {toolbarOptions.enablePagination && paginator}
        </Paper>
    );
};
