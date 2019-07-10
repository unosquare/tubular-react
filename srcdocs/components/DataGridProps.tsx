import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import makeStyles from '@material-ui/styles/makeStyles';
import * as React from 'react';

const useStyles = makeStyles({
    code: {
        background: '#F8F8FF',
        fontSize: 14,
    },
    root: {
        overflowX: 'auto',
        width: '100%',
    },
});

export default () => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Default value</TableCell>
                        <TableCell>Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow hover={true}>
                        <TableCell><code className={classes.code}>gridName</code></TableCell>
                        <TableCell><code className={classes.code}>string</code></TableCell>
                        <TableCell>Grid</TableCell>
                        <TableCell><strong>Optional</strong></TableCell>
                    </TableRow>
                    <TableRow hover={true}>
                        <TableCell><code className={classes.code}>toolbarOptions</code></TableCell>
                        <TableCell><code className={classes.code}>ToolbarOptions</code></TableCell>
                        <TableCell><code className={classes.code}>new ToolBarOptions();</code></TableCell>
                        <TableCell><strong>Optional.</strong>
                            It should be an instance of ToolbarOptions. This encapsulates useful options.
                            <em>see ToolBarOptions props</em>
                        </TableCell>
                    </TableRow>
                    <TableRow hover={true}>
                        <TableCell><code className={classes.code}>bodyRenderer</code></TableCell>
                        <TableCell><code className={classes.code}>function</code></TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>
                            <strong>Optional.</strong>
                            It takes a function with 3 parameters
                            <code className={classes.code}>
                                (row: any, index: number, columns: ColumnModel[])
                            </code> to map all rows.
                            <em>see sample Full grid features</em>
                        </TableCell>
                    </TableRow>
                    <TableRow hover={true}>
                        <TableCell><code className={classes.code}>footerRenderer</code></TableCell>
                        <TableCell><code className={classes.code}>function</code></TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>
                            <strong>Optional.</strong>
                            It takes an aggregate function with 1 parameter
                        <code className={classes.code}>
                                (aggregate: any)
                        </code> to show in a foot row the results from the aggregate function.
                            <em>see sample Full grid features</em>
                        </TableCell>
                    </TableRow>
                    <TableRow hover={true}>
                        <TableCell><code className={classes.code}>onRowClick</code></TableCell>
                        <TableCell><code className={classes.code}>function</code></TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>
                            <strong>Optional.</strong>
                            Use this event handler to receive the clicked row.
                        </TableCell>
                    </TableRow>
                    <TableRow hover={true}>
                        <TableCell><code className={classes.code}>storage</code></TableCell>
                        <TableCell><code className={classes.code}>IDataGridStorage</code></TableCell>
                        <TableCell>LocalStorage</TableCell>
                        <TableCell>
                            <strong>Optional.</strong>
                            Use this prop to set the settings storage.
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
};
