import Table from '@material-ui/core/Table';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';

import * as React from 'react';
import { ITbTableInstance } from 'tubular-react-common';
import { TbRowProps } from '../BareBones/TbRow';
import { GridBody } from './GridBody';
import { GridHeader } from './GridHeader';
import { TbSelection } from '../utils/Selection';
import DetailComponentProps from '../BareBones/DetailComponentProps';

export interface DataGridTableProps {
    tbTableInstance: ITbTableInstance;
    rowComponent: React.FunctionComponent<TbRowProps>;
    footerComponent: React.FunctionComponent<any>;
    detailComponent?: React.FunctionComponent<DetailComponentProps>;
    rowSelectionEnabled?: boolean;
    selection?: TbSelection;
    onRowClick?(row: any): void;
}

export const DataGridTable: React.FunctionComponent<DataGridTableProps> = (props: DataGridTableProps) => {
    const Footer = props.footerComponent;

    return (
        <Table data-testid="data-grid-table">
            <TableHead>
                <GridHeader
                    detailComponent={props.detailComponent}
                    tbTableInstance={props.tbTableInstance}
                    rowSelectionEnabled={props.rowSelectionEnabled}
                    selection={props.selection}
                />
            </TableHead>
            <GridBody
                tbTableInstance={props.tbTableInstance}
                rowComponent={props.rowComponent}
                onRowClick={props.onRowClick}
                detailComponent={props.detailComponent}
                rowSelectionEnabled={props.rowSelectionEnabled}
                selection={props.selection}
            />
            {props.footerComponent && (
                <TableFooter>
                    <Footer aggregates={props.tbTableInstance.state.aggregate} />
                </TableFooter>
            )}
        </Table>
    );
};
