import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import Warning from '@material-ui/icons/Warning';
import * as React from 'react';
import { ColumnModel } from 'tubular-common';

import { DataSourceContext } from '../DataSource';
import { renderCells } from '../utils';

interface IProps {
    bodyRenderer?(row: any, index: number, columns: ColumnModel[]): void;
    onRowClick?(ev: any): any;
}

const getStyles = (isPointer: boolean) => ({
    row: { cursor: isPointer ? 'pointer' : 'auto' },
    title: { paddingLeft: '15px' },
});

const GridBody: React.FunctionComponent<IProps> = ({ bodyRenderer, onRowClick }) => {
    const { state } = React.useContext(DataSourceContext);
    // tslint:disable-next-line:no-empty
    const onRowClickProxy = onRowClick ? onRowClick : () => { };
    const styles = getStyles(Boolean(onRowClick));

    return (
        <TableBody>
            {state.data
                .map((row: any, rowIndex: number) => (
                    bodyRenderer
                        ? bodyRenderer(row, rowIndex, state.columns)
                        : <TableRow
                            hover={true}
                            key={rowIndex}
                            onClick={onRowClickProxy(row)}
                            style={styles.row}
                        >
                            {renderCells(state.columns, row)}
                        </TableRow>
                ))}
            {state.filteredRecordCount === 0 && !state.isLoading &&
                (<TableRow>
                    <TableCell
                        colSpan={state.columns.filter((col: any) => col.Visible).length}
                    >
                        <Typography
                            style={styles.title}
                            variant='body2'
                            gutterBottom={true}
                        >
                            <Warning /> No records found
                        </Typography>
                    </TableCell>
                </TableRow>)}
        </TableBody>
    );
};

export default GridBody;
