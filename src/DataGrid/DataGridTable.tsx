import Table from '@material-ui/core/Table';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';

import * as React from 'react';

import { ColumnModel } from 'tubular-common';
import { IDataGrid } from '../DataGridInterfaces/IDataGrid';
import { GridBody } from './GridBody';
import { GridHeader } from './GridHeader';
import IDetailComponet from '../DataGridInterfaces/IDetailComponent';

interface IProps {
    grid: IDataGrid;
    bodyRenderer?(
        row: any,
        index: number,
        columns: ColumnModel[],
        onRowClickProxy: (row: any) => void,
    ): React.ReactNode;
    detailComponent?: React.ReactElement<IDetailComponet>;
    footerRenderer?(aggregate: any): React.ReactNode;
    onRowClick?(row: any): void;
}

export const DataGridTable: React.FunctionComponent<IProps> = (props) => (
    <Table data-testid='data-grid-table'>
        <TableHead>
            <GridHeader grid={props.grid} />
        </TableHead>
        <GridBody grid={props.grid} bodyRenderer={props.bodyRenderer} onRowClick={props.onRowClick} detailComponent={props.detailComponent} />
        <TableFooter>
            {props.footerRenderer && props.footerRenderer(props.grid.state.aggregate)}
        </TableFooter>
    </Table>
);
