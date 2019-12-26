import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import makeStyles from '@material-ui/styles/makeStyles';
import * as React from 'react';
import { ColumnModel, DataGridStorage, TubularHttpClientAbstract } from 'tubular-common';
import { useTbTable } from 'tubular-react-common';
import { FixedLinearProgress } from 'uno-material-ui';
import { useResolutionSwitch } from 'uno-react';
import { ITbRow } from '../BareBones/TbRow';
import DetailComponet from '../DataGridInterfaces/DetailComponent';
import { Paginator } from '../Pagination';
import { GridToolbar } from '../Toolbar/GridToolbar';
import { ToolbarOptions } from '../Toolbar/ToolbarOptions';
import { DataGridTable } from './';
import { MobileDataGridTable } from './MobileDataGridTable';

const useStyles = makeStyles({
    linearProgress: {
        marginTop: '-10px',
    },
    root: {
        overflowX: 'auto',
        width: '100%',
    },
});

const timeout = 400;

interface IProps {
    columns: ColumnModel[];
    dataSource: {}[] | string | Request | TubularHttpClientAbstract;
    deps?: any[];
    detailComponent?: React.ReactElement<DetailComponet>;
    gridName: string;
    storage?: DataGridStorage;
    toolbarOptions?: ToolbarOptions;

    // ToDo: new ones:
    mobileBreakpointWidth?: number;
    rowComponent?: React.FunctionComponent<ITbRow>;
    rowMobileComponent?: React.FunctionComponent<ITbRow>;
    footerComponent?: React.FunctionComponent<any>;
    onError?(err: any): void;
    onRowClick?(row: any): void;
}

export const DataGrid: React.FunctionComponent<IProps> = (props: IProps) => {
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

    const [isMobileResolution] = useResolutionSwitch(mobileBreakpointWidth, timeout);

    if (isMobileResolution) {
        toolbarOptions.SetMobileMode();

        return (
            <Paper className={classes.root}>
                <GridToolbar toolbarOptions={toolbarOptions} tbTableInstance={tbTableInstance} gridName={gridName} />
                <FixedLinearProgress isLoading={tbTableInstance.state.isLoading} />
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

    const paginator = (position: string) => (
        <Table data-testid={`${position}-paginator`}>
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

    return (
        <Paper className={classes.root}>
            <GridToolbar gridName={gridName} toolbarOptions={toolbarOptions} tbTableInstance={tbTableInstance} />
            {toolbarOptions.topPager && paginator('top')}
            <div className={classes.linearProgress} data-testid="linear-progress">
                <FixedLinearProgress isLoading={tbTableInstance.state.isLoading} />
            </div>
            <DataGridTable
                tbTableInstance={tbTableInstance}
                rowComponent={rowComponent}
                footerComponent={footerComponent}
                detailComponent={detailComponent || null}
                onRowClick={onRowClick}
            />
            {toolbarOptions.bottomPager && paginator('bottom')}
        </Paper>
    );
};
