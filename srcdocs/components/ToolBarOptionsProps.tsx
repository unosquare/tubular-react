import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { ToolbarOptions } from '../../src';

const styles = (theme: Theme) => createStyles (
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

const ToolBarOptionsProps = (props: any) => {

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
                        <TableCell><code className={classes.code}>advancePagination</code></TableCell>
                        <TableCell><code className={classes.code}>boolean</code></TableCell>
                        <TableCell><code className={classes.code}>true</code></TableCell>
                        <TableCell>
                            <strong>Otional. </strong>
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
                    <TableRow hover={true}>
                        <TableCell><code className={classes.code}>itemsPerPage</code></TableCell>
                        <TableCell><code className={classes.code}>number</code></TableCell>
                        <TableCell><code className={classes.code}>10</code></TableCell>
                        <TableCell>
                            <strong>Optional. </strong>
                            Initial valor that represent the number of rows per page.
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
};

export default withStyles(styles)(ToolBarOptionsProps);
