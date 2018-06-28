import {
    TableBody, TableCell, TableRow,
    Typography
} from '@material-ui/core';
import { CheckBox, CheckBoxOutlineBlank, Warning } from '@material-ui/icons';
import { format } from 'date-fns';
import * as React from 'react';

import { DataSourceContext } from './DataSource/DataSourceContext';
import { ColumnDataType } from './Models/Column';
import ColumnModel from './Models/ColumnModel';

const renderCell = (column: ColumnModel, row: any) => {
    switch (column.DataType) {
        case ColumnDataType.NUMERIC:
            return row[column.Name] || 0;
        case ColumnDataType.DATE:
            return format(row[column.Name], 'MMMM Do YYYY') || '';
        case ColumnDataType.DATE_TIME:
        case ColumnDataType.DATE_TIME_UTC:
            return format(row[column.Name], 'MMMM Do YYYY, h:mm:ss a') || '';
        case ColumnDataType.BOOLEAN:
            return row[column.Name] === true ? <CheckBox /> : <CheckBoxOutlineBlank />;
        default:
            return row[column.Name];
    }
};

interface IProps {
    bodyRenderer?(row: any, index: number): any;
}

const GridBody: React.SFC<IProps> = ({ bodyRenderer }) => {
    return (
        <DataSourceContext.Consumer>
            {({ dataSource }) =>
                <TableBody>
                    {dataSource.data.map((row: any, rowIndex: number) => (
                        bodyRenderer
                            ? bodyRenderer(row, rowIndex)
                            : <TableRow hover={true} key={rowIndex}>
                                {
                                    dataSource.columns
                                        .filter((col: any) => col.Visible)
                                        .map((column: ColumnModel, colIndex: number) =>
                                            <TableCell
                                                key={colIndex}
                                                padding={column.Label === '' ? 'none' : 'default'}
                                            >
                                                {renderCell(column, row)}
                                            </TableCell>)
                                }
                            </TableRow>
                    ))}
                    {dataSource.filteredRecordCount === 0 &&
                        (<TableRow>
                            <TableCell colSpan={dataSource.columns.filter((col: any) => col.Visible).length}>
                                <Typography style={{ paddingLeft: '15px' }} variant='body2' gutterBottom={true}>
                                    <Warning /> No records found
                                </Typography>
                            </TableCell>
                        </TableRow>)}
                </TableBody>}
        </DataSourceContext.Consumer>);
};

export default GridBody;
