import Table from '@material-ui/core/Table';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';

import * as React from 'react';

import GridBody from './GridBody';
import GridHeader from './GridHeader';

export const DataGridTable: React.FunctionComponent<any> = ({
    bodyRenderer,
    footerRenderer,
    grid,
}) => {
    return (
        <Table>
            <TableHead>
                <GridHeader grid={grid} />
            </TableHead>
            <GridBody grid={grid} bodyRenderer={bodyRenderer} />
            <TableFooter>
                {footerRenderer && footerRenderer(grid.state.aggregate)}
            </TableFooter>
        </Table>
    );
};
