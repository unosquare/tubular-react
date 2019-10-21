import TableCell from '@material-ui/core/TableCell/TableCell';
import TableRow from '@material-ui/core/TableRow/TableRow';
import Typography from '@material-ui/core/Typography/Typography';
import Warning from '@material-ui/icons/Warning';
import * as React from 'react';
import { IDataGrid } from '../DataGridInterfaces/IDataGrid';

interface IProps {
    grid: IDataGrid;
    styles: any;
}

export const NoDataRow: React.FunctionComponent<IProps> = ({ grid, styles }) => (
    <TableRow>
        <TableCell
            colSpan={grid.state.columns.filter((col: any) => col.Visible).length}
        >
            <Typography
                style={styles.title}
                variant='body2'
                gutterBottom={true}
            >
                <Warning /> No records found
            </Typography>
        </TableCell>
    </TableRow>
);
