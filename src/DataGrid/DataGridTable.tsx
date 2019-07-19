import Table from '@material-ui/core/Table';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import * as React from 'react';

import GridBody from './GridBody';
import GridHeader from './GridHeader';
import { Paginator } from './Paginator';

export const DataGridTable: React.FunctionComponent<any> = ({
    bodyRenderer,
    footerRenderer,
    grid,
    onRowClick,
}) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <Paginator grid={grid} />
                </TableRow>
                <GridHeader grid={grid} />
            </TableHead>
            <GridBody grid={grid} bodyRenderer={bodyRenderer} />
            <TableFooter>
                {footerRenderer && footerRenderer(grid.state.aggregate)}
                <TableRow>
                    <Paginator grid={grid} />
                </TableRow>
            </TableFooter>
        </Table>
    );
};
