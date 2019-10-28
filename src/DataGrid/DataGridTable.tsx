import Table from '@material-ui/core/Table';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';

import * as React from 'react';
import { ITbRow } from '../BareBones/TbRow';
import { IDataGrid } from '../DataGridInterfaces/IDataGrid';
import IDetailComponet from '../DataGridInterfaces/IDetailComponent';
import { GridBody } from './GridBody';
import { GridHeader } from './GridHeader';

interface IProps {
    grid: IDataGrid;
    rowComponent: React.FunctionComponent<ITbRow>;
    footerComponent: React.FunctionComponent<any>;
    detailComponent?: React.ReactElement<IDetailComponet>;
    onRowClick?(row: any): void;
}

export const DataGridTable: React.FunctionComponent<IProps> = (props) => {
    const Footer = props.footerComponent;

    return (
        <Table data-testid='data-grid-table'>
            <TableHead>
                <GridHeader grid={props.grid} />
            </TableHead>
            <GridBody
                grid={props.grid}
                rowComponent={props.rowComponent}
                onRowClick={props.onRowClick}
                detailComponent={props.detailComponent}
            />
            {
                props.footerComponent && (
                    <TableFooter>
                        <Footer aggregates={props.grid.state.aggregate} />
                    </TableFooter>
                )
            }
        </Table>
    );
};
