import Table from '@material-ui/core/Table';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import * as React from 'react';

import GridBody from './GridBody';
import GridHeader from './GridHeader';
import { Paginator } from './Paginator';

import { DataSourceContext } from '../DataSource';
import { DataGridContext } from './DataGridContext';

export const DataGridTable: React.FunctionComponent<any> = ({
    bodyRenderer,
    footerRenderer,
    onRowClick,
}) => {
    const { state } = React.useContext(DataSourceContext);
    const { toolbarOptions } = React.useContext(DataGridContext);

    return (
        <Table>
            <TableHead>
                {toolbarOptions.topPager && (
                    <TableRow>
                        <Paginator
                            rowsPerPageOptions={toolbarOptions.rowsPerPageOptions}
                            advancePagination={toolbarOptions.advancePagination}
                        />
                    </TableRow>
                )}
                <GridHeader />
            </TableHead>
            <GridBody
                bodyRenderer={bodyRenderer}
                onRowClick={onRowClick}
            />
            <TableFooter>
                {footerRenderer && footerRenderer(state.aggregate)}
                {toolbarOptions.bottomPager && (
                    <TableRow>
                        <Paginator
                            rowsPerPageOptions={toolbarOptions.rowsPerPageOptions}
                            advancePagination={toolbarOptions.advancePagination}
                        />
                    </TableRow>
                )}
            </TableFooter>
        </Table>
    );
};
