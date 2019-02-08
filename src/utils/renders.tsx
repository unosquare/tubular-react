import TableCell from '@material-ui/core/TableCell';
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';

import { format, getYear, parse } from 'date-fns';
import * as React from 'react';
import { ColumnDataType, ColumnModel } from 'tubular-common';

export const renderCellContent: any = (column: ColumnModel, row: any) => {
    switch (column.DataType) {
        case ColumnDataType.NUMERIC:
            return row[column.Name] || 0;
        case ColumnDataType.DATE:
            if (!row[column.Name]) {
                return '';
            }
            return getYear(parse(row[column.Name])) > 0 ? format(row[column.Name], 'M/D/YYYY') : '';
        case ColumnDataType.DATE_TIME:
        case ColumnDataType.DATE_TIME_UTC:
            if (!row[column.Name]) {
                return '';
            }
            return getYear(parse(row[column.Name])) > 0 ? format(row[column.Name], 'M/D/YYYY h:mm A') : '';
        case ColumnDataType.BOOLEAN:
            return row[column.Name] === true ? <CheckBox /> : <CheckBoxOutlineBlank />;
        default:
            return row[column.Name];
    }
};

export const renderCellAlign: any = (column: ColumnModel) => {
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
