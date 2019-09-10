import TableCell from '@material-ui/core/TableCell';
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import format from 'date-fns/format';
import getYear from 'date-fns/getYear';
import parseISO from 'date-fns/parseISO';
import * as React from 'react';
import { ColumnDataType, ColumnModel } from 'tubular-common';

export const renderDateTimeCell: any = (value: any, formatString: string = 'M/d/yyyy') => {
    if (!value) {
        return '';
    }

    const parsedValue = parseISO(value);
    return getYear(parsedValue) > 0 ? format(parsedValue, formatString) : '';
};

export const renderCellContent: any = (column: ColumnModel, row: any) => {
    switch (column.DataType) {
        case ColumnDataType.NUMERIC:
            return row[column.Name] || 0;
        case ColumnDataType.DATE:
            return renderDateTimeCell(row[column.Name]);
        case ColumnDataType.DATE_TIME:
        case ColumnDataType.DATE_TIME_UTC:
            return renderDateTimeCell(row[column.Name], 'M/d/yyyy h:mm a');
        case ColumnDataType.BOOLEAN:
            return row[column.Name] === true ? <CheckBox /> : <CheckBoxOutlineBlank />;
        default:
            return row[column.Name];
    }
};

export const renderCellAlign: string = (column: ColumnModel) => {
    switch (column.DataType) {
        case ColumnDataType.NUMERIC:
            return 'right';
        case ColumnDataType.BOOLEAN:
            return 'center';
        default:
            return 'inherit';
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
                    align={renderCellAlign(column)}
                >
                    {renderCellContent(column, row)}
                </TableCell>
            ),
        );
