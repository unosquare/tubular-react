import Hidden from 'material-ui/Hidden';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import * as React from 'react';

const ColumnModelTable = (props: any) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Default</TableCell>
                    <Hidden smDown={true}>
                    <TableCell>Description</TableCell>
                    </Hidden>
                    <TableCell>Options</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow hover={true}>
                    <TableCell>Aggregate</TableCell>
                    <TableCell>AggregateFunctions</TableCell>
                    <TableCell>NONE</TableCell>
                    <Hidden smDown={true}>
                    <TableCell>The aggregation function that will be applied to this column</TableCell>
                    </Hidden>
                    <TableCell>NONE, SUM, AVERAGE, COUNT, DISTINCT_COUNT, MAX, MIN</TableCell>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell>DataType</TableCell>
                    <TableCell>ColumnDataType</TableCell>
                    <TableCell>string</TableCell>
                    <Hidden smDown={true}>
                    <TableCell>The column type</TableCell>
                    </Hidden>
                    <TableCell>STRING, NUMERIC, BOOLEAN, DATE, DATE_TIME, DATE_TIME_UTC</TableCell>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell>Filtering</TableCell>
                    <TableCell>bool</TableCell>
                    <TableCell>false</TableCell>
                    <Hidden smDown={true}>
                    <TableCell>Enables filtering</TableCell>
                    </Hidden>
                    <TableCell/>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell>IsKey</TableCell>
                    <TableCell>bool</TableCell>
                    <TableCell>false</TableCell>
                    <Hidden smDown={true}>
                    <TableCell>Defines if a column is an identifier or not</TableCell>
                    </Hidden>
                    <TableCell/>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell>Label</TableCell>
                    <TableCell>STRING</TableCell>
                    <TableCell>The name of the column</TableCell>
                    <Hidden smDown={true}>
                    <TableCell>Column label that will be shown</TableCell>
                    </Hidden>
                    <TableCell/>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell>Searchable</TableCell>
                    <TableCell>bool</TableCell>
                    <TableCell>true</TableCell>
                    <Hidden smDown={true}>
                    <TableCell>Indicates that a column can be used to search upon</TableCell>
                    </Hidden>
                    <TableCell/>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell>SortDirection</TableCell>
                    <TableCell>ColumnSortDirection</TableCell>
                    <TableCell>NONE</TableCell>
                    <Hidden smDown={true}>
                    <TableCell/>
                    </Hidden>
                    <TableCell>NONE, ASCENDING, DESCENDING</TableCell>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell>SortOrder</TableCell>
                    <TableCell>number</TableCell>
                    <TableCell>-1</TableCell>
                    <Hidden smDown={true}>
                    <TableCell/>
                    </Hidden>
                    <TableCell/>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell>Sortable</TableCell>
                    <TableCell>bool</TableCell>
                    <TableCell>false</TableCell>
                    <Hidden smDown={true}>
                    <TableCell>Determines if a column can be sorted</TableCell>
                    </Hidden>
                    <TableCell/>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell>Visible</TableCell>
                    <TableCell>bool</TableCell>
                    <TableCell>true</TableCell>
                    <Hidden smDown={true}>
                    <TableCell>Specifies if a column should be shown</TableCell>
                    </Hidden>
                    <TableCell/>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default ColumnModelTable;
