import TableCell from '@material-ui/core/TableCell';
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import * as React from 'react';
import { ColumnDataType, ColumnModel, getColumnAlign, parseDateColumnValue } from 'tubular-common';

export const formatDate = (date: Date) =>
    date.toLocaleString('en-us', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

export const formatDateTime = (date: Date) =>
    date.toLocaleString('en-us', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

export const renderCellContent: any = (column: ColumnModel, row: any) => {
    const value = row[column.name];
    switch (column.dataType) {
        case ColumnDataType.Numeric:
            return value || 0;
        case ColumnDataType.Date:
        case ColumnDataType.DateTime:
        case ColumnDataType.DateTimeUtc:
            const dateAsString = !value ? '' : parseDateColumnValue(column, value);
            return dateAsString;
        case ColumnDataType.Boolean:
            return value === true ? <CheckBox /> : <CheckBoxOutlineBlank />;
        default:
            return value;
    }
};

export const renderDefaultListItem: any = (columns: ColumnModel[], row: any) =>
    columns
        .filter((col: ColumnModel) => col.visible)
        .map((column: ColumnModel) => <div key={column.name}>{renderCellContent(column, row)}</div>);

export const renderCells: any = (columns: ColumnModel[], row: any) =>
    columns
        .filter((col: ColumnModel) => col.visible)
        .map((column: ColumnModel) => (
            <TableCell
                key={column.name}
                padding={column.label === '' ? 'none' : 'default'}
                align={getColumnAlign(column)}
            >
                {renderCellContent(column, row)}
            </TableCell>
        ));
