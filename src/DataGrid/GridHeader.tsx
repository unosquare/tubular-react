import { TableCell } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import * as React from 'react';
import { ColumnModel, FilterWrapper } from 'tubular-common';
import { ITbTableInstance } from 'tubular-react-common';
import DetailComponet from '../DataGridInterfaces/DetailComponent';
import { DialogModal } from '../Filtering/DialogModal';
import { GridHeaderCell } from './GridHeaderCell';

interface IProps {
    tbTableInstance: ITbTableInstance;
    detailComponent?: React.ReactElement<DetailComponet>;
}

export const GridHeader: React.FunctionComponent<IProps> = ({ tbTableInstance, detailComponent }: IProps) => {
    const [anchorFilter, setAnchorFilter] = React.useState(null);
    const { api, state } = tbTableInstance;
    const setActiveColumn = (column: ColumnModel, event: React.MouseEvent<HTMLElement>) => {
        api.setActiveColumn(column);
        setAnchorFilter(event.currentTarget);
    };

    const setFilter = (filter: FilterWrapper) => {
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
                .filter((col: ColumnModel) => col.visible)
                .map((column: ColumnModel) => (
                    <GridHeaderCell
                        key={column.name}
                        column={column}
                        sortColumn={api.sortColumn}
                        setActiveColumn={setActiveColumn}
                    />
                ))}
        </TableRow>
    );
};
