import { TableCell } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import * as React from 'react';
import { ColumnModel, IFilterWrapper } from 'tubular-common';
import { ITbTableInstance } from 'tubular-react-common';
import IDetailComponet from '../DataGridInterfaces/IDetailComponent';
import { DialogModal } from '../Filtering/DialogModal';
import { GridHeaderCell } from './GridHeaderCell';

interface IProps {
    tbTableInstance: ITbTableInstance;
    detailComponent?: React.ReactElement<IDetailComponet>;
}

export const GridHeader: React.FunctionComponent<IProps> = ({ tbTableInstance, detailComponent }: IProps) => {
    const [anchorFilter, setAnchorFilter] = React.useState(null);
    const { api, state } = tbTableInstance;
    const setActiveColumn = (column: ColumnModel, event: React.MouseEvent<HTMLElement>) => {
        api.setActiveColumn(column);
        setAnchorFilter(event.currentTarget);
    };

    const setFilter = (filter: IFilterWrapper) => {
        api.setFilter(filter);
        setAnchorFilter(null);
    };

    return (
        <TableRow>
            {detailComponent && <TableCell key="Detail" padding="default" />}
            {state.activeColumn && (
                <DialogModal
                    activeColumn={state.activeColumn}
                    anchorFilter={anchorFilter}
                    setAnchorFilter={setAnchorFilter}
                    setFilter={setFilter}
                    handleFilterChange={api.handleFilterChange}
                />
            )}
            {state.columns
                .filter((col: ColumnModel) => col.Visible)
                .map((column: ColumnModel) => (
                    <GridHeaderCell
                        key={column.Name}
                        column={column}
                        sortColumn={api.sortColumn}
                        setActiveColumn={setActiveColumn}
                    />
                ))}
        </TableRow>
    );
};
