import Table from '@material-ui/core/Table';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';

import * as React from 'react';
import { ITbTableInstance } from 'tubular-react-common/types/ITbTableInstance';
import { ITbRow } from '../BareBones/TbRow';
import IDetailComponet from '../DataGridInterfaces/IDetailComponent';
import { GridBody } from './GridBody';
import { GridHeader } from './GridHeader';

interface IProps {
    tbTableInstance: ITbTableInstance;
    rowComponent: React.FunctionComponent<ITbRow>;
    footerComponent: React.FunctionComponent<any>;
    detailComponent?: React.ReactElement<IDetailComponet>;
    onRowClick?(row: any): void;
}

export const DataGridTable: React.FunctionComponent<IProps> = (props: IProps) => {
    const Footer = props.footerComponent;

    return (
        <Table data-testid="data-grid-table">
            <TableHead>
                <GridHeader tbTableInstance={props.tbTableInstance} />
            </TableHead>
            <GridBody
                tbTableInstance={props.tbTableInstance}
                rowComponent={props.rowComponent}
                onRowClick={props.onRowClick}
                detailComponent={props.detailComponent}
            />
            {props.footerComponent && (
                <TableFooter>
                    <Footer aggregates={props.tbTableInstance.state.aggregate} />
                </TableFooter>
            )}
        </Table>
    );
};
