import TableCell from '@material-ui/core/TableCell';
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import * as React from 'react';
import { ColumnDataType, ColumnModel, formatDate, getColumnAlign } from 'tubular-common';

export const renderCellContent: any = (column: ColumnModel, row: {}) => {
    switch (column.dataType) {
        case ColumnDataType.Numeric:
            return row[column.name] || 0;
        case ColumnDataType.Date:
            return formatDate(row[column.name]);
        case ColumnDataType.DateTime:
        case ColumnDataType.DateTimeUtc:
            return formatDate(row[column.name], 'M/d/yyyy h:mm a');
        case ColumnDataType.Boolean:
            return row[column.name] === true ? <CheckBox /> : <CheckBoxOutlineBlank />;
        default:
            return row[column.name];
    }
};

export const renderDefaultListItem: any = (columns: ColumnModel[], row: {}) =>
    columns
        .filter((col: ColumnModel) => col.visible)
        .map((column: ColumnModel) => <div key={column.name}>{renderCellContent(column, row)}</div>);

export const renderCells: any = (columns: ColumnModel[], row: {}) =>
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
