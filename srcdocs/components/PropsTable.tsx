import Hidden from 'material-ui/Hidden';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import * as React from 'react';

const PropsTable = (props: any) => {
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
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow hover={true}>
                    <TableCell>datasource</TableCell>
                    <TableCell>RemoteDataSource or LocalDataSource</TableCell>
                    <TableCell/>
                    <Hidden smDown={true}>
                    <TableCell>Required</TableCell>
                    </Hidden>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell>gridName</TableCell>
                    <TableCell>string</TableCell>
                    <TableCell>''</TableCell>
                    <Hidden smDown={true}>
                    <TableCell/>
                    </Hidden>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell>rowsPerPage</TableCell>
                    <TableCell>number</TableCell>
                    <TableCell>10</TableCell>
                    <Hidden smDown={true}>
                    <TableCell/>
                    </Hidden>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell>showBottomPager</TableCell>
                    <TableCell>bool</TableCell>
                    <TableCell>false</TableCell>
                    <Hidden >
                    <TableCell/>
                    </Hidden>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell>showTopPager</TableCell>
                    <TableCell>bool</TableCell>
                    <TableCell>false</TableCell>
                    <Hidden smDown={true}>
                    <TableCell/>
                    </Hidden>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell>showPrintButton</TableCell>
                    <TableCell>bool</TableCell>
                    <TableCell>false</TableCell>
                    <Hidden smDown={true}>
                    <TableCell/>
                    </Hidden>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell>showExportButton</TableCell>
                    <TableCell>bool</TableCell>
                    <TableCell>false</TableCell>
                    <Hidden smDown={true}>
                    <TableCell/>
                    </Hidden>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell>bodyRenderer</TableCell>
                    <TableCell>function</TableCell>
                    <TableCell/>
                    <Hidden smDown={true}>
                    <TableCell/>
                    </Hidden>
                </TableRow>
                <TableRow hover={true}>
                    <TableCell>footerRenderer</TableCell>
                    <TableCell>function</TableCell>
                    <TableCell/>
                    <Hidden smDown={true}>
                    <TableCell/>
                    </Hidden>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default PropsTable;
