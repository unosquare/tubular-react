import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import React from 'react';

const ColumnModelTable = (props) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Default</TableCell>
                    <TableCell>Description</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow hover='true'>
                    <TableCell>Aggregate</TableCell>
                    <TableCell>AggregateFunctions</TableCell>
                    <TableCell>NONE</TableCell>
                    <TableCell>The aggregation function that will be applied to this column</TableCell>
                </TableRow>
                <TableRow hover='true'>
                    <TableCell>DataType</TableCell>
                    <TableCell>ColumnDataType</TableCell>
                    <TableCell>string</TableCell>
                    <TableCell>The column type</TableCell>
                </TableRow>
                <TableRow hover='true'>
                    <TableCell>Filtering</TableCell>
                    <TableCell>bool</TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>Activates filtering</TableCell>
                </TableRow>
                <TableRow hover='true'>
                    <TableCell>IsKey</TableCell>
                    <TableCell>bool</TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>Defines if a column is an identifier or not</TableCell>
                </TableRow>
                <TableRow hover='true'>
                    <TableCell>Label</TableCell>
                    <TableCell>string</TableCell>
                    <TableCell></TableCell>
                    <TableCell>Column label that will be shown</TableCell>
                </TableRow>
                <TableRow hover='true'>
                    <TableCell>Searchable</TableCell>
                    <TableCell>bool</TableCell>
                    <TableCell>true</TableCell>
                    <TableCell>Indicates that a column can be used to search upon</TableCell>
                </TableRow>
                <TableRow hover='true'>
                    <TableCell>SortDirection</TableCell>
                    <TableCell>ColumnSortDirection</TableCell>
                    <TableCell>NONE</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow hover='true'>
                    <TableCell>SortOrder</TableCell>
                    <TableCell>number</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow hover='true'>
                    <TableCell>Sortable</TableCell>
                    <TableCell>bool</TableCell>
                    <TableCell></TableCell>
                    <TableCell>Determines if a column can be sorted</TableCell>
                </TableRow>
                <TableRow hover='true'>
                    <TableCell>Visible</TableCell>
                    <TableCell>bool</TableCell>
                    <TableCell>true</TableCell>
                    <TableCell>Specifies if a column should be shown</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default ColumnModelTable;