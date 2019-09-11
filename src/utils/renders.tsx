import TableCell from '@material-ui/core/TableCell';
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import * as React from 'react';
import { ColumnDataType, ColumnModel, formatDate, getColumnAlign } from 'tubular-common';

export const renderCellContent: any = (column: ColumnModel, row: any) => {
    switch (column.DataType) {
        case ColumnDataType.NUMERIC:
            return row[column.Name] || 0;
        case ColumnDataType.DATE:
            return formatDate(row[column.Name]);
        case ColumnDataType.DATE_TIME:
        case ColumnDataType.DATE_TIME_UTC:
            return formatDate(row[column.Name], 'M/d/yyyy h:mm a');
        case ColumnDataType.BOOLEAN:
            return row[column.Name] === true ? <CheckBox /> : <CheckBoxOutlineBlank />;
        default:
            return row[column.Name];
    }
};

export const renderCells: any = (columns: ColumnModel[], row: any) =>
    columns
        .filter((col: ColumnModel) => col.Visible)
        .map((column: ColumnModel) =>
            (
                <TableCell
                    key={column.Name}
                    padding={column.Label === '' ? 'none' : 'default'}
                    align={getColumnAlign(column)}
                >
                    {renderCellContent(column, row)}
                </TableCell>
            ),
        );
