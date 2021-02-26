import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import * as React from 'react';
import { ColumnModel, parseDateColumnValue } from 'tubular-common';
import { FixedLinearProgress } from 'uno-material-ui/dist/FixedLinearProgress';
import { useResolutionSwitch } from 'uno-react/lib/hooks/useResolutionSwitch';
import { TbRowProps } from '../../src/BareBones/TbRow';
import { DataGridTable } from '../../src/DataGrid';
import { MobileDataGridTable } from '../../src/DataGrid/MobileDataGridTable';
import { Paginator } from '../../src/Pagination';
import sampleColumns from './data/columns';
import localData from './data/localData';
import { useTbTable } from 'tubular-react-common';

const CustomTbRow: React.FunctionComponent<TbRowProps> = ({ row, onRowClick }: TbRowProps) => (
    <TableRow hover={true} key={row.OrderID} onClick={onRowClick}>
        <TableCell padding="default">{row.OrderID} </TableCell>
        <TableCell padding="default">{row.CustomerName} </TableCell>
        <TableCell padding="default">{row.ShippedDate}</TableCell>
        <TableCell padding="default">{row.ShipperCity}</TableCell>
        <TableCell padding="default" align={'right'}>
            {row.Amount || 0}
        </TableCell>
        <TableCell padding="default">{row.IsShipped ? <CheckBox /> : <CheckBoxOutlineBlank />}</TableCell>
    </TableRow>
);

const CustomTbMobileRow = ({ columns, row, onRowClick }: TbRowProps) => (
    <Card onClick={onRowClick}>
        <CardContent>
            {columns.map((column: ColumnModel, index: number) => (
                <div key={index}>
                    <Typography component="div" variant="body2" color="textSecondary">
                        {column.name}:
                    </Typography>
                    <Typography component="div" variant="body2" color="textSecondary">
                        {row[column.name]}
                    </Typography>
                </div>
            ))}
        </CardContent>
    </Card>
);

const tbFooter = ({ aggregates }: any) => (
    <TableRow>
        <TableCell>Total:</TableCell>
        <TableCell>{aggregates && aggregates.CustomerName}</TableCell>
        <TableCell />
        <TableCell />
        <TableCell />
        <TableCell />
    </TableRow>
);

const CustomLayoutDataGrid: React.FunctionComponent = () => {
    const [getErrorMessage] = React.useState(null as string);
    const tbTableInstance = useTbTable(sampleColumns, localData);
    const onRowClick = row => console.log(row);
    const [isMobileResolution] = useResolutionSwitch(800, 400);
    if (isMobileResolution) {
        return (
            <Paper>
                <FixedLinearProgress isLoading={tbTableInstance.state.isLoading} />
                <MobileDataGridTable
                    tbTableInstance={tbTableInstance}
                    rowComponent={CustomTbMobileRow}
                    onRowClick={onRowClick}
                />
            </Paper>
        );
    }

    return (
        <>
            {getErrorMessage && (
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    style={{ paddingTop: '10px' }}
                    open={true}
                    ContentProps={{ 'aria-describedby': 'message-id' }}
                    message={<span id="message-id">{getErrorMessage}</span>}
                />
            )}
            <Typography style={{ margin: '25px', marginBottom: '10px' }} variant="h4">
                No card grid!
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <Paginator
                            tbTableInstance={tbTableInstance}
                            rowsPerPageOptions={null}
                            advancePagination={false}
                        />
                    </TableRow>
                </TableHead>
            </Table>

            <DataGridTable
                tbTableInstance={tbTableInstance}
                rowComponent={CustomTbRow}
                footerComponent={tbFooter}
                onRowClick={onRowClick}
            />
        </>
    );
};

export default CustomLayoutDataGrid;
