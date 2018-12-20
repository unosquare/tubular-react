import {
    TableBody, TableCell, TableRow,
    Typography,
} from '@material-ui/core';
import { Warning } from '@material-ui/icons';
import * as React from 'react';
import { ColumnModel } from 'tubular-common';

import { DataSourceContext } from '../DataSource';
import { renderCells } from '../utils';

interface IProps {
    bodyRenderer?(row: any, index: number, columns: ColumnModel[]): any;
}

const GridBody: React.SFC<IProps> = ({ bodyRenderer }) => {
    return (
        <DataSourceContext.Consumer>
            {({ state }) =>
                <TableBody>
                    {state.data.map((row: any, rowIndex: number) => (
                        bodyRenderer
                            ? bodyRenderer(row, rowIndex, state.columns)
                            : <TableRow hover={true} key={rowIndex}>
                                {
                                    renderCells(state.columns, row)
                                }
                            </TableRow>
                    ))}
                    {state.filteredRecordCount === 0 && !state.isLoading &&
                        (<TableRow>
                            <TableCell colSpan={state.columns.filter((col: any) => col.Visible).length}>
                                <Typography style={{ paddingLeft: '15px' }} variant='body2' gutterBottom={true}>
                                    <Warning /> No records found
                                </Typography>
                            </TableCell>
                        </TableRow>)}
                </TableBody>}
        </DataSourceContext.Consumer>);
};

export default GridBody;
