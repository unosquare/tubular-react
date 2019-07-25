import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import makeStyles from '@material-ui/Styles/makeStyles';
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
                        <TableCell><code className={classes.code}>advancePagination</code></TableCell>
                        <TableCell><code className={classes.code}>boolean</code></TableCell>
                        <TableCell><code className={classes.code}>true</code></TableCell>
                        <TableCell>
                            <strong>Optional. </strong>
                            It shows advanced pagination with numbers of the page to navigate between pages,
                            also display the navigation buttons to the last or first page.
                            Otherwise, show a simple pagination with two directions arrows
                            for advance or go back a page.
                        </TableCell>
                    </TableRow>
                    <TableRow hover={true}>
                        <TableCell><code className={classes.code}>bottomPager</code></TableCell>
                        <TableCell><code className={classes.code}>boolean</code></TableCell>
                        <TableCell><code className={classes.code}>true</code></TableCell>
                        <TableCell><strong>Optional. </strong>
                            It shows pagination bar in the bottom of the grid.
                        </TableCell>
                    </TableRow>
                    <TableRow hover={true}>
                        <TableCell><code className={classes.code}>exportButton</code></TableCell>
                        <TableCell><code className={classes.code}>boolean</code></TableCell>
                        <TableCell><code className={classes.code}>true</code></TableCell>
                        <TableCell>
                            <strong>Optional. </strong>
                            It shows the export button.
                        </TableCell>
                    </TableRow>
                    <TableRow hover={true}>
                        <TableCell><code className={classes.code}>itemsPerPage</code></TableCell>
                        <TableCell><code className={classes.code}>number</code></TableCell>
                        <TableCell><code className={classes.code}>10</code></TableCell>
                        <TableCell>
                            <strong>Optional. </strong>
                            Initial valor that represent the number of rows per page.
                        It should be a number that is inside the <em>rowsPerPageOptions</em> array.
                        </TableCell>
                    </TableRow>
                    <TableRow hover={true}>
                        <TableCell><code className={classes.code}>printButton</code></TableCell>
                        <TableCell><code className={classes.code}>boolean</code></TableCell>
                        <TableCell><code className={classes.code}>true</code></TableCell>
                        <TableCell>
                            <strong>Optional. </strong>
                            It shows the print button.
                        </TableCell>
                    </TableRow>
                    <TableRow hover={true}>
                        <TableCell><code className={classes.code}>searchText</code></TableCell>
                        <TableCell><code className={classes.code}>boolean</code></TableCell>
                        <TableCell><code className={classes.code}>true</code></TableCell>
                        <TableCell>
                            <strong>Optional. </strong>
                            It shows the search text input.
                        </TableCell>
                    </TableRow>
                    <TableRow hover={true}>
                        <TableCell><code className={classes.code}>topPager</code></TableCell>
                        <TableCell><code className={classes.code}>boolean</code></TableCell>
                        <TableCell><code className={classes.code}>true</code></TableCell>
                        <TableCell>
                            <strong>Optional. </strong>
                            It shows pagination bar in the top of the grid.
                        </TableCell>
                    </TableRow>
                    <TableRow hover={true}>
                        <TableCell><code className={classes.code}>rowsPerPageOptions</code></TableCell>
                        <TableCell><code className={classes.code}>array</code></TableCell>
                        <TableCell><code className={classes.code}>[10, 20, 50, 100]</code></TableCell>
                        <TableCell>
                            <strong>Optional. </strong>
                            It shows a combo with a set of values that represent the number of rows per page.
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
};
