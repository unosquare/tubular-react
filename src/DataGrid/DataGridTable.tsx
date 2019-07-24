import Table from '@material-ui/core/Table';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';

import * as React from 'react';

import { ColumnModel } from 'tubular-common';
import { IDataGrid } from '../DataGridInterfaces/IDataGrid';
import { GridBody } from './GridBody';
import { GridHeader } from './GridHeader';

interface IProps {
    grid: IDataGrid;
    bodyRenderer?(row: any, index: number, columns: ColumnModel[]): React.ReactNode;
    footerRenderer?(aggregate: any): React.ReactNode;
    onRowClick?(ev: any): any;
}

export const DataGridTable: React.FunctionComponent<IProps> = (props) => {
    return (
        <Table>
            <TableHead>
                <GridHeader grid={props.grid} />
            </TableHead>
            <GridBody grid={props.grid} bodyRenderer={props.bodyRenderer} onRowClick={props.onRowClick} />
            <TableFooter>
                {props.footerRenderer && props.footerRenderer(props.grid.state.aggregate)}
            </TableFooter>
        </Table>
    );
};
