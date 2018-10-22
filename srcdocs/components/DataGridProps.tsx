import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import * as React from 'react';

const styles = (theme: Theme) => createStyles(
    {
        code: {
            background: '#F8F8FF',
            fontSize: 14
        },
        root: {
            marginTop: theme.spacing.unit * 3,
            overflowX: 'auto',
            width: '100%'
        }
    }
);

const DataGridProps = (props: any) => {

    const { classes } = props;

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
                            <code className={classes.code}>(row: any, index: number, columns: ColumnModel[])</code> to map all rows.
                            <em>see sample Full grid features</em>
                        </TableCell>
                    </TableRow>
                    <TableRow hover={true}>
                        <TableCell><code className={classes.code}>footerRenderer</code></TableCell>
                        <TableCell><code className={classes.code}>function</code></TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>
                            <strong>Optional.</strong>
                            It takes an aggregate function with 1 parameter <code className={classes.code}>(aggregate: any)</code> to show in a foot row the results from the aggregate function.
                            <em>see sample Full grid features</em>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
};

export default withStyles(styles)(DataGridProps);
