import Hidden from 'material-ui/Hidden';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import { StyleRules, Theme } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import * as React from 'react';

const styleClasses = {
    code: '',
    root: ''
};

const styles = (theme: Theme): StyleRules<keyof typeof styleClasses> => (
    {
        code: {
            background: '#F8F8FF',
        },
        root: {
            marginTop: theme.spacing.unit * 3,
            overflowX: 'auto',
            width: '100%'
        }
    }
);

export default withStyles(styles)((props) => {

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
                        <TableCell><code className={classes.code}>datasource</code></TableCell>
                        <TableCell><code className={classes.code}>RemoteDataSource</code>
                            or <code className={classes.code}>LocalDataSource</code></TableCell>
                        <TableCell>-</TableCell>
                        <TableCell><strong>Required</strong></TableCell>
                    </TableRow>
                    <TableRow hover={true}>
                        <TableCell><code className={classes.code}>gridName</code></TableCell>
                        <TableCell><code className={classes.code}>string</code></TableCell>
                        <TableCell>-</TableCell>
                        <TableCell><strong>Required</strong></TableCell>
                    </TableRow>
                    <TableRow hover={true}>
                        <TableCell><code className={classes.code}>rowsPerPage</code></TableCell>
                        <TableCell><code className={classes.code}>number</code></TableCell>
                        <TableCell>-</TableCell>
                        <TableCell><strong>Required.</strong> 
                            It should be a number thats inside the 
                            <code className={classes.code}>rowsPerPageOptions</code> array.
                        </TableCell>
                    </TableRow>
                    <TableRow hover={true}>
                        <TableCell><code className={classes.code}>rowsPerPageOptions</code></TableCell>
                        <TableCell><code className={classes.code}>array</code></TableCell>
                        <TableCell>[10, 20, 50, 100]</TableCell>
                        <TableCell>The options that are going to be shown in the Page Size dropdown.</TableCell>
                    </TableRow>
                    <TableRow hover={true}>
                        <TableCell><code className={classes.code}>showBottomPager</code></TableCell>
                        <TableCell><code className={classes.code}>bool</code></TableCell>
                        <TableCell><code className={classes.code}>false</code></TableCell>
                        <TableCell><strong>Optional</strong></TableCell>
                    </TableRow>
                    <TableRow hover={true}>
                        <TableCell><code className={classes.code}>showTopPager</code></TableCell>
                        <TableCell><code className={classes.code}>bool</code></TableCell>
                        <TableCell><code className={classes.code}>false</code></TableCell>
                        <TableCell><strong>Optional</strong></TableCell>
                    </TableRow>
                    <TableRow hover={true}>
                        <TableCell><code className={classes.code}>showPrintButton</code></TableCell>
                        <TableCell><code className={classes.code}>bool</code></TableCell>
                        <TableCell><code className={classes.code}>false</code></TableCell>
                        <TableCell><strong>Optional</strong></TableCell>
                    </TableRow>
                    <TableRow hover={true}>
                        <TableCell><code className={classes.code}>showExportButton</code></TableCell>
                        <TableCell><code className={classes.code}>bool</code></TableCell>
                        <TableCell><code className={classes.code}>false</code></TableCell>
                        <TableCell><strong>Optional</strong></TableCell>
                    </TableRow>
                    <TableRow hover={true}>
                        <TableCell><code className={classes.code}>bodyRenderer</code></TableCell>
                        <TableCell><code className={classes.code}>function</code></TableCell>
                        <TableCell>-</TableCell>
                        <TableCell><strong>Optional</strong></TableCell>
                    </TableRow>
                    <TableRow hover={true}>
                        <TableCell><code className={classes.code}>footerRenderer</code></TableCell>
                        <TableCell><code className={classes.code}>function</code></TableCell>
                        <TableCell>-</TableCell>
                        <TableCell><strong>Optional</strong></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
});
