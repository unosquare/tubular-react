import {
    TableBody, TableCell, TableRow,
    Typography
} from '@material-ui/core';
import { CheckBox, CheckBoxOutlineBlank, Warning } from '@material-ui/icons';
import * as moment from 'moment';
import * as React from 'react';

import { ColumnDataType } from './Models/Column';
import ColumnModel from './Models/ColumnModel';
import { GridConsumer } from './GridContext';

const renderCell = (column: ColumnModel, row: any) => {
    let rows = null;

    switch (column.DataType) {
        case ColumnDataType.NUMERIC:
            rows = row[column.Name] || 0;
            break;
        case ColumnDataType.DATE:
            rows = moment(row[column.Name]).format('MMMM Do YYYY') || '';
            break;
        case ColumnDataType.DATE_TIME:
        case ColumnDataType.DATE_TIME_UTC:
            rows = moment(row[column.Name]).format('MMMM Do YYYY, h:mm:ss a') || '';
            break;
        case ColumnDataType.BOOLEAN:
            rows = row[column.Name] === true ? <CheckBox /> : <CheckBoxOutlineBlank />;
            break;
        default:
            rows = row[column.Name];
            break;
    }

    return rows;
};

const GridBody: React.SFC = () => {
    return (<GridConsumer>
        {({ actions, state }) =>
            <TableBody>
                {state.data.map((row: any, rowIndex: number) => (
                    actions.bodyRenderer
                        ? actions.bodyRenderer(row, rowIndex)
                        : <TableRow hover={true} key={rowIndex}>
                            {
                                state.gridRequest.Columns
                                    .filter((col: any) => col.Visible)
                                    .map((column: ColumnModel, colIndex: number) =>
                                        <TableCell 
                                        key={colIndex} 
                                            padding={column.Label === '' ? 'none' : 'default'}>
                                            {
                                                renderCell(column, row)
                                            }
                                        </TableCell>)
                            }
                        </TableRow>
                ))}
                {state.filteredRecordCount === 0 &&
                    (<TableRow>
                        <Typography style={{ paddingLeft: '15px' }} variant='body2' gutterBottom={true}>
                            <Warning /> No records found
                    </Typography>
                    </TableRow>)}
            </TableBody>
        }
    </GridConsumer>);
};

export default GridBody;