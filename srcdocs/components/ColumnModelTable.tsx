import Hidden from 'material-ui/Hidden';
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
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Default</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Options</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow hover={true}>
                    <TableCell><code className={classes.code}>Aggregate</code></TableCell>
                    <TableCell><code className={classes.code}>AggregateFunctions</code></TableCell>
                    <TableCell><code className={classes.code}>NONE</code></TableCell>
                    <TableCell>The aggregation function that will be applied to this column</TableCell>
                    <TableCell>
                        <code className={classes.code}>NONE</code>, 
                        <code className={classes.code}>SUM</code>, 
                        <code className={classes.code}>AVERAGE</code>,
                        <br />
                        <code className={classes.code}>COUNT</code>, 
                        <code className={classes.code}>DISTINCT_COUNT</code>, 
                        <br />
                        <code className={classes.code}>MAX</code>, 
                        <code className={classes.code}>MIN</code>
                    </TableCell>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell><code className={classes.code}>DataType</code></TableCell>
                    <TableCell><code className={classes.code}>ColumnDataType</code></TableCell>
                    <TableCell><code className={classes.code}>string</code></TableCell>
                    <TableCell>The column type</TableCell>
                    <TableCell>
                        <code className={classes.code}>STRING</code>, 
                        <code className={classes.code}>NUMERIC</code>, 
                        <code className={classes.code}>BOOLEAN</code>, 
                        <br />
                        <code className={classes.code}>DATE</code>, 
                        <code className={classes.code}>DATE_TIME</code>, 
                        <code className={classes.code}>DATE_TIME_UTC</code>
                    </TableCell>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell><code className={classes.code}>Filtering</code></TableCell>
                    <TableCell><code className={classes.code}>bool</code></TableCell>
                    <TableCell><code className={classes.code}>false</code></TableCell>
                    <TableCell>Enables filtering</TableCell>
                    <TableCell>-</TableCell>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell><code className={classes.code}>IsKey</code></TableCell>
                    <TableCell><code className={classes.code}>bool</code></TableCell>
                    <TableCell><code className={classes.code}>false</code></TableCell>
                    <TableCell>Defines if a column is an identifier or not</TableCell>
                    <TableCell>-</TableCell>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell><code className={classes.code}>Label</code></TableCell>
                    <TableCell><code className={classes.code}>string</code></TableCell>
                    <TableCell>The name of the column</TableCell>
                    <TableCell>Column label that will be shown</TableCell>
                    <TableCell>-</TableCell>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell><code className={classes.code}>Searchable</code></TableCell>
                    <TableCell><code className={classes.code}>bool</code></TableCell>
                    <TableCell><code className={classes.code}>true</code></TableCell>
                    <TableCell>Indicates that a column can be used to search upon</TableCell>
                    <TableCell>-</TableCell>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell><code className={classes.code}>SortDirection</code></TableCell>
                    <TableCell><code className={classes.code}>ColumnSortDirection</code></TableCell>
                    <TableCell><code className={classes.code}>NONE</code></TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                        <code className={classes.code}>NONE</code>, 
                        <code className={classes.code}>ASCENDING</code>, 
                        <code className={classes.code}>DESCENDING</code>
                    </TableCell>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell><code className={classes.code}>SortOrder</code></TableCell>
                    <TableCell><code className={classes.code}>number</code></TableCell>
                    <TableCell><code className={classes.code}>-1</code></TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell><code className={classes.code}>Sortable</code></TableCell>
                    <TableCell><code className={classes.code}>bool</code></TableCell>
                    <TableCell><code className={classes.code}>false</code></TableCell>
                    <TableCell>Determines if a column can be sorted</TableCell>
                    <TableCell>-</TableCell>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell><code className={classes.code}>Visible</code></TableCell>
                    <TableCell><code className={classes.code}>bool</code></TableCell>
                    <TableCell><code className={classes.code}>true</code></TableCell>
                    <TableCell>Specifies if a column should be shown</TableCell>
                    <TableCell>-</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
});
