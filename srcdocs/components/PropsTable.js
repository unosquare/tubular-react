import React from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

const PropsTable = (props) => {
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
                    <TableCell>datasource</TableCell>
                    <TableCell>RemoteDataSource or LocalDataSource</TableCell>
                    <TableCell></TableCell>
                    <TableCell>Required</TableCell>
                </TableRow>
                <TableRow hover='true'>
                    <TableCell>gridName</TableCell>
                    <TableCell>string</TableCell>
                    <TableCell>''</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow hover='true'>
                    <TableCell>rowsPerPage</TableCell>
                    <TableCell>number</TableCell>
                    <TableCell>10</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow hover='true'>
                    <TableCell>showBottomPager</TableCell>
                    <TableCell>bool</TableCell>
                    <TableCell>false</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow hover='true'>
                    <TableCell>showTopPager</TableCell>
                    <TableCell>bool</TableCell>
                    <TableCell>false</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow hover='true'>
                    <TableCell>showPrintButton</TableCell>
                    <TableCell>bool</TableCell>
                    <TableCell>false</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow hover='true'>
                    <TableCell>showExportButton</TableCell>
                    <TableCell>bool</TableCell>
                    <TableCell>false</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow hover='true'>
                    <TableCell>bodyRenderer</TableCell>
                    <TableCell>function</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow hover='true'>
                    <TableCell>footerRenderer</TableCell>
                    <TableCell>function</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default PropsTable;