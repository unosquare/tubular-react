import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Hidden from 'material-ui/Hidden';
import React from 'react';

const ColumnModelTable = (props) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Default</TableCell>
                    <Hidden smDown>
                    <TableCell>Description</TableCell>
                    </Hidden>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow hover={true}>
                    <TableCell>Aggregate</TableCell>
                    <TableCell>AggregateFunctions</TableCell>
                    <TableCell>NONE</TableCell>
                    <Hidden smDown>
                    <TableCell>The aggregation function that will be applied to this column</TableCell>
                    </Hidden>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell>DataType</TableCell>
                    <TableCell>ColumnDataType</TableCell>
                    <TableCell>string</TableCell>
                    <Hidden smDown>
                    <TableCell>The column type</TableCell>
                    </Hidden>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell>Filtering</TableCell>
                    <TableCell>bool</TableCell>
                    <TableCell>false</TableCell>
                    <Hidden smDown>
                    <TableCell>Activates filtering</TableCell>
                    </Hidden>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell>IsKey</TableCell>
                    <TableCell>bool</TableCell>
                    <TableCell>false</TableCell>
                    <Hidden smDown>
                    <TableCell>Defines if a column is an identifier or not</TableCell>
                    </Hidden>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell>Label</TableCell>
                    <TableCell>string</TableCell>
                    <TableCell></TableCell>
                    <Hidden smDown>
                    <TableCell>Column label that will be shown</TableCell>
                    </Hidden>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell>Searchable</TableCell>
                    <TableCell>bool</TableCell>
                    <TableCell>true</TableCell>
                    <Hidden smDown>
                    <TableCell>Indicates that a column can be used to search upon</TableCell>
                    </Hidden>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell>SortDirection</TableCell>
                    <TableCell>ColumnSortDirection</TableCell>
                    <TableCell>NONE</TableCell>
                    <Hidden smDown>
                    <TableCell></TableCell>
                    </Hidden>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell>SortOrder</TableCell>
                    <TableCell>number</TableCell>
                    <TableCell></TableCell>
                    <Hidden smDown>
                    <TableCell></TableCell>
                    </Hidden>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell>Sortable</TableCell>
                    <TableCell>bool</TableCell>
                    <TableCell></TableCell>
                    <Hidden smDown>
                    <TableCell>Determines if a column can be sorted</TableCell>
                    </Hidden>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell>Visible</TableCell>
                    <TableCell>bool</TableCell>
                    <TableCell>true</TableCell>
                    <Hidden smDown>
                    <TableCell>Specifies if a column should be shown</TableCell>
                    </Hidden>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default ColumnModelTable;